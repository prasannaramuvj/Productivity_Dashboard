import { useState, useEffect } from "react";
import Card from "../../components/Card";

function Dashboard() {
  // State to hold data
  const [jobs, setJobs] = useState([]);
  const [coding, setCoding] = useState([]);
  const [projects, setProjects] = useState([]);

  // Load data from LocalStorage when component mounts
  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const storedCoding = JSON.parse(localStorage.getItem("coding")) || [];
    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];

    setJobs(storedJobs);
    setCoding(storedCoding);
    setProjects(storedProjects);
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginTop: "20px"
        }}
      >
        <Card title="Jobs Applied" count={jobs.length} />
        <Card title="Problems Solved" count={coding.length} />
        <Card title="Projects Completed" count={projects.length} />
      </div>
    </div>
  );
}

export default Dashboard;