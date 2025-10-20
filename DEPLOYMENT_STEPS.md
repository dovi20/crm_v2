# שלבים לפתרון שגיאת 500

## הבעיה
הטבלאות במסד הנתונים של Supabase עדיין לא נוצרו. צריך להריץ מיגרציות.

## פתרון - אופציה 1: הרצת מיגרציות מקומית (מומלץ)

### 1. ודא שיש לך את הקבצים המעודכנים:
```bash
git pull origin main
```

### 2. התקן תלויות:
```bash
npm install
```

### 3. הרץ את המיגרציות:
```bash
npx prisma migrate deploy
```

אם זה לא עובד, נסה:
```bash
npx prisma db push
```

### 4. בדוק שהטבלאות נוצרו:
- היכנס ל-[Supabase Dashboard](https://app.supabase.com)
- בחר את הפרויקט שלך
- לחץ על **Table Editor**
- אמור לראות את הטבלאות: `users`, `accounts`, `sessions`, `verificationtokens`

---

## פתרון - אופציה 2: יצירת טבלאות ידנית ב-Supabase

אם המיגרציות לא עובדות, אפשר ליצור את הטבלאות ידנית:

### 1. היכנס ל-Supabase Dashboard
- עבור ל-[app.supabase.com](https://app.supabase.com)
- בחר את הפרויקט שלך
- לחץ על **SQL Editor**

### 2. הרץ את ה-SQL הבא:

```sql
-- Create users table
CREATE TABLE IF NOT EXISTS "users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- Create unique indexes
CREATE UNIQUE INDEX IF NOT EXISTS "users_username_key" ON "users"("username");
CREATE UNIQUE INDEX IF NOT EXISTS "users_email_key" ON "users"("email");

-- Create accounts table
CREATE TABLE IF NOT EXISTS "accounts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- Create unique index for accounts
CREATE UNIQUE INDEX IF NOT EXISTS "accounts_provider_providerAccountId_key" ON "accounts"("provider", "providerAccountId");

-- Create sessions table
CREATE TABLE IF NOT EXISTS "sessions" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- Create unique index for sessions
CREATE UNIQUE INDEX IF NOT EXISTS "sessions_sessionToken_key" ON "sessions"("sessionToken");

-- Create verification tokens table
CREATE TABLE IF NOT EXISTS "verificationtokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- Create unique indexes for verification tokens
CREATE UNIQUE INDEX IF NOT EXISTS "verificationtokens_token_key" ON "verificationtokens"("token");
CREATE UNIQUE INDEX IF NOT EXISTS "verificationtokens_identifier_token_key" ON "verificationtokens"("identifier", "token");

-- Add foreign keys
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
```

### 3. לחץ על **Run** או **Execute**

### 4. בדוק שהטבלאות נוצרו:
- לחץ על **Table Editor**
- אמור לראות את כל הטבלאות

---

## אחרי שהטבלאות נוצרו:

### 1. עדכן את הקוד ב-GitHub:
```bash
git add .
git commit -m "Fix signup error handling"
git push origin main
```

### 2. Vercel יפרוס אוטומטית את העדכון

### 3. נסה שוב להירשם באתר

---

## בדיקה שהכל עובד:

1. פתח את האתר: https://pamonim.vercel.app
2. נסה להירשם עם משתמש חדש
3. אם עובד - מעולה! ✅
4. אם לא - בדוק את הלוגים ב-Vercel Dashboard

---

## לוגים ב-Vercel:

1. עבור ל-[Vercel Dashboard](https://vercel.com/dashboard)
2. בחר את הפרויקט
3. לחץ על **Deployments**
4. בחר את הפריסה האחרונה
5. לחץ על **Functions** → בחר את הפונקציה `api/auth/signup`
6. תראה את הלוגים המלאים עם השגיאה המדויקת