import React, { useState } from "react";
import {
  AlertTriangle,
  CheckCircle,
  User,
  Clock,
  Shield,
  Download,
  Search,
  UserCheck,
  Building,
  XCircle,
  Info,
} from "lucide-react";

const AccountTable = ({ accounts }) => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case "critical":
        return "bg-red-100 text-red-700 border border-red-300";
      case "high":
        return "bg-orange-100 text-orange-700 border border-orange-300";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border border-yellow-300";
      default:
        return "bg-green-100 text-green-700 border border-green-300";
    }
  };

  const getRiskIcon = (riskLevel) => {
    switch (riskLevel) {
      case "critical":
        return <XCircle className="w-6 h-6 text-red-600" />;
      case "high":
        return <AlertTriangle className="w-6 h-6 text-orange-600" />;
      case "medium":
        return <Info className="w-6 h-6 text-yellow-600" />;
      default:
        return <CheckCircle className="w-6 h-6 text-green-600" />;
    }
  };

  const filteredAccounts = accounts.filter((account) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "problematic" && account.scanResults.isProblematic) ||
      (filter === "clean" && !account.scanResults.isProblematic);

    const matchesSearch =
      searchTerm === "" ||
      account.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.department?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const formatDate = (dateString) => {
    return dateString
      ? new Date(dateString).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "N/A";
  };

  const exportToCSV = () => {
    const csvContent = [
      [
        "Username",
        "Email",
        "Name",
        "Role",
        "Department",
        "Status",
        "Risk Level",
        "Issues",
        "Recommendations",
      ],
      ...filteredAccounts.map((account) => [
        account.username,
        account.email,
        `${account.firstName} ${account.lastName}`,
        account.role,
        account.department,
        account.status,
        account.scanResults.riskLevel,
        account.scanResults.issues.join("; "),
        account.scanResults.recommendations.join("; "),
      ]),
    ]
      .map((row) => row.map((field) => `"${field}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `account-security-report-${
      new Date().toISOString().split("T")[0]
    }.csv`;
    a.click();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 p-8 text-white">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between space-y-6 xl:space-y-0">
          <div>
            <h2 className="text-3xl font-bold mb-2 text-slate-100">
              Account Security Analysis
            </h2>
            <p className="text-lg text-slate-300">
              Security compliance and risk assessment dashboard
            </p>
          </div>
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search accounts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-6 py-3 w-64 bg-slate-800 border border-slate-600 rounded-lg text-base text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>
            {/* Export Button */}
            <button
              onClick={exportToCSV}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white px-5 py-3 rounded-lg font-semibold text-base transition-all duration-300 shadow"
            >
              <Download className="w-5 h-5" />
              <span>Export Report</span>
            </button>
          </div>
        </div>
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-4 mt-6">
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-3 rounded-lg font-semibold text-base transition-all duration-300 ${
              filter === "all"
                ? "bg-white text-slate-800 shadow"
                : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
          >
            All Accounts ({accounts.length})
          </button>
          <button
            onClick={() => setFilter("problematic")}
            className={`px-6 py-3 rounded-lg font-semibold text-base transition-all duration-300 ${
              filter === "problematic"
                ? "bg-red-600 text-white shadow"
                : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
          >
            Security Alerts (
            {accounts.filter((a) => a.scanResults.isProblematic).length})
          </button>
          <button
            onClick={() => setFilter("clean")}
            className={`px-6 py-3 rounded-lg font-semibold text-base transition-all duration-300 ${
              filter === "clean"
                ? "bg-green-600 text-white shadow"
                : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
          >
            Compliant (
            {accounts.filter((a) => !a.scanResults.isProblematic).length})
          </button>
        </div>
      </div>
      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1200px]">
          <thead className="bg-gradient-to-r from-slate-100 to-slate-200 border-b border-slate-300">
            <tr>
              <th className="px-4 py-4 text-left text-base font-semibold text-slate-800 w-2/12">
                <div className="flex items-center space-x-2">
                  <UserCheck className="w-5 h-5" />
                  <span>User Details</span>
                </div>
              </th>
              <th className="px-4 py-4 text-left text-base font-semibold text-slate-800 w-1/12">
                <div className="flex items-center space-x-2">
                  <Building className="w-5 h-5" />
                  <span>Organization</span>
                </div>
              </th>
              <th className="px-4 py-4 text-left text-base font-semibold text-slate-800 w-1/12">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Status</span>
                </div>
              </th>
              <th className="px-4 py-4 text-left text-base font-semibold text-slate-800 w-1/12">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>Activity</span>
                </div>
              </th>
              <th className="px-4 py-4 text-left text-base font-semibold text-slate-800 w-1/12">
                Risk Level
              </th>
              <th className="px-4 py-4 text-left text-base font-semibold text-slate-800 w-3/12">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <span>Security Issues</span>
                </div>
              </th>
              <th className="px-4 py-4 text-left text-base font-semibold text-slate-800 w-3/12">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <span>Recommended Actions</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {filteredAccounts.map((account, index) => (
              <tr
                key={account.id}
                className={`hover:bg-slate-50 transition-all duration-200 ${
                  account.scanResults.isProblematic
                    ? "bg-red-50 border-l-4 border-red-500"
                    : ""
                }`}
              >
                {/* User Details */}
                <td className="px-4 py-6 whitespace-nowrap w-2/12">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-slate-700 rounded-lg mr-3 shadow">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-base font-bold text-slate-900">
                        {account.firstName} {account.lastName}
                      </div>
                      <div className="text-sm text-slate-700">
                        {account.email}
                      </div>
                      <div className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded inline-block mt-1">
                        @{account.username}
                      </div>
                    </div>
                  </div>
                </td>
                {/* Organization */}
                <td className="px-4 py-6 whitespace-nowrap w-1/12">
                  <div className="text-base font-bold text-slate-900">
                    {account.role}
                  </div>
                  <div className="text-sm text-slate-600">
                    {account.department}
                  </div>
                </td>
                {/* Status */}
                <td className="px-4 py-6 whitespace-nowrap w-1/12">
                  <div className="flex items-center mb-2">
                    {account.status === "active" ? (
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                    )}
                    <span
                      className={`text-base font-bold ${
                        account.status === "active"
                          ? "text-green-800"
                          : "text-red-800"
                      }`}
                    >
                      {account.status?.charAt(0).toUpperCase() +
                        account.status?.slice(1)}
                    </span>
                  </div>
                  <div
                    className={`flex items-center px-2 py-1 rounded ${
                      account.mfaEnabled ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    <Shield
                      className={`w-4 h-4 mr-1 ${
                        account.mfaEnabled ? "text-green-600" : "text-red-600"
                      }`}
                    />
                    <span
                      className={`text-xs font-semibold ${
                        account.mfaEnabled ? "text-green-800" : "text-red-800"
                      }`}
                    >
                      MFA {account.mfaEnabled ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                </td>
                {/* Activity */}
                <td className="px-4 py-6 whitespace-nowrap w-1/12">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-slate-500 mr-2" />
                    <div>
                      <div className="text-base font-semibold text-slate-900">
                        {formatDate(account.lastLogin)}
                      </div>
                      <div className="text-xs text-slate-600">Last login</div>
                    </div>
                  </div>
                </td>
                {/* Risk Level */}
                <td className="px-4 py-6 whitespace-nowrap w-1/12">
                  <div
                    className={`flex items-center space-x-2 px-3 py-2 rounded ${getRiskColor(
                      account.scanResults.riskLevel
                    )}`}
                  >
                    {getRiskIcon(account.scanResults.riskLevel)}
                    <span className="font-bold text-sm">
                      {account.scanResults.riskLevel.toUpperCase()}
                    </span>
                  </div>
                </td>
                {/* Security Issues Column */}
                <td className="px-4 py-6 w-3/12">
                  <div className="max-w-xl">
                    {account.scanResults.issues.length > 0 ? (
                      <div className="space-y-2">
                        {account.scanResults.issues.map((issue, index) => (
                          <div
                            key={index}
                            className="p-3 bg-red-50 border border-red-200 rounded"
                          >
                            <span className="text-sm text-red-800 font-medium leading-relaxed">
                              {issue}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center p-3 bg-green-50 border border-green-200 rounded">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                        <div>
                          <div className="text-base font-bold text-green-800">
                            No Issues
                          </div>
                          <div className="text-sm text-green-700">
                            Security compliant
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
                {/* Recommended Actions Column */}
                <td className="px-4 py-6 w-3/12">
                  <div className="max-w-xl">
                    {account.scanResults.recommendations.length > 0 ? (
                      <div className="space-y-2">
                        {account.scanResults.recommendations.map(
                          (rec, index) => (
                            <div
                              key={index}
                              className="p-3 bg-blue-50 border border-blue-200 rounded"
                            >
                              <span className="text-sm text-blue-800 font-medium leading-relaxed">
                                {rec}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center p-3 bg-slate-50 border border-slate-200 rounded">
                        <CheckCircle className="w-5 h-5 text-slate-600 mr-2" />
                        <div>
                          <div className="text-base font-bold text-slate-800">
                            No Actions
                          </div>
                          <div className="text-sm text-slate-700">
                            Account is secure
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* No Results Message */}
        {filteredAccounts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-lg text-slate-500 mb-2">No accounts found</div>
            <div className="text-base text-slate-400">
              Try adjusting your search or filter criteria
            </div>
          </div>
        )}
      </div>
      {/* Footer */}
      <div className="px-8 py-5 bg-gradient-to-r from-slate-50 to-slate-100 border-t border-slate-200">
        <div className="text-base font-semibold text-slate-700">
          Showing {filteredAccounts.length} of {accounts.length} accounts
          {searchTerm && ` (filtered by "${searchTerm}")`}
        </div>
      </div>
    </div>
  );
};

export default AccountTable;
