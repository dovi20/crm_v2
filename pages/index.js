import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Logo from '../components/Logo';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [expandedSections, setExpandedSections] = useState({});

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) router.push('/login');
  }, [session, status, router]);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // רשימת המשימות למערכת CRM מושלמת (מפושטת ל-15 שלבים עיקריים)
  const crmChecklist = [
    {
      category: 'שלב 1: תשתית בסיסית',
      icon: '🏗️',
      color: '#667eea',
      items: [
        { text: 'הקמת מסד נתונים וטבלאות בסיסיות', done: true },
        { text: 'מערכת אימות משתמשים מלאה', done: true },
        { text: 'עמוד התחברות והרשמה מאובטחים', done: true },
        { text: 'הגנה על דפים פרטיים ותמיכת Docker', done: true }
      ]
    },
    {
      category: 'שלב 2: ניהול לקוחות',
      icon: '👥',
      color: '#28a745',
      items: [
        { text: 'מודל לקוחות במסד הנתונים', done: false },
        { text: 'רשימת לקוחות עם חיפוש וסינון', done: false },
        { text: 'טופס הוספת ועריכת לקוחות', done: false },
        { text: 'ייבוא וייצוא לקוחות מקובץ', done: false }
      ]
    },
    {
      category: 'שלב 3: ניהול עסקאות',
      icon: '💰',
      color: '#ffc107',
      items: [
        { text: 'מודל עסקאות ותהליך מכירה', done: false },
        { text: 'שלבי עסקה: ליד → הצעה → סגירה', done: false },
        { text: 'חישוב הכנסות ותזכורות מעקב', done: false },
        { text: 'דוחות מכירות בסיסיים', done: false }
      ]
    },
    {
      category: 'שלב 4: משימות ותזמון',
      icon: '📅',
      color: '#17a2b8',
      items: [
        { text: 'מודל משימות במסד הנתונים', done: false },
        { text: 'יצירה והקצאה של משימות', done: false },
        { text: 'תזמון משימות ותזכורות', done: false },
        { text: 'לוח שנה חזותי למשימות', done: false }
      ]
    },
    {
      category: 'שלב 5: תקשורת עם לקוחות',
      icon: '💬',
      color: '#6f42c1',
      items: [
        { text: 'רישום הערות ותקשורת עם לקוחות', done: false },
        { text: 'היסטוריית תקשורת מלאה', done: false },
        { text: 'תבניות אימיילים ושליחה מהמערכת', done: false },
        { text: 'תזכורות אוטומטיות למעקב', done: false }
      ]
    },
    {
      category: 'שלב 6: דוחות ואנליטיקה',
      icon: '📊',
      color: '#dc3545',
      items: [
        { text: 'דוח מכירות מפורט לפי תקופות', done: false },
        { text: 'דוח ביצועי צוות המכירות', done: false },
        { text: 'גרפים ותרשימים חזותיים', done: false },
        { text: 'ייצוא דוחות ל-Excel/PDF', done: false }
      ]
    },
    {
      category: 'שלב 7: ניהול צוות',
      icon: '👥',
      color: '#fd7e14',
      items: [
        { text: 'מודל משתמשים עם תפקידים שונים', done: false },
        { text: 'הרשאות: מנהל, מוכר, צופה', done: false },
        { text: 'הקצאת לקוחות למוכרים', done: false },
        { text: 'מעקב פעילות משתמשים', done: false }
      ]
    },
    {
      category: 'שלב 8: אוטומציות',
      icon: '⚡',
      color: '#20c997',
      items: [
        { text: 'תזכורות אוטומטיות למעקב עסקאות', done: false },
        { text: 'אימיילים אוטומטיים ללקוחות חדשים', done: false },
        { text: 'הקצאה אוטומטית של לידים חדשים', done: false },
        { text: 'עדכון סטטוס עסקאות אוטומטי', done: false }
      ]
    },
    {
      category: 'שלב 9: אינטגרציות',
      icon: '🔗',
      color: '#e83e8c',
      items: [
        { text: 'אינטגרציה עם Gmail ו-Google Calendar', done: false },
        { text: 'אינטגרציה עם Slack לנוטיפיקציות', done: false },
        { text: 'API פומבי למערכת חיצונית', done: false },
        { text: 'אינטגרציה עם מערכות חשבוניות', done: false }
      ]
    },
    {
      category: 'שלב 10: ממשק משתמש',
      icon: '🎨',
      color: '#6610f2',
      items: [
        { text: 'עיצוב רספונסיבי למובייל וטאבלט', done: false },
        { text: 'תמיכה מלאה בעברית ו-RTL', done: true },
        { text: 'ערכת נושא בהירה וכהה', done: false },
        { text: 'חיפוש גלובלי וקיצורי מקלדת', done: false }
      ]
    }
  ];

  const totalTasks = crmChecklist.reduce((acc, cat) => acc + cat.items.length, 0);
  const completedTasks = crmChecklist.reduce((acc, cat) => 
    acc + cat.items.filter(item => item.done).length, 0
  );
  const progressPercentage = Math.round((completedTasks / totalTasks) * 100);

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
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      direction: 'rtl',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '30px',
          marginBottom: '20px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <div style={{ textAlign: 'right' }}>
              <Logo width={300} />
              <h1 style={{
                color: '#333',
                margin: '15px 0 5px 0',
                fontSize: '32px',
                fontWeight: '700'
              }}>
                מפת דרכים לבניית מערכת CRM מושלמת (10 שלבים)
              </h1>
              <p style={{
                color: '#6c757d',
                margin: 0,
                fontSize: '16px'
              }}>
                מחובר כ-{session.user?.username || session.user?.email}
              </p>
            </div>
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
              התנתק
            </button>
          </div>

          {/* Progress Bar */}
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '25px',
            borderRadius: '15px',
            border: '2px solid #e9ecef'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '15px'
            }}>
              <div>
                <h2 style={{
                  margin: 0,
                  fontSize: '24px',
                  color: '#333'
                }}>
                  התקדמות כוללת
                </h2>
                <p style={{
                  margin: '5px 0 0 0',
                  color: '#6c757d',
                  fontSize: '16px'
                }}>
                  {completedTasks} מתוך {totalTasks} משימות הושלמו
                </p>
              </div>
              <div style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: progressPercentage > 50 ? '#28a745' : '#ffc107'
              }}>
                {progressPercentage}%
              </div>
            </div>
            <div style={{
              width: '100%',
              height: '30px',
              backgroundColor: '#e9ecef',
              borderRadius: '15px',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <div style={{
                width: `${progressPercentage}%`,
                height: '100%',
                background: progressPercentage > 50 
                  ? 'linear-gradient(90deg, #28a745, #20c997)'
                  : 'linear-gradient(90deg, #ffc107, #fd7e14)',
                transition: 'width 0.5s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '14px'
              }}>
                {progressPercentage > 10 && `${completedTasks}/${totalTasks}`}
              </div>
            </div>
          </div>
        </div>

        {/* Checklist Categories */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
          gap: '20px'
        }}>
          {crmChecklist.map((category, idx) => {
            const categoryCompleted = category.items.filter(i => i.done).length;
            const categoryTotal = category.items.length;
            const categoryProgress = Math.round((categoryCompleted / categoryTotal) * 100);
            const isExpanded = expandedSections[idx];

            return (
              <div
                key={idx}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '15px',
                  padding: '25px',
                  boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease'
                }}
              >
                {/* Category Header */}
                <div
                  onClick={() => toggleSection(idx)}
                  style={{
                    cursor: 'pointer',
                    marginBottom: isExpanded ? '20px' : '0',
                    paddingBottom: isExpanded ? '20px' : '0',
                    borderBottom: isExpanded ? '2px solid #e9ecef' : 'none'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '10px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '32px' }}>{category.icon}</span>
                      <h3 style={{
                        margin: 0,
                        fontSize: '20px',
                        color: '#333',
                        fontWeight: '700'
                      }}>
                        {category.category}
                      </h3>
                    </div>
                    <span style={{
                      fontSize: '24px',
                      color: category.color,
                      fontWeight: 'bold'
                    }}>
                      {isExpanded ? '▼' : '◀'}
                    </span>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '14px',
                    color: '#6c757d',
                    marginBottom: '10px'
                  }}>
                    <span>{categoryCompleted}/{categoryTotal} משימות</span>
                    <span style={{
                      fontWeight: 'bold',
                      color: categoryProgress === 100 ? '#28a745' : category.color
                    }}>
                      {categoryProgress}%
                    </span>
                  </div>

                  <div style={{
                    width: '100%',
                    height: '8px',
                    backgroundColor: '#e9ecef',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${categoryProgress}%`,
                      height: '100%',
                      backgroundColor: categoryProgress === 100 ? '#28a745' : category.color,
                      transition: 'width 0.5s ease'
                    }}></div>
                  </div>
                </div>

                {/* Category Items */}
                {isExpanded && (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}>
                    {category.items.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '12px',
                          padding: '12px',
                          backgroundColor: item.done ? '#d4edda' : '#f8f9fa',
                          borderRadius: '8px',
                          border: item.done 
                            ? '2px solid #28a745' 
                            : '2px solid #e9ecef',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <div style={{
                          minWidth: '24px',
                          height: '24px',
                          borderRadius: '6px',
                          backgroundColor: item.done ? '#28a745' : 'white',
                          border: item.done ? '2px solid #28a745' : '2px solid #6c757d',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '16px',
                          color: 'white',
                          fontWeight: 'bold',
                          flexShrink: 0
                        }}>
                          {item.done && '✓'}
                        </div>
                        <span style={{
                          fontSize: '15px',
                          color: item.done ? '#155724' : '#333',
                          textDecoration: item.done ? 'line-through' : 'none',
                          fontWeight: item.done ? '600' : '400',
                          lineHeight: '1.5'
                        }}>
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{
          marginTop: '30px',
          padding: '25px',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '15px',
          textAlign: 'center',
          boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{
            color: '#333',
            margin: '0 0 10px 0',
            fontSize: '20px'
          }}>
            💡 טיפ: לחץ על כל קטגוריה כדי לראות את הפירוט המלא
          </h3>
          <p style={{
            color: '#6c757d',
            margin: 0,
            fontSize: '16px'
          }}>
            מפת דרכים בת 10 שלבים לבניית מערכת CRM מתקדמת ומקצועית
          </p>
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
