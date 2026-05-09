import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { AddDiver } from './pages/AddDiver';
import { DiveLogs } from './pages/DiveLogs';
import { AdminDashboard } from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add" element={<AddDiver />} />
        <Route path="/logs" element={<DiveLogs />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;