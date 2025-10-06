import DashboardLayout from '../components/DashboardLayout';
import { signOut } from 'next-auth/react';

export default function Settings({ darkMode, toggleDarkMode }) {
  const theme = {
    textPrimary: darkMode ? '#ffffff' : '#000000',
    textSecondary: darkMode ? '#b0b0b0' : '#666666',
    cardBackground: darkMode ? '#2a2a2a' : '#f9f9f9',
    buttonPrimary: darkMode ? '#bb86fc' : '#6200ea',
    buttonDanger: '#dc3545',
    border: darkMode ? '#333' : '#e0e0e0',
  };

  return (
    <DashboardLayout currentTab="settings">
      {(darkMode, toggleDarkMode) => (
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
              <button
                onClick={() => alert('עריכת הגדרות משתמש - פונקציה לא זמינה עדיין')}
                style={{
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
              <button
                onClick={toggleDarkMode}
                style={{
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
              <button
                onClick={async () => await signOut({ callbackUrl: '/login' })}
                style={{
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
              <button
                onClick={() => alert('גישת הגדרות מערכת - פונקציה לא זמינה עדיין')}
                style={{
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
              <button
                onClick={() => alert('פתיחת כלי עריכה - פונקציה לא זמינה עדיין')}
                style={{
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
