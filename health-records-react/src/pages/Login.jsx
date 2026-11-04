import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../utils/auth';
import Navbar from '../components/Navbar';
import { FaUser, FaUserShield, FaSignInAlt } from 'react-icons/fa';

const Login = () => {
  const [role, setRole] = useState('patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = login(email, password, role);
    if (res.success) {
      alert('✅ Login successful! Welcome, ' + res.user.fullname);
      navigate(res.user.role === 'admin' ? '/admin' : '/user');
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
              <div className="auth-icon"><FaSignInAlt /></div>
              <h2>Welcome back</h2>
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
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <button type="submit" className="form-btn">Login</button>
            </form>
            <div className="form-footer">
              Don't have an account? <Link to="/signup">Sign up here</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;  // <--- THIS LINE IS CRUCIAL