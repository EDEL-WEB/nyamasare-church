import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/UI';
import sdaLogo from '../assets/sda_logo.png';
import './Home.css';

const Home = () => {
  const [isDark, setIsDark] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.body.classList.add('dark');
    }
  }, []);

  // Data used by the homepage (defined before effects that reference them)
  const upcomingEvents = [
    { id: 1, title: 'Sabbath Divine Service', date: '2024-01-13', time: '11:00 AM', location: 'Main Sanctuary' },
    { id: 2, title: 'Youth Camp Registration', date: '2024-01-20', time: '9:00 AM', location: 'Youth Hall' },
    { id: 3, title: 'Health Fair', date: '2024-01-27', time: '10:00 AM', location: 'Fellowship Hall' }
  ];

  const recentSermons = [
    { id: 1, title: 'The Power of Prayer', speaker: 'Pastor Johnson', date: '2024-01-06' },
    { id: 2, title: 'Walking in Faith', speaker: 'Elder Smith', date: '2023-12-30' },
    { id: 3, title: "God's Love for Us", speaker: 'Pastor Johnson', date: '2023-12-23' }
  ];

  const ministries = [
    { name: 'Sabbath School', icon: '📖', description: 'Bible study and spiritual growth for all ages' },
    { name: 'Youth Ministries', icon: '🏕️', description: 'Empowering young people in faith and service' },
    { name: 'Health Ministries', icon: '🏥', description: 'Promoting physical and spiritual wellness' },
    { name: 'Community Outreach', icon: '🤝', description: 'Serving our neighbors with love and compassion' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % upcomingEvents.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [upcomingEvents.length]);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % upcomingEvents.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + upcomingEvents.length) % upcomingEvents.length);
  };



  return (
    <div>
      {/* Glass Navbar */}
      <nav className="glass-navbar">
        <div className="navbar-container">
          <div className="logo-section">
            <img src={sdaLogo} alt="Nyamasare SDA Church" className="logo" />
            <Link to="/" className="brand-text">NYAMASARE SDA CHURCH</Link>
          </div>

          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/ministries" className="nav-link">Ministries</Link>
            <Link to="/events" className="nav-link">Events</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
            <Link to="/login" className="nav-cta">Member Portal</Link>
            <button onClick={toggleTheme} className="theme-toggle">
              {isDark ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </nav>

      {/* Glassmorphic Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Transform Your Life with Faith at Nyamasare SDA Church
            </h1>
            <p className="hero-subtitle">
              Join our vibrant community of believers dedicated to worship, fellowship, and service.
              Experience God's love through meaningful connections and spiritual growth.
            </p>
            <div className="hero-buttons">
              <Link to="/live" className="btn-primary">
                🔴 Watch Live Service
              </Link>
              <Link to="/about" className="btn-secondary">
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Live Status Banner */}
      <div className="live-banner">
        <div className="live-content">
          <div className="live-dot"></div>
          <span>LIVE NOW: Sabbath Divine Service - 245 viewers</span>
          <Link to="/live" style={{ color: 'white', textDecoration: 'underline' }}>Join Stream</Link>
        </div>
      </div>

      {/* Ministries Section */}
      <section className="content-section">
        <div className="section-container">
          <h2 className="section-title">Our Ministries</h2>
          <p className="section-subtitle">
            Discover meaningful ways to grow in faith and serve our community through our diverse ministry programs.
          </p>
          <div className="cards-grid">
            {ministries.map((ministry, index) => (
              <div key={index} className="feature-card glass">
                <span className="card-icon">{ministry.icon}</span>
                <h3 className="card-title">{ministry.name}</h3>
                <p className="card-description">{ministry.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section - Carousel */}
      <section className="content-section">
        <div className="section-container">
          <h2 className="section-title">Upcoming Events</h2>
          <p className="section-subtitle">
            Join us for these special events and be part of our growing church family.
          </p>
          <div className="events-carousel">
            <div
              className="carousel-container"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {upcomingEvents.map(event => (
                <div key={event.id} className="carousel-slide">
                  <span className="card-icon" style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>📅</span>
                  <h3 className="card-title" style={{ fontSize: '2rem', marginBottom: '1rem' }}>{event.title}</h3>
                  <p className="card-description" style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
                    {new Date(event.date).toLocaleDateString()} at {event.time}
                  </p>
                  <p className="card-description" style={{ fontSize: '1rem', marginBottom: '2rem' }}>
                    📍 {event.location}
                  </p>
                  <Button size="large">Register Now</Button>
                </div>
              ))}
            </div>

            <button
              className="carousel-controls carousel-prev"
              onClick={prevSlide}
            >
              ‹
            </button>
            <button
              className="carousel-controls carousel-next"
              onClick={nextSlide}
            >
              ›
            </button>

            <div className="carousel-indicators">
              {upcomingEvents.map((_, index) => (
                <div
                  key={index}
                  className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sermons Section */}
      <section className="content-section">
        <div className="section-container">
          <h2 className="section-title">Recent Sermons</h2>
          <p className="section-subtitle">
            Catch up on our latest messages and grow in your spiritual journey.
          </p>
          <div className="cards-grid">
            {recentSermons.map(sermon => (
              <div key={sermon.id} className="feature-card glass">
                <span className="card-icon">🎥</span>
                <h3 className="card-title">{sermon.title}</h3>
                <p className="card-description">
                  by {sermon.speaker}<br />
                  {new Date(sermon.date).toLocaleDateString()}
                </p>
                <Button size="small" style={{ marginTop: '1rem' }}>Watch Now</Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="partners-section">
        <div className="section-container">
          <h2 className="section-title">Our Community Partners</h2>
          <div className="partners-grid">
            <div className="partner-logo">
              <div style={{ padding: '1rem', background: 'var(--glass-bg)', borderRadius: '8px', width: '100%', textAlign: 'center', backdropFilter: 'blur(10px)' }}>
                SDA Conference
              </div>
            </div>
            <div className="partner-logo">
              <div style={{ padding: '1rem', background: 'var(--glass-bg)', borderRadius: '8px', width: '100%', textAlign: 'center', backdropFilter: 'blur(10px)' }}>
                ADRA Kenya
              </div>
            </div>
            <div className="partner-logo">
              <div style={{ padding: '1rem', background: 'var(--glass-bg)', borderRadius: '8px', width: '100%', textAlign: 'center', backdropFilter: 'blur(10px)' }}>
                Local Community
              </div>
            </div>
            <div className="partner-logo">
              <div style={{ padding: '1rem', background: 'var(--glass-bg)', borderRadius: '8px', width: '100%', textAlign: 'center', backdropFilter: 'blur(10px)' }}>
                Health Ministry
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Glass Footer */}
      <footer className="modern-footer">
        <div className="footer-content">
          <div className="footer-section">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <img src={sdaLogo} alt="Nyamasare SDA Church" style={{ height: '40px' }} />
              <h4>NYAMASARE SDA CHURCH</h4>
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              A vibrant Seventh-day Adventist community dedicated to worship, fellowship, and service in Kenya.
            </p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <Link to="/about" className="footer-link">About Us</Link>
            <Link to="/beliefs" className="footer-link">Our Beliefs</Link>
            <Link to="/ministries" className="footer-link">Ministries</Link>
            <Link to="/events" className="footer-link">Events</Link>
          </div>

          <div className="footer-section">
            <h4>Services</h4>
            <Link to="/live" className="footer-link">Live Streaming</Link>
            <Link to="/sermons" className="footer-link">Sermons</Link>
            <Link to="/prayer" className="footer-link">Prayer Requests</Link>
            <Link to="/giving" className="footer-link">Online Giving</Link>
          </div>

          <div className="footer-section">
            <h4>Contact Info</h4>
            <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              <p>📍 Nyamasare, Kenya</p>
              <p>📞 +254 XXX XXX XXX</p>
              <p>📧 info@nyamasaresda.org</p>
              <p>⏰ Sabbath Services: 9:30 AM & 11:00 AM</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 Nyamasare SDA Church. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;