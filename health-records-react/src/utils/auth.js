export const getUsers = () => JSON.parse(localStorage.getItem('yge_users') || '[]');
export const getPatients = () => JSON.parse(localStorage.getItem('yge_patients') || '[]');
export const savePatients = (patients) => localStorage.setItem('yge_patients', JSON.stringify(patients));
export const saveUsers = (users) => localStorage.setItem('yge_users', JSON.stringify(users));

export const getCurrentUser = () => JSON.parse(localStorage.getItem('yge_currentUser') || 'null');
export const setCurrentUser = (user) => localStorage.setItem('yge_currentUser', JSON.stringify(user));
export const logout = () => {
  localStorage.removeItem('yge_currentUser');
  window.location.href = '/login';
};

export const login = (email, password, role) => {
  const users = getUsers();
  const found = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password && u.role === role);
  if (found) {
    setCurrentUser({ id: found.id, fullname: found.fullname, email: found.email, role: found.role });
    return { success: true, user: found };
  }
  return { success: false, message: 'Invalid credentials or wrong role!' };
};

export const signup = (fullname, email, password, role, extra = {}) => {
  const users = getUsers();
  if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
    return { success: false, message: 'Email already registered!' };
  }

  let newId = role === 'admin' ? 'ADMIN' + Date.now() : 'P' + Date.now();

  if (role === 'patient') {
    const patients = getPatients();
    patients.push({
      id: newId, fullname, email, password,
      age: extra.age || 'N/A', gender: extra.gender || 'N/A', phone: extra.phone || 'N/A',
      history: [], prescriptions: [], labReports: []
    });
    savePatients(patients);
  }

  users.push({ id: newId, fullname, email, password, role });
  saveUsers(users);
  return { success: true, message: 'Signup successful! Please login.' };
};