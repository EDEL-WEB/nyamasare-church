import React, { useState, useEffect } from 'react';
import { Card, Button, LoadingSpinner } from '../../components/UI';
import { useAuth } from '../../context/AuthContext';

const AdventistYouth = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('activities');

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const canManage = user?.role === 'admin' || user?.role === 'leader';

  const activities = [
    { id: 1, title: 'Pathfinder Camping Trip', date: '2024-01-20', type: 'Pathfinder', participants: 35, status: 'Upcoming' },
    { id: 2, title: 'AY Vespers Program', date: '2024-01-13', type: 'AY', participants: 28, status: 'Completed' },
    { id: 3, title: 'Adventurer Nature Walk', date: '2024-01-27', type: 'Adventurer', participants: 15, status: 'Upcoming' }
  ];

  const achievements = [
    { id: 1, member: 'John Smith', achievement: 'Friend Badge', dateEarned: '2024-01-10', category: 'Pathfinder' },
    { id: 2, member: 'Sarah Johnson', achievement: 'Master Guide', dateEarned: '2024-01-05', category: 'AY' },
    { id: 3, member: 'Mike Brown', achievement: 'Busy Bee', dateEarned: '2024-01-15', category: 'Adventurer' }
  ];

  const resources = [
    { id: 1, title: 'Pathfinder Handbook 2024', type: 'PDF', category: 'Pathfinder' },
    { id: 2, title: 'AY Program Ideas', type: 'DOC', category: 'AY' },
    { id: 3, title: 'Adventurer Activity Guide', type: 'PDF', category: 'Adventurer' }
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
    backgroundColor: isActive ? '#28a745' : '#f8f9fa',
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

  const statusBadge = (status) => ({
    padding: '0.25rem 0.5rem',
    borderRadius: '4px',
    fontSize: '0.875rem',
    backgroundColor: status === 'Completed' ? '#28a745' : '#ffc107',
    color: status === 'Completed' ? 'white' : '#000'
  });

  return (
    <div style={containerStyle}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: '#2c3e50', marginBottom: '0.5rem' }}>🏕️ Adventist Youth & Pathfinder</h1>
        <p style={{ color: '#666' }}>Youth activities, achievements tracking, and resource management</p>
      </div>

      {/* Navigation Tabs */}
      <div style={{ marginBottom: '2rem', borderBottom: '1px solid #dee2e6' }}>
        <button onClick={() => setActiveTab('activities')} style={tabStyle(activeTab === 'activities')}>
          Activities Calendar
        </button>
        <button onClick={() => setActiveTab('achievements')} style={tabStyle(activeTab === 'achievements')}>
          Achievements
        </button>
        <button onClick={() => setActiveTab('resources')} style={tabStyle(activeTab === 'resources')}>
          Resources
        </button>
      </div>

      {/* Activities Tab */}
      {activeTab === 'activities' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2>Youth Activities</h2>
            {canManage && <Button variant="success">Add Activity</Button>}
          </div>
          <div style={gridStyle}>
            {activities.map(activity => (
              <Card key={activity.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <h3 style={{ margin: 0, color: '#2c3e50' }}>{activity.title}</h3>
                  <span style={statusBadge(activity.status)}>{activity.status}</span>
                </div>
                <p><strong>Date:</strong> {new Date(activity.date).toLocaleDateString()}</p>
                <p><strong>Type:</strong> {activity.type}</p>
                <p><strong>Participants:</strong> {activity.participants}</p>
                {canManage && (
                  <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                    <Button size="small">Edit</Button>
                    <Button size="small" variant="secondary">Register</Button>
                    <Button variant="danger" size="small">Delete</Button>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Achievements Tab */}
      {activeTab === 'achievements' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2>Youth Achievements</h2>
            {canManage && <Button variant="success">Add Achievement</Button>}
          </div>
          <Card>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8f9fa' }}>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Member</th>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Achievement</th>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Category</th>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Date Earned</th>
                    {canManage && <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {achievements.map(achievement => (
                    <tr key={achievement.id}>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>{achievement.member}</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>{achievement.achievement}</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>
                        <span style={{
                          padding: '0.25rem 0.5rem',
                          borderRadius: '4px',
                          fontSize: '0.875rem',
                          backgroundColor: achievement.category === 'Pathfinder' ? '#007bff' : 
                                         achievement.category === 'AY' ? '#28a745' : '#ffc107',
                          color: achievement.category === 'Adventurer' ? '#000' : 'white'
                        }}>
                          {achievement.category}
                        </span>
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>
                        {new Date(achievement.dateEarned).toLocaleDateString()}
                      </td>
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

      {/* Resources Tab */}
      {activeTab === 'resources' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2>Youth Resources</h2>
            {canManage && <Button variant="success">Upload Resource</Button>}
          </div>
          <div style={gridStyle}>
            {resources.map(resource => (
              <Card key={resource.id}>
                <h3 style={{ margin: '0 0 1rem 0', color: '#2c3e50' }}>{resource.title}</h3>
                <p><strong>Type:</strong> {resource.type}</p>
                <p><strong>Category:</strong> 
                  <span style={{
                    marginLeft: '0.5rem',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.875rem',
                    backgroundColor: resource.category === 'Pathfinder' ? '#007bff' : 
                                   resource.category === 'AY' ? '#28a745' : '#ffc107',
                    color: resource.category === 'Adventurer' ? '#000' : 'white'
                  }}>
                    {resource.category}
                  </span>
                </p>
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

export default AdventistYouth;