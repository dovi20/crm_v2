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

  // רשימת המשימות למערכת CRM מושלמת
  const crmChecklist = [
    {
      category: 'תשתית ואבטחה',
      icon: '🔐',
      color: '#667eea',
      items: [
        { text: 'הקמת מסד נתונים (Prisma + SQLite)', done: true },
        { text: 'מערכת אימות משתמשים (NextAuth)', done: true },
        { text: 'עמוד התחברות והרשמה', done: true },
        { text: 'הגנה על דפים פרטיים', done: true },
        { text: 'Docker containerization', done: true },
        { text: 'תמיכה ב-HTTPS וסיסמאות מוצפנות', done: false },
        { text: 'גיבויים אוטומטיים של מסד הנתונים', done: false },
        { text: 'לוגים ומעקב אחר פעילות משתמשים', done: false },
        { text: 'הגבלת קצב בקשות (Rate Limiting)', done: false }
      ]
    },
    {
      category: 'ניהול לקוחות (CRM Core)',
      icon: '👥',
      color: '#28a745',
      items: [
        { text: 'מודל Customers במסד הנתונים', done: false },
        { text: 'עמוד רשימת לקוחות עם חיפוש וסינון', done: false },
        { text: 'טופס הוספת לקוח חדש', done: false },
        { text: 'עריכת פרטי לקוח קיים', done: false },
        { text: 'מחיקת לקוח עם אישור', done: false },
        { text: 'ייבוא לקוחות מקובץ Excel/CSV', done: false },
        { text: 'ייצוא לקוחות לקובץ Excel/CSV', done: false },
        { text: 'קטגוריות ותגיות ללקוחות', done: false },
        { text: 'היסטוריית פעילות עם כל לקוח', done: false },
        { text: 'תמונות פרופיל ללקוחות', done: false }
      ]
    },
    {
      category: 'ניהול עסקאות ומכירות',
      icon: '💰',
      color: '#ffc107',
      items: [
        { text: 'מודל Deals/Opportunities', done: false },
        { text: 'תהליך מכירה (Sales Pipeline)', done: false },
        { text: 'שלבי עסקה: ליד → הצעת מחיר → סגירה', done: false },
        { text: 'חישוב הכנסות צפויות', done: false },
        { text: 'דוחות מכירות חודשיים/שנתיים', done: false },
        { text: 'גרפים ותרשימים של מכירות', done: false },
        { text: 'תזכורות אוטומטיות למעקב עסקאות', done: false },
        { text: 'ניהול הצעות מחיר', done: false },
        { text: 'חישוב עמלות למוכרים', done: false }
      ]
    },
    {
      category: 'משימות ולוח זמנים',
      icon: '📅',
      color: '#17a2b8',
      items: [
        { text: 'מודל Tasks במסד הנתונים', done: false },
        { text: 'יצירת משימות חדשות', done: false },
        { text: 'הקצאת משימות לחברי צוות', done: false },
        { text: 'תזמון משימות לתאריכים', done: false },
        { text: 'סטטוסים: פתוח, בטיפול, הושלם', done: false },
        { text: 'עדיפויות: נמוכה, בינונית, גבוהה, דחוף', done: false },
        { text: 'תזכורות במייל ובמערכת', done: false },
        { text: 'לוח שנה חזותי למשימות', done: false },
        { text: 'שיוך משימות ללקוחות ועסקאות', done: false }
      ]
    },
    {
      category: 'תקשורת ואינטראקציות',
      icon: '💬',
      color: '#6f42c1',
      items: [
        { text: 'מודל Communications/Notes', done: false },
        { text: 'רישום שיחות טלפון', done: false },
        { text: 'שליחת אימיילים מהמערכת', done: false },
        { text: 'תבניות אימיילים', done: false },
        { text: 'היסטוריית תקשורת מלאה', done: false },
        { text: 'SMS notifications (אופציונלי)', done: false },
        { text: 'אינטגרציה עם WhatsApp Business API', done: false },
        { text: 'מעקב אחר אימיילים שנפתחו', done: false }
      ]
    },
    {
      category: 'דוחות ואנליטיקה',
      icon: '📊',
      color: '#dc3545',
      items: [
        { text: 'דוח מכירות לפי תקופה', done: false },
        { text: 'דוח ביצועי מוכרים', done: false },
        { text: 'אנליזת מקורות לידים', done: false },
        { text: 'שיעור המרה (Conversion Rate)', done: false },
        { text: 'דוח לקוחות פעילים vs מנותקים', done: false },
        { text: 'גרפי מגמות לאורך זמן', done: false },
        { text: 'דשבורד עם KPIs עיקריים', done: false },
        { text: 'ייצוא דוחות ל-PDF/Excel', done: false }
      ]
    },
    {
      category: 'ניהול משתמשים והרשאות',
      icon: '👤',
      color: '#fd7e14',
      items: [
        { text: 'מודל Users עם תפקידים', done: false },
        { text: 'הרשאות: Admin, Manager, Sales, Viewer', done: false },
        { text: 'ניהול צוות מכירות', done: false },
        { text: 'הקצאת לקוחות למוכרים', done: false },
        { text: 'מעקב פעילות משתמשים', done: false },
        { text: 'התאמה אישית של ממשק למשתמש', done: false },
        { text: 'הגדרות נוטיפיקציות אישיות', done: false }
      ]
    },
    {
      category: 'אוטומציות',
      icon: '⚡',
      color: '#20c997',
      items: [
        { text: 'תזכורות אוטומטיות למעקב', done: false },
        { text: 'אימיילים אוטומטיים ללקוחות חדשים', done: false },
        { text: 'הקצאה אוטומטית של לידים', done: false },
        { text: 'עדכון סטטוס עסקאות אוטומטי', done: false },
        { text: 'דיוור שיווקי אוטומטי', done: false },
        { text: 'תזכורות יום הולדת ללקוחות', done: false },
        { text: 'Webhooks לאינטגרציות חיצוניות', done: false }
      ]
    },
    {
      category: 'אינטגרציות חיצוניות',
      icon: '🔗',
      color: '#e83e8c',
      items: [
        { text: 'אינטגרציה עם Gmail', done: false },
        { text: 'אינטגרציה עם Google Calendar', done: false },
        { text: 'אינטגרציה עם Slack', done: false },
        { text: 'אינטגרציה עם Zoom', done: false },
        { text: 'API פומבי למערכת', done: false },
        { text: 'Zapier integration', done: false },
        { text: 'אינטגרציה עם מערכות חשבוניות', done: false }
      ]
    },
    {
      category: 'ממשק משתמש (UI/UX)',
      icon: '🎨',
      color: '#6610f2',
      items: [
        { text: 'עיצוב רספונסיבי למובייל', done: false },
        { text: 'תמיכה בעברית מלאה (RTL)', done: true },
        { text: 'ערכת נושא בהירה וכהה', done: false },
        { text: 'אייקונים ואנימציות', done: false },
        { text: 'טפסים עם Validation מתקדם', done: false },
        { text: 'Drag & Drop לארגון משימות', done: false },
        { text: 'חיפוש גלובלי במערכת', done: false },
        { text: 'קיצורי מקלדת', done: false },
        { text: 'הנגשה (Accessibility)', done: false }
      ]
    },
    {
      category: 'תכונות מתקדמות',
      icon: '🚀',
      color: '#795548',
      items: [
        { text: 'AI לניתוח לידים והמלצות', done: false },
        { text: 'Chatbot לשירות לקוחות', done: false },
        { text: 'ניתוח סנטימנט בתקשורת', done: false },
        { text: 'חיזוי מכירות (Forecasting)', done: false },
        { text: 'מפות חום של פעילות', done: false },
        { text: 'אפליקציה ניידת (PWA)', done: false },
        { text: 'תמיכה מולטי-שפתית', done: false },
        { text: 'מצב Offline', done: false }
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
                מפת דרכים לבניית מערכת CRM מושלמת
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
            זוהי רשימה מקיפה של כל מה שנדרש לבניית מערכת CRM מתקדמת ומקצועית
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
