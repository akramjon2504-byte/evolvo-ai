import cron from "node-cron";
import { emailMarketing } from "./email-marketing";

// Har 2 kunda soat 09:00 da marketing emaillarni yuborish
cron.schedule("0 9 */2 * *", async () => {
  console.log("🚀 Email marketing jarayoni boshlandi...");
  try {
    await emailMarketing.sendMarketingEmails();
    console.log("✅ Marketing emaillar muvaffaqiyatli yuborildi");
  } catch (error) {
    console.error("❌ Marketing email xatolik:", error);
  }
});

// Har kuni soat 18:00 da email statistikasini tekshirish
cron.schedule("0 18 * * *", async () => {
  console.log("📊 Email statistikasi tekshirilmoqda...");
  try {
    const stats = await emailMarketing.getEmailStats();
    console.log(`📈 Jami yuborilgan emaillar: ${stats.totalSent}`);
    console.log(`👋 Xush kelibsiz emaillar: ${stats.welcomeEmails}`);
    console.log(`📧 Marketing emaillar: ${stats.marketingEmails}`);
  } catch (error) {
    console.error("❌ Email statistika xatolik:", error);
  }
});

console.log("⏰ Email marketing scheduler ishga tushdi");
console.log("📅 Marketing emaillar: har 2 kunda soat 09:00 da");
console.log("📊 Statistika: har kuni soat 18:00 da");