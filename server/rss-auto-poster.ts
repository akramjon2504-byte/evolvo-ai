import RSSParser from 'rss-parser';
import * as cron from 'node-cron';
import { storage } from './storage';
import type { InsertBlogPost } from '@shared/schema';
import { TelegramBlogPoster } from './telegram-blog-poster';

// RSS manbalar ro'yxati - AI texnologiyalari bo'yicha mashur saytlar
const RSS_SOURCES = [
  {
    name: 'AI News',
    url: 'https://artificialintelligence-news.com/feed/',
    category: 'AI Yangiliklari'
  },
  {
    name: 'MIT Technology Review AI',
    url: 'https://www.technologyreview.com/topic/artificial-intelligence/feed/',
    category: 'AI Texnologiya'
  },
  {
    name: 'The Next Web AI',
    url: 'https://thenextweb.com/neural/feed/',
    category: 'AI Innovatsiya'
  },
  {
    name: 'AI Business',
    url: 'https://aibusiness.com/feed',
    category: 'AI Biznes'
  },
  {
    name: 'Analytics Vidhya',
    url: 'https://feeds.feedburner.com/AnalyticsVidhya',
    category: 'Ma\'lumotlar Fani'
  }
];

class RSSAutoPoster {
  private parser: RSSParser;
  private processedArticles: Set<string> = new Set();
  private telegramPoster: TelegramBlogPoster;
  private dailyPostCount: number = 0;
  private lastResetDate: string = '';

  constructor() {
    this.parser = new RSSParser();
    this.telegramPoster = new TelegramBlogPoster();
    this.resetDailyCountIfNeeded();
    this.startCronJob();
  }

  private resetDailyCountIfNeeded() {
    const today = new Date().toDateString();
    if (this.lastResetDate !== today) {
      this.dailyPostCount = 0;
      this.lastResetDate = today;
      console.log('📅 Kunlik post hisoblagichi yangilandi');
    }
  }

  // Har soatda RSS ni tekshirish va maksimal 10 ta post
  private startCronJob() {
    cron.schedule('0 * * * *', () => {
      console.log('🔄 RSS avtomatik post yaratish boshlandi...');
      this.resetDailyCountIfNeeded();
      this.processAllRSSFeeds();
    });

    // Dastlabki yuklash
    setTimeout(() => {
      console.log('🚀 Dastlabki RSS yuklanmoqda...');
      this.processAllRSSFeeds();
    }, 5000);
  }

  private async processAllRSSFeeds() {
    // Kunlik limit tekshiruvi
    if (this.dailyPostCount >= 10) {
      console.log('📊 Kunlik post limiti (10) to\'ldi, keyingi kunga qadar kutiladi');
      return;
    }

    for (const source of RSS_SOURCES) {
      if (this.dailyPostCount >= 10) {
        console.log('📊 Kunlik limit to\'ldi, jarayon to\'xtatildi');
        break;
      }

      try {
        await this.processSingleRSSFeed(source);
        // Har bir manba o'rtasida 5 soniya kutish
        await new Promise(resolve => setTimeout(resolve, 5000));
      } catch (error) {
        console.error(`❌ RSS xatolik ${source.name}:`, error);
      }
    }
  }

  private async processSingleRSSFeed(source: { name: string; url: string; category: string }) {
    try {
      console.log(`📡 ${source.name} yuklanmoqda...`);
      const feed = await this.parser.parseURL(source.url);

      // Faqat 1 ta eng yangi maqolani olish (kunlik limit uchun)
      const recentItems = feed.items.slice(0, 1);

      for (const item of recentItems) {
        if (!item.link || this.processedArticles.has(item.link)) {
          continue;
        }

        if (this.dailyPostCount >= 10) {
          console.log('📊 Kunlik limit to\'ldi, maqola yaratish to\'xtatildi');
          break;
        }

        // Maqola yaratish
        await this.createBlogPostFromRSSItem(item, source);
        this.processedArticles.add(item.link);
        this.dailyPostCount++;
        
        console.log(`📊 Bugun yaratilgan postlar: ${this.dailyPostCount}/10`);
        
        // Har bir maqola o'rtasida 10 soniya kutish
        await new Promise(resolve => setTimeout(resolve, 10000));
      }

      console.log(`✅ ${source.name} muvaffaqiyatli yakunlandi`);
    } catch (error) {
      console.error(`❌ ${source.name} xatolik:`, error);
    }
  }

