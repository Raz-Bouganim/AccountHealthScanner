const fs = require("fs");
const path = require("path");

class AccountScanner {
  constructor() {
    this.accountsPath = path.join(__dirname, "../data/accounts.json");
    this.rulesConfig = {
      inactiveThresholdDays: 90,
      passwordAgeThresholdDays: 180,
      maxFailedAttempts: 3,
      requireMFA: true,
    };
  }

  loadAccounts() {
    try {
      const data = fs.readFileSync(this.accountsPath, "utf8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error loading accounts:", error);
      return [];
    }
  }

  scanAccounts() {
    const accounts = this.loadAccounts();
    const currentDate = new Date();

    return accounts.map((account) => {
      const issues = [];
      const recommendations = [];
      let riskLevel = "low";

      // Check for inactive accounts
      const lastLoginDate = new Date(account.lastLogin);
      const daysSinceLogin = Math.floor(
        (currentDate - lastLoginDate) / (1000 * 60 * 60 * 24)
      );

      if (daysSinceLogin > this.rulesConfig.inactiveThresholdDays) {
        issues.push(`Inactive for ${daysSinceLogin} days`);
        recommendations.push(
          "Review account activity and consider deactivation"
        );
        riskLevel = "high";
      }

      // Check account status
      if (account.status === "inactive") {
        issues.push("Account marked as inactive but still accessible");
        recommendations.push("Disable account access immediately");
        riskLevel = "high";
      }

      // Check password age
      const passwordDate = new Date(account.passwordLastChanged);
      const passwordAgeDays = Math.floor(
        (currentDate - passwordDate) / (1000 * 60 * 60 * 24)
      );

      if (passwordAgeDays > this.rulesConfig.passwordAgeThresholdDays) {
        issues.push(`Password unchanged for ${passwordAgeDays} days`);
        recommendations.push("Enforce password reset");
        riskLevel = riskLevel === "high" ? "high" : "medium";
      }

      // Check failed login attempts
      if (account.failedLoginAttempts >= this.rulesConfig.maxFailedAttempts) {
        issues.push(`${account.failedLoginAttempts} failed login attempts`);
        recommendations.push(
          "Investigate potential security breach and reset account"
        );
        riskLevel = "high";
      }

      // Check MFA
      if (!account.mfaEnabled && this.rulesConfig.requireMFA) {
        issues.push("Multi-factor authentication not enabled");
        recommendations.push("Enable MFA for enhanced security");
        riskLevel = riskLevel === "high" ? "high" : "medium";
      }

      // Check privileged accounts
      if (account.role === "Admin" && issues.length > 0) {
        issues.push("Privileged account with security issues");
        recommendations.push("Urgent review required for admin account");
        riskLevel = "critical";
      }

      return {
        ...account,
        scanResults: {
          issues,
          recommendations,
          riskLevel,
          isProblematic: issues.length > 0,
          scannedAt: currentDate.toISOString(),
        },
      };
    });
  }

  generateSummary(scannedAccounts) {
    const summary = {
      totalAccounts: scannedAccounts.length,
      problematicAccounts: scannedAccounts.filter(
        (acc) => acc.scanResults.isProblematic
      ).length,
      riskDistribution: {
        critical: scannedAccounts.filter(
          (acc) => acc.scanResults.riskLevel === "critical"
        ).length,
        high: scannedAccounts.filter(
          (acc) => acc.scanResults.riskLevel === "high"
        ).length,
        medium: scannedAccounts.filter(
          (acc) => acc.scanResults.riskLevel === "medium"
        ).length,
        low: scannedAccounts.filter(
          (acc) => acc.scanResults.riskLevel === "low"
        ).length,
      },
      lastScan: new Date().toISOString(),
    };

    return summary;
  }
}

module.exports = AccountScanner;
