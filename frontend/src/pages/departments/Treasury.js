import React, { useState, useEffect } from 'react';
import { Card, Button, LoadingSpinner } from '../../components/UI';
import { useAuth } from '../../context/AuthContext';

const Treasury = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('contributions');

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const canManage = user?.role === 'admin';

  const contributions = [
    { id: 1, member: 'John Smith', type: 'Tithe', amount: 500, date: '2024-01-07', envelope: '001' },
    { id: 2, member: 'Sarah Johnson', type: 'Offering', amount: 100, date: '2024-01-07', envelope: '002' },
    { id: 3, member: 'Mike Brown', type: 'Mission', amount: 75, date: '2024-01-14', envelope: '003' }
  ];

  const budgets = [
    { id: 1, department: 'Sabbath School', allocated: 2000, spent: 1200, remaining: 800 },
    { id: 2, department: 'Youth Ministries', allocated: 3000, spent: 1800, remaining: 1200 },
    { id: 3, department: 'Health Ministries', allocated: 1500, spent: 900, remaining: 600 }
  ];

  const reports = [
    { id: 1, title: 'Monthly Financial Report - December 2023', date: '2024-01-01', type: 'Monthly' },
    { id: 2, title: 'Quarterly Report Q4 2023', date: '2024-01-01', type: 'Quarterly' },
    { id: 3, title: 'Annual Report 2023', date: '2024-01-01', type: 'Annual' }
  ];

  const summary = {
    totalTithes: 15750,
    totalOfferings: 8200,
    totalExpenses: 12300,
    balance: 11650
  };

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

  const summaryCardStyle = {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    textAlign: 'center'
  };

  const gridStyle = {
    display: 'grid',
    gap: '1rem',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    marginBottom: '2rem'
  };

  return (
    <div style={containerStyle}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: '#2c3e50', marginBottom: '0.5rem' }}>💰 Treasury & Finance</h1>
        <p style={{ color: '#666' }}>Financial management, contributions tracking, and budget oversight</p>
      </div>

      {/* Financial Summary */}
      <div style={gridStyle}>
        <div style={summaryCardStyle}>
          <h3 style={{ color: '#28a745', margin: '0 0 0.5rem 0' }}>Total Tithes</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>${summary.totalTithes.toLocaleString()}</p>
        </div>
        <div style={summaryCardStyle}>
          <h3 style={{ color: '#007bff', margin: '0 0 0.5rem 0' }}>Total Offerings</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>${summary.totalOfferings.toLocaleString()}</p>
        </div>
        <div style={summaryCardStyle}>
          <h3 style={{ color: '#dc3545', margin: '0 0 0.5rem 0' }}>Total Expenses</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>${summary.totalExpenses.toLocaleString()}</p>
        </div>
        <div style={summaryCardStyle}>
          <h3 style={{ color: '#6c757d', margin: '0 0 0.5rem 0' }}>Current Balance</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>${summary.balance.toLocaleString()}</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{ marginBottom: '2rem', borderBottom: '1px solid #dee2e6' }}>
        <button onClick={() => setActiveTab('contributions')} style={tabStyle(activeTab === 'contributions')}>
          Contributions
        </button>
        <button onClick={() => setActiveTab('budgets')} style={tabStyle(activeTab === 'budgets')}>
          Department Budgets
        </button>
        <button onClick={() => setActiveTab('reports')} style={tabStyle(activeTab === 'reports')}>
          Financial Reports
        </button>
      </div>

      {/* Contributions Tab */}
      {activeTab === 'contributions' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2>Contributions & Offerings</h2>
            {canManage && <Button variant="success">Record Contribution</Button>}
          </div>
          <Card>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8f9fa' }}>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Date</th>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Member</th>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Type</th>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Amount</th>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Envelope</th>
                    {canManage && <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {contributions.map(contribution => (
                    <tr key={contribution.id}>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>
                        {new Date(contribution.date).toLocaleDateString()}
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>{contribution.member}</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>
                        <span style={{
                          padding: '0.25rem 0.5rem',
                          borderRadius: '4px',
                          fontSize: '0.875rem',
                          backgroundColor: contribution.type === 'Tithe' ? '#28a745' : 
                                         contribution.type === 'Offering' ? '#007bff' : '#ffc107',
                          color: contribution.type === 'Mission' ? '#000' : 'white'
                        }}>
                          {contribution.type}
                        </span>
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>
                        ${contribution.amount.toLocaleString()}
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>{contribution.envelope}</td>
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

      {/* Budgets Tab */}
      {activeTab === 'budgets' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2>Department Budgets</h2>
            {canManage && <Button variant="success">Create Budget</Button>}
          </div>
          <Card>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8f9fa' }}>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Department</th>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Allocated</th>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Spent</th>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Remaining</th>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Usage %</th>
                    {canManage && <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {budgets.map(budget => {
                    const usagePercent = Math.round((budget.spent / budget.allocated) * 100);
                    return (
                      <tr key={budget.id}>
                        <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>{budget.department}</td>
                        <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>
                          ${budget.allocated.toLocaleString()}
                        </td>
                        <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>
                          ${budget.spent.toLocaleString()}
                        </td>
                        <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>
                          ${budget.remaining.toLocaleString()}
                        </td>
                        <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>
                          <span style={{
                            padding: '0.25rem 0.5rem',
                            borderRadius: '4px',
                            fontSize: '0.875rem',
                            backgroundColor: usagePercent > 80 ? '#dc3545' : usagePercent > 60 ? '#ffc107' : '#28a745',
                            color: usagePercent > 60 && usagePercent <= 80 ? '#000' : 'white'
                          }}>
                            {usagePercent}%
                          </span>
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
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === 'reports' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2>Financial Reports</h2>
            {canManage && <Button variant="success">Generate Report</Button>}
          </div>
          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            {reports.map(report => (
              <Card key={report.id}>
                <h3 style={{ margin: '0 0 1rem 0', color: '#2c3e50' }}>{report.title}</h3>
                <p><strong>Type:</strong> {report.type}</p>
                <p><strong>Generated:</strong> {new Date(report.date).toLocaleDateString()}</p>
                <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                  <Button size="small">Download PDF</Button>
                  <Button size="small" variant="secondary">View</Button>
                  {canManage && <Button variant="danger" size="small">Delete</Button>}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Treasury;