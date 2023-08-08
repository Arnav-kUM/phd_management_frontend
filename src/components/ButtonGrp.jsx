import React, { useState, useEffect } from "react";
import axios from "axios";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ReactHTMLTableToExcel from "react-html-table-to-excel-3";

function ButtonGrp({ onFilter, onSearch, searchtext }) {
  const url = "http://127.0.0.1:8000/api/students";
  const [showFilterList, setShowFilterList] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [batches, setBatches] = useState([]);
  const [clearing, setclearing] = useState(false);

  const toggleFilterList = () => setShowFilterList(!showFilterList);

  useEffect(() => {
    getBatches();
  }, [showFilterList]);

  useEffect(() => {
    // This effect will run every time the clearing state changes
    // and update the selectedFilters state accordingly
    if (clearing) {
      const newFilters = { ...selectedFilters };
      Object.keys(selectedFilters).forEach((filterName) => {
        if (selectedFilters[filterName] !== "") {
          newFilters[filterName] = "";
        }
      });
      setSelectedFilters(newFilters);

      setclearing(false);
    }
  }, [clearing]);

  const getBatches = async () => {
    try {
      let response = await axios.get(`${url}/fields/Student/Batch`);
      setBatches(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFilter = () => {
    // Check if any filter is selected or all selected filters have empty strings
    const noFiltersSelected = Object.values(selectedFilters).every(
      (value) => value === ""
    );
    if (noFiltersSelected) {
      onFilter([]);
      setSelectedFilters([]);
    } else {
      onFilter(selectedFilters);
    }

    toggleFilterList();
  };

  const handleClear = () => {
    setclearing(true);
  };

  const handleSelectFilter = (filterName, value) => {
    setSelectedFilters((prevFilters) => {
      const newFilters = { ...prevFilters };

      if (value.length === 0) {
        delete newFilters[filterName];
      } else {
        newFilters[filterName] = value;
      }

      return newFilters;
    });
  };

  const filterList = [
    { name: "Gender", type: "select", options: ["Male", "Female", "Other"] },
    {
      name: "Department",
      type: "checkbox",
      options: ["CSE", "CB", "ECE", "HCD", "Maths", "SSH"],
    },
    { name: "Region", type: "select", options: ["Delhi", "Outside Delhi"] },
    {
      name: "Student status",
      type: "checkbox",
      options: [
        "Terminated",
        "Completed",
        "Shifted",
        "Semester Leave",
        "Active",
      ],
    },
    {
      name: "Source of funding",
      type: "select",
      options: ["Sponsored", "Institute", "Other"],
    },
    { name: "Batch", type: "checkbox", options: batches },
  ];

  return (
    <div className="flex justify-between mx-4 mt-6 mb-4">
      <div>
        <a href="/#/add_students">
          <button className="group items-center justify-between rounded-full border border-pantone-blue bg-pantone-blue px-5 py-3 transition-colors hover:bg-pantone-cool-gray-9 focus:outline-none focus:ring">
            <PersonAddAlt1Icon style={{ color: "white" }} />
            <span className="ml-2 font-medium text-white transition-colors hidden lg:inline-block">
              Add New Students
            </span>
          </button>
        </a>
      </div>
      <div className="relative grow mx-4">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-pantone-blue"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="search"
          className="block w-full h-full p-4 pl-10 text-sm text-gray-900 border border-pantone-blue rounded-full bg-white"
          placeholder="Search by ID, Name or Email..."
          value={searchtext}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <div className="flex">
        <button
          className="group mx-2 items-center justify-between rounded-full border border-current px-5 py-3 text-pantone-blue transition-colors hover:bg-pantone-blue focus:outline-none focus:ring active:bg-pantone-blue"
          onClick={toggleFilterList}
        >
          <span className="font-medium transition-colors group-hover:text-white">
            <FilterAltIcon />
            <span className="hidden lg:inline-block ml-2">Filter</span>
          </span>
        </button>
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          table="database-table"
          className="group mx-2 items-center justify-between rounded-full border border-current px-5 py-3 text-pantone-blue transition-colors hover:bg-pantone-blue focus:outline-none focus:ring active:bg-pantone-blue"
          filename="database"
          filetype="xls"
          sheet="database"
        >
          <span className="font-medium transition-colors group-hover:text-white">
            <ArrowDownwardIcon />
            <span className="hidden lg:inline-block ml-2">Download</span>
          </span>
        </ReactHTMLTableToExcel>
      </div>
      {showFilterList && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-gray-500 opacity-75"></div>

            {/* Modal Content */}
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-auto relative z-10">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Filters</h3>
                <button
                  className="text-gray-600 hover:text-gray-900 focus:outline-none"
                  onClick={() => setShowFilterList(false)}
                >
                  <span className="sr-only">Close modal</span>
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Modal Body */}
              <div className="space-y-2">
                {/* Filter Options */}
                {filterList.map((filter) => (
                  <div key={filter.name} className="my-4">
                    <h3 className="font-semibold mb-2">{filter.name}</h3>
                    {filter.type === "checkbox" ? (
                      <div>
                        {filter.options.map((option) => (
                          <label key={option} className="block">
                            <input
                              type="checkbox"
                              value={option}
                              checked={selectedFilters[filter.name]?.includes(
                                option
                              )}
                              onChange={(e) =>
                                handleSelectFilter(
                                  filter.name,
                                  Array.from(
                                    e.target
                                      .closest("div")
                                      .querySelectorAll(
                                        "input[type=checkbox]:checked"
                                      ),
                                    (input) => input.value
                                  )
                                )
                              }
                            />
                            <span className="ml-2">{option}</span>
                          </label>
                        ))}
                      </div>
                    ) : (
                      <div>
                        <select
                          className="border border-gray-300 rounded px-2 "
                          value={selectedFilters[filter.name]}
                          onChange={(e) =>
                            handleSelectFilter(filter.name, e.target.value)
                          }
                        >
                          <option value="">All</option>
                          {filter.options.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                ))}

                <div className="flex justify-end">
                  <button
                    className="bg-pantone-blue text-white py-2 px-4 mx-2 rounded hover:bg-opacity-90 focus:outline-none focus:ring"
                    onClick={() => handleFilter()}
                  >
                    Apply Filters
                  </button>
                  <button
                    className="bg-pantone-blue text-white py-2 px-4 mx-2 rounded hover:bg-opacity-90 focus:outline-none focus:ring"
                    onClick={() => handleClear()}
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ButtonGrp;
