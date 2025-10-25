"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Filter,
  FileText,
  ArrowRight,
  ExternalLink,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  ChevronDown,
} from "lucide-react";

export default function BillsSidebarUI() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Mock bills data
  const mockBills = [
    {
      title: "The Digital Personal Data Protection Bill, 2023",
      status: "Passed",
      pdf: "digital-data-protection-2023.pdf",
      link: "https://prsindia.org/billtrack/the-digital-personal-data-protection-bill-2023",
    },
    {
      title: "The Criminal Procedure (Identification) Bill, 2022",
      status: "Passed",
      pdf: "criminal-procedure-identification-2022.pdf",
      link: "https://prsindia.org/billtrack/the-criminal-procedure-identification-bill-2022",
    },
    {
      title: "The Telecommunications Bill, 2023",
      status: "Introduced",
      pdf: "telecommunications-2023.pdf",
      link: "https://prsindia.org/billtrack/the-telecommunications-bill-2023",
    },
    {
      title: "The Women's Reservation Bill, 2023",
      status: "Passed",
      pdf: "womens-reservation-2023.pdf",
      link: "https://prsindia.org/billtrack/the-womens-reservation-bill-2023",
    },
    {
      title: "The Multi-State Co-operative Societies (Amendment) Bill, 2022",
      status: "Pending",
      pdf: "cooperative-societies-amendment-2022.pdf",
      link: "https://prsindia.org/billtrack/multi-state-cooperative-societies-amendment-bill-2022",
    },
    {
      title:
        "The Juvenile Justice (Care and Protection of Children) Amendment Bill, 2021",
      status: "Introduced",
      pdf: "juvenile-justice-amendment-2021.pdf",
      link: "https://prsindia.org/billtrack/juvenile-justice-amendment-bill-2021",
    },
    {
      title: "The Election Laws (Amendment) Bill, 2021",
      status: "Passed",
      pdf: "election-laws-amendment-2021.pdf",
      link: "https://prsindia.org/billtrack/election-laws-amendment-bill-2021",
    },
    {
      title: "The Assisted Reproductive Technology (Regulation) Bill, 2020",
      status: "Pending",
      pdf: "art-regulation-2020.pdf",
      link: "https://prsindia.org/billtrack/assisted-reproductive-technology-bill-2020",
    },
  ];

  // Data fetching was Giving Error so I removed it for now you can manage it from your side

  useEffect(() => {
    setBills(mockBills);
    setLoading(false);
  }, []);


  const openPRSIndia = () => {
    window.open("https://prsindia.org/billtrack/", "_blank");
  };

  const getUniqueStatuses = () => {
    const statuses = bills.map((bill) => bill.status).filter(Boolean);
    return [...new Set(statuses)];
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "passed":
        return { icon: CheckCircle, color: "text-green-600" };
      case "pending":
        return { icon: Clock, color: "text-yellow-600" };
      case "introduced":
        return { icon: AlertCircle, color: "text-blue-600" };
      case "rejected":
        return { icon: XCircle, color: "text-red-600" };
      default:
        return { icon: Clock, color: "text-gray-600" };
    }
  };

  const filteredBills = bills.filter((bill) => {
    const matchesSearch = bill.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "All" || bill.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-slate-50 to-white">
      {/* Compact Header */}
      <div className="p-4 border-b border-slate-200 bg-white/50 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#B20F38] to-[#8A0C2D] rounded-lg flex items-center justify-center shadow-lg">
              <FileText size={16} className="text-white" />
            </div>
            <div>
              <h3 className="text-slate-800 font-bold text-sm">
                Bills Tracker
              </h3>
              <p className="text-slate-500 text-xs">Parliamentary bills</p>
            </div>
          </div>
          <button
            onClick={openPRSIndia}
            className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
            title="Open PRS India"
          >
            <ExternalLink size={14} className="text-slate-600" />
          </button>
        </div>

        {/* Compact Search */}
        <div className="relative mb-2">
          <Search
            size={14}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search bills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#B20F38] focus:ring-1 focus:ring-[#B20F38]/20 transition-all"
          />
        </div>

        {/* Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="w-full flex items-center justify-between px-3 py-2 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors text-sm"
        >
          <div className="flex items-center space-x-2 text-slate-700">
            <Filter size={14} />
            <span className="font-medium">
              {selectedStatus === "All" ? "All Status" : selectedStatus}
            </span>
          </div>
          <ChevronDown
            size={14}
            className={`text-slate-500 transition-transform ${
              showFilters ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Expandable Filters */}
        {showFilters && (
          <div className="mt-2 p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                Filter Status
              </span>
              {selectedStatus !== "All" && (
                <button
                  onClick={() => setSelectedStatus("All")}
                  className="text-xs text-[#B20F38] hover:text-[#8A0C2D] font-medium"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="space-y-1">
              <button
                onClick={() => {
                  setSelectedStatus("All");
                  setShowFilters(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  selectedStatus === "All"
                    ? "bg-[#B20F38] text-white"
                    : "hover:bg-slate-50 text-slate-700"
                }`}
              >
                All Status
              </button>
              {getUniqueStatuses().map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    setSelectedStatus(status);
                    setShowFilters(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    selectedStatus === status
                      ? "bg-[#B20F38] text-white"
                      : "hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bills List */}
      <div className="flex-1 overflow-y-auto p-3">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-[#B20F38] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-slate-500 text-sm">Loading...</p>
            </div>
          </div>
        ) : filteredBills.length === 0 ? (
          <div className="text-center py-8">
            <FileText size={32} className="text-slate-300 mx-auto mb-2" />
            <p className="text-slate-500 text-sm">No bills found</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredBills.map((bill, idx) => {
              const statusInfo = getStatusIcon(bill.status);
              const StatusIcon = statusInfo.icon;

              return (
                <a
                  key={idx}
                  href={`../chat?pdf=${encodeURIComponent(bill.pdf)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div className="bg-white hover:bg-slate-50 border border-slate-200 rounded-lg p-3 transition-all hover:shadow-md hover:border-[#B20F38]/30">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="text-slate-800 font-semibold text-sm leading-tight group-hover:text-[#B20F38] transition-colors flex-1">
                        {bill.title}
                      </h4>
                      <ArrowRight
                        size={14}
                        className="text-[#B20F38] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-0.5"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      {bill.status && (
                        <div className="flex items-center space-x-1">
                          <StatusIcon size={12} className={statusInfo.color} />
                          <span
                            className={`text-xs font-medium ${statusInfo.color}`}
                          >
                            {bill.status}
                          </span>
                        </div>
                      )}
                      <span className="text-xs text-slate-400">
                        View details →
                      </span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer Stats */}
      <div className="p-3 border-t border-slate-200 bg-white/50">
        <div className="flex items-center justify-between text-xs text-slate-600">
          <span>
            {filteredBills.length} bill{filteredBills.length !== 1 ? "s" : ""}
          </span>
          <span className="text-slate-400">PRS India</span>
        </div>
      </div>
    </div>
  );
}
