import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ReportList = () => {
  const [reports, setReports] = useState<{
    _id: string;
    name: string;
    creditScore: number;
  }[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/reports")
      .then((res) => setReports(res.data))
      .catch((err) => console.error("Error fetching reports:", err));
  }, []);

  return (
    <div className="bg-white shadow-md rounded p-4">
      <ul>
        {reports.map((report) => (
          <li key={report._id} className="border-b border-gray-200 py-2">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <span className="font-semibold">Name: </span>
                {report.name === "Unknown" ? "N/A" : report.name}
              </div>
              <div>
                <span className="font-semibold">Credit Score: </span>
                {report.creditScore}
              </div>
              <div>
                {/* Use report._id directly */}
                <Link
                  to={`/reports/${report._id}`}
                  className="text-blue-500 hover:underline"
                >
                  View Details
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReportList;
