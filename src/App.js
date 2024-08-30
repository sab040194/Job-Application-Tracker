import React, { useState, useEffect } from 'react';
import './App.css';

const JobItem = ({ job, index, onDelete, onEdit }) => (
  <li className="job-item">
    <span>{index + 1}. </span>
    <strong>{job.company}</strong> - {job.position} - 
    <span className={`status ${job.status.toLowerCase()}`}>{job.status}</span><br/>
    <small>Date: {job.date} | Contact Person: {job.contactPerson} | Remarks: {job.remarks}</small>
    <button onClick={() => onEdit(job.id)} className="edit-button">
      Edit
    </button>
    <button onClick={() => onDelete(job.id)} className="delete-button">
      Delete
    </button>
  </li>
);

const JobTracker = () => {
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem('jobs');
    return savedJobs ? JSON.parse(savedJobs) : [];
  });

  const [newJob, setNewJob] = useState({
    company: '',
    position: '',
    status: 'Applied',
    date: '',
    contactPerson: '',
    remarks: '',
  });

  const [editJobId, setEditJobId] = useState(null);

  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }, [jobs]);

  const addJob = () => {
    if (newJob.company && newJob.position) {
      if (editJobId) {
        setJobs(jobs.map(job => (job.id === editJobId ? { ...newJob, id: job.id } : job)));
        setEditJobId(null);
      } else {
        setJobs([...jobs, { ...newJob, id: Date.now() }]);
      }
      setNewJob({ company: '', position: '', status: 'Applied', date: '', contactPerson: '', remarks: '' });
    }
  };

  const deleteJob = (id) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  const editJob = (id) => {
    const jobToEdit = jobs.find(job => job.id === id);
    setNewJob({ ...jobToEdit });
    setEditJobId(id);
  };

  return (
    <div className="container">
      <h1>Job Application Tracker</h1>
      <div className="form-container">
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
        <input
          type="date"
          placeholder="Date"
          value={newJob.date}
          onChange={(e) => setNewJob({ ...newJob, date: e.target.value })}
        />
        <input
          type="text"
          placeholder="Contact Person"
          value={newJob.contactPerson}
          onChange={(e) => setNewJob({ ...newJob, contactPerson: e.target.value })}
        />
        <input
          type="text"
          placeholder="Remarks"
          value={newJob.remarks}
          onChange={(e) => setNewJob({ ...newJob, remarks: e.target.value })}
        />
        <select
          value={newJob.status}
          onChange={(e) => setNewJob({ ...newJob, status: e.target.value })}
        >
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
        <button onClick={addJob} className="add-button">
          {editJobId ? 'Update Job' : 'Add Job'}
        </button>
      </div>
      <ul className="job-list">
        {jobs.map((job, index) => (
          <JobItem
            key={job.id}
            job={job}
            index={index}
            onDelete={deleteJob}
            onEdit={editJob}
          />
        ))}
      </ul>
    </div>
  );
};

export default JobTracker;
