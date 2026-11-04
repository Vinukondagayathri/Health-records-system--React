import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../utils/auth';
import Navbar from '../components/Navbar';
import { FaUser, FaUserShield, FaUserPlus } from 'react-icons/fa';

const Signup = () => {
  const [role, setRole] = useState('patient');
  const [formData, setFormData] = useState({ fullname: '', email: '', password: '', age: '', gender: '', phone: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = signup(formData.fullname, formData.email, formData.password, role, formData);
    if (res.success) {
      alert('✅ ' + res.message);
      navigate('/login');
    } else {
      alert('❌ ' + res.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="main-container">
        <div className="auth-wrapper">
          <div className="auth-box">
            <div className="auth-header">
              <div className="auth-icon"><FaUserPlus /></div>
              <h2>Create your account</h2>
            </div>

            <div className="role-selector">
              <button type="button" className={`role-option ${role === 'patient' ? 'active' : ''}`} onClick={() => setRole('patient')}>
                <FaUser /> Patient
              </button>
              <button type="button" className={`role-option ${role === 'admin' ? 'active' : ''}`} onClick={() => setRole('admin')}>
                <FaUserShield /> Admin
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" id="fullname" onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" id="email" onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" id="password" onChange={handleChange} required />
              </div>
              {role === 'patient' && (
                <>
                  <div className="form-group"><label>Age</label><input type="number" id="age" onChange={handleChange} /></div>
                  <div className="form-group"><label>Gender</label><input type="text" id="gender" onChange={handleChange} /></div>
                  <div className="form-group"><label>Phone</label><input type="tel" id="phone" onChange={handleChange} /></div>
                </>
              )}
              <button type="submit" className="form-btn">Create Account</button>
            </form>
            <div className="form-footer">
              Already have an account? <Link to="/login">Login here</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;