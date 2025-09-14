import React from "react";
import {
  Users,
  AlertTriangle,
  Shield,
  Clock,
  TrendingUp,
  Activity,
} from "lucide-react";

const ScanSummary = ({ summary }) => {
  const formatDate = (dateString) =>
    new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const getRiskPercentage = (count) =>
    summary.totalAccounts > 0
      ? Math.round((count / summary.totalAccounts) * 100)
      : 0;

  const getHealthScore = () => {
    const healthyAccounts = summary.totalAccounts - summary.problematicAccounts;
    return summary.totalAccounts > 0
      ? Math.round((healthyAccounts / summary.totalAccounts) * 100)
      : 0;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">
      {/* Total Accounts */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 rounded-md shadow p-8 text-gray-900 border border-gray-200">
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold">Total Accounts</span>
            <Users className="w-6 h-6 text-gray-400" />
          </div>
          <div>
            <p className="text-3xl font-bold mb-1">{summary.totalAccounts}</p>
            <p className="text-sm text-gray-500">Active user accounts</p>
          </div>
        </div>
      </div>

      {/* Security Health Score */}
      <div className="relative overflow-hidden bg-gradient-to-br from-green-100 via-green-200 to-teal-100 rounded-md shadow p-8 text-gray-900 border border-gray-200">
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold">Security Score</span>
            <Shield className="w-6 h-6 text-green-400" />
          </div>
          <div>
            <p className="text-3xl font-bold mb-1">{getHealthScore()}%</p>
            <p className="text-sm text-gray-500">
              {summary.totalAccounts - summary.problematicAccounts} compliant
              accounts
            </p>
          </div>
        </div>
      </div>

      {/* Security Alerts */}
      <div className="relative overflow-hidden bg-gradient-to-br from-red-100 via-rose-200 to-pink-100 rounded-md shadow p-8 text-gray-900 border border-gray-200">
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold">Security Alerts</span>
            <AlertTriangle className="w-6 h-6 text-red-400" />
          </div>
          <div>
            <p className="text-3xl font-bold mb-1">
              {summary.problematicAccounts}
            </p>
            <p className="text-sm text-gray-500">
              {getRiskPercentage(summary.problematicAccounts)}% at risk
            </p>
          </div>
        </div>
      </div>

      {/* Risk Breakdown */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-100 via-violet-200 to-purple-100 rounded-md shadow p-8 text-gray-900 border border-gray-200">
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold">Risk Breakdown</span>
            <Activity className="w-6 h-6 text-purple-400" />
          </div>
          <div className="mb-2 text-sm text-gray-500">
            Last scan: {formatDate(summary.lastScan)}
          </div>
          <div className="space-y-2 mt-2">
            <div className="flex justify-between items-center">
              <span className="font-medium text-red-700">Critical</span>
              <span className="font-bold">
                {summary.riskDistribution.critical}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-orange-700">High</span>
              <span className="font-bold">{summary.riskDistribution.high}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-yellow-700">Medium</span>
              <span className="font-bold">
                {summary.riskDistribution.medium}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-green-700">Low</span>
              <span className="font-bold">{summary.riskDistribution.low}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanSummary;
