import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Input, TextArea } from '../components/UI';
import { useAuth } from '../context/AuthContext';

const ChurchCalendar = () => {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [draggedEvent, setDraggedEvent] = useState(null);

  const mockEvents = [
    { id: 1, title: 'Sabbath School', date: '2024-01-13', time: '09:30', type: 'recurring', rsvp: 45, maxRsvp: 100, description: 'Weekly Bible study' },
    { id: 2, title: 'Divine Service', date: '2024-01-13', time: '11:00', type: 'recurring', rsvp: 120, maxRsvp: 200, description: 'Main worship service' },
    { id: 3, title: 'Youth Camp', date: '2024-01-20', time: '09:00', type: 'special', rsvp: 25, maxRsvp: 50, description: 'Annual youth camping trip' },
    { id: 4, title: 'Prayer Meeting', date: '2024-01-17', time: '19:00', type: 'recurring', rsvp: 30, maxRsvp: 60, description: 'Midweek prayer service' }
  ];

  useEffect(() => {
    setEvents(mockEvents);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    return days;
  };

  const getEventsForDay = (day) => {
    if (!day) return [];
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => event.date === dateStr);
  };

  const handleRSVP = (eventId) => {
    setEvents(events.map(event => 
      event.id === eventId 
        ? { ...event, rsvp: event.rsvp + 1 }
        : event
    ));
  };

  const handleDragStart = (e, event) => {
    setDraggedEvent(event);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, day) => {
    e.preventDefault();
    if (draggedEvent && day) {
      const newDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      setEvents(events.map(event => 
        event.id === draggedEvent.id 
          ? { ...event, date: newDate }
          : event
      ));
      setDraggedEvent(null);
    }
  };

  const days = getDaysInMonth(currentDate);
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const canManage = user?.role === 'admin' || user?.role === 'leader';

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#2c3e50' }}>📅 Church Calendar</h1>
        {canManage && (
          <Button variant="success" onClick={() => setShowEventForm(true)}>
            Add Event
          </Button>
        )}
      </div>

      {/* Calendar Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <Button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}>
          ← Previous
        </Button>
        <h2 style={{ color: '#2c3e50' }}>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <Button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}>
          Next →
        </Button>
      </div>

      {/* Calendar Grid */}
      <Card>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px', backgroundColor: '#dee2e6' }}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} style={{ backgroundColor: '#f8f9fa', padding: '1rem', textAlign: 'center', fontWeight: 'bold' }}>
              {day}
            </div>
          ))}
          
          {days.map((day, index) => (
            <div
              key={index}
              style={{
                backgroundColor: 'white',
                minHeight: '120px',
                padding: '0.5rem',
                border: day ? '1px solid #dee2e6' : 'none',
                position: 'relative'
              }}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, day)}
            >
              {day && (
                <>
                  <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{day}</div>
                  {getEventsForDay(day).map(event => (
                    <div
                      key={event.id}
                      draggable={canManage}
                      onDragStart={(e) => handleDragStart(e, event)}
                      onClick={() => setSelectedEvent(event)}
                      style={{
                        backgroundColor: event.type === 'recurring' ? '#e3f2fd' : '#fff3e0',
                        padding: '0.25rem',
                        marginBottom: '0.25rem',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        cursor: 'pointer',
                        border: `1px solid ${event.type === 'recurring' ? '#2196f3' : '#ff9800'}`
                      }}
                    >
                      <div style={{ fontWeight: 'bold' }}>{event.title}</div>
                      <div>{event.time}</div>
                      <div>RSVP: {event.rsvp}/{event.maxRsvp}</div>
                    </div>
                  ))}
                </>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Event Details Modal */}
      {selectedEvent && (
        <Modal isOpen={true} onClose={() => setSelectedEvent(null)} title={selectedEvent.title}>
          <div style={{ marginBottom: '1rem' }}>
            <p><strong>Date:</strong> {new Date(selectedEvent.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> {selectedEvent.time}</p>
            <p><strong>Type:</strong> {selectedEvent.type}</p>
            <p><strong>Description:</strong> {selectedEvent.description}</p>
            <p><strong>RSVP:</strong> {selectedEvent.rsvp}/{selectedEvent.maxRsvp}</p>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Button variant="success" onClick={() => handleRSVP(selectedEvent.id)}>
              RSVP ({selectedEvent.rsvp}/{selectedEvent.maxRsvp})
            </Button>
            <Button variant="secondary" onClick={() => setSelectedEvent(null)}>
              Close
            </Button>
          </div>
        </Modal>
      )}

      {/* Add Event Form */}
      <Modal isOpen={showEventForm} onClose={() => setShowEventForm(false)} title="Add New Event">
        <form>
          <Input label="Event Title" placeholder="Enter event title" />
          <Input label="Date" type="date" />
          <Input label="Time" type="time" />
          <Input label="Max RSVP" type="number" placeholder="Maximum attendees" />
          <TextArea label="Description" placeholder="Event description" />
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <Button variant="secondary" onClick={() => setShowEventForm(false)}>Cancel</Button>
            <Button variant="success">Create Event</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ChurchCalendar;