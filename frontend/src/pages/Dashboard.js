import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/api';
import { Button, Card, LoadingSpinner } from '../components/UI';
import { AnnouncementForm, EventForm, SermonForm, DepartmentForm } from '../components/Forms';

const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents] = useState([]);
  const [sermons, setSermons] = useState([]);
  const [departments, setDepartments] = useState([]);
  
  // Modal states
  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);
  const [showSermonForm, setShowSermonForm] = useState(false);
  const [showDepartmentForm, setShowDepartmentForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    loadData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [announcementsRes, eventsRes, sermonsRes, departmentsRes] = await Promise.all([
        apiService.getAnnouncements(),
        apiService.getEvents(),
        apiService.getSermons(),
        apiService.getDepartments()
      ]);

      setAnnouncements(announcementsRes.data);
      setEvents(eventsRes.data);
      setSermons(sermonsRes.data);
      setDepartments(departmentsRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
    }
    setLoading(false);
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    
    try {
      switch (type) {
        case 'announcement':
          await apiService.deleteAnnouncement(id);
          break;
        case 'event':
          await apiService.deleteEvent(id);
          break;
        case 'sermon':
          await apiService.deleteSermon(id);
          break;
        case 'department':
          await apiService.deleteDepartment(id);
          break;
        default:
          console.error('Unknown type:', type);
          return;
      }
      loadData();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleSubmit = async (type, data) => {
    try {
      if (editingItem) {
        switch (type) {
          case 'announcement':
            await apiService.updateAnnouncement(editingItem.id, data);
            break;
          case 'event':
            await apiService.updateEvent(editingItem.id, data);
            break;
          case 'sermon':
            await apiService.updateSermon(editingItem.id, data);
            break;
          case 'department':
            await apiService.updateDepartment(editingItem.id, data);
            break;
          default:
            console.error('Unknown type:', type);
            return;
        }
      } else {
        switch (type) {
          case 'announcement':
            await apiService.createAnnouncement(data);
            break;
          case 'event':
            await apiService.createEvent(data);
            break;
          case 'sermon':
            await apiService.createSermon(data);
            break;
          case 'department':
            await apiService.createDepartment(data);
            break;
          default:
            console.error('Unknown type:', type);
            return;
        }
      }
      setEditingItem(null);
      loadData();
    } catch (error) {
      console.error('Error submitting:', error);
    }
  };

  const canManage = user.role === 'admin' || user.role === 'leader';

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

  const gridStyle = {
    display: 'grid',
    gap: '1rem',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))'
  };

  const statsStyle = {
    display: 'grid',
    gap: '1rem',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    marginBottom: '2rem'
  };

  const statCardStyle = {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    textAlign: 'center'
  };

  return (
    <div style={containerStyle}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: '#2c3e50', marginBottom: '0.5rem' }}>Dashboard Overview</h1>
        <p style={{ color: '#666' }}>Welcome to the SDA Church Portal, {user.first_name}!</p>
      </div>

      {/* Statistics Cards */}
      <div style={statsStyle}>
        <div style={statCardStyle}>
          <h3 style={{ color: '#007bff', margin: '0 0 0.5rem 0' }}>Announcements</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{announcements.length}</p>
        </div>
        <div style={statCardStyle}>
          <h3 style={{ color: '#28a745', margin: '0 0 0.5rem 0' }}>Upcoming Events</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{events.length}</p>
        </div>
        <div style={statCardStyle}>
          <h3 style={{ color: '#ffc107', margin: '0 0 0.5rem 0' }}>Sermons</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#000' }}>{sermons.length}</p>
        </div>
        <div style={statCardStyle}>
          <h3 style={{ color: '#17a2b8', margin: '0 0 0.5rem 0' }}>Departments</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{departments.length}</p>
        </div>
      </div>

      {/* Recent Announcements */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2>Recent Announcements</h2>
          {canManage && (
            <Button variant="success" onClick={() => setShowAnnouncementForm(true)}>
              Add Announcement
            </Button>
          )}
        </div>
        <div style={gridStyle}>
          {announcements.slice(0, 3).map(announcement => (
            <Card key={announcement.id}>
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>{announcement.title}</h3>
              <p style={{ margin: '0 0 1rem 0', color: '#666' }}>{announcement.content}</p>
              <small style={{ color: '#999' }}>By {announcement.author} on {new Date(announcement.created_at).toLocaleDateString()}</small>
              {canManage && (
                <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                  <Button size="small" onClick={() => { setEditingItem(announcement); setShowAnnouncementForm(true); }}>Edit</Button>
                  <Button variant="danger" size="small" onClick={() => handleDelete('announcement', announcement.id)}>Delete</Button>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2>Upcoming Events</h2>
          {canManage && (
            <Button variant="success" onClick={() => setShowEventForm(true)}>
              Add Event
            </Button>
          )}
        </div>
        <div style={gridStyle}>
          {events.slice(0, 3).map(event => (
            <Card key={event.id}>
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>{event.title}</h3>
              <p style={{ margin: '0 0 0.5rem 0', color: '#666' }}>{event.description}</p>
              <p style={{ margin: '0 0 0.5rem 0' }}><strong>Date:</strong> {new Date(event.event_date).toLocaleString()}</p>
              <p style={{ margin: '0 0 1rem 0' }}><strong>Location:</strong> {event.location}</p>
              <small style={{ color: '#999' }}>Organized by {event.organizer}</small>
              {canManage && (
                <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                  <Button size="small" onClick={() => { setEditingItem(event); setShowEventForm(true); }}>Edit</Button>
                  <Button variant="danger" size="small" onClick={() => handleDelete('event', event.id)}>Delete</Button>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Forms */}
      <AnnouncementForm
        isOpen={showAnnouncementForm}
        onClose={() => { setShowAnnouncementForm(false); setEditingItem(null); }}
        onSubmit={(data) => handleSubmit('announcement', data)}
        initialData={editingItem}
      />
      <EventForm
        isOpen={showEventForm}
        onClose={() => { setShowEventForm(false); setEditingItem(null); }}
        onSubmit={(data) => handleSubmit('event', data)}
        initialData={editingItem}
      />
      <SermonForm
        isOpen={showSermonForm}
        onClose={() => { setShowSermonForm(false); setEditingItem(null); }}
        onSubmit={(data) => handleSubmit('sermon', data)}
        initialData={editingItem}
      />
      <DepartmentForm
        isOpen={showDepartmentForm}
        onClose={() => { setShowDepartmentForm(false); setEditingItem(null); }}
        onSubmit={(data) => handleSubmit('department', data)}
        initialData={editingItem}
      />
    </div>
  );
};

export default Dashboard;