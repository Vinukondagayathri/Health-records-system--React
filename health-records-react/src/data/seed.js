export const DEFAULT_ADMIN = {
  id: 'ADMIN001',
  fullname: 'Dr. Admin',
  email: 'admin@yge.com',
  password: 'admin123',
  role: 'admin'
};

export const DEFAULT_PATIENTS = [
  {
    id: 'P001', fullname: 'Ravi Kumar', email: 'ravi@yge.com', password: '1234', age: 45, gender: 'Male', phone: '9876543210',
    history: [{ date: '2025-01-10', condition: 'Hypertension', notes: 'BP 150/95' }],
    prescriptions: [{ date: '2025-01-10', medicine: 'Lisinopril 10mg', duration: '30 days' }],
    labReports: [{ date: '2025-01-12', test: 'Complete Blood Count', result: 'Normal' }]
  },
  {
    id: 'P002', fullname: 'Priya Sharma', email: 'priya@yge.com', password: '1234', age: 32, gender: 'Female', phone: '9876543211',
    history: [{ date: '2024-11-05', condition: 'Anemia', notes: 'Hb 9.2 g/dL' }],
    prescriptions: [{ date: '2024-11-05', medicine: 'Ferrous Sulfate 200mg', duration: '90 days' }],
    labReports: [{ date: '2024-11-06', test: 'Iron Studies', result: 'Low Ferritin' }]
  },
  {
    id: 'P003', fullname: 'Arjun Reddy', email: 'arjun@yge.com', password: '1234', age: 28, gender: 'Male', phone: '9876543212',
    history: [{ date: '2025-02-14', condition: 'Asthma', notes: 'Mild persistent' }],
    prescriptions: [{ date: '2025-02-14', medicine: 'Salbutamol Inhaler', duration: 'As needed' }],
    labReports: [{ date: '2025-02-15', test: 'Pulmonary Function', result: 'FEV1 78%' }]
  }
];

export const seedDatabase = () => {
  let users = JSON.parse(localStorage.getItem('yge_users') || '[]');
  let patients = JSON.parse(localStorage.getItem('yge_patients') || '[]');

  if (!users.find(u => u.email === DEFAULT_ADMIN.email)) {
    users.push(DEFAULT_ADMIN);
  }

  DEFAULT_PATIENTS.forEach(dp => {
    if (!users.find(u => u.email === dp.email)) {
      users.push({ id: dp.id, fullname: dp.fullname, email: dp.email, password: dp.password, role: 'patient' });
    }
    if (!patients.find(p => p.id === dp.id)) {
      patients.push(dp);
    }
  });

  localStorage.setItem('yge_users', JSON.stringify(users));
  localStorage.setItem('yge_patients', JSON.stringify(patients));
};