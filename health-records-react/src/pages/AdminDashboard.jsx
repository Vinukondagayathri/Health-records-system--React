import { useState } from 'react';
import Navbar from '../components/Navbar';
import { getPatients, savePatients, getUsers, saveUsers } from '../utils/auth';
import { FaUsers, FaNotesMedical, FaPrescription, FaFlask, FaArrowLeft, FaPlusCircle } from 'react-icons/fa';

const AdminDashboard = () => {
  const [patients, setPatients] = useState(getPatients());
  const [view, setView] = useState('dashboard');
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [currentPatientId, setCurrentPatientId] = useState(null);

  // Record form state
  const [recordType, setRecordType] = useState('history');
  const [recordData, setRecordData] = useState({ date: new Date().toISOString().split('T')[0], field1: '', field2: '' });

  const handleAddRecord = (e) => {
    e.preventDefault();
    const allPatients = getPatients();
    const idx = allPatients.findIndex(p => p.id === currentPatientId);
    if (idx === -1) return;

    const p = allPatients[idx];
    if (recordType === 'history') {
      if (!p.history) p.history = [];
      p.history.push({ date: recordData.date, condition: recordData.field1, notes: recordData.field2 });
    } else if (recordType === 'prescription') {
      if (!p.prescriptions) p.prescriptions = [];
      p.prescriptions.push({ date: recordData.date, medicine: recordData.field1, duration: recordData.field2 });
    } else {
      if (!p.labReports) p.labReports = [];
      p.labReports.push({ date: recordData.date, test: recordData.field1, result: recordData.field2 });
    }

    allPatients[idx] = p;
    savePatients(allPatients);
    setPatients(getPatients());
    alert('✅ Record added successfully!');
    setShowRecordModal(false);
  };

  const openModalForPatient = (id) => {
    setCurrentPatientId(id);
    setRecordType('history');
    setRecordData({ date: new Date().toISOString().split('T')[0], field1: '', field2: '' });
    setShowRecordModal(true);
  };

  return (
    <>
      <Navbar />
      <div className="main-container">
        {view === 'dashboard' ? (
          <>
            <h1 className="page-title">Admin Dashboard</h1>
            <p className="page-subtitle">Manage all patients and medical records.</p>
            <div className="dashboard-grid">
              <div className="dash-card" onClick={() => setView('patients')}>
                <div className="card-icon icon-blue"><FaUsers /></div>
                <h3>Patient Records</h3>
                <p>View and manage registered patients.</p>
                <button className="card-action-btn">View Patients</button>
              </div>
              <div className="dash-card" onClick={() => setView('history')}>
                <div className="card-icon icon-purple"><FaNotesMedical /></div>
                <h3>Medical History</h3>
                <p>Browse patient medical history.</p>
                <button className="card-action-btn">View History</button>
              </div>
              <div className="dash-card" onClick={() => setView('prescriptions')}>
                <div className="card-icon icon-green"><FaPrescription /></div>
                <h3>Prescriptions</h3>
                <p>All prescriptions issued across patients.</p>
                <button className="card-action-btn">View Prescriptions</button>
              </div>
              <div className="dash-card" onClick={() => setView('labs')}>
                <div className="card-icon icon-orange"><FaFlask /></div>
                <h3>Lab Reports</h3>
                <p>All laboratory reports with results.</p>
                <button className="card-action-btn">View Lab Reports</button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="detail-header">
              <div className="detail-header-left">
                <button className="back-btn" onClick={() => setView('dashboard')}><FaArrowLeft /> Back to Dashboard</button>
                <h2 className="detail-title">All {view}</h2>
              </div>
            </div>
            
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Date</th>
                    <th>Details</th>
                    <th>Notes/Result</th>
                    {view === 'patients' && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {view === 'patients' ? (
                    patients.map(p => (
                      <tr key={p.id}>
                        <td>{p.fullname} ({p.id})</td>
                        <td>{p.email}</td>
                        <td>Age: {p.age} | {p.gender}</td>
                        <td>{p.phone}</td>
                        <td>
                          <button className="mini-btn" onClick={() => openModalForPatient(p.id)}>
                            <FaPlusCircle /> Add Record
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    patients.flatMap(p => {
                      let records = [];
                      if (view === 'history') records = p.history || [];
                      if (view === 'prescriptions') records = p.prescriptions || [];
                      if (view === 'labs') records = p.labReports || [];
                      
                      return records.map((r, i) => (
                        <tr key={`${p.id}-${i}`}>
                          <td>{p.fullname}</td>
                          <td>{r.date}</td>
                          <td>{r.condition || r.medicine || r.test}</td>
                          <td>{r.notes || r.duration || r.result}</td>
                        </tr>
                      ));
                    })
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Modal for adding records */}
        {showRecordModal && (
          <div className="modal-overlay active">
            <div className="modal-box">
              <h2>Add Record</h2>
              <form onSubmit={handleAddRecord}>
                <div className="form-group">
                  <label>Record Type</label>
                  <select value={recordType} onChange={(e) => setRecordType(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '10px' }}>
                    <option value="history">Medical History</option>
                    <option value="prescription">Prescription</option>
                    <option value="lab">Lab Report</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Date</label>
                  <input type="date" value={recordData.date} onChange={(e) => setRecordData({...recordData, date: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>{recordType === 'history' ? 'Condition' : recordType === 'prescription' ? 'Medicine' : 'Test Name'}</label>
                  <input type="text" value={recordData.field1} onChange={(e) => setRecordData({...recordData, field1: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>{recordType === 'history' ? 'Notes' : recordType === 'prescription' ? 'Duration' : 'Result'}</label>
                  <input type="text" value={recordData.field2} onChange={(e) => setRecordData({...recordData, field2: e.target.value})} required />
                </div>
                <button type="submit" className="form-btn">Save Record</button>
                <button type="button" className="btn-outline-light" style={{ marginTop: '10px', width: '100%' }} onClick={() => setShowRecordModal(false)}>Cancel</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminDashboard;