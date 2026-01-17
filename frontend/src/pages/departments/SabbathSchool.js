import React, { useState, useEffect } from 'react';
import { Card, Button, LoadingSpinner } from '../../components/UI';
import { useAuth } from '../../context/AuthContext';

const SabbathSchool = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('schedule');

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const canManage = user?.role === 'admin' || user?.role === 'leader';

  const scheduleData = [
    { id: 1, date: '2024-01-06', lesson: 'The Word Became Flesh', teacher: 'Elder Smith', attendance: 45 },
    { id: 2, date: '2024-01-13', lesson: 'The Wedding at Cana', teacher: 'Sister Johnson', attendance: 52 },
    { id: 3, date: '2024-01-20', lesson: 'Jesus and Nicodemus', teacher: 'Elder Brown', attendance: 48 }
  ];

  const outreachEvents = [
    { id: 1, event: 'Community Bible Study', date: '2024-01-15', participants: 25, location: 'Community Center' },
    { id: 2, event: 'Prison Ministry', date: '2024-01-22', participants: 8, location: 'County Jail' },
    { id: 3, event: 'Hospital Visitation', date: '2024-01-29', participants: 12, location: 'General Hospital' }
  ];

  const materials = [
    { id: 1, title: 'Quarterly Study Guide Q1 2024', type: 'PDF', uploadDate: '2024-01-01' },
    { id: 2, title: 'Teacher\'s Edition', type: 'PDF', uploadDate: '2024-01-01' },
    { id: 3, title: 'Youth Study Materials', type: 'DOC', uploadDate: '2024-01-05' }
  ];

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <LoadingSpinner size="large" />
      </div>
    );
  }

  const containerStyle = {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const tabStyle = (isActive) => ({
    padding: '0.75rem 1.5rem',
    backgroundColor: isActive ? '#007bff' : '#f8f9fa',
    color: isActive ? 'white' : '#333',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px 4px 0 0',
    marginRight: '0.5rem'
  });

  const gridStyle = {
    display: 'grid',
    gap: '1rem',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
  };

  return (
    <div style={containerStyle}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: '#2c3e50', marginBottom: '0.5rem' }}>📖 Sabbath School & Personal Ministries</h1>
        <p style={{ color: '#666' }}>Bible study schedules, spiritual growth programs, and outreach activities</p>
      </div>

      {/* Navigation Tabs */}
      <div style={{ marginBottom: '2rem', borderBottom: '1px solid #dee2e6' }}>
        <button onClick={() => setActiveTab('schedule')} style={tabStyle(activeTab === 'schedule')}>
          Schedule & Attendance
        </button>
        <button onClick={() => setActiveTab('outreach')} style={tabStyle(activeTab === 'outreach')}>
          Outreach Events
        </button>
        <button onClick={() => setActiveTab('materials')} style={tabStyle(activeTab === 'materials')}>
          Study Materials
        </button>
      </div>

      {/* Schedule & Attendance Tab */}
      {activeTab === 'schedule' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2>Bible Study Schedule</h2>
            {canManage && <Button variant="success">Add Lesson</Button>}
          </div>
          <Card>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8f9fa' }}>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Date</th>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Lesson</th>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Teacher</th>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Attendance</th>
                    {canManage && <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {scheduleData.map(item => (
                    <tr key={item.id}>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>
                        {new Date(item.date).toLocaleDateString()}
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>{item.lesson}</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>{item.teacher}</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>{item.attendance}</td>
                      {canManage && (
                        <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <Button size="small">Edit</Button>
                            <Button variant="danger" size="small">Delete</Button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* Outreach Events Tab */}
      {activeTab === 'outreach' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2>Outreach Activities</h2>
            {canManage && <Button variant="success">Add Event</Button>}
          </div>
          <div style={gridStyle}>
            {outreachEvents.map(event => (
              <Card key={event.id}>
                <h3 style={{ margin: '0 0 1rem 0', color: '#2c3e50' }}>{event.event}</h3>
                <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Participants:</strong> {event.participants}</p>
                {canManage && (
                  <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                    <Button size="small">Edit</Button>
                    <Button variant="danger" size="small">Delete</Button>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Study Materials Tab */}
      {activeTab === 'materials' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2>Study Materials</h2>
            {canManage && <Button variant="success">Upload Material</Button>}
          </div>
          <div style={gridStyle}>
            {materials.map(material => (
              <Card key={material.id}>
                <h3 style={{ margin: '0 0 1rem 0', color: '#2c3e50' }}>{material.title}</h3>
                <p><strong>Type:</strong> {material.type}</p>
                <p><strong>Uploaded:</strong> {new Date(material.uploadDate).toLocaleDateString()}</p>
                <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                  <Button size="small">Download</Button>
                  {canManage && (
                    <>
                      <Button size="small">Edit</Button>
                      <Button variant="danger" size="small">Delete</Button>
                    </>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SabbathSchool;