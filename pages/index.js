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
    totalProducts: 0,
    totalCustomers: null, // Will be loaded from API
    totalOrders: 0,
    revenue: 0
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
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);

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
    fetchDashboardStats();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsSmallMobile(window.innerWidth <= 480);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
    }
  };

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/stats/dashboard');
      const result = await response.json();
      console.log('Dashboard API response:', result); // Debug log
      if (result.success) {
        setStats(prev => ({
          ...prev,
          totalProducts: result.data.totalProducts,
          totalOrders: result.data.totalOrders,
          revenue: result.data.revenue
        }));
      }
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
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
    <div style={{ paddingLeft: isMobile ? '0' : '0' }}>
      <div style={{ marginBottom: isMobile ? '25px' : '30px' }}>
        <h1 style={{
          color: theme.textPrimary,
          margin: '0',
          fontSize: isMobile ? '24px' : '28px'
        }}>
          דאשבורד
        </h1>
      </div>

      {/* Statistics Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isSmallMobile ? '1fr' : isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: isMobile ? '15px' : '20px',
        marginBottom: isMobile ? '30px' : '40px'
      }}>
        <StatCard title="סה״כ מוצרים" value={stats.totalProducts} icon="📦" color="#3498db" theme={theme} isMobile={isMobile} isSmallMobile={isSmallMobile} />
        <StatCard title="סה״כ לקוחות" value={stats.totalCustomers} icon="👥" color="#e74c3c" theme={theme} isMobile={isMobile} isSmallMobile={isSmallMobile} />
        <StatCard title="סה״כ הזמנות" value={stats.totalOrders} icon="📋" color="#27ae60" theme={theme} isMobile={isMobile} isSmallMobile={isSmallMobile} />
        <StatCard title="הכנסות חודשיות" value={stats.revenue} icon="💰" color="#f39c12" theme={theme} isMobile={isMobile} isSmallMobile={isSmallMobile} />
      </div>

      {/* Recent Activity */}
      <div style={{
        backgroundColor: theme.cardBackground,
        border: `1px solid ${theme.border}`,
        borderRadius: '12px',
        padding: isMobile ? '20px' : '25px',
        marginBottom: isMobile ? '25px' : '30px'
      }}>
        <h2 style={{
          color: theme.textPrimary,
          margin: '0 0 20px 0',
          fontSize: isMobile ? '18px' : '20px'
        }}>פעילות אחרונה</h2>
        <div style={{ color: theme.textSecondary }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: isMobile ? '8px 0' : '10px 0',
            borderBottom: `1px solid ${theme.border}`
          }}>
            <span style={{ fontSize: isMobile ? '14px' : '16px' }}>מוצר חדש הוסף</span>
            <span style={{ fontSize: isMobile ? '11px' : '12px' }}>לפני 2 שעות</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: isMobile ? '8px 0' : '10px 0',
            borderBottom: `1px solid ${theme.border}`
          }}>
            <span style={{ fontSize: isMobile ? '14px' : '16px' }}>לקוח חדש רשום</span>
            <span style={{ fontSize: isMobile ? '11px' : '12px' }}>אתמול</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: isMobile ? '8px 0' : '10px 0',
            borderBottom: `1px solid ${theme.border}`
          }}>
            <span style={{ fontSize: isMobile ? '14px' : '16px' }}>הזמנה בוצעה</span>
            <span style={{ fontSize: isMobile ? '11px' : '12px' }}>לפני 3 ימים</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{
        backgroundColor: theme.cardBackground,
        border: `1px solid ${theme.border}`,
        borderRadius: '12px',
        padding: isMobile ? '20px' : '25px'
      }}>
        <h2 style={{
          color: theme.textPrimary,
          margin: '0 0 20px 0',
          fontSize: isMobile ? '18px' : '20px'
        }}>פעולות מהירות</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isSmallMobile ? '1fr' : isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: isMobile ? '15px' : '20px'
        }}>
          {quickActions.map(action => (
            <ActionCard key={action.label} action={action} theme={theme} isMobile={isMobile} />
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
          padding: isMobile ? '10px' : '20px'
        }}>
          <div style={{
            backgroundColor: theme.cardBackground,
            borderRadius: '12px',
            width: isSmallMobile ? '100%' : isMobile ? '95%' : '90%',
            maxWidth: isMobile ? 'none' : '500px',
            padding: isMobile ? '20px' : '24px',
            maxHeight: isMobile ? '90vh' : 'none',
            overflowY: isMobile ? 'auto' : 'visible'
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
              gap: isMobile ? '10px' : '12px',
              justifyContent: 'flex-end',
              marginTop: isMobile ? '20px' : '24px',
              flexDirection: isSmallMobile ? 'column' : 'row'
            }}>
              <button
                onClick={() => setShowAddCustomer(false)}
                style={{
                  padding: isMobile ? '12px 20px' : '8px 16px',
                  border: `1px solid ${theme.border}`,
                  background: 'none',
                  color: theme.textPrimary,
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: isMobile ? '16px' : '14px',
                  fontWeight: '500',
                  minHeight: isMobile ? '44px' : 'auto',
                  flex: isSmallMobile ? '1' : 'none'
                }}
              >
                ביטול
              </button>
              <button
                onClick={handleAddCustomer}
                style={{
                  padding: isMobile ? '12px 20px' : '8px 16px',
                  background: theme.buttonPrimary,
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: isMobile ? '16px' : '14px',
                  fontWeight: '500',
                  minHeight: isMobile ? '44px' : 'auto',
                  flex: isSmallMobile ? '1' : 'none'
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

function ActionCard({ action, theme, isMobile }) {
  return (
    <Link href={action.href} style={{ textDecoration: 'none' }}>
      <div
        style={{
          backgroundColor: theme.cardBackground,
          border: `1px solid ${theme.border}`,
          borderRadius: '8px',
          padding: isMobile ? '16px' : '20px',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          textAlign: 'center',
          minHeight: isMobile ? '100px' : 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        onMouseEnter={(e) => {
          if (!isMobile) {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = `0 4px 12px ${theme.shadow}`;
          }
        }}
        onMouseLeave={(e) => {
          if (!isMobile) {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }
        }}
      >
        <span style={{
          fontSize: isMobile ? '32px' : '40px',
          marginBottom: '8px',
          display: 'block',
          color: action.color
        }}>{action.icon}</span>
        <span style={{
          color: theme.textPrimary,
          fontWeight: '500',
          fontSize: isMobile ? '14px' : '16px'
        }}>{action.label}</span>
      </div>
    </Link>
  );
}

function StatCard({ title, value, icon, color, theme, isMobile, isSmallMobile }) {
  const formatValue = (val, title) => {
    if (val === null || val === undefined) return 'טוען...';

    if (title.includes('הכנסות')) {
      return `₪${val.toLocaleString()}`;
    }

    return val.toLocaleString();
  };

  return (
    <div style={{
      backgroundColor: theme.cardBackground,
      border: `1px solid ${theme.border}`,
      borderRadius: '12px',
      padding: isMobile ? '20px' : '25px',
      textAlign: 'center'
    }}>
      <div style={{
        width: isMobile ? '50px' : '60px',
        height: isMobile ? '50px' : '60px',
        borderRadius: '50%',
        backgroundColor: color + '20',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 15px'
      }}>
        <span style={{
          fontSize: isMobile ? '24px' : '28px',
          color: color
        }}>{icon}</span>
      </div>
      <h3 style={{
        color: theme.textPrimary,
        margin: '0 0 10px 0',
        fontSize: isMobile ? '13px' : '14px',
        fontWeight: '400'
      }}>{title}</h3>
      <p style={{
        color: color,
        margin: '0',
        fontSize: isMobile ? '24px' : '28px',
        fontWeight: 'bold'
      }}>{formatValue(value, title)}</p>
    </div>
  );
}
