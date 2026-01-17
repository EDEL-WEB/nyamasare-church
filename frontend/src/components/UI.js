import React from 'react';

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  onClick, 
  disabled = false,
  type = 'button',
  ...props 
}) => {
  const baseStyle = {
    border: 'none',
    borderRadius: '6px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontWeight: '500',
    transition: 'all 0.2s',
    opacity: disabled ? 0.6 : 1
  };

  const variants = {
    primary: { backgroundColor: '#007bff', color: 'white' },
    success: { backgroundColor: '#28a745', color: 'white' },
    danger: { backgroundColor: '#dc3545', color: 'white' },
    secondary: { backgroundColor: '#6c757d', color: 'white' }
  };

  const sizes = {
    small: { padding: '0.5rem 0.75rem', fontSize: '0.875rem' },
    medium: { padding: '0.75rem 1rem', fontSize: '1rem' },
    large: { padding: '1rem 1.5rem', fontSize: '1.125rem' }
  };

  return (
    <button
      style={{ ...baseStyle, ...variants[variant], ...sizes[size] }}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '1.5rem',
        width: '90%',
        maxWidth: '500px',
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ margin: 0 }}>{title}</h3>
          <Button variant="secondary" size="small" onClick={onClose}>×</Button>
        </div>
        {children}
      </div>
    </div>
  );
};

export const LoadingSpinner = ({ size = 'medium' }) => {
  const sizes = {
    small: '20px',
    medium: '40px',
    large: '60px'
  };

  return (
    <div style={{
      width: sizes[size],
      height: sizes[size],
      border: '3px solid #f3f3f3',
      borderTop: '3px solid #007bff',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      margin: '0 auto'
    }}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export const Card = ({ children, className = '', ...props }) => (
  <div 
    style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      padding: '1.5rem'
    }}
    {...props}
  >
    {children}
  </div>
);

export const Input = ({ label, error, ...props }) => (
  <div style={{ marginBottom: '1rem' }}>
    {label && <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>{label}</label>}
    <input
      style={{
        width: '100%',
        padding: '0.75rem',
        border: `1px solid ${error ? '#dc3545' : '#ddd'}`,
        borderRadius: '4px',
        fontSize: '1rem'
      }}
      {...props}
    />
    {error && <span style={{ color: '#dc3545', fontSize: '0.875rem' }}>{error}</span>}
  </div>
);

export const TextArea = ({ label, error, ...props }) => (
  <div style={{ marginBottom: '1rem' }}>
    {label && <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>{label}</label>}
    <textarea
      style={{
        width: '100%',
        padding: '0.75rem',
        border: `1px solid ${error ? '#dc3545' : '#ddd'}`,
        borderRadius: '4px',
        fontSize: '1rem',
        minHeight: '100px',
        resize: 'vertical'
      }}
      {...props}
    />
    {error && <span style={{ color: '#dc3545', fontSize: '0.875rem' }}>{error}</span>}
  </div>
);