import TelegramBot from "node-telegram-bot-api";
import OpenAI from "openai";
import { storage } from "./storage";

// OpenAI client
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Telegram bot token (demo rejim uchun)
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || 'DEMO_TOKEN';

// Telegram marketing shablonlari (30 kunlik)
const telegramTemplates = [
  {
    day: 1,
    uzbek: "🤖 Assalomu alaykum! Evolvo AI jamoasiga xush kelibsiz!\n\n🚀 Biz O'zbekistondagi etakchi AI kompaniyasimiz va sizning biznesingizni raqamlashtirish uchun eng zamonaviy yechimlarni taklif qilamiz.\n\n💡 Bizning xizmatlarimiz:\n• AI chatbotlar\n• Ma'lumotlar tahlili\n• Avtomatlashtirish yechimlari\n• Biznes konsultatsiyalari\n\n📞 Bepul konsultatsiya: +998 90 123 45 67",
    russian: "🤖 Добро пожаловать в команду Evolvo AI!\n\n🚀 Мы ведущая AI компания в Узбекистане и предлагаем самые современные решения для цифровизации вашего бизнеса.\n\n💡 Наши услуги:\n• AI чат-боты\n• Анализ данных\n• Решения автоматизации\n• Бизнес консультации\n\n📞 Бесплатная консультация: +998 90 123 45 67"
  },
  {
    day: 3,
    uzbek: "🎯 AI bilan biznesingizni keyingi bosqichga olib chiqing!\n\n📊 Statistika:\n• AI yordamida 40% vaqt tejash\n• 60% xarajatlarni kamaytirish\n• 3x tezroq qarorlar qabul qilish\n\n🔥 Bizning mijozlarimiz:\n• Retail kompaniyalari\n• Bank va moliya\n• E-commerce\n• Ta'lim sohas\n\n🎁 Ushbu hafta: 50% chegirma birinchi loyihaga!",
    russian: "🎯 Выведите ваш бизнес на новый уровень с AI!\n\n📊 Статистика:\n• Экономия времени на 40% с AI\n• Снижение затрат на 60%\n• Принятие решений в 3 раза быстрее\n\n🔥 Наши клиенты:\n• Ритейл компании\n• Банки и финансы\n• E-commerce\n• Образование\n\n🎁 На этой неделе: 50% скидка на первый проект!"
  },
  {
    day: 7,
    uzbek: "🌟 O'zbekistonda AI inqilobi boshlandi!\n\n🏆 Evolvo AI yutuqlari:\n• 100+ muvaffaqiyatli loyiha\n• 50+ xursand mijozlar\n• 24/7 texnik yordam\n• Mahalliy va xalqaro tajriba\n\n📈 Kelajak bugun boshlanadi:\n• Smart biznes yechimlari\n• Raqamli transformatsiya\n• AI consulting\n• Custom AI development\n\n📱 Biz bilan bog'laning: @evolvo_ai_uz",
    russian: "🌟 AI революция началась в Узбекистане!\n\n🏆 Достижения Evolvo AI:\n• 100+ успешных проектов\n• 50+ довольных клиентов\n• 24/7 техническая поддержка\n• Местный и международный опыт\n\n📈 Будущее начинается сегодня:\n• Smart бизнес решения\n• Цифровая трансформация\n• AI консалтинг\n• Custom AI разработка\n\n📱 Свяжитесь с нами: @evolvo_ai_uz"
  }
];

class TelegramMarketing {
  private bot: TelegramBot | null = null;
  private subscribers: Map<number, { chatId: number, username?: string, language: string, subscribeDate: Date }> = new Map();

  constructor() {
    this.initBot().catch(error => {
      console.error("❌ Bot constructor xatolik:", error);
    });
  }

  private async initBot() {
    if (!TELEGRAM_BOT_TOKEN || TELEGRAM_BOT_TOKEN === 'DEMO_TOKEN') {
      console.log("🤖 Telegram bot demo rejimda ishlamoqda");
      console.log("💡 Haqiqiy Telegram bot uchun TELEGRAM_BOT_TOKEN environment variable qo'shing");
      return;
    }

    try {
      // Birinchi bot tokenini tekshirish
      this.bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: false });
      
      // Bot ma'lumotlarini olish (token tekshirish)
      const botInfo = await this.bot.getMe();
      console.log(`✅ Bot topildi: @${botInfo.username} (${botInfo.first_name})`);
      
