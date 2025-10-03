import DashboardLayout from '../components/DashboardLayout';

export default function Settings({ darkMode }) {
  const theme = {
    textPrimary: darkMode ? 'white' : '#333',
    textSecondary: darkMode ? '#ccc' : '#6c757d',
    cardBackground: darkMode ? '#3a3a3a' : '#f8f9fa',
    buttonPrimary: 'linear-gradient(135deg, #0070f3, #0051cc)',
    buttonDanger: 'linear-gradient(135deg, #dc3545, #c82333)',
  };

  return (
    <DashboardLayout currentTab="settings">
      {(darkMode) => (
        <div>
          <h2 style={{ color: theme.textPrimary, marginBottom: '20px' }}>הגדרות</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            <div style={{
              backgroundColor: theme.cardBackground,
              padding: '20px',
              borderRadius: '10px'
            }}>
              <h3 style={{ color: theme.textPrimary, margin: '0 0 15px 0' }}>הגדרות משתמש</h3>
              <p style={{ color: theme.textSecondary, margin: '0 0 10px 0' }}>שינוי סיסמה ופרטים אישיים</p>
              <button style={{
                background: theme.buttonPrimary,
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px'
              }}>עריכה</button>
            </div>
            <div style={{
              backgroundColor: theme.cardBackground,
              padding: '20px',
              borderRadius: '10px'
            }}>
              <h3 style={{ color: theme.textPrimary, margin: '0 0 15px 0' }}>מצב תצוגה</h3>
              <p style={{ color: theme.textSecondary, margin: '0 0 10px 0' }}>חליפה בין מצב אור וחושך</p>
              <button style={{
                background: theme.buttonPrimary,
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px'
              }}>{darkMode ? '☀️ מצב אור' : '🌙 מצב חושך'}</button>
            </div>
            <div style={{
              backgroundColor: theme.cardBackground,
              padding: '20px',
              borderRadius: '10px'
            }}>
              <h3 style={{ color: theme.textPrimary, margin: '0 0 15px 0' }}>חשבון</h3>
              <p style={{ color: theme.textSecondary, margin: '0 0 10px 0' }}>התנתקות ופתרונות חשבון</p>
              <button style={{
                background: theme.buttonDanger,
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px'
              }}>התנתק</button>
            </div>
            <div style={{
              backgroundColor: theme.cardBackground,
              padding: '20px',
              borderRadius: '10px'
            }}>
              <h3 style={{ color: theme.textPrimary, margin: '0 0 15px 0' }}>הגדרות מערכת</h3>
              <p style={{ color: theme.textSecondary, margin: '0 0 10px 0' }}>קונפיגורציות כלליות של המערכת</p>
              <button style={{
                background: theme.buttonPrimary,
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px'
              }}>גישה</button>
            </div>
            <div style={{
              backgroundColor: theme.cardBackground,
              padding: '20px',
              borderRadius: '10px'
            }}>
              <h3 style={{ color: theme.textPrimary, margin: '0 0 15px 0' }}>עריכות</h3>
              <p style={{ color: theme.textSecondary, margin: '0 0 10px 0' }}>כלי עריכה לבניית המודולים</p>
              <button style={{
                background: theme.buttonPrimary,
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px'
              }}>פתח</button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
