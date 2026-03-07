// ProjectTracker.jsx
import React, { useState, useEffect } from "react";
import "./ProjectTracker.css";

const ProjectTracker = () => {
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem("projects");
    return saved ? JSON.parse(saved) : [];
  });

  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [stack, setStack] = useState("");
  const [startDate, setStartDate] = useState("2026-03-01");
  const [endDate, setEndDate] = useState("");
  const [gitLink, setGitLink] = useState("");
  const [deployLink, setDeployLink] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const handleAddOrEdit = () => {
    const newProject = {
      projectName,
      description,
      stack,
      startDate,
      endDate,
      gitLink,
      deployLink,
    };

    if (editIndex !== null) {
      const updated = [...projects];
      updated[editIndex] = newProject;
      setProjects(updated);
      setEditIndex(null);
    } else {
      setProjects([...projects, newProject]);
    }

    // Clear inputs
    setProjectName("");
    setDescription("");
    setStack("");
    setStartDate("2026-03-01");
    setEndDate("");
    setGitLink("");
    setDeployLink("");
  };

  const handleDelete = (index) => {
    const updated = projects.filter((_, i) => i !== index);
    setProjects(updated);
  };

  const handleEdit = (index) => {
    const project = projects[index];
    setProjectName(project.projectName);
    setDescription(project.description);
    setStack(project.stack);
    setStartDate(project.startDate);
    setEndDate(project.endDate);
    setGitLink(project.gitLink);
    setDeployLink(project.deployLink);
    setEditIndex(index);
  };

  const filteredProjects = projects.filter((p) => {
    const text = search.toLowerCase();
    return (
      (p.projectName && p.projectName.toLowerCase().includes(text)) ||
      (p.description && p.description.toLowerCase().includes(text)) ||
      (p.stack && p.stack.toLowerCase().includes(text))
    );
  });
     
const totalProjects = projects.length;
const completedProjects = projects.filter(p => p.endDate && new Date(p.endDate) <= new Date()).length;
const ongoingProjects = projects.filter(p => !p.endDate || new Date(p.endDate) > new Date()).length;
  return (
    <div className="project-tracker">
      <div className="top">
      <h1>Project Tracker</h1>
                           <div className="dashboard-stats">
                      <p>Total Projects: {totalProjects}</p>
                      <p>Completed: {completedProjects}</p>
                      <p>Ongoing: {ongoingProjects}</p>
                    </div>
                    </div>
      
      <div className="filter">
        <input
          type="text"
          placeholder="Search by name, description, or stack..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Input Form */}
      <div className="inputs">
        <input
          type="text"
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
          <input
          type="text"
          placeholder="Git Link"
          value={gitLink}
          onChange={(e) => setGitLink(e.target.value)}
        />
        <input
          type="text"
          placeholder="Deploy Link"
          value={deployLink}
          required
          onChange={(e) => setDeployLink(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description} 
          required
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Stack (React, Node, etc.)"
          value={stack}
          onChange={(e) => setStack(e.target.value)}
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
    

        <button onClick={handleAddOrEdit}>{editIndex !== null ? "Edit" : "Add"}</button>
      </div>

      {/* Project List */}
      <div className="project-list">
        {filteredProjects.map((p, index) => (
          <div key={index} className="project-card">
            <p><strong>Name:</strong> {p.projectName}</p>
            <p><strong>Description:</strong> {p.description}</p>
            <p><strong>Stack:</strong> {p.stack}</p>
            <p><strong>Start Date:</strong> {p.startDate}</p>
            <p><strong>End Date:</strong> {p.endDate}</p>
            <p><strong>Git:</strong> <a href={p.gitLink} target="_blank">{p.gitLink}</a></p>
            <p><strong>Deploy:</strong> <a href={p.deployLink} target="_blank">{p.deployLink}</a></p>
            <div className="btn-grp">
              <button onClick={() => handleEdit(index)} className="edit">Edit</button>
              <button onClick={() => handleDelete(index)} className="del">Delete</button>
            </div>
          </div>
        ))}
      </div>
    
    </div>
  );
};

export default ProjectTracker;