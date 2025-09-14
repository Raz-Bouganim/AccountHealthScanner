const express = require("express");
const router = express.Router();
const AccountScanner = require("../utils/scanner");

const scanner = new AccountScanner();

// Get all accounts with scan results
router.get("/", (req, res) => {
  try {
    const scannedAccounts = scanner.scanAccounts();
    res.json(scannedAccounts);
  } catch (error) {
    console.error("Error fetching accounts:", error);
    res.status(500).json({ error: "Failed to fetch accounts" });
  }
});

// Get specific account
router.get("/:id", (req, res) => {
  try {
    const scannedAccounts = scanner.scanAccounts();
    const account = scannedAccounts.find((acc) => acc.id === req.params.id);

    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }

    res.json(account);
  } catch (error) {
    console.error("Error fetching account:", error);
    res.status(500).json({ error: "Failed to fetch account" });
  }
});

module.exports = router;
