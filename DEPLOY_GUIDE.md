# Render'ga Deploy Qilish Qo'llanmasi

## 1. GitHub Repository Yaratish

Birinchi navbatda Replit loyihangizni GitHub'ga export qiling:

1. Replit'da loyihangizni oching
2. Tools > Git > Export to GitHub tugmasini bosing
3. Repository nomini kiriting: `evolvo-ai-platform`
4. Public yoki Private tanlang
5. Create repository tugmasini bosing

## 2. Render Account Ochish

1. [render.com](https://render.com) saytiga kiring
2. "Get Started for Free" tugmasini bosing
3. GitHub hisobingiz bilan ro'yxatdan o'ting

## 3. Database Yaratish

1. Render dashboard'da "New +" > "PostgreSQL" ni tanlang
2. Database nomi: `evolvo-ai-db`
3. Database name: `evolvo_ai`
4. User: `evolvo_ai_user`
5. Region: Frankfurt (Evropa) yoki sizga yaqin region
6. Plan: Free ni tanlang
7. "Create Database" tugmasini bosing

## 4. Web Service Yaratish

1. Dashboard'da "New +" > "Web Service" ni tanlang
2. GitHub repository'ngizni tanlang: `evolvo-ai-platform`
3. Quyidagi sozlamalarni kiriting:

### Asosiy Sozlamalar:
- **Name**: `evolvo-ai`
- **Region**: Frankfurt (yoki DB bilan bir xil region)
- **Branch**: `main`
- **Root Directory**: `.` (bo'sh qoldiring)
- **Environment**: `Node`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`

### Environment Variables:
Quyidagi o'zgaruvchilarni qo'shing:

```bash
NODE_ENV=production
DATABASE_URL=[Database'dan olingan External Database URL]
OPENAI_API_KEY=[OpenAI API kalitingiz]
TELEGRAM_BOT_TOKEN=[Telegram bot tokeningiz]
TELEGRAM_CHANNEL_BOT_TOKEN=[Telegram kanal bot tokeningiz]
```

## 5. Domain va Sozlamalar

1. Deploy tugishi bilan Render avtomatik domain beradi: `https://evolvo-ai.onrender.com`
2. Custom domain qo'shish uchun Settings > Custom Domains ga kiring

## 6. Database Migration

Deploy bo'lganidan keyin:

1. Render dashboard'da "Shell" tugmasini bosing
2. Migration buyruqlarini bajaring:
```bash
npm run db:push
```

## 7. Monitoring va Logs

- **Logs**: Render dashboard'da "Logs" bo'limidan real-time loglarni ko'ring
- **Metrics**: CPU, Memory, va Request monitoring
- **Health Check**: Avtomatik health check ishlaydi

## 8. Xatoliklarni Hal Qilish

### Umumiy Xatoliklar:

1. **Build xatoligi**: 
   - `package.json` da barcha dependencies mavjudligini tekshiring
   - Node.js versiyasini tekshiring (18+ tavsiya etiladi)

2. **Database ulanishi**:
   - `DATABASE_URL` to'g'ri formatda ekanligini tekshiring
   - Database aktiv holatda ekanligini tasdiqlang

3. **Environment Variables**:
   - Barcha kerakli o'zgaruvchilar qo'shilganligini tekshiring
   - API kalitlar to'g'ri ekanligini tasdiqlang

## 9. Production Optimizatsiya

### Performance:
- Static fayllar Render CDN orqali serve qilinadi
- Gzip siqish avtomatik yoqilgan
- HTTP/2 qo'llab-quvvatlanadi

### Security:
- HTTPS avtomatik yoqilgan
- Environment variables himoyalangan
- Database ulanishi SSL orqali

### Monitoring:
- Uptime monitoring
- Performance metrics
- Error tracking

## 10. Yangilanishlar

GitHub'ga yangi kod push qilganingizda Render avtomatik qayta deploy qiladi:

```bash
git add .
git commit -m "Feature: yangi xususiyat qo'shildi"
git push origin main
```

## Texnik Talablar

- **Node.js**: 18+
- **Database**: PostgreSQL 12+
- **Memory**: 512MB (Free plan)
- **Build Time**: Maksimal 15 daqiqa
- **Sleep Mode**: 15 daqiqa faoliyatsizlikdan keyin (Free plan)

## Foydali Havolalar

- [Render Documentation](https://render.com/docs)
- [PostgreSQL on Render](https://render.com/docs/databases)
- [Node.js Deployment Guide](https://render.com/docs/deploy-node-express-app)

Deploy bo'lganidan keyin sizning loyihangiz global miqyosda ishlaydi va professional hosting muhitida joylashgan bo'ladi!