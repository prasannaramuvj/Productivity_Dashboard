import { useState, useEffect } from "react";
import Card from "../../components/Card/Card";

function Dashboard() {
  // State to hold data
  const [jobs, setJobs] = useState([]);
  const [coding, setCoding] = useState([]);
  const [projects, setProjects] = useState([]);
  const [task, setTask] = useState([])

  // Load data from LocalStorage when component mounts
  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const storedCoding = JSON.parse(localStorage.getItem("coding")) || [];
    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    setJobs(storedJobs);
    setCoding(storedCoding);
    setProjects(storedProjects);
    setTask(tasks)
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard overview</h1>

      <div className="dashboard-grid">
        <Card title="Jobs Applied" count={jobs.length} />
        <Card title="Problems Solved" count={coding.length} />
        <Card title="Projects Completed" count={projects.length} />
        <Card title="Task count" count={task.length} />
      </div>
    </div>
  );
}

export default Dashboard;