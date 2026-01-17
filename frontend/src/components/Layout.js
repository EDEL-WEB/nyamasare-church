import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from './UI';
import sdaLogo from '../assets/sda_logo.png';

const Layout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const departments = [
    // Ministries & Outreach
    { name: 'Sabbath School/Personal Ministries', path: '/departments/sabbath-school', icon: '📖', category: 'ministry' },
    { name: 'Children\'s Ministries', path: '/departments/childrens-ministries', icon: '👶', category: 'ministry' },
    { name: 'Youth Ministries (AYM)', path: '/departments/youth-ministries', icon: '🏕️', category: 'ministry' },
    { name: 'Women\'s Ministries', path: '/departments/womens-ministries', icon: '👩', category: 'ministry' },
    { name: 'Family Ministries', path: '/departments/family-ministries', icon: '👨👩👧👦', category: 'ministry' },
    { name: 'Health Ministries', path: '/departments/health-ministries', icon: '🏥', category: 'ministry' },
    { name: 'Publishing', path: '/departments/publishing', icon: '📚', category: 'ministry' },
    { name: 'Education', path: '/departments/education', icon: '🎓', category: 'ministry' },
    { name: 'Chaplaincy Ministries', path: '/departments/chaplaincy', icon: '⛪', category: 'ministry' },
    { name: 'ADRA', path: '/departments/adra', icon: '🤝', category: 'ministry' },
    { name: 'PARL', path: '/departments/parl', icon: '⚖️', category: 'ministry' },
    { name: 'Adventist Mission', path: '/departments/mission', icon: '🌍', category: 'ministry' },

    // Administrative & Support
    { name: 'Secretariat', path: '/departments/secretariat', icon: '📋', category: 'admin' },
    { name: 'Treasury', path: '/departments/treasury', icon: '💰', category: 'admin' },
    { name: 'Communication', path: '/departments/communication', icon: '📢', category: 'admin' },
    { name: 'Archives & Research', path: '/departments/archives', icon: '📊', category: 'admin' },
    { name: 'Planned Giving', path: '/departments/planned-giving', icon: '🎁', category: 'admin' },

    // Specialized Groups
    { name: 'Adventist Men (AMO)', path: '/departments/adventist-men', icon: '👨', category: 'special' },
    { name: 'Professional Networks', path: '/departments/professional', icon: '💼', category: 'special' }
  ];

  const linkStyle = (isActive) => ({
    textDecoration: 'none'
  });

  const groupedDepartments = {
    ministry: departments.filter(d => d.category === 'ministry'),
    admin: departments.filter(d => d.category === 'admin'),
    special: departments.filter(d => d.category === 'special')
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header className="site-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link to="/dashboard" className="brand">
            <img src={sdaLogo} alt="Nyamasare SDA Church" className="logo-img" />
            <span className="brand-title">NYAMASARE SDA CHURCH</span>
          </Link>
          <nav className="site-nav">
            <Link to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>Dashboard</Link>
            <Link to="/calendar" className={`nav-link ${location.pathname === '/calendar' ? 'active' : ''}`}>Calendar</Link>
            <Link to="/live" className={`nav-link ${location.pathname === '/live' ? 'active' : ''}`}>Live</Link>
            <Link to="/members" className={`nav-link ${location.pathname === '/members' ? 'active' : ''}`}>Members</Link>

            {/* Departments Dropdown */}
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <button
                style={{
                  ...linkStyle(location.pathname.startsWith('/departments')),
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}
                onMouseEnter={(e) => {
                  const dropdown = e.target.nextElementSibling;
                  if (dropdown) dropdown.style.display = 'block';
                }}
              >
                Departments ▼
              </button>
              <div
                style={{
                  display: 'none',
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  backgroundColor: 'white',
                  minWidth: '280px',
                  maxWidth: '400px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  borderRadius: '4px',
                  zIndex: 1000,
                  padding: '1rem'
                }}
                onMouseLeave={(e) => {
                  e.target.style.display = 'none';
                }}
              >
                {/* Ministries & Outreach */}
                <div style={{ marginBottom: '1rem' }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: '#2c3e50', fontSize: '0.9rem', fontWeight: 'bold' }}>
                    Ministries & Outreach
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.25rem' }}>
                    {groupedDepartments.ministry.map(dept => (
                      <Link
                        key={dept.path}
                        to={dept.path}
                        style={{
                          display: 'block',
                          padding: '0.4rem 0.5rem',
                          color: '#333',
                          textDecoration: 'none',
                          fontSize: '0.8rem',
                          borderRadius: '3px'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#f8f9fa';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'transparent';
                        }}
                      >
                        {dept.icon} {dept.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Administrative & Support */}
                <div style={{ marginBottom: '1rem' }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: '#2c3e50', fontSize: '0.9rem', fontWeight: 'bold' }}>
                    Administrative & Support
                  </h4>
                  {groupedDepartments.admin.map(dept => (
                    <Link
                      key={dept.path}
                      to={dept.path}
                      style={{
                        display: 'block',
                        padding: '0.4rem 0.5rem',
                        color: '#333',
                        textDecoration: 'none',
                        fontSize: '0.8rem',
                        borderRadius: '3px'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#f8f9fa';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                      }}
                    >
                      {dept.icon} {dept.name}
                    </Link>
                  ))}
                </div>

                {/* Specialized Groups */}
                <div>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: '#2c3e50', fontSize: '0.9rem', fontWeight: 'bold' }}>
                    Specialized Groups
                  </h4>
                  {groupedDepartments.special.map(dept => (
                    <Link
                      key={dept.path}
                      to={dept.path}
                      style={{
                        display: 'block',
                        padding: '0.4rem 0.5rem',
                        color: '#333',
                        textDecoration: 'none',
                        fontSize: '0.8rem',
                        borderRadius: '3px'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#f8f9fa';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                      }}
                    >
                      {dept.icon} {dept.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span>{user?.first_name} ({user?.role})</span>
          <Button variant="danger" size="small" onClick={logout}>Logout</Button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#34495e', color: 'white', padding: '1rem 2rem', textAlign: 'center' }}>
        <p>&copy; 2024 Nyamasare SDA Church. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;