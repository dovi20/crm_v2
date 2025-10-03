import DashboardLayout from '../components/DashboardLayout';

export default function Customers({ darkMode }) {
  const theme = {
    textPrimary: darkMode ? 'white' : '#333',
    textSecondary: darkMode ? '#ccc' : '#6c757d',
    cardBackground: darkMode ? '#3a3a3a' : '#f8f9fa',
  };

  return (
    <DashboardLayout currentTab="customers">
      {(darkMode) => (
        <div>
          <h2 style={{ color: theme.textPrimary, marginBottom: '20px' }}>לקוחות</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            <div
              style={{
                backgroundColor: theme.cardBackground,
                padding: '20px',
                borderRadius: '10px',
                textAlign: 'center',
                transform: 'scale(1)',
                transition: 'transform 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            >
              <div style={{ fontSize: '48px', marginBottom: '15px' }}>👥</div>
              <h3 style={{ color: theme.textPrimary, margin: '0 0 10px 0' }}>ניהול לקוחות</h3>
              <p style={{ color: theme.textSecondary, margin: 0 }}>הוספה וניהול פרטי לקוחות</p>
            </div>
            <div
              style={{
                backgroundColor: theme.cardBackground,
                padding: '20px',
                borderRadius: '10px',
                textAlign: 'center',
                transform: 'scale(1)',
                transition: 'transform 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            >
              <div style={{ fontSize: '48px', marginBottom: '15px' }}>📋</div>
              <h3 style={{ color: theme.textPrimary, margin: '0 0 10px 0' }}>היסטורית הזמנות</h3>
              <p style={{ color: theme.textSecondary, margin: 0 }}>צפייה בהזמנות והיסטוריה ללאך</p>
            </div>
            <div
              style={{
                backgroundColor: theme.cardBackground,
                padding: '20px',
                borderRadius: '10px',
                textAlign: 'center',
                transform: 'scale(1)',
                transition: 'transform 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            >
              <div style={{ fontSize: '48px', marginBottom: '15px' }}>💬</div>
              <h3 style={{ color: theme.textPrimary, margin: '0 0 10px 0' }}>תקשורת</h3>
              <p style={{ color: theme.textSecondary, margin: 0 }}>ניהול תקשורת ויצירת קשר עם לקוחות</p>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
