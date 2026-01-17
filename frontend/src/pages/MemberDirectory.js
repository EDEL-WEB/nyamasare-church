import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Input, TextArea } from '../components/UI';
import { useAuth } from '../context/AuthContext';

const MemberDirectory = () => {
  const { user } = useAuth();
  const [members, setMembers] = useState([]);
  const [prayerRequests, setPrayerRequests] = useState([]);
  const [showPrayerForm, setShowPrayerForm] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const mockMembers = [
    { id: 1, name: 'John Smith', role: 'Elder', department: 'Sabbath School', phone: '+233 XXX XXX', email: 'john@church.com', birthday: '1975-03-15', photo: '👨', status: 'online' },
    { id: 2, name: 'Mary Johnson', role: 'Deaconess', department: 'Health Ministry', phone: '+233 XXX XXX', email: 'mary@church.com', birthday: '1980-07-22', photo: '👩', status: 'offline' },
    { id: 3, name: 'David Brown', role: 'Youth Leader', department: 'AY', phone: '+233 XXX XXX', email: 'david@church.com', birthday: '1990-11-08', photo: '👨', status: 'online' },
    { id: 4, name: 'Sarah Wilson', role: 'Member', department: 'Children Ministry', phone: '+233 XXX XXX', email: 'sarah@church.com', birthday: '1985-12-03', photo: '👩', status: 'online' }
  ];

  const mockPrayerRequests = [
    { id: 1, member: 'Mary Johnson', request: 'Please pray for my mother\'s health recovery', category: 'Health', date: '2024-01-10', urgent: true },
    { id: 2, member: 'John Smith', request: 'Thanksgiving for new job opportunity', category: 'Thanksgiving', date: '2024-01-09', urgent: false },
    { id: 3, member: 'David Brown', request: 'Pray for our youth camp preparations', category: 'Ministry', date: '2024-01-08', urgent: false }
  ];

  useEffect(() => {
    setMembers(mockMembers);
    setPrayerRequests(mockPrayerRequests);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const upcomingBirthdays = members.filter(member => {
    const today = new Date();
    const birthday = new Date(member.birthday);
    const thisYear = today.getFullYear();
    const birthdayThisYear = new Date(thisYear, birthday.getMonth(), birthday.getDate());
    const daysUntil = Math.ceil((birthdayThisYear - today) / (1000 * 60 * 60 * 24));
    return daysUntil >= 0 && daysUntil <= 30;
  });

  const sendMessage = (member) => {
    setSelectedMember(member);
    setShowMessageModal(true);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      <h1 style={{ color: '#2c3e50', marginBottom: '2rem' }}>👥 Member Directory & Community</h1>

      {/* Search and Quick Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        <Card>
          <Input
            placeholder="Search members by name or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ fontSize: '1.1rem' }}
          />
        </Card>
        <Card>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ color: '#2c3e50', marginBottom: '0.5rem' }}>Quick Stats</h3>
            <p>Total Members: <strong>{members.length}</strong></p>
            <p>Online Now: <strong>{members.filter(m => m.status === 'online').length}</strong></p>
          </div>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        {/* Member Directory */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ color: '#2c3e50' }}>Member Directory</h2>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button size="small" variant="secondary">Grid View</Button>
              <Button size="small">List View</Button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
            {filteredMembers.map(member => (
              <Card key={member.id}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ fontSize: '3rem', position: 'relative' }}>
                    {member.photo}
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: member.status === 'online' ? '#28a745' : '#6c757d',
                      border: '2px solid white'
                    }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: '0 0 0.25rem 0', color: '#2c3e50' }}>{member.name}</h3>
                    <p style={{ margin: '0 0 0.25rem 0', color: '#666', fontSize: '0.9rem' }}>{member.role}</p>
                    <p style={{ margin: 0, color: '#999', fontSize: '0.8rem' }}>{member.department}</p>
                  </div>
                </div>
                
                <div style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
                  <p style={{ margin: '0.25rem 0' }}>📞 {member.phone}</p>
                  <p style={{ margin: '0.25rem 0' }}>📧 {member.email}</p>
                  <p style={{ margin: '0.25rem 0' }}>🎂 {new Date(member.birthday).toLocaleDateString()}</p>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Button size="small" onClick={() => sendMessage(member)}>Message</Button>
                  <Button size="small" variant="secondary">Profile</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div>
          {/* Upcoming Birthdays */}
          <Card style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#2c3e50', marginBottom: '1rem' }}>🎂 Upcoming Birthdays</h3>
            {upcomingBirthdays.length > 0 ? (
              upcomingBirthdays.map(member => (
                <div key={member.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', padding: '0.5rem', backgroundColor: '#fff3cd', borderRadius: '4px' }}>
                  <span style={{ fontSize: '1.5rem' }}>{member.photo}</span>
                  <div>
                    <div style={{ fontWeight: 'bold' }}>{member.name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>
                      {new Date(member.birthday).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ color: '#666', fontStyle: 'italic' }}>No upcoming birthdays</p>
            )}
          </Card>

          {/* Prayer Requests */}
          <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ color: '#2c3e50', margin: 0 }}>🙏 Prayer Requests</h3>
              <Button size="small" variant="success" onClick={() => setShowPrayerForm(true)}>
                Add Request
              </Button>
            </div>

            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {prayerRequests.map(request => (
                <div key={request.id} style={{ 
                  marginBottom: '1rem', 
                  padding: '1rem', 
                  border: `1px solid ${request.urgent ? '#dc3545' : '#dee2e6'}`, 
                  borderRadius: '4px',
                  backgroundColor: request.urgent ? '#fff5f5' : 'white'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{request.member}</span>
                    {request.urgent && (
                      <span style={{ backgroundColor: '#dc3545', color: 'white', padding: '0.1rem 0.3rem', borderRadius: '3px', fontSize: '0.7rem' }}>
                        URGENT
                      </span>
                    )}
                  </div>
                  <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>{request.request}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: '#666' }}>
                    <span>{request.category}</span>
                    <span>{new Date(request.date).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Message Modal */}
      <Modal isOpen={showMessageModal} onClose={() => setShowMessageModal(false)} title={`Message ${selectedMember?.name}`}>
        <div style={{ marginBottom: '1rem' }}>
          <p><strong>To:</strong> {selectedMember?.name}</p>
          <p><strong>From:</strong> {user?.first_name} {user?.last_name}</p>
          <p><strong>Department:</strong> {selectedMember?.department}</p>
        </div>
        <TextArea placeholder="Type your message here..." rows={4} />
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
          <Button variant="secondary" onClick={() => setShowMessageModal(false)}>Cancel</Button>
          <Button variant="success">Send Message</Button>
        </div>
      </Modal>

      {/* Prayer Request Form */}
      <Modal isOpen={showPrayerForm} onClose={() => setShowPrayerForm(false)} title="Submit Prayer Request">
        <form>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="checkbox" />
              <span>Mark as urgent</span>
            </label>
          </div>
          <Input label="Category" placeholder="Health, Family, Ministry, Thanksgiving, etc." />
          <TextArea label="Prayer Request" placeholder="Please share your prayer request..." rows={4} />
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <Button variant="secondary" onClick={() => setShowPrayerForm(false)}>Cancel</Button>
            <Button variant="success">Submit Request</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default MemberDirectory;