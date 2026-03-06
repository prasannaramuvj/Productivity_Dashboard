// CodingTracker.jsx
import React, { useEffect, useState } from "react";
import "./CodingTracker.css";
import CodingChart from "../../components/CodingChart";

const CodingTracker = () => {
  const [problems, setProblems] = useState(() => {
    const saved = localStorage.getItem("coding");
    return saved ? JSON.parse(saved) : [];
  });

  const [problemName, setProblemName] = useState("");
  const [problemType, setProblemType] = useState(""); // e.g., Array, DP
  const [platform, setPlatform] = useState(""); // LeetCode, HackerRank
  const [status, setStatus] = useState(""); // Completed, In Progress
  const [dateStarted, setDateStarted] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [dateFinished, setDateFinished] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [search, setSearch] = useState("");

  // Add / Edit problem
  const addProblem = () => {
    const newProblem = {
      problemName,
      problemType,
      platform,
      status,
      dateStarted,
      dateFinished: status === "Completed" ? new Date().toISOString().slice(0, 10) : dateFinished
    };

    if (editIndex !== null) {
      const updated = [...problems];
      updated[editIndex] = newProblem;
      setProblems(updated);
      setEditIndex(null);
    } else {
      setProblems([...problems, newProblem]);
    }

    // Clear form
    setProblemName("");
    setProblemType("");
    setPlatform("");
    setStatus("");
    setDateStarted(new Date().toISOString().slice(0, 10));
    setDateFinished("");
  };

  // Delete problem
  const deleteProblem = (index) => {
    const updated = problems.filter((_, i) => i !== index);
    setProblems(updated);
  };

  // Start editing
  const startEdit = (index) => {
    const p = problems[index];
    setProblemName(p.problemName);
    setProblemType(p.problemType);
    setPlatform(p.platform);
    setStatus(p.status);
    setDateStarted(p.dateStarted);
    setDateFinished(p.dateFinished);
    setEditIndex(index);
  };

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("coding", JSON.stringify(problems));
  }, [problems]);

  // Filtered search
  const filteredProblems = problems.filter((p) => {
    const text = search.toLowerCase();
    return (
      (p.problemName && p.problemName.toLowerCase().includes(text)) ||
      (p.problemType && p.problemType.toLowerCase().includes(text)) ||
      (p.platform && p.platform.toLowerCase().includes(text)) ||
      (p.status && p.status.toLowerCase().includes(text))
    );
  });

  // Stats
  const total = problems.length;
  const completed = problems.filter((p) => p.status === "Completed").length;
  const inProgress = problems.filter((p) => p.status === "In Progress").length;

  return (
    <div className="job-track">
      <div className="middle">
        <div className="top">
        <h1>Coding Tracker</h1>

        <div className="filter">
          <input
            type="text"
            placeholder="Search by problem, type, platform, status..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        </div>

        <div className="inputs">
          <input
            type="text"
            placeholder="Problem Name"
            value={problemName}
            onChange={(e) => setProblemName(e.target.value)}
          />

          <select
            value={problemType}
            onChange={(e) => setProblemType(e.target.value)}
          >
            <option value="">Problem Type</option>
            <option value="Array">Array</option>
            <option value="DP">DP</option>
            <option value="Graph">Graph</option>
            <option value="String">String</option>
            <option value="Tree">Tree</option>
          </select>

          <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
            <option value="">Platform</option>
            <option value="LeetCode">LeetCode</option>
            <option value="HackerRank">HackerRank</option>
            <option value="Codeforces">Codeforces</option>
            <option value="GeeksForGeeks">GeeksForGeeks</option>
          </select>

          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Status</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <input
            type="date"
            value={dateStarted}
            onChange={(e) => setDateStarted(e.target.value)}
          />

          <button onClick={addProblem}>{editIndex !== null ? "Edit" : "Add"}</button>
        </div>

        <div className="job-list">
          {filteredProblems.map((p, index) => (
            <div key={index} className="job-card">
              <p><strong>Problem:</strong> {p.problemName}</p>
              <p><strong>Type:</strong> {p.problemType}</p>
              <p><strong>Platform:</strong> {p.platform}</p>
              <p><strong>Status:</strong> {p.status}</p>
              <p><strong>Started:</strong> {p.dateStarted}</p>
              <p><strong>Finished:</strong> {p.dateFinished}</p>

              <div className="btn-grp">
                <button onClick={() => deleteProblem(index)} className="del">Delete</button>
                <button onClick={() => startEdit(index)} className="edit">Edit</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="right">
        <CodingChart problems={problems} />
        <div className="stats">
          <p>Total: {total}</p>
          <p>Completed: {completed}</p>
          <p>In Progress: {inProgress}</p>
        </div>
      </div>
    </div>
  );
};

export default CodingTracker;