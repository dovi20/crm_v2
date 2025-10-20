# מדריך העברה מ-SQLite ל-Supabase + Vercel

## סקירה כללית
מדריך זה יעזור לך להעביר את האפליקציה מהשרת המקומי עם SQLite לפלטפורמת Vercel עם מסד נתונים Supabase (PostgreSQL).

## שלב 1: הגדרת Supabase

### 1.1 יצירת פרויקט Supabase
1. היכנס ל-[Supabase Dashboard](https://app.supabase.com)
2. לחץ על "New Project"
3. בחר ארגון או צור חדש
4. מלא את פרטי הפרויקט:
   - שם הפרויקט
   - סיסמת מסד נתונים (שמור אותה!)
   - אזור (בחר את הקרוב ביותר למשתמשים שלך)
5. לחץ על "Create new project"

### 1.2 קבלת פרטי החיבור
1. לאחר יצירת הפרויקט, עבור ל-Settings → Database
2. העתק את הערכים הבאים:
   - **Connection String** (URI) - זה יהיה ה-`DATABASE_URL` שלך
   - **Direct Connection String** - זה יהיה ה-`DIRECT_URL` שלך
3. עבור ל-Settings → API
4. העתק:
   - **Project URL** - זה יהיה ה-`NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** - זה יהיה ה-`NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** - זה יהיה ה-`SUPABASE_SERVICE_ROLE_KEY`

## שלב 2: הגדרת משתני סביבה מקומיים

### 2.1 עדכן את קובץ `.env.local`
```env
# Database Configuration (Supabase)
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-here"

# JWT Secret
JWT_SECRET="your-jwt-secret-here"

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://your-project-ref.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"
```

### 2.2 יצירת סודות (Secrets)
הרץ את הפקודות הבאות ליצירת סודות חזקים:
```bash
# ליצירת NEXTAUTH_SECRET
openssl rand -base64 32

# ליצירת JWT_SECRET
openssl rand -base64 32
```

## שלב 3: התקנת תלויות והגירת מסד הנתונים

### 3.1 התקן את החבילות החדשות
```bash
npm install
```

### 3.2 צור מיגרציה חדשה ל-PostgreSQL
```bash
# צור מיגרציה ראשונית
npx prisma migrate dev --name init_postgresql

# או אם יש לך כבר מיגרציות, אפס אותן
npx prisma migrate reset
```

### 3.3 בדוק את החיבור למסד הנתונים
```bash
# בדוק שהסכמה נוצרה בהצלחה
npx prisma db push

# צור את ה-Prisma Client
npx prisma generate
```

## שלב 4: העברת נתונים קיימים (אופציונלי)

אם יש לך נתונים קיימים ב-SQLite שברצונך להעביר:

### 4.1 ייצוא נתונים מ-SQLite
```bash
# ייצוא הנתונים לקובץ JSON
node scripts/export-data.js
```

### 4.2 ייבוא נתונים ל-Supabase
```bash
# ייבוא הנתונים למסד הנתונים החדש
node scripts/import-data.js
```

**הערה:** תצטרך ליצור את הסקריפטים הללו בהתאם למבנה הנתונים שלך.

## שלב 5: בדיקה מקומית

### 5.1 הרץ את האפליקציה מקומית
```bash
npm run dev
```

### 5.2 בדוק את הפונקציונליות
- התחברות/הרשמה
- פעולות CRUD
- אימות משתמשים
- כל פונקציה ספציפית לאפליקציה שלך

## שלב 6: הגדרת Vercel

### 6.1 התקן את Vercel CLI (אופציונלי)
```bash
npm install -g vercel
```

### 6.2 התחבר ל-Vercel
```bash
vercel login
```

### 6.3 פרוס את הפרויקט
```bash
# פריסה ראשונית
vercel

# או דרך ממשק הגרפי:
# 1. עבור ל-https://vercel.com
# 2. לחץ על "Add New Project"
# 3. ייבא את הריפוזיטורי שלך מ-GitHub/GitLab/Bitbucket
```

### 6.4 הגדר משתני סביבה ב-Vercel
1. עבור לפרויקט שלך ב-Vercel Dashboard
2. לחץ על Settings → Environment Variables
3. הוסף את כל המשתנים מקובץ `.env.local`:
   - `DATABASE_URL`
   - `DIRECT_URL`
   - `NEXTAUTH_URL` (שנה ל-URL של Vercel שלך)
   - `NEXTAUTH_SECRET`
   - `JWT_SECRET`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

**חשוב:** ודא ש-`NEXTAUTH_URL` מצביע ל-URL של האפליקציה ב-Vercel (למשל: `https://your-app.vercel.app`)

### 6.5 הפעל מחדש את הפריסה
לאחר הוספת משתני הסביבה, הפעל מחדש את הפריסה:
```bash
vercel --prod
```

## שלב 7: אימות הפריסה

### 7.1 בדוק את האפליקציה בפרודקשן
1. פתח את ה-URL של Vercel
2. בדוק את כל הפונקציות
3. בדוק את הלוגים ב-Vercel Dashboard

### 7.2 בדוק את מסד הנתונים
1. עבור ל-Supabase Dashboard
2. לחץ על Table Editor
3. ודא שהטבלאות נוצרו והנתונים קיימים

## שלב 8: ניקוי (אופציונלי)

לאחר שהאפליקציה עובדת בהצלחה ב-Vercel:

### 8.1 הסר קבצים מיותרים
```bash
# הסר את קבצי Docker
rm docker-compose.yml
rm Dockerfile
rm nginx.conf

# הסר את קובץ SQLite
rm dev.db
```

### 8.2 עדכן את `.gitignore`
```
# הוסף
.env
.env.local
.env*.local
dev.db
dev.db-journal
```

## פתרון בעיות נפוצות

### שגיאת חיבור למסד נתונים
- ודא שה-`DATABASE_URL` נכון
- בדוק שהסיסמה נכונה (ללא תווים מיוחדים שצריכים encoding)
- ודא שה-IP של Vercel מורשה ב-Supabase (בדרך כלל מורשה אוטומטית)

### שגיאות מיגרציה
```bash
# אפס את המיגרציות
npx prisma migrate reset

# צור מיגרציה חדשה
npx prisma migrate dev --name init
```

### שגיאות NextAuth
- ודא ש-`NEXTAUTH_URL` מצביע ל-URL הנכון
- ודא ש-`NEXTAUTH_SECRET` מוגדר
- בדוק שהטבלאות של NextAuth נוצרו במסד הנתונים

### שגיאות בפריסה ב-Vercel
- בדוק את הלוגים ב-Vercel Dashboard
- ודא שכל משתני הסביבה מוגדרים
- ודא שה-build script עובד מקומית

## משאבים נוספים

- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)

## תמיכה

אם נתקלת בבעיות:
1. בדוק את הלוגים ב-Vercel Dashboard
2. בדוק את הלוגים ב-Supabase Dashboard
3. עיין בתיעוד הרשמי
4. פתח issue ב-GitHub של הפרויקט

---

**הצלחה בהעברה! 🚀**