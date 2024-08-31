import React, { useState } from 'react';

const JobTrackerNoStorage = () => {
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({
    company: '',
    position: '',
    status: 'Applied',
    date: '',
    contactPerson: '',
    remarks: '',
  });
  const [filter, setFilter] = useState('All');
  const [editingJobId, setEditingJobId] = useState(null);

  const addJob = () => {
    if (newJob.company && newJob.position) {
      if (editingJobId) {
        // Update existing job
        setJobs(jobs.map(job => job.id === editingJobId ? { ...newJob, id: editingJobId } : job));
        setEditingJobId(null); // Reset editingJobId after update
      } else {
        // Add new job
        setJobs([...jobs, { ...newJob, id: Date.now() }]);
      }
      setNewJob({
        company: '',
        position: '',
        status: 'Applied',
        date: '',
        contactPerson: '',
        remarks: '',
      });
    }
  };

  const deleteJob = (id) => {
    setJobs(jobs.filter((job) => job.id !== id));
  };

  const editJob = (id) => {
    const jobToEdit = jobs.find((job) => job.id === id);
    setNewJob({ ...jobToEdit });
    setEditingJobId(id); // Set the job ID being edited
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

  const filteredJobs = filter === 'All' ? jobs : jobs.filter((job) => job.status === filter);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', 
      background: 'linear-gradient(to right, #f7f7f7, #e1e1e1)', 
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        maxWidth: '600px', 
        width: '100%', 
        padding: '20px', 
        border: '3px solid #4CAF50', 
        borderRadius: '15px', 
        boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)',
        backgroundColor: '#ffffff',
        position: 'relative',
        zIndex: '1',
        borderImage: 'linear-gradient(to right, #4CAF50, #81C784) 1',
      }}>
        <h1 style={{ fontSize: '24px', marginBottom: '20px', textAlign: 'center' }}>
          Simple Job Tracker
        </h1>

        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Company"
            value={newJob.company}
            onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
            style={{ marginRight: '10px', padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }}
          />
          <input
            type="text"
            placeholder="Position"
            value={newJob.position}
            onChange={(e) => setNewJob({ ...newJob, position: e.target.value })}
            style={{ marginRight: '10px', padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }}
          />
          <input
            type="date"
            value={newJob.date}
            onChange={(e) => setNewJob({ ...newJob, date: e.target.value })}
            style={{ marginRight: '10px', padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }}
          />
          <input
            type="text"
            placeholder="Contact Person"
            value={newJob.contactPerson}
            onChange={(e) => setNewJob({ ...newJob, contactPerson: e.target.value })}
            style={{ marginRight: '10px', padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }}
          />
          <input
            type="text"
            placeholder="Remarks"
            value={newJob.remarks}
            onChange={(e) => setNewJob({ ...newJob, remarks: e.target.value })}
            style={{ marginRight: '10px', padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }}
          />
          <select
            value={newJob.status}
            onChange={(e) => setNewJob({ ...newJob, status: e.target.value })}
            style={{ marginRight: '10px', padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }}
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
          <button
            onClick={addJob}
            style={{
              padding: '8px 16px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            {editingJobId ? 'Update Job' : 'Add Job'}
          </button>
        </div>

        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          <label style={{ marginRight: '10px' }}>Filter by Status:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }}
          >
            <option>All</option>
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
        </div>

        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {filteredJobs.map((job, index) => (
            <li
              key={job.id}
              style={{
                marginBottom: '10px',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                backgroundColor: '#fafafa',
                borderLeft: `5px solid ${getColorForStatus(job.status)}`, // Add a color border on the left
              }}
            >
              <strong>{index + 1}. {job.company}</strong> - {job.position} -{' '}
              <span style={{ color: getColorForStatus(job.status) }}>
                {job.status}
              </span>
              <div style={{ fontSize: '14px', color: '#555', marginTop: '5px' }}>
                Date: {job.date} | Contact: {job.contactPerson} | Remarks: {job.remarks}
              </div>
              <button
                onClick={() => deleteJob(job.id)}
                style={{
                  marginLeft: '10px',
                  padding: '5px 10px',
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Delete
              </button>
              <button
                onClick={() => editJob(job.id)}
                style={{
                  marginLeft: '10px',
                  padding: '5px 10px',
                  backgroundColor: '#2196f3',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Optional: Add a subtle pattern or background image */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: 'url(https://www.transparenttextures.com/patterns/white-diamond.png)', // Optional pattern
        opacity: '0.1',
        zIndex: '0',
      }}></div>
    </div>
  );
};

export default JobTrackerNoStorage;
