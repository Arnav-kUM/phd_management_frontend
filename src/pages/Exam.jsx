import React from "react";
import Header from "../components/Header";
import InputAllocation from "../components/InputAllocation";
import DatabaseTable from "../components/DatabaseTable";
import { useState } from "react";

function Exam() {
  const [filters, setFilters] = useState([]);
  const [searchTxt, setSearchTxt] = useState("");

  function handleFilterSelection(selectedFilters) {
    setFilters(selectedFilters);
  }

  function handleSearchTxt(inputTxt) {
    setSearchTxt(inputTxt);
  }

  return (
    <div>
      <div className="Database flex flex-col h-screen">
      <Header />
      <InputAllocation/>
      <div className="mt-4">
      <DatabaseTable filter={filters} search={searchTxt} />
      </div>
    </div>
    </div>
  );
}

export default Exam;
