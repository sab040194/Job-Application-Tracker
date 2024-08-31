// JobTrackerNoStorage.js
import React, { useState } from 'react';
import './App.css';

const JobTrackerNoStorage = () => {
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({ company: '', position: '', status: 'Applied' });
  const [filter, setFilter] = useState('All');

  const addJob = () => {
    if (newJob.company && newJob.position) {
      setJobs([...jobs, { ...newJob, id: Date.now() }]);
      setNewJob({ company: '', position: '', status: 'Applied' });
    }
  };

  const deleteJob = (id) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  const editJob = (id) => {
    const jobToEdit = jobs.find(job => job.id === id);
    setNewJob({ ...jobToEdit });
    deleteJob(id);
  };

  const getColorForStatus = (status) => {
    switch (status) {
      case 'Applied':
        return 'blue';
      case 'Interview':
        return 'orange';
      case 'Offer':
        return 'green';
      case 'Rejected':
        return 'red';
      default:
        return 'black';
    }
  };

  return (
    <div className="job-tracker">
      <h1>Job Tracker</h1>
      
      <div className="input-section">
        <input
          type="text"
          placeholder="Company"
          value={newJob.company}
          onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
        />
        <input
          type="text"
          placeholder="Position"
          value={newJob.position}
          onChange={(e) => setNewJob({ ...newJob, position: e.target.value })}
        />
        <select
          value={newJob.status}
          onChange={(e) => setNewJob({ ...newJob, status: e.target.value })}
        >
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
        <button onClick={addJob}>Add Job</button>
      </div>

      <div className="filter-section">
        <label className="filter-label">Filter by Status:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-dropdown"
        >
          <option value="All">All</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <ul>
        {jobs
          .filter(job => filter === 'All' || job.status === filter)
          .map((job, index) => (
            <li key={job.id} className="job-item">
              <strong>{index + 1}. {job.company}</strong> - {job.position} - 
              <span style={{ color: getColorForStatus(job.status) }}>{job.status}</span>
              <button onClick={() => deleteJob(job.id)} className="delete-button">Delete</button>
              <button onClick={() => editJob(job.id)} className="edit-button">Edit</button>
            </li>
        ))}
      </ul>
    </div>
  );
};

export default JobTrackerNoStorage;
