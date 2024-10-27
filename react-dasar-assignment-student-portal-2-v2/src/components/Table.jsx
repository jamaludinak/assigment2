import React from "react";

const Table = ({ students, setStudents }) => {
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3001/student/${id}`, {
        method: "DELETE",
      });

      setStudents((prevStudents) =>
        prevStudents.filter((student) => student.id !== id)
      );
    } catch (error) {
      console.error("Failed to delete student:", error);
    }
  };

  // CSS Styles
  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  };

  const thStyle = {
    backgroundColor: "#f4f4f4",
    padding: "10px",
    borderBottom: "2px solid #ddd",
  };

  const tdStyle = {
    padding: "8px",
    borderBottom: "1px solid #ddd",
    textAlign: "center",
  };

  const buttonStyle = {
    padding: "5px 10px",
    margin: "0 5px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
  };

  const editButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#4CAF50",
    color: "white",
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#f44336",
    color: "white",
  };

  return (
    <table id="table-student" style={tableStyle}>
      <thead>
        <tr>
          <th style={thStyle}>No</th>
          <th style={thStyle}>Full Name</th>
          <th style={thStyle}>Birth Date</th>
          <th style={thStyle}>Gender</th>
          <th style={thStyle}>Faculty</th>
          <th style={thStyle}>Program Study</th>
          <th style={thStyle}>Option</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student, index) => (
          <tr key={student.id} className="student-data-row">
            <td style={tdStyle}>{index + 1}</td>
            <td style={tdStyle}>{student.fullname}</td>
            <td style={tdStyle}>{student.birthDate}</td>
            <td style={tdStyle}>{student.gender}</td>
            <td style={tdStyle}>{student.faculty}</td>
            <td style={tdStyle}>{student.programStudy}</td>
            <td style={tdStyle}>
              <button style={editButtonStyle}>Edit</button>
              <button
                style={deleteButtonStyle}
                data-testid={`delete-${student.id}`}
                onClick={() => handleDelete(student.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
