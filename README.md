# EvolvoAI

Zamonaviy AI asosidagi veb-ilova - kontent yaratish, marketing va avtomatlashtirish uchun to'liq yechim.

## Xususiyatlar

- 🤖 AI asosidagi kontent yaratish
- 📧 Email marketing avtomatizatsiyasi
- 📱 Telegram bot integratsiyasi
- 📊 RSS feed boshqaruvi
- 🗓️ Avtomatik post rejalashtirish
- 🔍 SEO optimizatsiyasi va sitemap yaratish

## Texnologiyalar

- **Frontend**: React, TypeScript, TailwindCSS, Vite
- **Backend**: Node.js, Express, TypeScript
- **Ma'lumotlar bazasi**: PostgreSQL (Neon.tech)
- **ORM**: Drizzle ORM
- **State Management**: TanStack Query
- **UI Components**: Radix UI
- **Styling**: TailwindCSS + shadcn/ui

## O'rnatish

1. Repozitoriyani klonlang:
   ```bash
   git clone https://github.com/akramjon2504-byte/evolvo-ai.git
   cd evolvo-ai
   ```

2. Kerakli paketlarni o'rnating:
   ```bash
   npm install
   ```

3. `.env` faylini yarating:
   ```bash
   cp .env.example .env
   ```
   So'ngra `.env` faylini o'z muhitingizga moslab sozlang.

4. Ma'lumotlar bazasini sozlang:
   ```bash
   npm run db:push
   ```

5. Dasturni ishga tushiring:
   ```bash
   # Rivojlanish rejimida
   npm run dev
   
   # Yoki ishlab chiqarish rejimida
   npm run build
   npm start
   ```

## Muhit o'zgaruvchilari

`.env` faylida quyidagi o'zgaruvchilarni sozlashingiz kerak:

- `DATABASE_URL` - PostgreSQL ulanish havolasi
- `SESSION_SECRET` - Seanslar uchun maxfiy kalit
- `NEXTAUTH_SECRET` - Autentifikatsiya uchun maxfiy kalit
- `NEXTAUTH_URL` - Asosiy URL (masalan, `http://localhost:3000`)

## GitHubga yuklash

1. GitHubda yangi repozitoriya yarating
2. Lokal repozitoriyangizni ulang:
   ```bash
   git remote add origin https://github.com/sizning-foydalanuvchi/evolvo-ai.git
   git branch -M main
   git push -u origin main
   ```

## Yordam

Agar qandaydir muammo yuzaga kelsa, iltimos, issue oching.
