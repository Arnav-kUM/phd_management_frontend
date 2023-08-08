import { useState } from "react";
import ButtonGrp from "../components/ButtonGrp";
import DatabaseTable from "../components/DatabaseTable";
import Header from "../components/Header";

function Database() {
  const [filters, setFilters] = useState([]);
  const [searchTxt, setSearchTxt] = useState("");

  function handleFilterSelection(selectedFilters) {
    setFilters(selectedFilters);
  }

  function handleSearchTxt(inputTxt) {
    setSearchTxt(inputTxt);
  }

  return (
    <div className="Database flex flex-col h-screen">
      <Header />
      <ButtonGrp
        onFilter={handleFilterSelection}
        onSearch={handleSearchTxt}
        searchtext={searchTxt}
      />
      <DatabaseTable filter={filters} search={searchTxt} />
    </div>
  );
}

export default Database;
