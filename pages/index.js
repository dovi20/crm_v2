import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Logo from '../components/Logo';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('products');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) router.push('/login');
  }, [session, status, router]);

  const theme = {
    outerBackground: darkMode ? '#1a1a1a' : '#f8f9fa',
    innerBackground: darkMode ? '#2a2a2a' : 'white',
    headerBackground: darkMode ? '#333' : 'white',
    tabActive: darkMode ? '#444' : '#0070f3',
    tabInactive: darkMode ? '#3a3a3a' : '#f8f9fa',
    textPrimary: darkMode ? 'white' : '#333',
    textSecondary: darkMode ? '#ccc' : '#6c757d',
    cardBackground: darkMode ? '#3a3a3a' : '#f8f9fa',
    buttonPrimary: 'linear-gradient(135deg, #0070f3, #0051cc)',
    buttonDanger: 'linear-gradient(135deg, #dc3545, #c82333)',
    shadow: darkMode ? '0 10px 40px rgba(0, 0, 0, 0.3)' : '0 10px 40px rgba(0, 0, 0, 0.1)'
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  if (status === 'loading') {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        direction: 'rtl'
      }}>
        <div style={{
          textAlign: 'center',
          color: 'white'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '4px solid rgba(255, 255, 255, 0.3)',
            borderTop: '4px solid white',
            borderRadius: '50%',
            margin: '0 auto 20px',
            animation: 'spin 1s linear infinite'
          }}></div>
          <h2 style={{ margin: 0, fontSize: '24px' }}>טוען...</h2>
          <style jsx>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: darkMode ? '#1a1a1a' : '#f0f2f5',
      fontFamily: 'Arial, sans-serif',
      direction: 'rtl'
    }}>
      <div style={{
        display: 'flex',
        height: '100vh'
      }}>
        {/* Sidebar */}
        <div style={{
          width: '280px',
          backgroundColor: darkMode ? '#2a2a2a' : '#2c3e50',
          color: 'white',
          padding: '20px',
          boxShadow: darkMode ? '2px 0 10px rgba(0,0,0,0.5)' : '2px 0 10px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <h2 style={{
            color: 'white',
            margin: '0 0 30px 0',
            fontSize: '24px',
            fontWeight: 'bold'
          }}>
            מערכת מלאי
          </h2>

          <div style={{
            flex: 1
          }}>
            {[
              { id: 'products', label: 'מוצרים', icon: '📦', color: '#3498db' },
              { id: 'customers', label: 'לקוחות', icon: '👥', color: '#e74c3c' },
              { id: 'settings', label: 'הגדרות', icon: '⚙️', color: '#27ae60' }
            ].map(tab => (
              <div
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  backgroundColor: activeTab === tab.id ? (darkMode ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.1)') : 'transparent',
                  padding: '15px 20px',
                  marginBottom: '10px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  borderLeft: activeTab === tab.id ? `4px solid ${tab.color}` : '4px solid transparent'
                }}
                onMouseOver={(e) => {
                  if (activeTab !== tab.id) {
                    const rgba = darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)';
                    e.target.style.backgroundColor = rgba;
                  }
                }}
                onMouseOut={(e) => {
                  if (activeTab !== tab.id) {
                    e.target.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <span style={{ fontSize: '20px', color: tab.color }}>{tab.icon}</span>
                <span style={{
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: activeTab === tab.id ? 'bold' : 'normal'
                }}>{tab.label}</span>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: 'auto'
          }}>
            <div style={{
              fontSize: '14px',
              color: darkMode ? '#ccc' : '#bdc3c7',
              marginBottom: '10px'
            }}>
              שלום, {session.user?.username || session.user?.email}
            </div>
            <button onClick={handleSignOut} style={{
              backgroundColor: '#e74c3c',
              color: 'white',
              border: 'none',
              padding: '10px 15px',
              borderRadius: '5px',
              cursor: 'pointer',
              width: '100%',
              fontSize: '14px'
            }}>
              התנתק
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div style={{
          flex: 1,
          padding: '30px',
          backgroundColor: darkMode ? '#1a1a1a' : '#f0f2f5'
        }}>
          {/* Tab Content */}
          <div style={{
            backgroundColor: darkMode ? '#2a2a2a' : 'white',
            borderRadius: '12px',
            padding: '30px',
            minHeight: 'calc(100vh - 120px)',
            boxShadow: darkMode ? '0 4px 20px rgba(0,0,0,0.5)' : '0 4px 20px rgba(0,0,0,0.1)'
          }}>
          {activeTab === 'products' && (
            <div>
              <h2 style={{ color: theme.textPrimary, marginBottom: '20px' }}>מוצרים</h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '20px'
              }}>
                <div style={{
                  backgroundColor: theme.cardBackground,
                  padding: '20px',
                  borderRadius: '10px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '15px' }}>📦</div>
                  <h3 style={{ color: theme.textPrimary, margin: '0 0 10px 0' }}>ניהול מוצרים</h3>
                  <p style={{ color: theme.textSecondary, margin: 0 }}>הוספה, עריכה ומחיקה של מוצרים במערכת</p>
                </div>
                <div style={{
                  backgroundColor: theme.cardBackground,
                  padding: '20px',
                  borderRadius: '10px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '15px' }}>🔍</div>
                  <h3 style={{ color: theme.textPrimary, margin: '0 0 10px 0' }}>חיפוש מוצרים</h3>
                  <p style={{ color: theme.textSecondary, margin: 0 }}>חיפוש ובדיקת מצב מלאי בזמן אמת</p>
                </div>
                <div style={{
                  backgroundColor: theme.cardBackground,
                  padding: '20px',
                  borderRadius: '10px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '15px' }}>📊</div>
                  <h3 style={{ color: theme.textPrimary, margin: '0 0 10px 0' }}>דוחות מלאי</h3>
                  <p style={{ color: theme.textSecondary, margin: 0 }}>יצירת דוחות מפורטים לפי מחסנים וקטגוריות</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'customers' && (
            <div>
              <h2 style={{ color: theme.textPrimary, marginBottom: '20px' }}>לקוחות</h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '20px'
              }}>
                <div style={{
                  backgroundColor: theme.cardBackground,
                  padding: '20px',
                  borderRadius: '10px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '15px' }}>👥</div>
                  <h3 style={{ color: theme.textPrimary, margin: '0 0 10px 0' }}>ניהול לקוחות</h3>
                  <p style={{ color: theme.textSecondary, margin: 0 }}>הוספה וניהול פרטי לקוחות</p>
                </div>
                <div style={{
                  backgroundColor: theme.cardBackground,
                  padding: '20px',
                  borderRadius: '10px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '15px' }}>📋</div>
                  <h3 style={{ color: theme.textPrimary, margin: '0 0 10px 0' }}>היסטורית הזמנות</h3>
                  <p style={{ color: theme.textSecondary, margin: 0 }}>צפייה בהזמנות והיסטוריה ללאu's</p>
                </div>
                <div style={{
                  backgroundColor: theme.cardBackground,
                  padding: '20px',
                  borderRadius: '10px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '15px' }}>💬</div>
                  <h3 style={{ color: theme.textPrimary, margin: '0 0 10px 0' }}>תקשורת</h3>
                  <p style={{ color: theme.textSecondary, margin: 0 }}>ניהול תקשורת ויצירת קשר עם לקוחות</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
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
                  <button onClick={() => setDarkMode(!darkMode)} style={{
                    background: theme.buttonPrimary,
                    color: 'white',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}>{darkMode ? '☀️ מצב וב כהמה' : '🌙 מצב חושך'}</button>
                </div>
                <div style={{
                  backgroundColor: theme.cardBackground,
                  padding: '20px',
                  borderRadius: '10px'
                }}>
                  <h3 style={{ color: theme.textPrimary, margin: '0 0 15px 0' }}>חשבון</h3>
                  <p style={{ color: theme.textSecondary, margin: '0 0 10px 0' }}>התנתקות ופתרונות חשבון</p>
                  <button onClick={handleSignOut} style={{
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
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
