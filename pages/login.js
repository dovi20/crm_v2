import { useState } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Logo from '../components/Logo';

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
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      direction: 'rtl'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '20px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        padding: '40px',
        width: '100%',
        maxWidth: '450px',
        textAlign: 'center'
      }}>
        {/* לוגו */}
        <div style={{ marginBottom: '30px' }}>
          <Logo width={300} />
        </div>

        {/* כותרת */}
        <h1 style={{
          color: '#333',
          marginBottom: '30px',
          fontSize: '28px',
          fontWeight: '600'
        }}>
          {isLogin ? 'התחברות למערכת' : 'הרשמה למערכת'}
        </h1>

        {/* טופס */}
        <form onSubmit={handleSubmit} style={{ textAlign: 'right' }}>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="email" style={{
              display: 'block',
              marginBottom: '8px',
              color: '#555',
              fontWeight: '500'
            }}>
              דוא"ל:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '15px',
                border: '2px solid #e1e1e1',
                borderRadius: '10px',
                fontSize: '16px',
                transition: 'border-color 0.3s ease',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#0070f3'}
              onBlur={(e) => e.target.style.borderColor = '#e1e1e1'}
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label htmlFor="password" style={{
              display: 'block',
              marginBottom: '8px',
              color: '#555',
              fontWeight: '500'
            }}>
              סיסמה:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              style={{
                width: '100%',
                padding: '15px',
                border: '2px solid #e1e1e1',
                borderRadius: '10px',
                fontSize: '16px',
                transition: 'border-color 0.3s ease',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#0070f3'}
              onBlur={(e) => e.target.style.borderColor = '#e1e1e1'}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              backgroundColor: isLoading ? '#ccc' : 'linear-gradient(135deg, #0070f3, #0051cc)',
              color: 'white',
              padding: '15px 30px',
              border: 'none',
              borderRadius: '10px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              width: '100%',
              fontSize: '16px',
              fontWeight: '600',
              transition: 'transform 0.2s ease',
              outline: 'none'
            }}
            onMouseOver={(e) => !isLoading && (e.target.style.transform = 'translateY(-2px)')}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            {isLoading ? 'טוען...' : (isLogin ? 'התחבר למערכת' : 'צור חשבון חדש')}
          </button>
        </form>

        {/* הודעות */}
        {message && (
          <div style={{
            marginTop: '20px',
            padding: '12px',
            borderRadius: '8px',
            backgroundColor: message.includes('success') ? '#d4edda' : '#f8d7da',
            color: message.includes('success') ? '#155724' : '#721c24',
            border: `1px solid ${message.includes('success') ? '#c3e6cb' : '#f5c6cb'}`
          }}>
            {message}
          </div>
        )}

        {/* כפתור מעבר בין מצבים */}
        <button
          onClick={() => setIsLogin(!isLogin)}
          style={{
            background: 'none',
            border: 'none',
            color: '#0070f3',
            cursor: 'pointer',
            marginTop: '20px',
            fontSize: '14px',
            textDecoration: 'underline'
          }}
        >
          {isLogin ? 'צריך ליצור חשבון? לחץ כאן' : 'כבר יש לך חשבון? לחץ כאן'}
        </button>

        {/* מידע למנהל */}
        <div style={{
          marginTop: '30px',
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '10px',
          border: '1px solid #e9ecef'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#495057', fontSize: '14px' }}>
            מנהל ברירת מחדל:
          </h3>
          <p style={{ margin: '5px 0', fontSize: '13px', color: '#6c757d' }}>
            דוא"ל: admin@test.com
          </p>
          <p style={{ margin: '5px 0', fontSize: '13px', color: '#6c757d' }}>
            סיסמה: admin123
          </p>
        </div>
      </div>
    </div>
  );
}
