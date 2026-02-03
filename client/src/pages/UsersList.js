import React, { useEffect, useState } from "react";
import API from "../api";
import "./users.css";

export default function UsersList() {
  const [students, setStudents] = useState([]);

  // add student states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");

  // 🔹 LOAD STUDENTS (FIXED ENDPOINT)
  const loadStudents = () => {
    fetch(`${API}/users/students`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch students");
        return res.json();
      })
      .then((data) => setStudents(data))
      .catch((err) => {
        console.error(err);
        setStudents([]);
      });
  };

  useEffect(() => {
    loadStudents();
  }, []);

  // ➕ ADD STUDENT (FIXED ENDPOINT)
  const addStudent = async () => {
    if (!name || !email || !studentId) {
      alert("Fill all fields");
      return;
    }

    await fetch(`${API}/users/student`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        student_id: studentId,
      }),
    });

    setName("");
    setEmail("");
    setStudentId("");
    loadStudents();
  };

  // ❌ REMOVE STUDENT (FIXED ENDPOINT)
  const removeStudent = async (id) => {
    if (!window.confirm("Remove this student?")) return;

    await fetch(`${API}/users/student/${id}`, {
      method: "DELETE",
    });

    loadStudents();
  };

  return (
    <div className="page">
      <h1>👥 Registered Students</h1>

      {/* ADD STUDENT CARD */}
      <div className="card">
        <h3>Add Student</h3>

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Student ID (STU-006)"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />

        <button onClick={addStudent}>➕ Add Student</button>
      </div>

      {/* STUDENT TABLE */}
      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s) => (
              <tr key={s.id}>
                <td>{s.student_id}</td>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>
                  <button onClick={() => removeStudent(s.id)}>
                    ❌ Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
