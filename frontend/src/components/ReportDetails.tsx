import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ReportDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [report, setReport] = useState<{
    name: string;
    mobilePhone: string;
    pan: string;
    creditScore: number | null;
    reportSummary: {
      totalAccounts: number;
      activeAccounts: number;
      closedAccounts: number;
      currentBalance: number;
      securedAmount: number;
      unsecuredAmount: number;
    };
    accounts: Array<{
      _id: string;
      bank: string;
      accountNumber: string;
      currentBalance: number;
      overdueAmount: number;
    }>;
  } | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/reports/${id}`)
      .then((res) => setReport(res.data))
      .catch((err) => console.error("Error fetching report:", err));
  }, [id]);

  if (!report) return <p className="text-center">Loading...</p>;

  return (
    <div className="bg-white shadow-md rounded p-4">
      <div className="mb-4">
        <p>
          <span className="font-semibold">Name:</span>{" "}
          {report.name === "Unknown" ? "N/A" : report.name}
        </p>
        <p>
          <span className="font-semibold">Mobile Phone:</span>{" "}
          {report.mobilePhone === "Unknown" ? "N/A" : report.mobilePhone}
        </p>
        <p>
          <span className="font-semibold">PAN:</span>{" "}
          {report.pan === "Unknown" ? "N/A" : report.pan}
        </p>
        <p>
          <span className="font-semibold">Credit Score:</span>{" "}
          {report.creditScore || "N/A"}
        </p>
      </div>
      <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">Report Summary</h2>
        <p>
          <span className="font-semibold">Total Accounts:</span>{" "}
          {report.reportSummary.totalAccounts}
        </p>
        <p>
          <span className="font-semibold">Active Accounts:</span>{" "}
          {report.reportSummary.activeAccounts}
        </p>
        <p>
          <span className="font-semibold">Closed Accounts:</span>{" "}
          {report.reportSummary.closedAccounts}
        </p>
        <p>
          <span className="font-semibold">Current Balance:</span>{" "}
          ₹{new Intl.NumberFormat("en-IN").format(report.reportSummary.currentBalance)}
        </p>
        <p>
          <span className="font-semibold">Secured Amount:</span>{" "}
          ₹{new Intl.NumberFormat("en-IN").format(report.reportSummary.securedAmount)}
        </p>
        <p>
          <span className="font-semibold">Unsecured Amount:</span>{" "}
          ₹{new Intl.NumberFormat("en-IN").format(report.reportSummary.unsecuredAmount)}
        </p>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-2">Accounts</h2>
        <ul>
          {report.accounts.map((account: { _id: string; bank: string; accountNumber: string; currentBalance: number; overdueAmount: number }) => (
            <li key={account._id} className="border-b border-gray-200 py-2">
              <p>
                <span className="font-semibold">Bank:</span> {account.bank.trim()}
              </p>
              <p>
                <span className="font-semibold">Account Number:</span> {account.accountNumber}
              </p>
              <p>
                <span className="font-semibold">Current Balance:</span>{" "}
                ₹{new Intl.NumberFormat("en-IN").format(account.currentBalance)}
              </p>
              <p>
                <span className="font-semibold">Overdue Amount:</span>{" "}
                ₹{new Intl.NumberFormat("en-IN").format(account.overdueAmount)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReportDetails;
