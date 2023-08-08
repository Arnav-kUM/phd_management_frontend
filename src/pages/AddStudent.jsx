import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import axios from "axios";
import * as XLSX from 'xlsx';


const AddStudent = () => {
  var url = "http://127.0.0.1:8000/api/students";

  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");
  


  function handleAddRow() {
    setRows([...rows, {}]);
  }

  function handleRemoveLastRow() {
    if (rows.length > 0) {
      const updatedRows = [...rows];
      updatedRows.pop();
      setRows(updatedRows);
    }
  }

  function handleInputChange(event, rowIndex, columnKey) {
    const updatedRows = [...rows];
    updatedRows[rowIndex][columnKey] = event.target.value;
    setRows(updatedRows);
  }

  const handleSubmit = async () => {
    try {
      await axios.post(`${url}/new`, rows);
    } catch (error) {
      console.error(error.response.data);
      setError(JSON.stringify(error.response.data));
    }
  };
  
  
  
  useEffect(() => {
    getColumns();
  }, []);

  const getColumns = async () => {
    try {
      let response = await axios.get(`${url}/columns/Student`);
      setColumns(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const renderTableHeader = () => {
    return (
      <tr>
        {columns.map((column) =>
          column !== "Log_Id" && column !== "Student_Id" ? (
            <th key={column} scope="col" className="px-6 py-3">
              {column.replaceAll("_", " ")}
            </th>
          ) : null
        )}
        <th></th>
      </tr>
    );
  };

  const renderTableRows = () => {
    return (
      <>
        {rows.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            className="bg-pantone-blue font-bold text-gray-900"
          >
            {columns.map((column) =>
              column !== "Log_Id" && column !== "Student_Id" ? (
                <td key={column} className="px-6 py-4">
                  {column === "Quantity" ||
                  column === "Price" ||
                  column === "Claim_amount" ||
                  column === "Opening_balance" ||
                  column === "Closing_balance" ||
                  column === "Sanctioned_amount" ? (
                    <input
                      key={`${rowIndex}-${column}`}
                      type="number"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2"
                      min="0"
                      onChange={(event) =>
                        handleInputChange(event, rowIndex, column)
                      }
                    />
                  ) : column === "Opening_balance_on_date" ||
                    column === "Closing_balance_on_date" ||
                    column === "Forwarded_on_date" ? (
                    <input
                      key={`${rowIndex}-${column}`}
                      type="date"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2"
                      onChange={(event) =>
                        handleInputChange(event, rowIndex, column)
                      }
                    />
                  ) : (
                    <input
                      key={`${rowIndex}-${column}`}
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2"
                      onChange={(event) =>
                        handleInputChange(event, rowIndex, column)
                      }
                    />
                  )}
                </td>
              ) : null
            )}
          </tr>
        ))}
      </>
    );
  };


  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    
  
    // Read the XLSX file and convert it to a FormData object
    const reader = new FileReader();
    reader.onload = async () => {
      const data = reader.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
     
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const formData = new FormData();
      formData.append("file", new Blob([JSON.stringify(jsonData)], { type: "application/json" }), `${file.name}.json`);
      console.log(formData)
  
      try {
        // Send the JSON file to the backend
        const response = await axios.post(`${url}/csv/new/`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
  
        // Handle the response from the backend
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    reader.readAsBinaryString(file);
  };
  
  
  return (
    <div>
   <div className="flex justify-end items-center">
  <Header />
  {error && <div className="text-red-500 font-semibold">{error}</div>}
  <label htmlFor="csv-upload" className="inline-block px-4 py-2 m-3 text-sm font-bold text-white bg-pantone-blue rounded-xl cursor-pointer hover:bg-pantone-dark-blue focus:bg-pantone-dark-blue ml-4">
    Upload with CSV
  </label>
  <input
    id="csv-upload"
    type="file"
    accept=".xlsx"
    className="hidden"
    onChange={handleFileUpload}
  />
</div>

    <div className="relative flex overflow-auto shadow-md sm:rounded-lg">
      <form>
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="sticky top-0 text-xs text-white bg-pantone-blue">
            {renderTableHeader()}
          </thead>
          <tbody>{renderTableRows()}</tbody>
        </table>
        <button onClick={handleAddRow}>Add Row</button>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleRemoveLastRow}>Remove</button>
      </form>
    </div>
  </div>
  
  );
};

export default AddStudent;