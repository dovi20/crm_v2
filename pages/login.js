import { useState, useEffect } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Logo from '../components/Logo';

export default function Login() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (message) {
      setMessage('');
    }
  }, [username, password]);

  const theme = {
    outerBackground: darkMode ? '#1a1a1a' : 'white',
    innerBackground: darkMode ? '#2a2a2a' : 'white',
    innerShadow: darkMode ? '0 20px 40px rgba(0, 0, 0, 0.5)' : '0 20px 40px rgba(0, 0, 0, 0.1)',
    h1Color: darkMode ? 'white' : '#333',
    labelColor: darkMode ? '#ccc' : '#555',
    inputBorderColor: darkMode ? '#666' : '#e1e1e1',
    inputBackground: darkMode ? '#444' : 'white',
    inputColor: darkMode ? 'white' : 'black',
    messageSuccessBg: darkMode ? '#3a5e3a' : '#d4edda',
    messageSuccessColor: darkMode ? '#c3e6c3' : '#155724',
    messageSuccessBorder: darkMode ? '#5a8c5a' : '#c3e6cb',
    messageErrorBg: darkMode ? '#6c3c3c' : '#f8d7da',
    messageErrorColor: darkMode ? '#f2c3c3' : '#721c24',
    messageErrorBorder: darkMode ? '#a37272' : '#f5c6cb',
    adminBg: darkMode ? '#4a4a4a' : '#f8f9fa',
    adminBorder: darkMode ? '#666' : '#e9ecef',
    adminTextColor: darkMode ? '#ccc' : '#6c757d',
    adminH3Color: darkMode ? '#ccc' : '#495057'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    if (isLogin) {
      // Login - use the identifier field (username or email)
      const result = await signIn('credentials', {
        username: username, // This will be checked as both username and email
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
          body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          setMessage('משתמש נוצר בהצלחה! אנא התחבר.');
          setIsLogin(true);
          setUsername('');
          setEmail('');
          setPassword('');
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
      background: theme.outerBackground,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      direction: 'rtl'
    }}>
      <div style={{
        backgroundColor: theme.innerBackground,
        borderRadius: '20px',
        boxShadow: theme.innerShadow,
        padding: '40px',
        width: '100%',
        maxWidth: '450px',
        textAlign: 'center',
        position: 'relative'
      }}>
        {/* Dark Mode Toggle */}
        <button onClick={() => setDarkMode(!darkMode)} style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: 'none',
          border: 'none',
          color: theme.h1Color,
          fontSize: '24px',
          cursor: 'pointer'
        }}>{darkMode ? '☀️' : '🌙'}</button>
        {/* לוגו */}
        <div style={{ marginBottom: '30px' }}>
          <Logo width={300} darkMode={darkMode} />
        </div>

        {/* כותרת */}
        <h1 style={{
          color: theme.h1Color,
          marginBottom: '30px',
          fontSize: '28px',
          fontWeight: '600'
        }}>
          {isLogin ? 'התחברות למערכת' : 'הרשמה למערכת'}
        </h1>

        {/* טופס */}
        <form onSubmit={handleSubmit} style={{ textAlign: 'right' }}>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="username" style={{
              display: 'block',
              marginBottom: '8px',
              color: theme.labelColor,
              fontWeight: '500'
            }}>
              שם משתמש או דוא"ל:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="הקלד שם משתמש או דוא״ל"
              required
              style={{
                width: '100%',
                padding: '15px',
                border: `2px solid ${theme.inputBorderColor}`,
                borderRadius: '10px',
                fontSize: '16px',
                backgroundColor: theme.inputBackground,
                color: theme.inputColor,
                transition: 'border-color 0.3s ease',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#0070f3'}
              onBlur={(e) => e.target.style.borderColor = theme.inputBorderColor}
            />
          </div>

          {!isLogin && (
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="email" style={{
                display: 'block',
                marginBottom: '8px',
                color: theme.labelColor,
                fontWeight: '500'
              }}>
                דוא"ל (הרשמה בלבד):
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={!isLogin}
                style={{
                  width: '100%',
                  padding: '15px',
                  border: `2px solid ${theme.inputBorderColor}`,
                  borderRadius: '10px',
                  fontSize: '16px',
                  backgroundColor: theme.inputBackground,
                  color: theme.inputColor,
                  transition: 'border-color 0.3s ease',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#0070f3'}
                onBlur={(e) => e.target.style.borderColor = theme.inputBorderColor}
              />
            </div>
          )}

          <div style={{ marginBottom: '25px' }}>
            <label htmlFor="password" style={{
              display: 'block',
              marginBottom: '8px',
              color: theme.labelColor,
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
                border: `2px solid ${theme.inputBorderColor}`,
                borderRadius: '10px',
                fontSize: '16px',
                backgroundColor: theme.inputBackground,
                color: theme.inputColor,
                transition: 'border-color 0.3s ease',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#0070f3'}
              onBlur={(e) => e.target.style.borderColor = theme.inputBorderColor}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !username || !password}
            style={{
              backgroundColor: (isLoading || !username || !password) ? (darkMode ? '#555' : '#ccc') : 'linear-gradient(135deg, #0070f3, #0051cc)',
              color: 'white',
              padding: '15px 30px',
              border: 'none',
              borderRadius: '10px',
              cursor: (isLoading || !username || !password) ? 'not-allowed' : 'pointer',
              width: '100%',
              fontSize: '16px',
              fontWeight: '600',
              transition: 'transform 0.2s ease',
              outline: 'none'
            }}
            onMouseOver={(e) => !(isLoading || !username || !password) && (e.target.style.transform = 'translateY(-2px)')}
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
            backgroundColor: message.includes('success') ? theme.messageSuccessBg : theme.messageErrorBg,
            color: message.includes('success') ? theme.messageSuccessColor : theme.messageErrorColor,
            border: `1px solid ${message.includes('success') ? theme.messageSuccessBorder : theme.messageErrorBorder}`
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
          backgroundColor: theme.adminBg,
          borderRadius: '10px',
          border: `1px solid ${theme.adminBorder}`
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: theme.adminH3Color, fontSize: '14px' }}>
            מנהל ברירת מחדל:
          </h3>
          <p style={{ margin: '5px 0', fontSize: '13px', color: theme.adminTextColor }}>
            <strong>שם משתמש:</strong> admin
          </p>
          <p style={{ margin: '5px 0', fontSize: '13px', color: theme.adminTextColor }}>
            <strong>דוא"ל:</strong> admin@test.com
          </p>
          <p style={{ margin: '5px 0', fontSize: '13px', color: theme.adminTextColor }}>
            <strong>סיסמה:</strong> admin123
          </p>
          <p style={{ margin: '10px 0 0 0', fontSize: '12px', color: '#0070f3', fontStyle: 'italic' }}>
            💡 ניתן להתחבר עם שם המשתמש או הדוא"ל
          </p>
        </div>
      </div>
    </div>
  );
}
