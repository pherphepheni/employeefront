import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";

const ListEmployees = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getAllEmployees();
  }, []);

  const getAllEmployees = () => {
    EmployeeService.getAllEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteEmployee = (employeeId) => {
    EmployeeService.deleteEmployee(employeeId)
      .then((response) => {
        getAllEmployees();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadedEmployees = () => {
    if (employees) {
      return (
        <div>
          <table className="table table-bordered table-striped">
            <thead>
              <th>Employee Id</th>
              <th>Employee First Name</th>
              <th>Employee Last Name</th>
              <th>Employee Email</th>
              <th>Actions</th>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.email}</td>
                  <td>
                    <Link
                      to={`/edit-employee/${employee.id}`}
                      className="btn btn-info"
                    >
                      Update
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteEmployee(employee.id)}
                      style={{ marginLeft: "10px" }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return "no employees loaded";
    }
  };

  return (
    <div className="container">
      <h2 className="text-center">List Employees</h2>
      <Link
        to={`/edit-employee/:${employees.id}`}
        className="btn btn-primary mb-2"
      >
        Add Employee
      </Link>
      {loadedEmployees()}
    </div>
  );
};

export default ListEmployees;
