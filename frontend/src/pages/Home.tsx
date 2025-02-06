import React from "react";
import ReportList from "../components/ReportList";

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center my-4">CreditSea Reports</h1>
      <ReportList />
    </div>
  );
};

export default Home;
