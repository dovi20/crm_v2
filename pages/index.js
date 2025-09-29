import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Logo from '../components/Logo';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Still loading
    if (!session) router.push('/login');
  }, [session, status, router]);

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
          <p style={{ margin: '10px 0 0 0', opacity: 0.8 }}>מעבד את הבקשה</p>
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
    return null; // Will redirect to login
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      direction: 'rtl'
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '20px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          backgroundColor: '#fff',
          padding: '30px',
          textAlign: 'center',
          borderBottom: '1px solid #e9ecef'
        }}>
          <Logo width={350} />
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '20px'
          }}>
            <h1 style={{
              color: '#333',
              margin: 0,
              fontSize: '32px',
              fontWeight: '700'
            }}>
              ברוכים הבאים לדשבורד
            </h1>
            <button
              onClick={handleSignOut}
              style={{
                background: 'linear-gradient(135deg, #dc3545, #c82333)',
                color: 'white',
                padding: '12px 25px',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                outline: 'none'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 20px rgba(220, 53, 69, 0.3)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              התנתק מהמערכת
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '40px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px'
          }}>
            {/* User Info Card */}
            <div style={{
              background: 'linear-gradient(135deg, #007bff, #0056b3)',
              color: 'white',
              padding: '30px',
              borderRadius: '15px',
              boxShadow: '0 10px 30px rgba(0, 123, 255, 0.2)'
            }}>
              <h2 style={{
                margin: '0 0 20px 0',
                fontSize: '24px',
                fontWeight: '600'
              }}>
                פרטי משתמש
              </h2>
              <div style={{ fontSize: '18px', lineHeight: '1.6' }}>
                <p style={{ margin: '10px 0' }}>
                  <strong>שם משתמש:</strong> {session.user?.username || 'לא זמין'}
                </p>
                <p style={{ margin: '10px 0' }}>
                  <strong>דוא"ל:</strong> {session.user?.email}
                </p>
                <p style={{ margin: '10px 0' }}>
                  <strong>מזהה משתמש:</strong> {session.user?.id}
                </p>
              </div>
            </div>

            {/* Dashboard Content Card */}
            <div style={{
              background: 'linear-gradient(135deg, #28a745, #1e7e34)',
              color: 'white',
              padding: '30px',
              borderRadius: '15px',
              boxShadow: '0 10px 30px rgba(40, 167, 69, 0.2)'
            }}>
              <h2 style={{
                margin: '0 0 20px 0',
                fontSize: '24px',
                fontWeight: '600'
              }}>
                תוכן הדשבורד
              </h2>
              <div style={{ fontSize: '18px', lineHeight: '1.6' }}>
                <p style={{ margin: '10px 0' }}>
                  ברוכים הבאים לדשבורד המוגן שלכם!
                </p>
                <p style={{ margin: '10px 0' }}>
                  אתם מחוברים בהצלחה למערכת.
                </p>
                <p style={{ margin: '10px 0' }}>
                  זהו דף מוגן הדורש אימות כדי לגשת אליו.
                </p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div style={{
            marginTop: '30px',
            padding: '25px',
            backgroundColor: '#f8f9fa',
            borderRadius: '15px',
            border: '1px solid #e9ecef',
            textAlign: 'center'
          }}>
            <h3 style={{
              color: '#495057',
              margin: '0 0 15px 0',
              fontSize: '20px'
            }}>
              מערכת ניהול מתקדמת
            </h3>
            <p style={{
              color: '#6c757d',
              margin: 0,
              fontSize: '16px'
            }}>
              המערכת כוללת אימות משתמשים מאובטח, בסיס נתונים מתקדם ותמיכה מלאה ב-Docker לפריסה קלה.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
