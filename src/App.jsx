import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar/Sidebar'
import CodingTracker from './pages/CodingTracker/CodingTracker'
import Dashboard from './pages/Dashboard/Dashboard'
import JobTracker from './pages/JobTracker/JobTracker'
import ProjectTracker from './pages/ProjectTracker/ProjectTracker'
import TodolistTracker from './pages/TodolistTracker/TodolistTracker'

function App() {


  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/todolisttracker' element={<TodolistTracker />} />
            <Route path='/codingtracker' element={<CodingTracker />} />
            <Route path='/jobtracker' element={<JobTracker />} />
            <Route path='/projecttracker' element={<ProjectTracker />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
