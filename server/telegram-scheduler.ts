import cron from "node-cron";
import { telegramMarketing } from "./telegram-marketing";

// Telegram marketing scheduler
// Har 3 kunda Telegram marketing xabarlari yuborish (email bilan alternativ)
cron.schedule("0 10 */3 * *", async () => {
  console.log("📱 Telegram marketing jarayoni boshlandi...");
  try {
    // Tasodifiy template tanlash (1-3 kun oralig'ida)
    const randomDay = Math.floor(Math.random() * 3) + 1;
    await telegramMarketing.sendMarketingMessage(randomDay);
    console.log("✅ Telegram marketing xabarlari yuborildi");
  } catch (error) {
    console.error("❌ Telegram marketing xatolik:", error);
  }
});

// Har kuni kechqurun soat 19:00 da Telegram statistikasini tekshirish
cron.schedule("0 19 * * *", async () => {
  console.log("📊 Telegram statistikasi tekshirilmoqda...");
  try {
    const stats = telegramMarketing.getStats();
    console.log(`📈 Jami obunachi: ${stats.totalSubscribers}`);
    console.log(`🇺🇿 O'zbek obunachi: ${stats.uzbekSubscribers}`);
    console.log(`🇷🇺 Rus obunachi: ${stats.russianSubscribers}`);
  } catch (error) {
    console.error("❌ Telegram statistika xatolik:", error);
  }
});

// Haftalik hisobot (Yakshanba soat 20:00)
cron.schedule("0 20 * * 0", async () => {
  console.log("📊 Haftalik Telegram hisobot yaratilmoqda...");
  try {
    const stats = telegramMarketing.getStats();
    console.log("📈 HAFTALIK TELEGRAM HISOBOT:");
    console.log(`• Jami obunachi: ${stats.totalSubscribers}`);
    console.log(`• O'zbek tili: ${stats.uzbekSubscribers}`);
    console.log(`• Rus tili: ${stats.russianSubscribers}`);
    console.log(`• So'nggi obunachi: ${stats.recentSubscribers.length} ta`);
  } catch (error) {
    console.error("❌ Haftalik hisobot xatolik:", error);
  }
});

console.log("⏰ Telegram marketing scheduler ishga tushdi");
console.log("📱 Marketing xabarlari: har 3 kunda soat 10:00 da");
console.log("📊 Statistika: har kuni soat 19:00 da");
console.log("📈 Haftalik hisobot: Yakshanba 20:00 da");