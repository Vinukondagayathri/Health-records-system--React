import { useState } from 'react';
import Navbar from '../components/Navbar';
import { getCurrentUser, getPatients } from '../utils/auth';
import { FaUserCircle, FaHistory, FaPrescription, FaFlask } from 'react-icons/fa';

const UserDashboard = () => {
  const user = getCurrentUser();
  const patients = getPatients();
  const myRecord = patients.find(p => p.email === user.email) || { history: [], prescriptions: [], labReports: [] };
  const [view, setView] = useState('dashboard');

  const renderRecords = (records, type) => {
    if (!records || records.length === 0) return <p>No records found.</p>;
    return (
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>{type === 'history' ? 'Condition' : type === 'prescription' ? 'Medicine' : 'Test'}</th>
              <th>{type === 'history' ? 'Notes' : type === 'prescription' ? 'Duration' : 'Result'}</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r, i) => (
              <tr key={i}>
                <td>{r.date}</td>
                <td>{r.condition || r.medicine || r.test}</td>
                <td>{r.notes || r.duration || r.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="main-container">
        <h1 className="page-title">Welcome, {user.fullname}</h1>
        
        {view === 'dashboard' ? (
          <div className="dashboard-grid">
            <div className="dash-card" onClick={() => setView('profile')}>
              <div className="card-icon"><FaUserCircle /></div>
              <h3>My Profile</h3>
              <p>View your personal information.</p>
            </div>
            <div className="dash-card" onClick={() => setView('history')}>
              <div className="card-icon icon-purple"><FaHistory /></div>
              <h3>Medical History</h3>
              <p>View your previous medical conditions.</p>
            </div>
            <div className="dash-card" onClick={() => setView('prescription')}>
              <div className="card-icon icon-green"><FaPrescription /></div>
              <h3>Prescriptions</h3>
              <p>View prescribed medicines.</p>
            </div>
            <div className="dash-card" onClick={() => setView('labs')}>
              <div className="card-icon icon-orange"><FaFlask /></div>
              <h3>Lab Reports</h3>
              <p>View your lab test results.</p>
            </div>
          </div>
        ) : (
          <>
            <button className="back-btn" onClick={() => setView('dashboard')} style={{ marginBottom: '1rem' }}>← Back to Dashboard</button>
            {view === 'profile' && (
              <div className="table-wrapper" style={{ padding: '2rem' }}>
                <p><strong>Name:</strong> {myRecord.fullname}</p>
                <p><strong>Email:</strong> {myRecord.email}</p>
                <p><strong>Age:</strong> {myRecord.age}</p>
                <p><strong>Gender:</strong> {myRecord.gender}</p>
                <p><strong>Phone:</strong> {myRecord.phone}</p>
              </div>
            )}
            {view === 'history' && renderRecords(myRecord.history, 'history')}
            {view === 'prescription' && renderRecords(myRecord.prescriptions, 'prescription')}
            {view === 'labs' && renderRecords(myRecord.labReports, 'labs')}
          </>
        )}
      </div>
    </>
  );
};

export default UserDashboard;