      // Endi polling yoqish
      await this.bot.startPolling({
        restart: true,
        polling: {
          interval: 1000,
          params: {
            timeout: 10
          }
        }
      });
      
      // Error handling
      this.bot.on('polling_error', (error) => {
        console.error("🚫 Telegram polling xatolik:", error.message);
        if (error.message.includes('404')) {
          console.error("💡 Bot token noto'g'ri: " + TELEGRAM_BOT_TOKEN.substring(0, 10) + "...");
          console.error("💡 BotFather orqali to'g'ri token oling");
        }
      });

      this.bot.on('error', (error) => {
        console.error("❌ Telegram bot umumiy xatolik:", error);
      });

      this.setupBotCommands();
      console.log("✅ Telegram bot polling muvaffaqiyatli ishga tushdi");
    } catch (error: any) {
      console.error("❌ Telegram bot ishga tushmadi:", error.message);
      if (error.message.includes('404') || error.message.includes('Unauthorized')) {
        console.error("💡 Token xatolik - BotFather orqali yangi token oling");
        console.error("💡 Mavjud token: " + TELEGRAM_BOT_TOKEN.substring(0, 10) + "...");
      }
    }
  }

  private setupBotCommands() {
    if (!this.bot) return;

    // /start command
    this.bot.onText(/\/start/, (msg) => {
      const chatId = msg.chat.id;
      const username = msg.from?.username;
      
      // Foydalanuvchini ro'yxatga olish
      this.subscribers.set(chatId, {
        chatId,
        username,
        language: 'uz', // default
        subscribeDate: new Date()
      });

      const welcomeMessage = `🤖 Assalomu alaykum! Evolvo AI botiga xush kelibsiz!

🚀 Biz O'zbekistondagi eng yirik AI kompaniyasimiz va sizning biznesingizni raqamlashtirish uchun zamonaviy yechimlar taklif qilamiz.

📝 Buyruqlar:
/services - Xizmatlarimiz haqida
/contact - Bog'lanish
/language - Tilni o'zgartirish
/unsubscribe - Obunani bekor qilish

💡 Avtomatik yangiliklar olish uchun obuna bo'ldingiz!`;

      this.bot?.sendMessage(chatId, welcomeMessage);
    });

    // /services command
    this.bot.onText(/\/services/, (msg) => {
      const chatId = msg.chat.id;
      const servicesMessage = `🔥 Evolvo AI xizmatlarimiz:

🤖 AI Chatbotlar
• 24/7 mijozlar bilan muloqot
• Ko'p tilli qo'llab-quvvatlash
• CRM integratsiyasi

📊 Ma'lumotlar tahlili
• Business Intelligence dashboardlar
• Predictive analytics
• Hisobotlar avtomatizatsiyasi

⚡ Avtomatlashtirish
• Ish jarayonlarini optimallashtirish
• Document processing
• Email marketing

💼 AI Consulting
• Digital transformation strategiyasi
• AI roadmap yaratish
• Team training

📞 Bepul konsultatsiya: +998 90 123 45 67
🌐 Sayt: evolvo-ai.uz`;

      this.bot?.sendMessage(chatId, servicesMessage);
    });

    // /contact command
    this.bot.onText(/\/contact/, (msg) => {
      const chatId = msg.chat.id;
      const contactMessage = `📞 Evolvo AI bilan bog'lanish:

🏢 Ofis: Toshkent sh., Yunusobod tumani
📱 Telefon: +998 90 123 45 67
📧 Email: info@evolvo-ai.uz
🌐 Website: https://evolvo-ai.uz
💬 Telegram: @evolvo_ai_uz

⏰ Ish vaqti: Du-Ju 9:00-18:00

🎯 Bepul konsultatsiya uchun bog'laning!`;

      this.bot?.sendMessage(chatId, contactMessage);
    });

    // /language command
    this.bot.onText(/\/language/, (msg) => {
      const chatId = msg.chat.id;
      const keyboard = {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "🇺🇿 O'zbek", callback_data: 'lang_uz' },
              { text: "🇷🇺 Русский", callback_data: 'lang_ru' }
            ]
          ]
        }
      };

      this.bot?.sendMessage(chatId, "Tilni tanlang / Выберите язык:", keyboard);
    });

    // Language selection callback
    this.bot.on('callback_query', (callbackQuery) => {
      const msg = callbackQuery.message;
      if (!msg) return;

      const chatId = msg.chat.id;
      const data = callbackQuery.data;

      if (data?.startsWith('lang_')) {
        const lang = data.split('_')[1];
        const subscriber = this.subscribers.get(chatId);
        if (subscriber) {
          subscriber.language = lang;
          this.subscribers.set(chatId, subscriber);
        }

        const response = lang === 'uz' 
          ? "✅ Til o'zbek tiliga o'zgartirildi"
          : "✅ Язык изменен на русский";

        this.bot?.sendMessage(chatId, response);
      }
    });

    // /unsubscribe command
    this.bot.onText(/\/unsubscribe/, (msg) => {
      const chatId = msg.chat.id;
      this.subscribers.delete(chatId);
      
      const message = `😔 Siz muvaffaqiyatli obunani bekor qildingiz.

Evolvo AI xizmatlaridan foydalanish uchun istalgan vaqtda /start bosing.

Sog' bo'ling! 👋`;

      this.bot?.sendMessage(chatId, message);
    });
  }

  // Marketing xabarlarni yuborish
  async sendMarketingMessage(templateDay: number) {
    if (!this.bot) {
      console.log("📱 Telegram bot faol emas - xabar yuborilmadi");
      return;
    }

    if (this.subscribers.size === 0) {
      console.log("📱 Telegram obunachi yo'q - xabar yuborilmadi");
      return;
    }

    const template = telegramTemplates.find(t => t.day === templateDay);
    if (!template) return;

    for (const [chatId, subscriber] of this.subscribers) {
      try {
        const message = subscriber.language === 'ru' ? template.russian : template.uzbek;
        
        // OpenAI orqali personalizatsiya
        const personalizedMessage = await this.personalizeMessage(message, subscriber.username);
        
        await this.bot.sendMessage(chatId, personalizedMessage);
        console.log(`📤 Telegram xabar yuborildi: ${chatId}`);
        
        // Rate limiting uchun kutish
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`❌ Telegram xabar xatolik (${chatId}):`, error);
      }
    }
  }

  // OpenAI orqali xabarni personalizatsiya qilish
  private async personalizeMessage(message: string, username?: string): Promise<string> {
    if (!username) return message;

    try {
      const prompt = `Quyidagi Telegram marketing xabarini ${username} uchun personallashtiring. Faqat xabar matnini qaytaring, boshqa hech narsa emas:

${message}`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
        messages: [{ role: "user", content: prompt }],
        max_tokens: 500,
        temperature: 0.7
      });

      return response.choices[0].message.content || message;
    } catch (error) {
      console.error("❌ OpenAI personalizatsiya xatolik:", error);
      return message;
    }
  }

  // Yangi obunachi qo'shish (webhook orqali)
  async addSubscriber(chatId: number, username?: string, language: string = 'uz') {
    this.subscribers.set(chatId, {
      chatId,
      username,
      language,
      subscribeDate: new Date()
    });

    // Xush kelibsiz xabar yuborish
    if (this.bot) {
      try {
        const welcomeTemplate = telegramTemplates[0];
        const message = language === 'ru' ? welcomeTemplate.russian : welcomeTemplate.uzbek;
        const personalizedMessage = await this.personalizeMessage(message, username);
        await this.bot.sendMessage(chatId, personalizedMessage);
      } catch (error) {
        console.error("❌ Telegram xush kelibsiz xabar xatolik:", error);
      }
    }
  }

  // Statistika olish
  getStats() {
    return {
      totalSubscribers: this.subscribers.size,
      uzbekSubscribers: Array.from(this.subscribers.values()).filter(s => s.language === 'uz').length,
      russianSubscribers: Array.from(this.subscribers.values()).filter(s => s.language === 'ru').length,
      recentSubscribers: Array.from(this.subscribers.values())
        .sort((a, b) => b.subscribeDate.getTime() - a.subscribeDate.getTime())
        .slice(0, 10)
        .map(s => ({
          chatId: s.chatId,
          username: s.username,
          language: s.language,
          subscribeDate: s.subscribeDate
        }))
    };
  }

  // Test xabar yuborish
  async sendTestMessage(chatId: number, message: string) {
    if (!this.bot) {
      return { success: false, error: "Telegram bot faol emas" };
    }

    try {
      await this.bot.sendMessage(chatId, message);
      return { success: true, message: "Xabar muvaffaqiyatli yuborildi" };
    } catch (error) {
      console.error("❌ Test xabar xatolik:", error);
      return { success: false, error: "Xabar yuborishda xatolik" };
    }
  }
}

export const telegramMarketing = new TelegramMarketing();