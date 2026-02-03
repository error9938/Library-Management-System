const [selectedStudent, setSelectedStudent] = useState(null);

import React, { useEffect, useState } from "react";
import API from "../api";

export default function StudentHistory() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch(`${API}/users/students`)
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="dashboard-content">
      <h2>Registered Students</h2>

      {students.length === 0 ? (
        <p>No students registered.</p>
      ) : (
        <table className="history-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Roll No</th>
              <th>Department</th>
              <th>Registered On</th>
              <th>Action</th>

            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s._id}>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{s.rollNo || "-"}</td>
                <td>{s.department || "-"}</td>
                <td>
                  {s.createdAt
                    ? new Date(s.createdAt).toLocaleDateString()
                    : "-"}
                </td>
                <td>
  {/* <button
    className="view-btn"
    onClick={() => setSelectedStudent(s)}
  >
    View
  </button> */}
  <button
  className="view-btn"
  onClick={() => {
    console.log("VIEW CLICKED", s);
    setSelectedStudent(s);
  }}
>
  View
</button>

</td>

              </tr>
            ))}
          </tbody>
        </table>

      )}
       {/* ✅ STUDENT DETAILS POPUP */}
      {selectedStudent && (
        <div className="popup-overlay">
          <div className="popup-card">
            <h3>Student Details</h3>

            <p><b>Name:</b> {selectedStudent.name}</p>
            <p><b>Email:</b> {selectedStudent.email}</p>
            <p><b>Roll No:</b> {selectedStudent.rollNo || "-"}</p>
            <p><b>Department:</b> {selectedStudent.department || "-"}</p>
            <p>
              <b>Registered On:</b>{" "}
              {selectedStudent.createdAt
                ? new Date(selectedStudent.createdAt).toLocaleDateString()
                : "-"}
            </p>

            <button
              onClick={() => setSelectedStudent(null)}
              style={{ marginTop: "15px" }}
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
