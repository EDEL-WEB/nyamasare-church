import React, { useState, useEffect } from 'react';
import { Card, Button, LoadingSpinner } from '../../components/UI';
import { useAuth } from '../../context/AuthContext';

export const HealthMinistries = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const programs = [
    { id: 1, title: 'Health Screening Program', date: '2024-01-20', participants: 45, status: 'Upcoming' },
    { id: 2, title: 'Nutrition Workshop', date: '2024-01-15', participants: 30, status: 'Completed' },
    { id: 3, title: 'Mental Health Seminar', date: '2024-01-25', participants: 25, status: 'Upcoming' }
  ];

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}><LoadingSpinner size="large" /></div>;

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#2c3e50', marginBottom: '0.5rem' }}>🏥 Health Ministries</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>Health education programs and wellness initiatives</p>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Health Programs</h2>
        {(user?.role === 'admin' || user?.role === 'leader') && <Button variant="success">Add Program</Button>}
      </div>
      
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        {programs.map(program => (
          <Card key={program.id}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#2c3e50' }}>{program.title}</h3>
            <p><strong>Date:</strong> {new Date(program.date).toLocaleDateString()}</p>
            <p><strong>Participants:</strong> {program.participants}</p>
            <p><strong>Status:</strong> 
              <span style={{
                marginLeft: '0.5rem',
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
                fontSize: '0.875rem',
                backgroundColor: program.status === 'Completed' ? '#28a745' : '#ffc107',
                color: program.status === 'Completed' ? 'white' : '#000'
              }}>
                {program.status}
              </span>
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export const FamilyMinistries = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const programs = [
    { id: 1, title: 'Marriage Enrichment Seminar', date: '2024-01-28', couples: 15, status: 'Upcoming' },
    { id: 2, title: 'Parenting Workshop', date: '2024-01-14', participants: 25, status: 'Completed' },
    { id: 3, title: 'Family Game Night', date: '2024-02-03', families: 20, status: 'Upcoming' }
  ];

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}><LoadingSpinner size="large" /></div>;

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#2c3e50', marginBottom: '0.5rem' }}>👨‍👩‍👧‍👦 Family Ministries</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>Family programs, counseling resources, and relationship building</p>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Family Programs</h2>
        {(user?.role === 'admin' || user?.role === 'leader') && <Button variant="success">Add Program</Button>}
      </div>
      
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        {programs.map(program => (
          <Card key={program.id}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#2c3e50' }}>{program.title}</h3>
            <p><strong>Date:</strong> {new Date(program.date).toLocaleDateString()}</p>
            <p><strong>Participants:</strong> {program.couples || program.participants || program.families}</p>
            <p><strong>Status:</strong> 
              <span style={{
                marginLeft: '0.5rem',
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
                fontSize: '0.875rem',
                backgroundColor: program.status === 'Completed' ? '#28a745' : '#ffc107',
                color: program.status === 'Completed' ? 'white' : '#000'
              }}>
                {program.status}
              </span>
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export const PARL = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const campaigns = [
    { id: 1, title: 'Religious Freedom Awareness', status: 'Active', participants: 150 },
    { id: 2, title: 'Community Rights Advocacy', status: 'Planning', participants: 75 },
    { id: 3, title: 'Legal Education Workshop', status: 'Completed', participants: 45 }
  ];

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}><LoadingSpinner size="large" /></div>;

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#2c3e50', marginBottom: '0.5rem' }}>⚖️ Public Affairs & Religious Liberty</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>Legal advocacy, religious freedom, and community engagement</p>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>PARL Campaigns</h2>
        {user?.role === 'admin' && <Button variant="success">Add Campaign</Button>}
      </div>
      
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        {campaigns.map(campaign => (
          <Card key={campaign.id}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#2c3e50' }}>{campaign.title}</h3>
            <p><strong>Participants:</strong> {campaign.participants}</p>
            <p><strong>Status:</strong> 
              <span style={{
                marginLeft: '0.5rem',
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
                fontSize: '0.875rem',
                backgroundColor: campaign.status === 'Active' ? '#28a745' : 
                               campaign.status === 'Planning' ? '#ffc107' : '#6c757d',
                color: campaign.status === 'Planning' ? '#000' : 'white'
              }}>
                {campaign.status}
              </span>
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export const ChildrensMinistries = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const programs = [
    { id: 1, title: 'Cradle Roll (0-3 years)', teacher: 'Sister Mary', children: 12, status: 'Active' },
    { id: 2, title: 'Kindergarten (4-6 years)', teacher: 'Sister Jane', children: 18, status: 'Active' },
    { id: 3, title: 'Primary (7-9 years)', teacher: 'Brother Tom', children: 22, status: 'Active' }
  ];

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}><LoadingSpinner size="large" /></div>;

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#2c3e50', marginBottom: '0.5rem' }}>👶 Children's Ministries</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>Sunday school programs, lesson plans, and children's activities</p>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Children's Programs</h2>
        {(user?.role === 'admin' || user?.role === 'leader') && <Button variant="success">Add Program</Button>}
      </div>
      
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        {programs.map(program => (
          <Card key={program.id}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#2c3e50' }}>{program.title}</h3>
            <p><strong>Teacher:</strong> {program.teacher}</p>
            <p><strong>Children:</strong> {program.children}</p>
            <p><strong>Status:</strong> 
              <span style={{
                marginLeft: '0.5rem',
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
                fontSize: '0.875rem',
                backgroundColor: '#28a745',
                color: 'white'
              }}>
                {program.status}
              </span>
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};