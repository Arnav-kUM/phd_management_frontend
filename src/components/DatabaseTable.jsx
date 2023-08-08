import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSort } from "react-icons/fa";
import useDebounce from "../hooks/use_debounce";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

const DatabaseTable = ({ filter, search }) => {
  const url = "http://127.0.0.1:8000/api/students";

  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const debounce = useDebounce(search, 500);
  const [editingRow, setEditingRow] = useState(null);
  const [sortField, setSortField] = useState("Id");
  const [sortOrder, setSortOrder] = useState(1);

  useEffect(() => {
    getColumns();
    getStudents();
  }, [filter, debounce]);

  useEffect(() => {
    getColumns();
  }, []);

  const getStudents = async () => {
    try {
      let response = await axios.post(`${url}?search=${search}`, filter);
      setData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getColumns = async () => {
    try {
      let response = await axios.get(`${url}/columns/Student`);
      setColumns(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortField !== null) {
      const fieldA = a[sortField];
      const fieldB = b[sortField];
      if (fieldA < fieldB) {
        return -1 * sortOrder;
      }
      if (fieldA > fieldB) {
        return 1 * sortOrder;
      }
    }
    return 0;
  });

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder * -1);
    } else {
      setSortField(field);
      setSortOrder(1);
    }
  };

  const handleEdit = (row) => {
    setEditingRow(row);
  };

  const handleCancel = () => {
    setEditingRow(null);
  };

  const handleSave = async (row) => {
    try {
      await axios.put(`${url}/${row.Id}`, row);
      setEditingRow(null);
      getStudents();
    } catch (error) {
      console.error(error);
    }
  };

  const renderTableHeader = () => {
    return (
      <tr>
        {columns.map((column) => (
          <th key={column} scope="col" className="px-6 py-3">
            <button className="flex" onClick={() => toggleSort(column)}>
              {column.replaceAll("_", " ")}
              <FaSort className="ml-2 mt-0.5" />
            </button>
          </th>
        ))}
        <th></th>
      </tr>
    );
  };

  const renderTableRows = () => {
    return sortedData.map((item) => (
      <tr
        key={item.Id}
        className={
          editingRow && editingRow.Id === item.Id
            ? "bg-pantone-blue font-bold text-gray-900"
            : "bg-white font-medium hover:bg-pantone-cool-gray-9 text-gray-900 border-b hover:bg-gray-50"
        }
      >
        {columns.map((column) => (
          <td key={column} className="px-6 py-4">
            {editingRow && editingRow.Id === item.Id ? (
              column === "Email_Id" ? (
                <input
                  type="email"
                  value={editingRow.Email_Id}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2"
                  onChange={(event) =>
                    setEditingRow({
                      ...editingRow,
                      Email_Id: event.target.value,
                    })
                  }
                />
              ) : column === "Gender" ? (
                <select
                  value={editingRow.Gender}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2"
                  onChange={(event) =>
                    setEditingRow({
                      ...editingRow,
                      Gender: event.target.value,
                    })
                  }
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : column === "Joining_date" ? (
                <input
                  type="date"
                  value={!editingRow[column] ? "" : editingRow[column]}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2"
                  onChange={(event) =>
                    setEditingRow({
                      ...editingRow,
                      [column]: event.target.value,
                    })
                  }
                />
              ) : column === "Year_of_leaving" ? (
                <input
                  type="number"
                  value={!editingRow[column] ? "" : editingRow[column]}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2"
                  min="2000"
                  max="9999"
                  onChange={(event) =>
                    setEditingRow({
                      ...editingRow,
                      [column]: !event.target.value ? null : event.target.value,
                    })
                  }
                />
              ) : column === "Student_status" ? (
                <select
                  value={editingRow.Student_status}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2"
                  onChange={(event) =>
                    setEditingRow({
                      ...editingRow,
                      Student_status: event.target.value,
                    })
                  }
                >
                  <option value="Completed">Completed</option>
                  <option value="Terminated">Terminated</option>
                  <option value="Shifted">Shifted</option>
                  <option value="Semester Leave">Semester Leave</option>
                  <option value="Active">Active</option>
                </select>
              ) : column === "Id" ? (
                item[column] === null || item[column] === "" ? (
                  "-"
                ) : (
                  item[column]
                )
              ) : column === "Contingency_points" ? (
                <input
                  type="number"
                  value={!editingRow[column] ? "" : editingRow[column]}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2"
                  min="0"
                  onChange={(event) =>
                    setEditingRow({
                      ...editingRow,
                      [column]: !event.target.value ? null : event.target.value,
                    })
                  }
                />
              ) : column === "Department" ? (
                <select
                  value={editingRow.Department}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2"
                  onChange={(event) =>
                    setEditingRow({
                      ...editingRow,
                      Department: event.target.value,
                    })
                  }
                >
                  <option value="CB">CB</option>
                  <option value="CSE">CSE</option>
                  <option value="ECE">ECE</option>
                  <option value="Maths">Maths</option>
                  <option value="HCD">HCD</option>
                  <option value="SSH">SSH</option>
                </select>
              ) : (
                <input
                  type="text"
                  value={!editingRow[column] ? "" : editingRow[column]}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2"
                  onChange={(event) =>
                    setEditingRow({
                      ...editingRow,
                      [column]: event.target.value,
                    })
                  }
                />
              )
            ) : item[column] === null || item[column] === "" ? (
              "-"
            ) : column === "Contingency_points" ? (
              <div className="justify-around flex">
                <div>{item[column]}</div>
                <a href={`#/logbook/${item.Id}`}>
                  <LibraryBooksIcon />
                </a>
              </div>
            ) : (
              item[column]
            )}
          </td>
        ))}
        <td className="flex text-base place-content-center px-6 py-4 space-x-3">
          {editingRow && editingRow.Id === item.Id ? (
            <>
              <button
                className="font-medium hover:text-green-700 transition-colors hover:font-bold hover:underline"
                onClick={() => handleSave(editingRow)}
              >
                Save
              </button>
              <button
                className="font-medium hover:text-red-600 transition-colors hover:font-bold hover:underline"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className="font-medium hover:font-bold transition-colors hover:text-pantone-blue hover:underline"
              onClick={() => handleEdit(item)}
            >
              Edit
            </button>
          )}
        </td>
      </tr>
    ));
  };

  return (
    <div className="relative flex overflow-auto shadow-md sm:rounded-lg">
      {sortedData === null || sortedData.length == 0 ? (
        <div className="flex justify-center item-center">
          <img className="" src="/no_results.png" alt="No Results Found" />
        </div>
      ) : (
        <div>
          <div className="my-1 mx-4 text-gray-600 text-sm">
            Showing {sortedData.length} results
          </div>
          <table
            id="database-table"
            className="w-full text-sm text-left text-gray-500"
          >
            <thead className="sticky top-0 text-xs text-white uppercase bg-pantone-blue">
              {renderTableHeader()}
            </thead>
            <tbody>{renderTableRows()}</tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DatabaseTable;
