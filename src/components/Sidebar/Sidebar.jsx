import React from 'react'
import { Link } from 'react-router-dom'
import './Sidebar.css'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div>
        <h2>Dashboard</h2>
      </div>
      

      <nav>
        <ul>
          <li><Link to='/'>Dashboard</Link></li>
          <li><Link to='/todolisttracker'>To Do List</Link></li>
          <li><Link to='/jobtracker'>Job Tracker</Link></li>
          <li><Link to='/codingtracker'>Coding Tracker</Link></li>
          <li><Link to='/projecttracker'>Project Tracker</Link></li>

        </ul>
      </nav>
    </div>
  )
}

export default Sidebar