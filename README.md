# EvolvoAI

Zamonaviy AI asosidagi veb-ilova

## Texnologiyalar

- **Frontend**: React, TypeScript, TailwindCSS
- **Backend**: Node.js, Express
- **Ma'lumotlar bazasi**: PostgreSQL (Neon.tech)
- **Boshqa**: TanStack Query, Drizzle ORM

## O'rnatish

1. Repozitoriyani klonlang:
   ```bash
   git clone https://github.com/sizning-foydalanuvchi/evolvo-ai.git
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
   npx drizzle-kit push:pg
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
