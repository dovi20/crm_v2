import DashboardLayout from '../components/DashboardLayout';

export default function Products({ darkMode }) {
  const theme = {
    textPrimary: darkMode ? 'white' : '#333',
    textSecondary: darkMode ? '#ccc' : '#6c757d',
    cardBackground: darkMode ? '#3a3a3a' : '#f8f9fa',
  };

  return (
    <DashboardLayout currentTab="products">
      {(darkMode) => (
        <div>
          <h2 style={{ color: theme.textPrimary, marginBottom: '20px' }}>מוצרים</h2>
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
              <div style={{ fontSize: '48px', marginBottom: '15px' }}>📦</div>
              <h3 style={{ color: theme.textPrimary, margin: '0 0 10px 0' }}>ניהול מוצרים</h3>
              <p style={{ color: theme.textSecondary, margin: 0 }}>הוספה, עריכה ומחיקה של מוצרים במערכת</p>
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
              <div style={{ fontSize: '48px', marginBottom: '15px' }}>🔍</div>
              <h3 style={{ color: theme.textPrimary, margin: '0 0 10px 0' }}>חיפוש מוצרים</h3>
              <p style={{ color: theme.textSecondary, margin: 0 }}>חיפוש ובדיקת מצב מלאי בזמן אמת</p>
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
              <div style={{ fontSize: '48px', marginBottom: '15px' }}>📊</div>
              <h3 style={{ color: theme.textPrimary, margin: '0 0 10px 0' }}>דוחות מלאי</h3>
              <p style={{ color: theme.textSecondary, margin: 0 }}>יצירת דוחות מפורטים לפי מחסנים וקטגוריות</p>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
