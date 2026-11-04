import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../utils/auth';
import { FaHeartbeat, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="top-bar">
      <div className="logo-area">
        <div className="logo-icon"><FaHeartbeat /></div>
        <div className="logo-text">
          <h1>Health Records System</h1>
          <span>{user?.role === 'admin' ? 'Admin Console' : 'Patient Portal'}</span>
        </div>
      </div>
      <div className="auth-buttons">
        {user ? (
          <>
            <span style={{ color: '#e0f0ff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaUserCircle /> {user.fullname} ({user.role})
            </span>
            <button className="btn-outline-light" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn-outline-light">Login</Link>
            <Link to="/signup" className="btn-primary">Sign Up</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;