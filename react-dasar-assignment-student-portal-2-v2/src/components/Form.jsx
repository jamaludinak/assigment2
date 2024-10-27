import React, { useState } from "react";

const Form = ({ setStudents }) => {
  const [fullname, setFullname] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("Male");
  const [programStudy, setProgramStudy] = useState("");

  const namaFakultas = {
    Ekonomi: "Fakultas Ekonomi",
    Manajemen: "Fakultas Ekonomi",
    Akuntansi: "Fakultas Ekonomi",
    "Administrasi Publik": "Fakultas Ilmu Sosial dan Politik",
    "Administrasi Bisnis": "Fakultas Ilmu Sosial dan Politik",
    "Hubungan Internasional": "Fakultas Ilmu Sosial dan Politik",
    "Teknik Sipil": "Fakultas Teknik",
    Arsitektur: "Fakultas Teknik",
    Matematika: "Fakultas Teknologi Informasi dan Sains",
    Fisika: "Fakultas Teknologi Informasi dan Sains",
    Informatika: "Fakultas Teknologi Informasi dan Sains",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const faculty = namaFakultas[programStudy] || "";

    try {
      const response = await fetch("http://localhost:3001/student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname,
          birthDate,
          gender,
          faculty,
          programStudy,
        }),
      });

      const addedStudent = await response.json();
      setStudents((prevStudents) => [...prevStudents, addedStudent]);

    } catch (error) {
      console.error("Failed to add student:", error);
    }
  };

  // CSS Styles
  const formStyle = {
    display: "flex",
    flexDirection: "column",
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  };

  const labelStyle = {
    marginBottom: "10px",
    fontWeight: "bold",
  };

  const inputStyle = {
    padding: "8px",
    marginBottom: "20px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    width: "100%",
  };

  const buttonStyle = {
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  return (
    <form id="form-student" onSubmit={handleSubmit} style={formStyle}>
      <label htmlFor="input-name" style={labelStyle}>
        Fullname
        <input
          type="text"
          id="input-name"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          data-testid="name"
          required
          style={inputStyle}
        />
      </label>

      <div>
        <label htmlFor="input-date" style={labelStyle}>
          Birth Date
          <input
            type="date"
            id="input-date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            data-testid="date"
            required
            style={inputStyle}
          />
        </label>

        <label htmlFor="input-gender" style={labelStyle}>
          Gender
          <select
            id="input-gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            data-testid="gender"
            required
            style={inputStyle}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </label>
      </div>

      <div>
        <label htmlFor="input-prody" style={labelStyle}>
          Program Study
          <select
            id="input-prody"
            value={programStudy}
            onChange={(e) => setProgramStudy(e.target.value)}
            data-testid="prody"
            required
            style={inputStyle}
          >
            {Object.keys(namaFakultas).map((study) => (
              <option key={study} value={study}>
                {study}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <button
          type="submit"
          id="add-btn"
          data-testid="submit"
          style={buttonStyle}
          onClick={handleSubmit}
        >
          Add student
        </button>
      </div>
    </form>
  );
};

export default Form;
