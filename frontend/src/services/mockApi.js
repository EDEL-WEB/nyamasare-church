// Mock data for frontend development without backend
const mockData = {
  announcements: [
    { id: 1, title: 'Sabbath Service Changes', content: 'Service time changed to 10:30 AM starting next week', author: 'Pastor Johnson', created_at: '2024-01-15T10:00:00Z' },
    { id: 2, title: 'Community Outreach Event', content: 'Join us for community service this Saturday at 9 AM', author: 'Elder Smith', created_at: '2024-01-14T15:30:00Z' },
    { id: 3, title: 'Prayer Meeting', content: 'Wednesday evening prayer meeting at 7 PM in the sanctuary', author: 'Sister Mary', created_at: '2024-01-13T12:00:00Z' }
  ],
  events: [
    { id: 1, title: 'Youth Camp 2024', description: 'Annual youth camping trip', event_date: '2024-02-15T09:00:00Z', location: 'Pine Valley Camp', organizer: 'Elder Brown' },
    { id: 2, title: 'Health Fair', description: 'Free health screenings for the community', event_date: '2024-02-20T10:00:00Z', location: 'Church Fellowship Hall', organizer: 'Dr. Wilson' },
    { id: 3, title: 'Evangelistic Series', description: 'Week-long evangelistic meetings', event_date: '2024-03-01T19:00:00Z', location: 'Main Sanctuary', organizer: 'Pastor Johnson' }
  ],
  sermons: [
    { id: 1, title: 'The Love of Christ', speaker: 'Pastor Johnson', scripture: 'John 3:16', sermon_date: '2024-01-13', audio_url: 'https://example.com/audio1', video_url: 'https://example.com/video1' },
    { id: 2, title: 'Walking by Faith', speaker: 'Elder Smith', scripture: '2 Corinthians 5:7', sermon_date: '2024-01-06', audio_url: 'https://example.com/audio2', video_url: '' },
    { id: 3, title: 'Hope in Jesus', speaker: 'Pastor Johnson', scripture: 'Romans 15:13', sermon_date: '2023-12-30', audio_url: '', video_url: 'https://example.com/video3' }
  ],
  departments: [
    { id: 1, name: 'Sabbath School', description: 'Bible study and spiritual growth programs', member_count: 45 },
    { id: 2, name: 'Youth Ministries', description: 'Programs for young people and teenagers', member_count: 28 },
    { id: 3, name: 'Health Ministries', description: 'Health education and wellness programs', member_count: 22 },
    { id: 4, name: 'Family Ministries', description: 'Programs supporting families and relationships', member_count: 35 }
  ],
  members: [
    { id: 1, email: 'admin@church.com', first_name: 'Admin', last_name: 'User', role: 'admin', department: 'Administration' },
    { id: 2, email: 'pastor@church.com', first_name: 'John', last_name: 'Johnson', role: 'leader', department: 'Pastoral' },
    { id: 3, email: 'elder@church.com', first_name: 'Robert', last_name: 'Smith', role: 'leader', department: 'Sabbath School' },
    { id: 4, email: 'member@church.com', first_name: 'Mary', last_name: 'Wilson', role: 'member', department: 'Health Ministries' }
  ]
};

// Mock API service that returns promises with mock data
export const mockApiService = {
  // Announcements
  getAnnouncements: () => Promise.resolve({ data: mockData.announcements }),
  createAnnouncement: (data) => {
    const newItem = { ...data, id: Date.now(), author: 'Current User', created_at: new Date().toISOString() };
    mockData.announcements.unshift(newItem);
    return Promise.resolve({ data: newItem });
  },
  updateAnnouncement: (id, data) => {
    const index = mockData.announcements.findIndex(item => item.id === id);
    if (index !== -1) {
      mockData.announcements[index] = { ...mockData.announcements[index], ...data };
    }
    return Promise.resolve({ data: mockData.announcements[index] });
  },
  deleteAnnouncement: (id) => {
    mockData.announcements = mockData.announcements.filter(item => item.id !== id);
    return Promise.resolve({ data: { message: 'Deleted' } });
  },

  // Events
  getEvents: () => Promise.resolve({ data: mockData.events }),
  createEvent: (data) => {
    const newItem = { ...data, id: Date.now(), organizer: 'Current User' };
    mockData.events.unshift(newItem);
    return Promise.resolve({ data: newItem });
  },
  updateEvent: (id, data) => {
    const index = mockData.events.findIndex(item => item.id === id);
    if (index !== -1) {
      mockData.events[index] = { ...mockData.events[index], ...data };
    }
    return Promise.resolve({ data: mockData.events[index] });
  },
  deleteEvent: (id) => {
    mockData.events = mockData.events.filter(item => item.id !== id);
    return Promise.resolve({ data: { message: 'Deleted' } });
  },

  // Departments
  getDepartments: () => Promise.resolve({ data: mockData.departments }),
  createDepartment: (data) => {
    const newItem = { ...data, id: Date.now(), member_count: 0 };
    mockData.departments.push(newItem);
    return Promise.resolve({ data: newItem });
  },
  updateDepartment: (id, data) => {
    const index = mockData.departments.findIndex(item => item.id === id);
    if (index !== -1) {
      mockData.departments[index] = { ...mockData.departments[index], ...data };
    }
    return Promise.resolve({ data: mockData.departments[index] });
  },
  deleteDepartment: (id) => {
    mockData.departments = mockData.departments.filter(item => item.id !== id);
    return Promise.resolve({ data: { message: 'Deleted' } });
  },

  // Sermons
  getSermons: () => Promise.resolve({ data: mockData.sermons }),
  createSermon: (data) => {
    const newItem = { ...data, id: Date.now() };
    mockData.sermons.unshift(newItem);
    return Promise.resolve({ data: newItem });
  },
  updateSermon: (id, data) => {
    const index = mockData.sermons.findIndex(item => item.id === id);
    if (index !== -1) {
      mockData.sermons[index] = { ...mockData.sermons[index], ...data };
    }
    return Promise.resolve({ data: mockData.sermons[index] });
  },
  deleteSermon: (id) => {
    mockData.sermons = mockData.sermons.filter(item => item.id !== id);
    return Promise.resolve({ data: { message: 'Deleted' } });
  },

  // Members
  getMembers: () => Promise.resolve({ data: mockData.members }),
  registerUser: (data) => {
    const newItem = { ...data, id: Date.now() };
    mockData.members.push(newItem);
    return Promise.resolve({ data: newItem });
  },
  updateUser: (id, data) => {
    const index = mockData.members.findIndex(item => item.id === id);
    if (index !== -1) {
      mockData.members[index] = { ...mockData.members[index], ...data };
    }
    return Promise.resolve({ data: mockData.members[index] });
  },
  deleteUser: (id) => {
    mockData.members = mockData.members.filter(item => item.id !== id);
    return Promise.resolve({ data: { message: 'Deleted' } });
  }
};