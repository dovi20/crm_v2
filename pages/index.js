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

  // תוכנית עבודה - מערכת ניהול מלאי חצאיות
  const projectChecklist = [
    {
      category: 'שלב 1: הכנת תשתית הפרויקט',
      icon: '🏗️',
      color: '#667eea',
      progress: 20,
      items: [
        { text: 'יצירת פרויקט Next.js חדש עם TypeScript', done: true },
        { text: 'הגדרת מסד נתונים PostgreSQL עם Prisma ORM', done: true },
        { text: 'הגדרת Vercel deployment ו-environment variables', done: false },
        { text: 'ייבוא נתוני הקטלוג הראשוני ל-DB', done: true },
        { text: 'הגדרת authentication בסיסי (אם נדרש)', done: false }
      ]
    },
    {
      category: 'שלב 2: עיצוב מסד הנתונים',
      icon: '🗄️',
      color: '#28a745',
      progress: 0,
      items: [
        { text: 'טבלת מוצרים (products) - ברקוד, מידה, אורך, צבע, דגם', done: false },
        { text: 'טבלת מחסנים (warehouses) - שם, מיקום, קיבולת', done: false },
        { text: 'טבלת מלאי במחסנים (warehouse_inventory)', done: false },
        { text: 'טבלת אולם גדול (main_hall_inventory)', done: false },
        { text: 'טבלת לקוחות (customers) - פרטים והיסטוריה', done: false },
        { text: 'טבלת הזמנות (orders) - פריטים, סטטוס, מחירים', done: false },
        { text: 'טבלת תנועות מלאי (inventory_movements)', done: false }
      ]
    },
    {
      category: 'שלב 3: פיתוח ממשק ניהול מלאי',
      icon: '📦',
      color: '#ffc107',
      progress: 25,
      items: [
        { text: 'דף ראשי עם dashboard וסקירה כללית', done: true },
        { text: 'דף חיפוש וסינון מוצרים עם ייצוא ל-Excel', done: true },
        { text: 'ממשק הוספה/הסרה מלאי עם סריקת ברקוד', done: false },
        { text: 'ממשק ניהול מחסנים והעברת מלאי', done: false }
      ]
    },
    {
      category: 'שלב 4: פיתוח מערכת הזמנות',
      icon: '📋',
      color: '#17a2b8',
      progress: 0,
      items: [
        { text: 'ניהול לקוחות - הוספה/עריכה/חיפוש', done: false },
        { text: 'יצירת הזמנה חדשה עם בדיקת זמינות', done: false },
        { text: 'ממשק עיבוד הזמנות ואישור/ביטול', done: false },
        { text: 'דוחות הזמנות ומעקב סטטוס', done: false }
      ]
    },
    {
      category: 'שלב 5: ממשק משתמש מתקדם',
      icon: '🎨',
      color: '#6f42c1',
      progress: 0,
      items: [
        { text: 'עיצוב רספונסיבי למובייל ודסקטופ', done: false },
        { text: 'תכונות מתקדמות - התראות, קיצורים', done: false },
        { text: 'תמיכה בסריקת ברקודים וניווט נוח', done: false },
        { text: 'אבטחה וביצועים - הגנות ו-caching', done: false }
      ]
    },
    {
      category: 'שלב 6: פיתוח API ושרת',
      icon: '🔗',
      color: '#dc3545',
      progress: 0,
      items: [
        { text: 'API endpoints מלאים לכל הפעולות', done: false },
        { text: 'אימות והרשאות עם JWT ותפקידים', done: false },
        { text: 'דוחות וסטטיסטיקות מתקדמות', done: false },
        { text: 'תיעוד API עם Swagger', done: false }
      ]
    },
    {
      category: 'שלב 7: בדיקות ואופטימיזציה',
      icon: '🧪',
      color: '#fd7e14',
      progress: 0,
      items: [
        { text: 'בדיקות יחידה (Unit Tests) לפונקציות', done: false },
        { text: 'בדיקות אינטגרציה וזרימה מלאה', done: false },
        { text: 'בדיקות UX/UI וביצועים', done: false },
        { text: 'אופטימיזציה של זמני טעינה ו-DB', done: false }
      ]
    },
    {
      category: 'שלב 8: השקה ותחזוקה',
      icon: '🚀',
      color: '#20c997',
      progress: 0,
      items: [
        { text: 'הגדרת סביבת ייצור ב-Vercel', done: false },
        { text: 'העלאת מסד נתונים וגיבויים', done: false },
        { text: 'בדיקות סופיות ותאימות ייצור', done: false },
        { text: 'הכשרת משתמשים ומדריך שימוש', done: false }
      ]
    },
    {
      category: 'שלב 9: אינטגרציה ריווחית',
      icon: '🔄',
      color: '#e83e8c',
      progress: 0,
      items: [
        { text: 'הגדרת חיבור API לריווחית', done: false },
        { text: 'מודול סנכרון לקוחות ומוצרים', done: false },
        { text: 'מודול הפקת מסמכים וחשבוניות', done: false },
        { text: 'מודול דוחות וסטטיסטיקות', done: false },
        { text: 'טיפול בשגיאות ומנגנון retry', done: false },
        { text: 'אופטימיזציה וביצועי סנכרון', done: false }
      ]
    }
  ];

  const totalTasks = projectChecklist.reduce((acc, cat) => acc + cat.items.length, 0);
  const completedTasks = projectChecklist.reduce((acc, cat) =>
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
                מערכת ניהול מלאי חצאיות - מפת דרכים
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
          {projectChecklist.map((category, idx) => {
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
            מפת דרכים בת 9 שלבים לבניית מערכת ניהול מלאי חצאיות מתקדמת עם אינטגרציה לריווחית
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
