# 🔐 Next.js Authentication App

אפליקציית אימות משתמשים מלאה ב-Next.js עם בסיס נתונים ו-Docker.

## ✨ תכונות עיקריות

- **Next.js 14** עם TypeScript
- **אימות משתמשים** עם NextAuth
- **בסיס נתונים SQLite** עם Prisma ORM
- **ממשק בעברית** מלא
- **הצפנת סיסמאות** (bcrypt)
- **סשנים JWT** מאובטחים
- **תמיכה ב-Docker** מלאה

## 🚀 התחלה מהירה

### פיתוח לוקלי

```bash
# התקנת dependencies
npm install

# הגדרת בסיס הנתונים
npm run db:generate
npm run db:migrate
npm run db:seed

# הרצת האפליקציה
npm run dev
```

### Docker

```bash
# הרצת הכל בקונטיינרים
docker-compose up --build
```

## 👤 משתמש ברירת מחדל

- **דוא"ל:** admin@test.com
- **סיסמה:** admin123

## 📁 מבנה הפרויקט

```
├── lib/                 # פונקציות עזר
├── pages/              # דפי Next.js
│   ├── api/auth/       # API אימות
│   ├── login.js        # מסך התחברות
│   └── index.js        # דשבורד מוגן
├── prisma/             # סכמת בסיס נתונים
├── styles/             # סגנונות
├── Dockerfile          # Docker
├── docker-compose.yml  # שירותי Docker
└── README.md
```

## 🛠️ Scripts זמינים

- `npm run dev` - פיתוח
- `npm run build` - בניית פרודקשן
- `npm run db:generate` - יצירת Prisma client
- `npm run db:migrate` - מיגרציות
- `npm run db:seed` - נתוני בסיס

## 🌐 גישה לאפליקציה

פתח את הדפדפן וגש ל- http://localhost:3000

## 🐳 פריסה עם Docker

```bash
# בניית והרצת הקונטיינרים
docker-compose up --build

# רק בסיס הנתונים
docker-compose up db -d
```

## 🔧 טכנולוגיות

- **Frontend:** Next.js 14 + TypeScript
- **Database:** SQLite + Prisma ORM
- **Authentication:** NextAuth.js
- **Deployment:** Docker + Nginx
- **Security:** bcrypt + JWT

## 📖 תיעוד נוסף

ראה את הקובץ README המלא לתיעוד מפורט יותר.

---

**MIT License** | בנוי עם ❤️ ב-Next.js
