import DashboardLayout from '../components/DashboardLayout';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  return (
    <DashboardLayout currentTab="index">
      {(darkMode, toggleDarkMode) => (
        <DashboardContent darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      )}
    </DashboardLayout>
  );
}

function DashboardContent({ darkMode }) {
  const [stats, setStats] = useState({
    totalProducts: 125,
    totalCustomers: null, // Will be loaded from API
    totalOrders: 47,
    revenue: '₪45,230'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [addCustomerForm, setAddCustomerForm] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    email: ''
  });
  const [statsLoading, setStatsLoading] = useState(true);

  const theme = {
    textPrimary: darkMode ? '#ffffff' : '#000000',
    textSecondary: darkMode ? '#b0b0b0' : '#666666',
    cardBackground: darkMode ? '#2a2a2a' : '#f9f9f9',
    buttonPrimary: darkMode ? '#bb86fc' : '#6200ea',
    successColor: '#27ae60',
    warningColor: '#f39c12',
    infoColor: '#3498db',
    border: darkMode ? '#333' : '#e0e0e0',
  };

  useEffect(() => {
    fetchCustomerCount();
  }, []);

  const fetchCustomerCount = async () => {
    try {
      const response = await fetch('/api/stats/customers');
      const result = await response.json();
      if (result.success) {
        setStats(prev => ({ ...prev, totalCustomers: result.count }));
      }
    } catch (error) {
      console.error('Failed to fetch customer count:', error);
    } finally {
      setStatsLoading(false);
    }
  };

  const handleAddCustomer = async () => {
    if (!addCustomerForm.first_name || !addCustomerForm.last_name) {
      alert('אנא הכנס שם פרטי והמשפחה');
      return;
    }

    try {
      // Here we would call Rivhit API to add customer
      // For now, just show success message
      const newCustomer = {
        first_name: addCustomerForm.first_name,
        last_name: addCustomerForm.last_name,
        phone: addCustomerForm.phone,
        email: addCustomerForm.email,
        customer_id: Math.floor(Math.random() * 100000) // Mock ID
      };

      // Reset form and update stats
      setAddCustomerForm({ first_name: '', last_name: '', phone: '', email: '' });
      setShowAddCustomer(false);
      setStats(prev => ({ ...prev, totalCustomers: prev.totalCustomers + 1 }));

      alert('הלקוח נוסף בהצלחה! (API integration pending)');
    } catch (error) {
      alert('שגיאה בהוספת הלקוח: ' + error.message);
    }
  };

  const quickActions = [
    { label: 'הוסף מוצר', icon: '➕', href: '/products', color: theme.successColor },
    { label: 'הוסף לקוח', icon: '👤', href: '/customers', color: theme.infoColor },
    { label: 'הגדרות', icon: '⚙️', href: '/settings', color: theme.warningColor }
  ];

  return (
    <div>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{
          color: theme.textPrimary,
          margin: '0',
          fontSize: '28px'
        }}>
          דאשבורד
        </h1>
      </div>

      {/* Statistics Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        <StatCard title="סה״כ מוצרים" value={stats.totalProducts} icon="📦" color="#3498db" theme={theme} />
        <StatCard title="סה״כ לקוחות" value={stats.totalCustomers} icon="👥" color="#e74c3c" theme={theme} />
        <StatCard title="סה״כ הזמנות" value={stats.totalOrders} icon="📋" color="#27ae60" theme={theme} />
        <StatCard title="הכנסות חודשיות" value={stats.revenue} icon="💰" color="#f39c12" theme={theme} />
      </div>

      {/* Recent Activity */}
      <div style={{
        backgroundColor: theme.cardBackground,
        border: `1px solid ${theme.border}`,
        borderRadius: '12px',
        padding: '25px',
        marginBottom: '30px'
      }}>
        <h2 style={{ color: theme.textPrimary, margin: '0 0 20px 0', fontSize: '20px' }}>פעילות אחרונה</h2>
        <div style={{ color: theme.textSecondary }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${theme.border}` }}>
            <span>מוצר חדש הוסף</span>
            <span style={{ fontSize: '12px' }}>לפני 2 שעות</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${theme.border}` }}>
            <span>לקוח חדש רשום</span>
            <span style={{ fontSize: '12px' }}>אתמול</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${theme.border}` }}>
            <span>הזמנה בוצעה</span>
            <span style={{ fontSize: '12px' }}>לפני 3 ימים</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{
        backgroundColor: theme.cardBackground,
        border: `1px solid ${theme.border}`,
        borderRadius: '12px',
        padding: '25px'
      }}>
        <h2 style={{ color: theme.textPrimary, margin: '0 0 20px 0', fontSize: '20px' }}>פעולות מהירות</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px'
        }}>
          {quickActions.map(action => (
            <ActionCard key={action.label} action={action} theme={theme} />
          ))}
        </div>
      </div>

      {/* Add Customer Modal */}
      {showAddCustomer && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: theme.cardBackground,
            borderRadius: '12px',
            width: '90%',
            maxWidth: '500px',
            padding: '24px'
          }}>
            <h2 style={{
              margin: '0 0 20px 0',
              color: theme.textPrimary,
              fontSize: '24px'
            }}>
              הוספת לקוח חדש
            </h2>

            <div style={{ display: 'grid', gap: '16px' }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '6px',
                  color: theme.textPrimary,
                  fontWeight: '500',
                  fontSize: '14px'
                }}>
                  שם פרטי *
                </label>
                <input
                  type="text"
                  value={addCustomerForm.first_name}
                  onChange={(e) => setAddCustomerForm(prev => ({ ...prev, first_name: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: `1px solid ${theme.border}`,
                    borderRadius: '6px',
                    backgroundColor: theme.headerBg,
                    color: theme.textPrimary,
                    fontSize: '14px'
                  }}
                  placeholder="הכנס שם פרטי"
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '6px',
                  color: theme.textPrimary,
                  fontWeight: '500',
                  fontSize: '14px'
                }}>
                  שם משפחה *
                </label>
                <input
                  type="text"
                  value={addCustomerForm.last_name}
                  onChange={(e) => setAddCustomerForm(prev => ({ ...prev, last_name: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: `1px solid ${theme.border}`,
                    borderRadius: '6px',
                    backgroundColor: theme.headerBg,
                    color: theme.textPrimary,
                    fontSize: '14px'
                  }}
                  placeholder="הכנס שם משפחה"
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '6px',
                  color: theme.textPrimary,
                  fontWeight: '500',
                  fontSize: '14px'
                }}>
                  טלפון
                </label>
                <input
                  type="text"
                  value={addCustomerForm.phone}
                  onChange={(e) => setAddCustomerForm(prev => ({ ...prev, phone: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: `1px solid ${theme.border}`,
                    borderRadius: '6px',
                    backgroundColor: theme.headerBg,
                    color: theme.textPrimary,
                    fontSize: '14px',
                    direction: 'ltr'
                  }}
                  placeholder="050-1234567"
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '6px',
                  color: theme.textPrimary,
                  fontWeight: '500',
                  fontSize: '14px'
                }}>
                  מייל
                </label>
                <input
                  type="email"
                  value={addCustomerForm.email}
                  onChange={(e) => setAddCustomerForm(prev => ({ ...prev, email: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: `1px solid ${theme.border}`,
                    borderRadius: '6px',
                    backgroundColor: theme.headerBg,
                    color: theme.textPrimary,
                    fontSize: '14px',
                    direction: 'ltr'
                  }}
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'flex-end',
              marginTop: '24px'
            }}>
              <button
                onClick={() => setShowAddCustomer(false)}
                style={{
                  padding: '8px 16px',
                  border: `1px solid ${theme.border}`,
                  background: 'none',
                  color: theme.textPrimary,
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                ביטול
              </button>
              <button
                onClick={handleAddCustomer}
                style={{
                  padding: '8px 16px',
                  background: theme.buttonPrimary,
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                הוסף לקוח
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ActionCard({ action, theme }) {
  return (
    <Link href={action.href} style={{ textDecoration: 'none' }}>
      <div
        style={{
          backgroundColor: theme.cardBackground,
          border: `1px solid ${theme.border}`,
          borderRadius: '8px',
          padding: '20px',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          textAlign: 'center'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = `0 4px 12px ${theme.shadow}`;
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = 'none';
        }}
      >
        <span style={{ fontSize: '40px', marginBottom: '10px', display: 'block', color: action.color }}>{action.icon}</span>
        <span style={{ color: theme.textPrimary, fontWeight: '500' }}>{action.label}</span>
      </div>
    </Link>
  );
}

function StatCard({ title, value, icon, color, theme }) {
  return (
    <div style={{
      backgroundColor: theme.cardBackground,
      border: `1px solid ${theme.border}`,
      borderRadius: '12px',
      padding: '25px',
      textAlign: 'center'
    }}>
      <div style={{
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: color + '20',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 15px'
      }}>
        <span style={{ fontSize: '28px', color: color }}>{icon}</span>
      </div>
      <h3 style={{
        color: theme.textPrimary,
        margin: '0 0 10px 0',
        fontSize: '14px',
        fontWeight: '400'
      }}>{title}</h3>
      <p style={{
        color: color,
        margin: '0',
        fontSize: '28px',
        fontWeight: 'bold'
      }}>{value}</p>
    </div>
  );
}
