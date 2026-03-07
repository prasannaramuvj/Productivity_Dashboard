import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Sidebar.css'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <button className="hamburger" onClick={toggleSidebar}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}

      <div className={`sidebar ${isOpen ? 'active' : ''}`}>
        <div className="sidebar-header">
          <h2>Dashboard</h2>
          <button className="close-btn" onClick={toggleSidebar}>&times;</button>
        </div>

        <nav>
          <ul>
            <li><Link to='/' onClick={toggleSidebar}>Dashboard</Link></li>
            <li><Link to='/todolisttracker' onClick={toggleSidebar}>To Do List</Link></li>
            <li><Link to='/jobtracker' onClick={toggleSidebar}>Job Tracker</Link></li>
            <li><Link to='/codingtracker' onClick={toggleSidebar}>Coding Tracker</Link></li>
            <li><Link to='/projecttracker' onClick={toggleSidebar}>Project Tracker</Link></li>
          </ul>
        </nav>
      </div>
    </>
  )
}

export default Sidebar