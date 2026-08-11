# sylpha hub — المرحلة 1

الجزء ده فيه: صفحة تحقق "أنت إنسان" (Cloudflare Turnstile) + تسجيل دخول/حساب (إيميل وباسورد + جيت هوب).

## الخطوات

1. ارفع المجلد ده على GitHub (بـ gh-uploader أو رفع يدوي).
2. اعمل قاعدة بيانات Postgres مجانية على neon.tech.
3. من dash.cloudflare.com > Turnstile: اعمل widget جديد، خد الـ Site Key والـ Secret Key.
4. من github.com/settings/developers: اعمل OAuth App جديد:
   - Homepage URL: رابط موقعك على Vercel
   - Authorization callback URL: `https://your-domain.vercel.app/api/auth/callback/github`
5. في Vercel، أضف متغيرات البيئة دي (خدها من `.env.example`):
   - `DATABASE_URL`
   - `AUTH_SECRET` (نفّذ `openssl rand -base64 33` أو أي مولّد أونلاين)
   - `AUTH_URL` (رابط موقعك)
   - `AUTH_GITHUB_ID` / `AUTH_GITHUB_SECRET`
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY`
   - `HUMAN_CHECK_SECRET` (أي نص عشوائي طويل تاني)
6. بعد أول Deploy، شغّل مرة واحدة: `npx prisma db push` (من جهازك أو من Vercel CLI) عشان ينشئ الجداول في قاعدة البيانات.

## اللي جاي في المرحلة الجاية

- واجهة الشات (زي واتساب) بين المطورين
- القناة الموثقة لمطوري الموقع
- البحث باليوزر + صفحة البروفايل (صورة/اسم/يوزرنيم قابلين للتعديل)
