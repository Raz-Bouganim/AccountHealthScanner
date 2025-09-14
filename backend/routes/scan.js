const express = require("express");
const router = express.Router();
const AccountScanner = require("../utils/scanner");

const scanner = new AccountScanner();

// Trigger manual scan
router.post("/trigger", (req, res) => {
  try {
    const scannedAccounts = scanner.scanAccounts();
    const summary = scanner.generateSummary(scannedAccounts);

    res.json({
      message: "Scan completed successfully",
      summary,
      accounts: scannedAccounts,
    });
  } catch (error) {
    console.error("Error during scan:", error);
    res.status(500).json({ error: "Scan failed" });
  }
});

// Get scan summary
router.get("/summary", (req, res) => {
  try {
    const scannedAccounts = scanner.scanAccounts();
    const summary = scanner.generateSummary(scannedAccounts);

    res.json(summary);
  } catch (error) {
    console.error("Error generating summary:", error);
    res.status(500).json({ error: "Failed to generate summary" });
  }
});

module.exports = router;
