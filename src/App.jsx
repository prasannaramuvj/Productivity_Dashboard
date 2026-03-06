import { useState } from 'react'
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import CodingTracker from './pages/CodingTracker/CodingTracker'
import Dashboard from './pages/Dashboard/Dashboard'
import JobTracker from './pages/JobTracker/JobTracker'
import ProjectTracker from './pages/ProjectTracker/ProjectTracker'

function App() {
  

  return (
    <BrowserRouter>
      <div style={{display:"flex"}}>
        <Sidebar/>
        <div style={{padding:"20px"}}>
          <Routes>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/codingtracker' element={<CodingTracker/>}/>
            <Route path='/jobtracker' element={<JobTracker/>}/>
            <Route path='/projecttracker' element={<ProjectTracker/>}/>



          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
