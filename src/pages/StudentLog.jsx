import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import LogTable from "../components/LogTable";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import ReactHTMLTableToExcel from "react-html-table-to-excel-3";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

function StudentLog(props) {
  const { id } = useParams();
  const url = "http://127.0.0.1:8000/api/students";

  const [data, setData] = useState([]);
  const [showAddNewLog, setShowAddNewLog] = useState(false);

  const handleAddNewLog = () => {
    setShowAddNewLog(true);
  };

  const handleCancelAddLog = () => {
    setShowAddNewLog(false);
  };

  useEffect(() => {
    getStudent();
  }, []);

  const getStudent = async () => {
    try {
      let response = await axios.get(`${url}/${id}`);
      setData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="sm:flex text-xl font-bold text-pantone-blue justify-around">
        <div>Student ID: {data.Id}</div>
        <div>Name: {data.Name}</div>
        <div>Email ID: {data.Email_Id}</div>
        <div>Batch: {data.Batch}</div>
        <div>Contingency Points Balance: {data.Contingency_points}</div>
      </div>
      <div className="justify-between flex m-5">
        <div>
          <button
            onClick={handleAddNewLog}
            className="group items-center justify-between rounded-full border border-pantone-blue bg-pantone-blue px-5 py-3 transition-colors hover:bg-pantone-cool-gray-9 focus:outline-none focus:ring"
          >
            <LibraryAddIcon style={{ color: "white" }} />
            <span className="ml-2 font-medium text-white transition-colors hidden lg:inline-block">
              Add New Log
            </span>
          </button>
        </div>
        <div>
          <ReactHTMLTableToExcel
            id="test-table-xls-button"
            table="log-table"
            className="group mx-2 items-center justify-between rounded-full border border-current px-5 py-3 text-pantone-blue transition-colors hover:bg-pantone-blue focus:outline-none focus:ring active:bg-pantone-blue"
            filename="log"
            filetype="xls"
            sheet="log"
          >
            <span className="font-medium transition-colors group-hover:text-white">
              <ArrowDownwardIcon />
              <span className="hidden lg:inline-block ml-2">Download</span>
            </span>
          </ReactHTMLTableToExcel>
        </div>
      </div>
      <LogTable
        student_id={id}
        showAddNewLog={showAddNewLog}
        onCancelAddLog={handleCancelAddLog}
      />
    </div>
  );
}

export default StudentLog;