  private async createBlogPostFromRSSItem(
    item: any, 
    source: { name: string; url: string; category: string }
  ) {
    try {
      const title = item.title || 'Yangi AI Maqolasi';
      const originalContent = item.contentSnippet || item.content || item.description || '';
      const link = item.link || '';
      const publishDate = item.pubDate ? new Date(item.pubDate) : new Date();

      // Matnni tozalash
      const cleanContent = this.cleanContent(originalContent);
      
      // O'zbek tiliga tarjima qilish OpenAI orqali
      console.log(`🔄 Sarlavhani tarjima qilmoqda: ${title.substring(0, 50)}...`);
      const translatedTitle = await this.translateToUzbek(title);
      
      console.log(`🔄 Mazmunni tarjima qilmoqda...`);
      const translatedContent = await this.translateToUzbek(cleanContent);
      const excerpt = translatedContent.substring(0, 200) + '...';

      // RSS'dan rasm URL ni topish
      const imageUrl = this.extractImageUrl(item);

      // Blog post yaratish
      const blogPost: InsertBlogPost = {
        title: translatedTitle,
        content: translatedContent + `\n\n📰 Manba: [${source.name}](${link})`,
        excerpt: excerpt,
        image: imageUrl,
        author: `Evolvo AI Bot (${source.name})`,
        category: source.category,
        language: 'uz',
        published: true
      };

      const createdPost = await storage.createBlogPost(blogPost);
      console.log(`📝 Yangi maqola yaratildi: ${translatedTitle.substring(0, 50)}...`);

      // Telegram kanaliga avtomatik yuborish (1 soat oraliqda)
      if (createdPost?.id) {
        // 1 soat = 3600000 millisekund
        const randomDelay = Math.floor(Math.random() * 3600000); // 0-3600 soniya orasida tasodifiy
        setTimeout(() => {
          this.telegramPoster.sendBlogPost(createdPost.id);
          console.log(`📢 Telegram'ga ${Math.floor(randomDelay/60000)} daqiqa kechikish bilan yuborildi`);
        }, randomDelay);
      }

    } catch (error) {
      console.error('❌ Maqola yaratishda xatolik:', error);
    }
  }

  private cleanContent(content: string): string {
    // HTML teglarini olib tashlash va matnni tozalash
    return content
      .replace(/<[^>]*>/g, '')
      .replace(/&[^;]+;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 2000); // Uzunlikni cheklash
  }

  private extractImageUrl(item: any): string | null {
    // RSS dan rasm URL ni topish (eng yaxshi sifatli rasmni tanlash)
    
    // 1. Enclosure (podcast yoki media fayllari uchun)
    if (item.enclosure && item.enclosure.url && this.isImageUrl(item.enclosure.url)) {
      return item.enclosure.url;
    }
    
    // 2. Media thumbnail (RSS media namespace)
    if (item['media:thumbnail'] && item['media:thumbnail']['$'] && item['media:thumbnail']['$'].url) {
      return item['media:thumbnail']['$'].url;
    }

    // 3. Media content (RSS media namespace)
    if (item['media:content'] && item['media:content']['$'] && item['media:content']['$'].url && this.isImageUrl(item['media:content']['$'].url)) {
      return item['media:content']['$'].url;
    }

    // 4. Content ichidan img tagini topish
    if (item.content) {
      const imgMatch = item.content.match(/<img[^>]+src="([^">]+)"/i);
      if (imgMatch && imgMatch[1]) {
        return imgMatch[1];
      }
    }

