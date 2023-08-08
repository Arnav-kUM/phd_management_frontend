import React, { useEffect, useState } from "react";
import axios from "axios";

const LogTable = ({ student_id, showAddNewLog, onCancelAddLog }) => {
  const url = "http://127.0.0.1:8000/api/students";

  const [logs, setLogs] = useState([]);
  const [columns, setColumns] = useState([]);
  const [editingLog, setEditingLog] = useState(null);
  const [deletingLog, setDeletingLog] = useState(null);
  const [newLog, setNewLog] = useState({});

  useEffect(() => {
    getColumns();
    getLogs();
  }, [student_id]);

  const getLogs = async () => {
    try {
      let response = await axios.get(`${url}/${student_id}/logbook`);
      setLogs(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (row) => {
    setEditingLog(row);
  };

  const handleDelete = (row) => {
    setDeletingLog(row);
  };

  const handleCancelDelete = () => {
    setDeletingLog(null);
  };

  const handleCancelAdd = () => {
    setNewLog(null);
    onCancelAddLog();
  };

  const handleAddLog = async () => {
    try {
      await axios.post(`${url}/${student_id}/logbook`, newLog);
      setNewLog(null);
      onCancelAddLog();
      getLogs();
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${url}/log/${deletingLog.Log_Id}`);
      setDeletingLog(null);
      getLogs();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelEdit = () => {
    setEditingLog(null);
  };

  const handleSave = async (row) => {
    try {
      await axios.put(`${url}/log/${row.Log_Id}`, row);
      setEditingLog(null);
      getLogs();
    } catch (error) {
      console.error(error);
    }
  };

  const getColumns = async () => {
    try {
      let response = await axios.get(`${url}/columns/Logbook`);
      setColumns(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const renderTableHeader = () => {
    return (
      <tr>
        {columns.map((column) =>
          column != "Log_Id" && column != "Student_Id" ? (
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
        {showAddNewLog && (
          <tr className="bg-pantone-blue font-bold text-gray-900">
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
                      type="number"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2"
                      min="0"
                      onChange={(event) =>
                        setNewLog({
                          ...newLog,
                          [column]: !event.target.value
                            ? null
                            : event.target.value,
                        })
                      }
                    />
                  ) : column === "Opening_balance_on_date" ||
                    column === "Closing_balance_on_date" ||
                    column === "Forwarded_on_date" ? (
                    <input
                      type="date"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2"
                      onChange={(event) =>
                        setNewLog({
                          ...newLog,
                          [column]: event.target.value,
                        })
                      }
                    />
                  ) : (
                    <input
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2"
                      onChange={(event) =>
                        setNewLog({
                          ...newLog,
                          [column]: event.target.value,
                        })
                      }
                    />
                  )}
                </td>
              ) : null
            )}
            <td className="flex text-base place-content-center px-6 py-4 space-x-3">
              <button
                type="button"
                className="font-medium hover:text-green-700 transition-colors hover:font-bold hover:underline"
                onClick={handleAddLog}
              >
                Add
              </button>
              <button
                type="button"
                className="font-medium hover:text-red-600 transition-colors hover:font-bold hover:underline"
                onClick={handleCancelAdd}
              >
                Cancel
              </button>
            </td>
          </tr>
        )}
        {logs.map((item) => (
          <tr
            key={item.Log_Id}
            className={
              editingLog && editingLog.Log_Id === item.Log_Id
                ? "bg-pantone-blue font-bold text-gray-900"
                : "bg-white font-medium hover:bg-pantone-cool-gray-9 text-gray-900 border-b hover:bg-gray-50"
            }
          >
            {columns.map((column) =>
              column != "Log_Id" && column != "Student_Id" ? (
                <td key={column} className="px-6 py-4">
                  {editingLog && editingLog.Log_Id === item.Log_Id ? (
                    column === "Quantity" ||
                    column === "Price" ||
                    column === "Claim_amount" ||
                    column === "Opening_balance" ||
                    column === "Closing_balance" ||
                    column === "Sanctioned_amount" ? (
                      <input
                        type="number"
                        value={!editingLog[column] ? "" : editingLog[column]}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2"
                        min="0"
                        onChange={(event) =>
                          setEditingLog({
                            ...editingLog,
                            [column]: !event.target.value
                              ? null
                              : event.target.value,
                          })
                        }
                      />
                    ) : column === "Opening_balance_on_date" ||
                      column === "Closing_balance_on_date" ||
                      column === "Forwarded_on_date" ? (
                      <input
                        type="date"
                        value={!editingLog[column] ? "" : editingLog[column]}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2"
                        onChange={(event) =>
                          setEditingLog({
                            ...editingLog,
                            [column]: event.target.value,
                          })
                        }
                      />
                    ) : (
                      <input
                        type="text"
                        value={!editingLog[column] ? "" : editingLog[column]}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2"
                        onChange={(event) =>
                          setEditingLog({
                            ...editingLog,
                            [column]: event.target.value,
                          })
                        }
                      />
                    )
                  ) : item[column] === null || item[column] === "" ? (
                    "-"
                  ) : (
                    item[column]
                  )}
                </td>
              ) : null
            )}
            <td className="flex text-base place-content-center px-6 py-4 space-x-3">
              {deletingLog && deletingLog.Log_Id === item.Log_Id ? (
                <>
                  <button
                    className="font-medium text-red-600 hover:font-bold transition-colors hover:text-red-800 hover:underline"
                    onClick={handleConfirmDelete}
                  >
                    Confirm Delete
                  </button>
                  <button
                    className="font-medium hover:text-pantone-blue transition-colors hover:font-bold hover:underline"
                    onClick={handleCancelDelete}
                  >
                    Cancel
                  </button>
                </>
              ) : editingLog && editingLog.Log_Id === item.Log_Id ? (
                <>
                  <button
                    className="font-medium hover:text-green-700 transition-colors hover:font-bold hover:underline"
                    onClick={() => handleSave(editingLog)}
                  >
                    Save
                  </button>
                  <button
                    className="font-medium hover:text-red-600 transition-colors hover:font-bold hover:underline"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="font-medium hover:font-bold transition-colors hover:text-pantone-blue hover:underline"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="font-medium text-red-600 hover:font-bold transition-colors hover:text-red-800 hover:underline"
                    onClick={() => handleDelete(item)}
                  >
                    Delete
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
      </>
    );
  };

  return (
    <div className="relative flex overflow-auto shadow-md sm:rounded-lg">
      {(logs === null || logs.length == 0) && !showAddNewLog ? (
        <div className="flex justify-center item-center">
          <img className="" src="/no_results.png" alt="No Results Found" />
        </div>
      ) : (
        <div>
          <div className="mb-1 mx-4 text-gray-600 text-sm">
            Showing {logs.length} results
          </div>
          <table
            id="log-table"
            className="w-full text-sm text-left text-gray-500"
          >
            <thead className="sticky top-0 text-xs text-white bg-pantone-blue">
              {renderTableHeader()}
            </thead>
            <tbody>{renderTableRows()}</tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LogTable;
