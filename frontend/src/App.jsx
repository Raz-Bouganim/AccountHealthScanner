import React, { useState, useEffect } from "react";
import { Shield, AlertTriangle } from "lucide-react";
import AccountTable from "./components/AccountTable";
import ScanSummary from "./components/ScanSummary";
import { fetchAccounts, triggerScan, fetchScanSummary } from "./utils/api";

function App() {
  const [accounts, setAccounts] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const [accountsData, summaryData] = await Promise.all([
        fetchAccounts(),
        fetchScanSummary(),
      ]);
      setAccounts(accountsData);
      setSummary(summaryData);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleScan = async () => {
    try {
      setScanning(true);
      await triggerScan();
      await loadData();
    } catch (error) {
      console.error("Error triggering scan:", error);
    } finally {
      setScanning(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 flex items-center justify-center">
        <div className="text-center space-y-8">
          <div className="relative flex items-center justify-center">
            <div className="w-24 h-24 border-4 border-slate-400 border-t-blue-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Shield className="w-10 h-10 text-slate-300" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-slate-200 mb-2">
            Account Health Scanner
          </h2>
          <p className="text-lg text-slate-400">
            Initializing security analysis...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200">
      {/* Header Section */}
      <div className="relative border-b border-slate-200 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700">
        <div className="max-w-7xl mx-auto px-8 py-12 flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 via-slate-700 to-slate-900 rounded-xl shadow-lg">
              <Shield className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Account Health Scanner
              </h1>
              <p className="text-lg text-slate-300 max-w-xl">
                Enterprise security monitoring & compliance dashboard
              </p>
            </div>
          </div>
          <div className="mt-8 md:mt-0">
            <button
              onClick={handleScan}
              disabled={scanning}
              className="flex items-center space-x-3 bg-blue-700 hover:bg-blue-800 disabled:bg-slate-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow"
            >
              {scanning ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Scanning...</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-5 h-5" />
                  <span>Run Security Scan</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-12 space-y-12">
        {summary && <ScanSummary summary={summary} />}
        <AccountTable accounts={accounts} />
      </div>

      {/* Footer */}
      <footer className="py-8 text-center text-slate-500 border-t border-slate-200">
        <div className="flex items-center justify-center space-x-2">
          <Shield className="w-5 h-5" />
          <span className="text-base font-medium">
            Powered by advanced security algorithms
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;
