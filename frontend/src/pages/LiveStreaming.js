import React, { useState, useEffect } from 'react';
import { Card, Button, Input } from '../components/UI';
import { useAuth } from '../context/AuthContext';

const LiveStreaming = () => {
  const { user } = useAuth();
  const [isLive, setIsLive] = useState(true);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [sermonArchive, setSermonArchive] = useState([]);

  const mockSermons = [
    { id: 1, title: 'The Love of Christ', speaker: 'Pastor Johnson', date: '2024-01-13', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', views: 245 },
    { id: 2, title: 'Walking by Faith', speaker: 'Elder Smith', date: '2024-01-06', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', views: 189 },
    { id: 3, title: 'Hope in Jesus', speaker: 'Pastor Johnson', date: '2023-12-30', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', views: 312 }
  ];

  const mockChatMessages = [
    { id: 1, user: 'Sister Mary', message: 'Praise the Lord! 🙏', time: '11:05 AM' },
    { id: 2, user: 'Brother John', message: 'Amen to that message!', time: '11:07 AM' },
    { id: 3, user: 'Elder Smith', message: 'Please remember our prayer requests', time: '11:10 AM' }
  ];

  useEffect(() => {
    setSermonArchive(mockSermons);
    setChatMessages(mockChatMessages);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        user: `${user.first_name} ${user.last_name}`,
        message: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages([...chatMessages, message]);
      setNewMessage('');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      <h1 style={{ color: '#2c3e50', marginBottom: '2rem' }}>📺 Live Streaming & Sermons</h1>

      {/* Live Stream Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
        {/* Video Player */}
        <Card>
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
            {isLive ? (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.5rem'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ backgroundColor: '#e74c3c', padding: '0.5rem 1rem', borderRadius: '20px', marginBottom: '1rem', display: 'inline-block' }}>
                    🔴 LIVE
                  </div>
                  <div>Sabbath Service - 11:00 AM</div>
                  <div style={{ fontSize: '1rem', marginTop: '0.5rem', opacity: 0.8 }}>245 viewers</div>
                </div>
              </div>
            ) : (
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                frameBorder="0"
                allowFullScreen
                title="Church Service"
              />
            )}
          </div>
          <div style={{ padding: '1rem' }}>
            <h3 style={{ marginBottom: '0.5rem' }}>Current Service: Divine Worship</h3>
            <p style={{ color: '#666' }}>Pastor Johnson - "The Power of Prayer"</p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <Button variant={isLive ? 'danger' : 'success'} onClick={() => setIsLive(!isLive)}>
                {isLive ? 'End Stream' : 'Go Live'}
              </Button>
              <Button variant="secondary">Share Stream</Button>
            </div>
          </div>
        </Card>

        {/* Live Chat */}
        <Card>
          <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid #dee2e6', paddingBottom: '0.5rem' }}>
            💬 Live Chat {isLive && <span style={{ color: '#28a745' }}>({chatMessages.length} messages)</span>}
          </h3>
          
          <div style={{ height: '300px', overflowY: 'auto', marginBottom: '1rem', border: '1px solid #dee2e6', borderRadius: '4px', padding: '0.5rem' }}>
            {chatMessages.map(msg => (
              <div key={msg.id} style={{ marginBottom: '0.5rem', padding: '0.5rem', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.25rem' }}>
                  <strong>{msg.user}</strong> - {msg.time}
                </div>
                <div>{msg.message}</div>
              </div>
            ))}
          </div>

          {isLive && (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                style={{ flex: 1 }}
              />
              <Button onClick={sendMessage}>Send</Button>
            </div>
          )}
        </Card>
      </div>

      {/* Sermon Archive */}
      <Card>
        <h2 style={{ marginBottom: '2rem', color: '#2c3e50' }}>🎥 Sermon Archive</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
          {sermonArchive.map(sermon => (
            <div key={sermon.id} style={{ border: '1px solid #dee2e6', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                <iframe
                  src={sermon.videoUrl}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  frameBorder="0"
                  allowFullScreen
                  title={sermon.title}
                />
              </div>
              <div style={{ padding: '1rem' }}>
                <h3 style={{ marginBottom: '0.5rem' }}>{sermon.title}</h3>
                <p style={{ color: '#666', marginBottom: '0.5rem' }}>by {sermon.speaker}</p>
                <p style={{ fontSize: '0.9rem', color: '#999', marginBottom: '1rem' }}>
                  {new Date(sermon.date).toLocaleDateString()} • {sermon.views} views
                </p>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Button size="small">Watch</Button>
                  <Button size="small" variant="secondary">Download</Button>
                  <Button size="small" variant="secondary">Share</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Stream Controls (Admin Only) */}
      {(user?.role === 'admin' || user?.role === 'leader') && (
        <Card style={{ marginTop: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>🎛️ Stream Controls</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button variant="success">Start Recording</Button>
            <Button variant="secondary">Switch Camera</Button>
            <Button variant="secondary">Adjust Audio</Button>
            <Button variant="secondary">Screen Share</Button>
            <Button variant="danger">Emergency Stop</Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default LiveStreaming;