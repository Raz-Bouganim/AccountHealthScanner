/**
 * Account object structure
 * @typedef {Object} Account
 * @property {string} id - Unique account identifier
 * @property {string} username - User's username
 * @property {string} email - User's email address
 * @property {string} firstName - User's first name
 * @property {string} lastName - User's last name
 * @property {string} role - User's role (e.g., "Developer", "Manager", "Admin")
 * @property {string} department - User's department
 * @property {string} status - Account status ("active" or "inactive")
 * @property {string} lastLogin - Last login timestamp (ISO string)
 * @property {string} createdAt - Account creation timestamp (ISO string)
 * @property {string} passwordLastChanged - Password last changed timestamp (ISO string)
 * @property {number} failedLoginAttempts - Number of failed login attempts
 * @property {boolean} mfaEnabled - Whether MFA is enabled
 * @property {ScanResults} scanResults - Results from security scan
 */

/**
 * Scan results object structure
 * @typedef {Object} ScanResults
 * @property {string[]} issues - Array of security issues found
 * @property {string[]} recommendations - Array of recommended actions
 * @property {string} riskLevel - Risk level: "low", "medium", "high", or "critical"
 * @property {boolean} isProblematic - Whether account has security issues
 * @property {string} scannedAt - Scan timestamp (ISO string)
 */

/**
 * Scan summary object structure
 * @typedef {Object} ScanSummary
 * @property {number} totalAccounts - Total number of accounts
 * @property {number} problematicAccounts - Number of accounts with issues
 * @property {RiskDistribution} riskDistribution - Distribution of risk levels
 * @property {string} lastScan - Last scan timestamp (ISO string)
 */

/**
 * Risk distribution object structure
 * @typedef {Object} RiskDistribution
 * @property {number} critical - Number of critical risk accounts
 * @property {number} high - Number of high risk accounts
 * @property {number} medium - Number of medium risk accounts
 * @property {number} low - Number of low risk accounts
 */
