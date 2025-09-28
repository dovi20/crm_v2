import { useState } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    if (isLogin) {
      // Login
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setMessage('פרטי התחברות שגויים');
      } else {
        router.push('/');
      }
    } else {
      // Signup
      try {
        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          setMessage('משתמש נוצר בהצלחה! אנא התחבר.');
          setIsLogin(true);
        } else {
          setMessage(data.message || 'אירעה שגיאה');
        }
      } catch (error) {
        setMessage('אירעה שגיאה');
      }
    }

    setIsLoading(false);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px', direction: 'rtl' }}>
      <h1>{isLogin ? 'התחברות' : 'הרשמה'}</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>
            דוא"ל:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>
            סיסמה:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          style={{
            backgroundColor: isLoading ? '#ccc' : '#0070f3',
            color: 'white',
            padding: '10px 15px',
            border: 'none',
            borderRadius: '4px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            width: '100%'
          }}
        >
          {isLoading ? 'טוען...' : (isLogin ? 'התחבר' : 'הירשם')}
        </button>
      </form>

      {message && (
        <p style={{ marginTop: '15px', color: message.includes('success') ? 'green' : 'red' }}>
          {message}
        </p>
      )}

      <button
        onClick={() => setIsLogin(!isLogin)}
        style={{
          background: 'none',
          border: 'none',
          color: '#0070f3',
          cursor: 'pointer',
          marginTop: '15px'
        }}
      >
        {isLogin ? 'צריך ליצור חשבון?' : 'כבר יש לך חשבון?'}
      </button>

      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
        <strong>מנהל ברירת מחדל:</strong><br />
        דוא"ל: admin@test.com<br />
        סיסמה: admin123
      </div>
    </div>
  );
}
