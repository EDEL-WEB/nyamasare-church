import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ChurchCalendar from './pages/ChurchCalendar';
import LiveStreaming from './pages/LiveStreaming';
import MemberDirectory from './pages/MemberDirectory';
import SabbathSchool from './pages/departments/SabbathSchool';
import AdventistYouth from './pages/departments/AdventistYouth';
import Treasury from './pages/departments/Treasury';
import Communication from './pages/departments/Communication';
import { HealthMinistries, FamilyMinistries, PARL, ChildrensMinistries } from './pages/departments/OtherDepartments';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              
              {/* Protected Routes */}
              <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/calendar" element={<ChurchCalendar />} />
                <Route path="/live" element={<LiveStreaming />} />
                <Route path="/members" element={<MemberDirectory />} />
                <Route path="/departments/sabbath-school" element={<SabbathSchool />} />
                <Route path="/departments/ay-pathfinder" element={<AdventistYouth />} />
                <Route path="/departments/childrens-ministries" element={<ChildrensMinistries />} />
                <Route path="/departments/communication" element={<Communication />} />
                <Route path="/departments/health-ministries" element={<HealthMinistries />} />
                <Route path="/departments/family-ministries" element={<FamilyMinistries />} />
                <Route path="/departments/parl" element={<PARL />} />
                <Route path="/departments/treasury" element={<Treasury />} />
              </Route>
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;