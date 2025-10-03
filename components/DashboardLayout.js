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

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) router.push('/login');
  }, [session, status, router]);

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
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const theme = {
    outerBackground: darkMode ? '#1a1a1a' : '#f8f9fa',
    sidebarBackground: darkMode ? '#34495e' : '#f8f9fa',
    sidebarText: darkMode ? 'white' : '#333',
    innerBackground: darkMode ? '#2a2a2a' : 'white',
    tabActive: darkMode ? '#444' : '#0070f3',
    tabInactive: darkMode ? '#3a3a3a' : '#f8f9fa',
    textPrimary: darkMode ? 'white' : '#333',
    textSecondary: darkMode ? '#ccc' : '#6c757d',
    cardBackground: darkMode ? '#3a3a3a' : '#f8f9fa',
    buttonPrimary: 'linear-gradient(135deg, #0070f3, #0051cc)',
    buttonDanger: 'linear-gradient(135deg, #dc3545, #c82333)',
    shadow: darkMode ? '0 10px 40px rgba(0, 0, 0, 0.3)' : '0 10px 40px rgba(0, 0, 0, 0.1)'
  };

  const tabs = [
    { id: 'products', label: 'מוצרים', icon: '📦', color: '#3498db', href: '/products' },
    { id: 'customers', label: 'לקוחות', icon: '👥', color: '#e74c3c', href: '/customers' },
    { id: 'settings', label: 'הגדרות', icon: '⚙️', color: '#27ae60', href: '/settings' }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: theme.outerBackground,
      fontFamily: 'Arial, sans-serif',
      direction: 'rtl',
      padding: '10px'
    }}>
      {isMobile && (
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            backgroundColor: theme.sidebarBackground,
            color: theme.sidebarText,
            border: 'none',
            padding: '10px',
            borderRadius: '5px',
            cursor: 'pointer',
            zIndex: 1001
          }}
        >
          ☰
        </button>
      )}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '280px 1fr',
        gap: '20px',
        minHeight: 'calc(100vh - 20px)'
      }}
      className="dashboard-wrapper">
        {/* Sidebar */}
        <div style={{
          width: '280px',
          backgroundColor: theme.sidebarBackground,
          color: theme.sidebarText,
          padding: '20px',
          boxShadow: theme.shadow,
          display: isMobile ? (isSidebarOpen ? 'flex' : 'none') : 'flex',
          flexDirection: 'column',
          position: isMobile ? 'fixed' : 'static',
          top: isMobile ? '0' : 'auto',
          left: isMobile ? '0' : 'auto',
          height: isMobile ? '100vh' : 'auto',
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
                      backgroundColor: currentTab === tab.id ? (darkMode ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.1)') : 'transparent',
                      padding: '15px 20px',
                      marginBottom: '10px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px',
                      borderLeft: currentTab === tab.id ? `4px solid ${tab.color}` : '4px solid transparent'
                    }}
                    onMouseOver={(e) => {
                      if (currentTab !== tab.id) {
                        const rgba = darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)';
                        e.target.style.backgroundColor = rgba;
                      }
                    }}
                    onMouseOut={(e) => {
                      if (currentTab !== tab.id) {
                        e.target.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    <span style={{ fontSize: '20px', color: tab.color }}>{tab.icon}</span>
                    <span style={{
                      color: theme.sidebarText,
                      fontSize: '16px',
                      fontWeight: currentTab === tab.id ? 'bold' : 'normal'
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
          backgroundColor: darkMode ? theme.innerBackground : '#f0f2f5'
        }}>
          <div style={{
            backgroundColor: darkMode ? '#2a2a2a' : 'white',
            borderRadius: '12px',
            padding: '30px',
            minHeight: 'calc(100vh - 120px)',
            boxShadow: theme.shadow,
            animation: 'fadeIn 0.3s ease-in-out'
          }}>
            {typeof children === 'function' ? children(darkMode) : children}
            {/* Footer inside content */}
            <div style={{
              marginTop: '30px',
              padding: '15px',
              backgroundColor: 'transparent',
              borderTop: `1px solid ${theme.cardBackground}`,
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