    // 5. Description ichidan img tagini topish
    if (item.description) {
      const imgMatch = item.description.match(/<img[^>]+src="([^">]+)"/i);
      if (imgMatch && imgMatch[1]) {
        return imgMatch[1];
      }
    }

    // 6. Summary ichidan img tagini topish
    if (item.summary) {
      const imgMatch = item.summary.match(/<img[^>]+src="([^">]+)"/i);
      if (imgMatch && imgMatch[1]) {
        return imgMatch[1];
      }
    }

    console.log(`⚠️ Rasm topilmadi: ${item.title?.substring(0, 50)}...`);
    return null;
  }

  private isImageUrl(url: string): boolean {
    if (!url) return false;
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    const lowercaseUrl = url.toLowerCase();
    return imageExtensions.some(ext => lowercaseUrl.includes(ext)) || 
           lowercaseUrl.includes('image') || 
           lowercaseUrl.includes('photo');
  }

  private async translateToUzbek(text: string): Promise<string> {
    if (!process.env.OPENAI_API_KEY) {
      console.warn('⚠️ OpenAI API key topilmadi, oddiy tarjima ishlatilmoqda');
      return this.fallbackTranslation(text);
    }

    try {
      const OpenAI = (await import('openai')).default;
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

      const response = await openai.chat.completions.create({
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
        messages: [
          {
            role: "system",
            content: `Siz professional tarjimon sifatida inglizcha AI va texnologiya maqolalarini o'zbek tiliga tarjima qilasiz. 
            
            Qoidalar:
            - Tabiiy va tushunarli o'zbek tilida tarjima qiling
            - Texnik terminlarni to'g'ri tarjima qiling
            - Mazmuni va ma'nosini saqlab qoling
            - O'zbek tilining rasmiy uslubini ishlating
            - AI terminologiyasini o'zbek tilidagi ekvivalentlari bilan almashtiring

            Asosiy terminlar:
            - Artificial Intelligence = Sun'iy Intellekt
            - Machine Learning = Mashina O'rganish
            - Deep Learning = Chuqur O'rganish
            - Neural Network = Neyron Tarmoq
            - Algorithm = Algoritm
            - Data Science = Ma'lumotlar Fani
            - Automation = Avtomatlashtirish`
          },
          {
            role: "user",
            content: `Quyidagi matnni o'zbek tiliga professional tarjima qiling:\n\n${text}`
          }
        ],
        max_tokens: 1500,
        temperature: 0.3
      });

      const translatedText = response.choices[0]?.message?.content?.trim();
      if (!translatedText) {
        throw new Error('OpenAI javob bermadi');
      }

      console.log('✅ OpenAI orqali tarjima muvaffaqiyatli');
      return translatedText;

    } catch (error) {
      console.error('❌ OpenAI tarjima xatolik:', error);
      return this.fallbackTranslation(text);
    }
  }

  private fallbackTranslation(text: string): string {
    // Zaxira tarjima tizimi
    const translations: Record<string, string> = {
      'artificial intelligence': 'sun\'iy intellekt',
      'machine learning': 'mashina o\'rganish',
      'deep learning': 'chuqur o\'rganish',
      'neural network': 'neyron tarmoq',
      'algorithm': 'algoritm',
      'data science': 'ma\'lumotlar fani',
      'robotics': 'robotexnika',
      'automation': 'avtomatlashtirish',
      'technology': 'texnologiya',
      'innovation': 'innovatsiya',
      'research': 'tadqiqot',
      'development': 'rivojlanish',
      'breakthrough': 'yutuq',
      'advancement': 'taraqqiyot',
      'future': 'kelajak',
      'industry': 'sanoat',
      'business': 'biznes',
      'solution': 'yechim',
      'platform': 'platforma',
      'application': 'dastur',
      'model': 'model',
      'training': 'o\'qitish',
      'dataset': 'ma\'lumotlar to\'plami',
      'performance': 'ishlash',
      'optimization': 'optimallash'
    };

    let translatedText = text;
    
    // Asosiy terminlarni tarjima qilish
    for (const [english, uzbek] of Object.entries(translations)) {
      const regex = new RegExp(`\\b${english}\\b`, 'gi');
      translatedText = translatedText.replace(regex, uzbek);
    }

    return translatedText;
  }

  // Manual RSS yuklash uchun
  public async processRSSManually() {
    console.log('🔄 Manual RSS yuklash boshlandi...');
    await this.processAllRSSFeeds();
    console.log('✅ Manual RSS yuklash tugadi');
  }
}

export const rssAutoPoster = new RSSAutoPoster();