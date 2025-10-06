import DashboardLayout from '../components/DashboardLayout';
import Link from 'next/link';

export default function Home() {
  return (
    <DashboardLayout currentTab="index">
      {(darkMode) => (
        <DashboardContent darkMode={darkMode} />
      )}
    </DashboardLayout>
  );
}

function DashboardContent({ darkMode }) {
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

  // Mock statistics (replace with real data)
  const stats = {
    totalProducts: 125,
    totalCustomers: 89,
    totalOrders: 47,
    revenue: '₪45,230'
  };

  const quickActions = [
    { label: 'הוסף מוצר', icon: '➕', href: '/products', color: theme.successColor },
    { label: 'הוסף לקוח', icon: '👤', href: '/customers', color: theme.infoColor },
    { label: 'הגדרות', icon: '⚙️', href: '/settings', color: theme.warningColor }
  ];

  return (
    <div>
      <h1 style={{ color: theme.textPrimary, marginBottom: '30px', fontSize: '28px' }}>דאשבורד</h1>

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
