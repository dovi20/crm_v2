import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

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
    return <div style={{ textAlign: 'center', marginTop: '100px' }}>טוען...</div>;
  }

  if (!session) {
    return null; // Will redirect to login
  }

  return (
    <div style={{ maxWidth: '800px', margin: '50px auto', padding: '20px', direction: 'rtl' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>ברוכים הבאים לדשבורד</h1>
        <button
          onClick={handleSignOut}
          style={{
            backgroundColor: '#dc3545',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          התנתק
        </button>
      </div>

      <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h2>פרטי משתמש</h2>
        <p><strong>דוא"ל:</strong> {session.user?.email}</p>
        <p><strong>מזהה משתמש:</strong> {session.user?.id}</p>
      </div>

      <div style={{ backgroundColor: '#e9ecef', padding: '20px', borderRadius: '8px' }}>
        <h2>תוכן הדשבורד</h2>
        <p>ברוכים הבאים לדשבורד המוגן שלכם! אתם מחוברים בהצלחה.</p>
        <p>זהו דף מוגן הדורש אימות כדי לגשת אליו.</p>
      </div>
    </div>
  );
}
