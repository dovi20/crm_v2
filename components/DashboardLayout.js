import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';

export default function DashboardLayout({ children, currentTab }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true';
    }
    return false;
  });

  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', darkMode.toString());
    }
  }, [darkMode]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const theme = {
    outerBackground: darkMode ? '#121212' : '#ffffff',
    sidebarBackground: darkMode ? '#1e1e1e' : '#ffffff',
    sidebarBorder: darkMode ? '#333' : '#e0e0e0',
    sidebarText: darkMode ? '#e0e0e0' : '#333',
    innerBackground: darkMode ? '#1e1e1e' : '#ffffff',
    tabActive: darkMode ? '#bb86fc' : '#6200ea',
    tabHover: darkMode ? '#333' : '#f5f5f5',
    tabInactive: 'transparent',
    textPrimary: darkMode ? '#ffffff' : '#000000',
    textSecondary: darkMode ? '#b0b0b0' : '#666666',
    cardBackground: darkMode ? '#2a2a2a' : '#f9f9f9',
    buttonPrimary: darkMode ? '#bb86fc' : '#6200ea',
    buttonDanger: '#dc3545',
    shadow: darkMode ? '0 2px 8px rgba(0, 0, 0, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.1)',
    border: darkMode ? '#333' : '#e0e0e0'
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) router.push('/login');
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: theme.outerBackground,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        direction: 'rtl'
      }}>
        <div style={{
          textAlign: 'center',
          color: theme.textPrimary
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: `3px solid ${theme.border}`,
            borderTop: `3px solid ${theme.tabActive}`,
            borderRadius: '50%',
            margin: '0 auto 16px',
            animation: 'spin 1s linear infinite'
          }}></div>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '500' }}>טוען...</h3>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const tabs = [
    { id: 'index', label: 'דאשבורד', icon: '🏠', color: '#9b59b6', href: '/' },
    { id: 'products', label: 'מוצרים', icon: '📦', color: '#3498db', href: '/products' },
    { id: 'customers', label: 'לקוחות', icon: '👥', color: '#e74c3c', href: '/customers' },
    { id: 'settings', label: 'הגדרות', icon: '⚙️', color: '#27ae60', href: '/settings' }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: theme.outerBackground,
      fontFamily: 'Inter, sans-serif',
      direction: 'rtl'
    }}>
      {isMobile && (
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          style={{
            position: 'absolute',
            top: '15px',
            left: '15px',
            backgroundColor: theme.sidebarBackground,
            color: theme.sidebarText,
            border: `1px solid ${theme.border}`,
            padding: '8px',
            borderRadius: '6px',
            cursor: 'pointer',
            zIndex: 1001,
            boxShadow: theme.shadow
          }}
        >
          ☰
        </button>
      )}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '260px 1fr',
        minHeight: '100vh'
      }}
      className="dashboard-wrapper">
        {/* Sidebar */}
        <div style={{
          width: '260px',
          backgroundColor: theme.sidebarBackground,
          color: theme.sidebarText,
          padding: '24px 20px',
          borderRight: `1px solid ${theme.sidebarBorder}`,
          display: isMobile ? (isSidebarOpen ? 'flex' : 'none') : 'flex',
          flexDirection: 'column',
          position: isMobile ? 'fixed' : 'static',
          top: isMobile ? '0' : 'auto',
          left: isMobile ? '0' : 'auto',
          height: isMobile ? '100vh' : '100%',
          zIndex: isMobile ? '1000' : 'auto',
          direction: 'ltr'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '30px'
          }}>
            <Logo width={120} darkMode={darkMode} />
          </div>

          <div style={{
            flex: 1
          }}>
            {tabs.map(tab => (
              <Link key={tab.id} href={tab.href} legacyBehavior>
                <a style={{ textDecoration: 'none' }}>
                  <div
                    style={{
                      backgroundColor: currentTab === tab.id ? theme.tabActive : 'transparent',
                      color: currentTab === tab.id ? 'white' : theme.sidebarText,
                      padding: '12px 16px',
                      marginBottom: '4px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}
                    onMouseOver={(e) => {
                      if (currentTab !== tab.id) {
                        e.target.style.backgroundColor = theme.tabHover;
                      }
                    }}
                    onMouseOut={(e) => {
                      if (currentTab !== tab.id) {
                        e.target.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    <span style={{ fontSize: '18px', color: currentTab === tab.id ? 'white' : tab.color }}>{tab.icon}</span>
                    <span style={{
                      fontSize: '15px',
                      fontWeight: currentTab === tab.id ? '600' : '400'
                    }}>{tab.label}</span>
                  </div>
                </a>
              </Link>
            ))}
          </div>

          <div style={{
            marginTop: 'auto'
          }}>
            <div style={{
              fontSize: '14px',
              color: theme.textSecondary,
              marginBottom: '10px'
            }}>
              שלום, {session.user?.username || session.user?.email}
            </div>
            <button onClick={handleSignOut} style={{
              backgroundColor: theme.buttonDanger,
              color: 'white',
              border: 'none',
              padding: '10px 15px',
              borderRadius: '6px',
              cursor: 'pointer',
              width: '100%',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              התנתק
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div style={{
          flex: 1,
          padding: '30px',
          backgroundColor: theme.innerBackground
        }}>
          <div style={{
            backgroundColor: theme.cardBackground,
            border: `1px solid ${theme.border}`,
            borderRadius: '12px',
            padding: '30px',
            minHeight: 'calc(100vh - 120px)',
            boxShadow: theme.shadow,
            animation: 'fadeIn 0.3s ease-in-out'
          }}>
            {typeof children === 'function' ? children(darkMode, toggleDarkMode) : children}
            {/* Footer inside content */}
            <div style={{
              marginTop: '30px',
              padding: '15px',
              backgroundColor: 'transparent',
              borderTop: `1px solid ${theme.border}`,
              textAlign: 'center',
              fontSize: '12px',
              color: theme.textSecondary
            }}>
              גרסה 1.0.0 - נבנה באהבה על ידי Dovi - <a href="https://github.com/dovi20" target="_blank" rel="noopener noreferrer" style={{ color: theme.tabActive, textDecoration: 'none' }}>GitHub</a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <style jsx global>{`
        @media (max-width: 768px) {
          .dashboard-wrapper {
            grid-template-columns: 1fr !important;
            gap: 10px !important;
          }
        }
      `}</style>
    </div>
  );

  async function handleSignOut() {
    await signOut({ callbackUrl: '/login' });
  }
}
