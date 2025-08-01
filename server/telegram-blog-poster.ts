import TelegramBot from 'node-telegram-bot-api';
import { db } from './db';
import { blogPosts } from '@shared/schema';
import { eq, desc } from 'drizzle-orm';

// Telegram kanal uchun blog post yuborish
export class TelegramBlogPoster {
  private bot: TelegramBot;
  private channelId: string;

  constructor() {
    if (!process.env.TELEGRAM_CHANNEL_BOT_TOKEN) {
      throw new Error('TELEGRAM_CHANNEL_BOT_TOKEN environment variable is required');
    }
    
    this.bot = new TelegramBot(process.env.TELEGRAM_CHANNEL_BOT_TOKEN);
    this.channelId = '@evolvo_ai'; // Kanal username
  }

  // Yangi blog postni kanalga yuborish
  async sendBlogPost(postId: string) {
    try {
      const [post] = await db
        .select()
        .from(blogPosts)
        .where(eq(blogPosts.id, postId));

      if (!post || !post.published) {
        console.log(`❌ Blog post ${postId} topilmadi yoki nashr qilinmagan`);
        return;
      }

      // Blog post matnini tayyorlash
      const message = this.formatBlogMessage(post);
      
      // Kanalga yuborish
      await this.bot.sendMessage(this.channelId, message, {
        parse_mode: 'HTML',
        disable_web_page_preview: false
      });

      console.log(`📢 Blog post kanalga yuborildi: ${post.title}`);
      
    } catch (error) {
      console.error('❌ Telegram kanalga yuborishda xatolik:', error);
    }
  }

  // Blog post formatini tayyorlash
  private formatBlogMessage(post: any): string {
    const truncatedContent = post.content.length > 300 
      ? post.content.substring(0, 300) + '...' 
      : post.content;

    return `
🆕 <b>${post.title}</b>

${truncatedContent}

📅 ${new Date(post.createdAt).toLocaleDateString('uz-UZ')}
💬 Batafsil o'qish: https://evolvo-ai.replit.app/blog/${post.id}

#EvolvoAI #AI #Texnologiya #Uzbekistan
    `.trim();
  }

  // Barcha yangi blog postlarni yuborish
  async sendLatestPosts(limit: number = 5) {
    try {
      const posts = await db
        .select()
        .from(blogPosts)
        .where(eq(blogPosts.published, true))
        .orderBy(desc(blogPosts.createdAt))
        .limit(limit);

      for (const post of posts) {
        await this.sendBlogPost(post.id);
        // Har bir post orasida 2 soniya kutish
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      console.log(`📢 ${posts.length} ta blog post kanalga yuborildi`);
      
    } catch (error) {
      console.error('❌ Oxirgi postlarni yuborishda xatolik:', error);
    }
  }

  // Kanal statistikasini olish
  async getChannelStats() {
    try {
      const chat = await this.bot.getChat(this.channelId);
      return {
        title: chat.title,
        username: chat.username,
        type: chat.type,
        membersCount: (chat as any).members_count || 0
      };
    } catch (error) {
      console.error('❌ Kanal statistikasini olishda xatolik:', error);
      return null;
    }
  }

  // Test xabar yuborish
  async sendTestMessage() {
    try {
      const message = `
🔥 <b>Evolvo AI - Test Xabar</b>

Salom! Bu test xabari. Kanal to'g'ri sozlangan va xabarlar muvaffaqiyatli yuborilmoqda.

⚡ Tez orada siz uchun qiziqarli AI va texnologiya yangiliklarini ulashamiz!

#EvolvoAI #Test
      `.trim();

      await this.bot.sendMessage(this.channelId, message, {
        parse_mode: 'HTML'
      });

      console.log('✅ Test xabar muvaffaqiyatli yuborildi');
      return true;
      
    } catch (error) {
      console.error('❌ Test xabar yuborishda xatolik:', error);
      
      // 403 error bo'lsa, bot admin emas
      if (error.response?.body?.error_code === 403) {
        console.log('⚠️  Bot kanalga admin sifatida qo\'shilmagan. Bot username:', error.response?.body?.description);
        return false;
      }
      
      return false;
    }
  }
}

// Singleton instance
export const telegramBlogPoster = new TelegramBlogPoster();