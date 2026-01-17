import React, { useState, useEffect } from 'react';
import { Card, Button, LoadingSpinner } from '../../components/UI';
import { useAuth } from '../../context/AuthContext';

const Communication = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('announcements');

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const canManage = user?.role === 'admin' || user?.role === 'leader';

  const announcements = [
    { id: 1, title: 'Sabbath Service Changes', content: 'Service time changed to 10:30 AM', priority: 'High', status: 'Active' },
    { id: 2, title: 'Community Outreach Event', content: 'Join us for community service this Saturday', priority: 'Medium', status: 'Active' },
    { id: 3, title: 'Prayer Meeting', content: 'Wednesday evening prayer meeting at 7 PM', priority: 'Low', status: 'Active' }
  ];

  const mediaContent = [
    { id: 1, title: 'Weekly Radio Program', type: 'Radio', schedule: 'Sundays 8:00 AM', status: 'Live' },
    { id: 2, title: 'Church Facebook Page', type: 'Social Media', followers: '1,250', status: 'Active' },
    { id: 3, title: 'YouTube Channel', type: 'Video', subscribers: '850', status: 'Active' }
  ];

  const pressReleases = [
    { id: 1, title: 'Church Opens New Community Center', date: '2024-01-15', status: 'Published' },
    { id: 2, title: 'Annual Health Fair Announcement', date: '2024-01-10', status: 'Draft' },
    { id: 3, title: 'Youth Program Expansion', date: '2024-01-05', status: 'Published' }
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
    backgroundColor: isActive ? '#17a2b8' : '#f8f9fa',
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

  const priorityBadge = (priority) => ({
    padding: '0.25rem 0.5rem',
    borderRadius: '4px',
    fontSize: '0.875rem',
    backgroundColor: priority === 'High' ? '#dc3545' : priority === 'Medium' ? '#ffc107' : '#28a745',
    color: priority === 'Medium' ? '#000' : 'white'
  });

  const statusBadge = (status) => ({
    padding: '0.25rem 0.5rem',
    borderRadius: '4px',
    fontSize: '0.875rem',
    backgroundColor: status === 'Active' || status === 'Live' || status === 'Published' ? '#28a745' : '#6c757d',
    color: 'white'
  });

  return (
    <div style={containerStyle}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: '#2c3e50', marginBottom: '0.5rem' }}>📢 Communication Department</h1>
        <p style={{ color: '#666' }}>Church announcements, media management, and public relations</p>
      </div>

      {/* Navigation Tabs */}
      <div style={{ marginBottom: '2rem', borderBottom: '1px solid #dee2e6' }}>
        <button onClick={() => setActiveTab('announcements')} style={tabStyle(activeTab === 'announcements')}>
          Announcements
        </button>
        <button onClick={() => setActiveTab('media')} style={tabStyle(activeTab === 'media')}>
          Media Content
        </button>
        <button onClick={() => setActiveTab('press')} style={tabStyle(activeTab === 'press')}>
          Press Releases
        </button>
      </div>

      {/* Announcements Tab */}
      {activeTab === 'announcements' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2>Church Announcements</h2>
            {canManage && <Button variant="success">Create Announcement</Button>}
          </div>
          <div style={gridStyle}>
            {announcements.map(announcement => (
              <Card key={announcement.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <h3 style={{ margin: 0, color: '#2c3e50' }}>{announcement.title}</h3>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <span style={priorityBadge(announcement.priority)}>{announcement.priority}</span>
                    <span style={statusBadge(announcement.status)}>{announcement.status}</span>
                  </div>
                </div>
                <p style={{ color: '#666', marginBottom: '1rem' }}>{announcement.content}</p>
                {canManage && (
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Button size="small">Edit</Button>
                    <Button size="small" variant="secondary">Publish</Button>
                    <Button variant="danger" size="small">Delete</Button>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Media Content Tab */}
      {activeTab === 'media' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2>Media Management</h2>
            {canManage && <Button variant="success">Add Media Channel</Button>}
          </div>
          <div style={gridStyle}>
            {mediaContent.map(media => (
              <Card key={media.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <h3 style={{ margin: 0, color: '#2c3e50' }}>{media.title}</h3>
                  <span style={statusBadge(media.status)}>{media.status}</span>
                </div>
                <p><strong>Type:</strong> {media.type}</p>
                {media.schedule && <p><strong>Schedule:</strong> {media.schedule}</p>}
                {media.followers && <p><strong>Followers:</strong> {media.followers}</p>}
                {media.subscribers && <p><strong>Subscribers:</strong> {media.subscribers}</p>}
                {canManage && (
                  <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                    <Button size="small">Edit</Button>
                    <Button size="small" variant="secondary">View</Button>
                    <Button variant="danger" size="small">Delete</Button>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Press Releases Tab */}
      {activeTab === 'press' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2>Press Releases & News</h2>
            {canManage && <Button variant="success">Create Press Release</Button>}
          </div>
          <Card>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8f9fa' }}>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Title</th>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Date</th>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Status</th>
                    {canManage && <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {pressReleases.map(release => (
                    <tr key={release.id}>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>{release.title}</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>
                        {new Date(release.date).toLocaleDateString()}
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>
                        <span style={statusBadge(release.status)}>{release.status}</span>
                      </td>
                      {canManage && (
                        <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <Button size="small">Edit</Button>
                            <Button size="small" variant="secondary">Preview</Button>
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
    </div>
  );
};

export default Communication;