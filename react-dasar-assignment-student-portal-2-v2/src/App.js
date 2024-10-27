import React, { useEffect, useState } from "react";
import Form from "./components/Form";
import Table from "./components/Table";

const App = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("http://localhost:3001/student");
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Failed to fetch students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  });

  if (loading) {
    return <p>Loading ...</p>;
  }

  return (
    <div>
      <h1>Student Portal</h1>
      <Form setStudents={setStudents} />
      <Table students={students} setStudents={setStudents} />
    </div>
  );
};

export default App;
