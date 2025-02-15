import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout.jsx';
import { Dashboard } from './pages/Dashboard.jsx';
import { VendorManagement } from './pages/VendorManagement.jsx';
import { DriverOnboarding } from './pages/DriverOnboarding.jsx';
import { VehicleManagement } from './pages/VehicleManagement.jsx';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/vendors" element={<VendorManagement />} />
          <Route path="/drivers" element={<DriverOnboarding />} />
          <Route path="/vehicles" element={<VehicleManagement />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;