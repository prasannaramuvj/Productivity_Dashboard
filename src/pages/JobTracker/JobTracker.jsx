import React, { useEffect, useState } from 'react'
import './JobTracker.css'
import JobChart from '../../components/JobChart';

const JobTracker = () => {

  const [ jobs, setJobs ] = useState(()=>{
    const saved = localStorage.getItem("jobs");
    return saved ? JSON.parse(saved):[];
  });
  const [company,setCompany] = useState("");
  const [role,setRole] = useState("");
  const [date,setDate] = useState("2026-03-01");
  const [status,setStatus] = useState("");
  const [edit,setEdit] = useState(null);
  const [filter,setFilter] = useState('All');
  const [portal,setPortal] = useState('');
  const [search,setSearch] = useState('');


  function addJob(e)
  {
    const newjob = {
      company:company,
      role:role,
      date:date,
      status:status,
      portal:portal
    };

    if(edit != null){
        const updatedJob = [...jobs];
        updatedJob[edit] = newjob;
        setJobs(updatedJob);
        setEdit(null);
    }
    else
    {
      setJobs([...jobs,newjob]);
    }
 
    

    setCompany("");
    setDate("");
    setRole("");
    setStatus("");
    setPortal("");
  }
   


  function deleteJob(index){
    const updatedJob = jobs.filter((jobs,i)=> i!==index);
    setJobs(updatedJob)
  }

  function startEdit(edit){
    const job = jobs[edit];

    setCompany(job.company);
    setRole(job.role);
    setDate(job.date);
    setStatus(job.status);
    setPortal(job.portal)


    setEdit(edit);
  }
  useEffect(()=>{
 localStorage.setItem("jobs", JSON.stringify(jobs));
},[jobs])
  
const filterjobs = jobs.filter((job) => {
  const text = search.toLowerCase();

  return (
    (job.company && job.company.toLowerCase().includes(text)) ||
    (job.role && job.role.toLowerCase().includes(text)) ||
    (job.portal && job.portal.toLowerCase().includes(text)) ||
    (job.status && job.status.toLowerCase().includes(text))
  );
});


const total = jobs.length;
const applied = jobs.filter((job)=>job.status === "Applied").length;
const rejected = jobs.filter((job)=>job.status === "Rejected").length;
const interview = jobs.filter((job)=>job.status === "Interview").length;


  return (
    <div className='job-track'>
       <div className='middle'>
        <div className="top">
              <h1>Job Tracker</h1>


      <div className='filter'>
           <input
              type="text"
              placeholder="Search anything..."
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
              />
      </div>
      </div>
      <div className='inputs'>
        <input type="text"
        placeholder='Enter the company name'
        value={company}
        onChange={(e)=>setCompany(e.target.value)}
         />
         <input type="text"
        placeholder='Enter the role you applied'
        value={role}
        onChange={(e)=>setRole(e.target.value)}
         />
          <input type="date"
        placeholder='Enter the date you applied'
        value={date}
        onChange={(e)=>setDate(e.target.value)}
         />

         <select name="" id="" value={status} onChange={(e)=>setStatus(e.target.value)}>
          <option value="">Select status</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Rejected">Rejected</option>
         </select>


         <select name="" id="" value={portal} onChange={(e)=>setPortal(e.target.value)}>

          <option value="">Portal</option>
          <option value="linkedin">LinkedIn</option>
          <option value="naukri">Naukri</option>
          <option value="indeed">Indeed</option>
          <option value="referral">Indeed</option>
          <option value="direct">Walk In</option>
          <option value="carrer">Carrer Portal</option>

         </select>

         <button onClick={addJob}> { edit ? 'Edit' : 'Add' }</button>
      </div>
      

      <div className='job-list'>
          {filterjobs.map((job,index) => (

            <div key={index} className='job-card'>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Role:</strong> {job.role}</p>
              <p><strong>Portal Applied:</strong> {job.portal}</p>
              <p><strong>Date:</strong> {job.date}</p>
              <p><strong>Status:</strong> {job.status}</p>
              <div className="btn-grp">
               <button onClick={()=>deleteJob(index)} className='del'>Delete</button>
               <button onClick={()=>startEdit(index)} className='edit'>Edit</button>
              </div>
            </div>

          ))
        }
      </div>
      </div>
      <div className="right">
      <JobChart jobs={jobs}/>
      <div className="stats">
        <p>Total:{total}</p>
        <p>Applied:{applied}</p>
        <p>Rejected:{rejected}</p>
        <p>Interview:{interview}</p>
      </div>
    </div>
    </div>
    
  )
}

export default JobTracker