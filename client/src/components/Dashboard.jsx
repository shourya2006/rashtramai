"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  TrendingUp,
  AlertCircle,
  Menu,
  X,
} from "lucide-react";

const RashtramAI = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const [animateStats, setAnimateStats] = useState(false);
const [lastUpdated, setLastUpdated] = useState("");

useEffect(() => {
    setLastUpdated(new Date().toLocaleDateString());
}, []);

  useEffect(() => {
    setAnimateStats(true);
  }, []);

  // Mock data for bills
  const bills = [
    {
      id: 1,
      name: "Digital Personal Data Protection Bill",
      status: "Passed",
      date: "2024-08-11",
      ministry: "Electronics & IT",
    },
    {
      id: 2,
      name: "Bharatiya Nyaya Sanhita Bill",
      status: "Passed",
      date: "2024-12-25",
      ministry: "Home Affairs",
    },
    {
      id: 3,
      name: "National Capital Territory Laws Bill",
      status: "Introduced",
      date: "2025-02-14",
      ministry: "Home Affairs",
    },
    {
      id: 4,
      name: "Energy Conservation Amendment Bill",
      status: "Under Review",
      date: "2025-03-05",
      ministry: "Power",
    },
    {
      id: 5,
      name: "Jan Vishwas Amendment Bill",
      status: "Passed",
      date: "2024-07-28",
      ministry: "Commerce",
    },
    {
      id: 6,
      name: "Competition Amendment Bill",
      status: "Under Review",
      date: "2025-01-20",
      ministry: "Corporate Affairs",
    },
    {
      id: 7,
      name: "Forest Conservation Amendment Bill",
      status: "Passed",
      date: "2024-08-02",
      ministry: "Environment",
    },
    {
      id: 8,
      name: "Multi-State Co-operative Societies Bill",
      status: "Introduced",
      date: "2025-02-28",
      ministry: "Co-operation",
    },
  ];

  // Mock data for acts
  const acts = [
    {
      id: 1,
      name: "Right to Information Act",
      status: "Active",
      year: "2005",
      ministry: "Personnel, PG & Pensions",
    },
    {
      id: 2,
      name: "Goods and Services Tax Act",
      status: "Active",
      year: "2017",
      ministry: "Finance",
    },
    {
      id: 3,
      name: "Consumer Protection Act",
      status: "Active",
      year: "2019",
      ministry: "Consumer Affairs",
    },
    {
      id: 4,
      name: "Motor Vehicles Act",
      status: "Active",
      year: "1988",
      ministry: "Road Transport",
    },
    {
      id: 5,
      name: "Information Technology Act",
      status: "Active",
      year: "2000",
      ministry: "Electronics & IT",
    },
    {
      id: 6,
      name: "Companies Act",
      status: "Active",
      year: "2013",
      ministry: "Corporate Affairs",
    },
    {
      id: 7,
      name: "Insolvency and Bankruptcy Code",
      status: "Active",
      year: "2016",
      ministry: "Finance",
    },
    {
      id: 8,
      name: "Environmental Protection Act",
      status: "Active",
      year: "1986",
      ministry: "Environment",
    },
  ];

  const getStatusColor = (status) => {
    const colors = {
      Passed: "bg-green-100 text-green-700",
      Active: "bg-green-100 text-green-700",
      Introduced: "bg-blue-100 text-blue-700",
      "Under Review": "bg-yellow-100 text-yellow-700",
      Rejected: "bg-red-100 text-red-700",
    };
    return colors[status] || "bg-gray-100 text-gray-700";
  };

  const filterData = (data) => {
    return data.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus =
        selectedStatus === "all" || item.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  };

  const getUniqueStatuses = (data) => {
    return [...new Set(data.map((item) => item.status))];
  };

  const Dashboard = () => {
    const stats = [
      {
        label: "Total Bills",
        value: bills.length,
        icon: FileText,
        color: "bg-blue-500",
        change: "+12%",
      },
      {
        label: "Passed Bills",
        value: bills.filter((b) => b.status === "Passed").length,
        icon: CheckCircle,
        color: "bg-green-500",
        change: "+8%",
      },
      {
        label: "Under Review",
        value: bills.filter((b) => b.status === "Under Review").length,
        icon: Clock,
        color: "bg-yellow-500",
        change: "+3%",
      },
      {
        label: "Active Acts",
        value: acts.length,
        icon: AlertCircle,
        color: "bg-purple-500",
        change: "Stable",
      },
    ];

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <div className="text-sm text-gray-500">
            Last updated: {lastUpdated}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-xl shadow-md p-6 transform transition-all duration-500 hover:scale-105 hover:shadow-xl ${
                animateStats
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">
                    {stat.value}
                  </p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-500">
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`${stat.color} p-4 rounded-full`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Recent Bills
            </h2>
            <div className="space-y-3">
              {bills.slice(0, 5).map((bill, idx) => (
                <div
                  key={bill.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:translate-x-2"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{bill.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{bill.date}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      bill.status
                    )}`}
                  >
                    {bill.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Status Distribution
            </h2>
            <div className="space-y-4">
              {getUniqueStatuses(bills).map((status, idx) => {
                const count = bills.filter((b) => b.status === status).length;
                const percentage = (count / bills.length) * 100;
                return (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700 font-medium">
                        {status}
                      </span>
                      <span className="text-gray-500">{count} bills</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: animateStats ? `${percentage}%` : "0%",
                          backgroundColor: "#9E0812",
                          transitionDelay: `${idx * 200}ms`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const BillsPage = () => {
    const filteredBills = filterData(bills);

    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Parliament Bills</h1>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search bills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9E0812] focus:border-transparent"
              />
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9E0812] focus:border-transparent"
            >
              <option value="all">All Status</option>
              {getUniqueStatuses(bills).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Bills List */}
        <div className="grid grid-cols-1 gap-4">
          {filteredBills.map((bill, idx) => (
            <div
              key={bill.id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800">
                    {bill.name}
                  </h3>
                  <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-600">
                    <span>📅 {bill.date}</span>
                    <span>🏛️ {bill.ministry}</span>
                  </div>
                </div>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${getStatusColor(
                    bill.status
                  )}`}
                >
                  {bill.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredBills.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">
              No bills found matching your criteria
            </p>
          </div>
        )}
      </div>
    );
  };

  const ActsPage = () => {
    const filteredActs = filterData(acts);

    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Parliament Acts</h1>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search acts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9E0812] focus:border-transparent"
              />
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9E0812] focus:border-transparent"
            >
              <option value="all">All Status</option>
              {getUniqueStatuses(acts).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Acts List */}
        <div className="grid grid-cols-1 gap-4">
          {filteredActs.map((act, idx) => (
            <div
              key={act.id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800">
                    {act.name}
                  </h3>
                  <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-600">
                    <span>📅 Year: {act.year}</span>
                    <span>🏛️ {act.ministry}</span>
                  </div>
                </div>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${getStatusColor(
                    act.status
                  )}`}
                >
                  {act.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredActs.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">
              No acts found matching your criteria
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentPage === "dashboard" && <Dashboard />}
        {currentPage === "bills" && <BillsPage />}
        {currentPage === "acts" && <ActsPage />}
      </main>
    </div>
  );
};

export default RashtramAI;
