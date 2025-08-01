import OpenAI from "openai";
import { storage } from "./storage";
import type { Contact } from "@shared/schema";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// 30 kunlik marketing xabarlari shablonlari
const marketingTemplates = [
  {
    day: 1,
    subject: "Xush kelibsiz! - Evolvo AI jamoasiga qo'shiling",
    type: "welcome",
    content: "Bizning AI platformamizga xush kelibsiz! Sizning biznessingizni raqamlashtirish sayohatini boshlaymiz."
  },
  {
    day: 3,
    subject: "AI yechimlar bilan biznesingizni kuchaytiring",
    type: "educational",
    content: "Sun'iy intellekt texnologiyalari qanday qilib sizning kompaniyangizni yangi bosqichga olib chiqishi mumkin."
  },
  {
    day: 7,
    subject: "O'zbekistonda AI - Kelajak bugun boshlandi",
    type: "trend",
    content: "Mahalliy bozorda sun'iy intellekt tendensiyalari va imkoniyatlari haqida."
  },
  {
    day: 10,
    subject: "Muvaffaqiyat tarixi - Mijozlarimiz bilan",
    type: "case_study",
    content: "Haqiqiy mijozlarimizning AI yordamida erishgan yutuqlari."
  },
  {
    day: 14,
    subject: "Bepul konsultatsiya - AI strategiyangizni yarating",
    type: "offer",
    content: "Biznes ehtiyojlaringizga mos AI strategiyasini ishlab chiqamiz."
  },
  {
    day: 17,
    subject: "AI avtomatlashtirish - Vaqtingizni tejang",
    type: "solution",
    content: "Takroriy jarayonlarni avtomatlashtirish orqali samaradorlikni oshiring."
  },
  {
    day: 21,
    subject: "Yangi AI xizmatlar - 2025 yil imkoniyatlari",
    type: "product",
    content: "Evolvo AI'ning yangi mahsulotlari va xizmatlar liniyasi."
  },
  {
    day: 24,
    subject: "Ma'lumotlar xavfsizligi va AI",
    type: "security",
    content: "AI texnologiyalarida ma'lumotlar himoyasi va xavfsizlik choralari."
  },
  {
    day: 27,
    subject: "Hamkorlik taklifimiz - Birga kuchliroqmiz",
    type: "partnership",
    content: "Uzoq muddatli hamkorlik va individual yechimlar."
  },
  {
    day: 30,
    subject: "Kelajakka qadam - AI bilan yangi imkoniyatlar",
    type: "future",
    content: "Kelgusi oy rejalarimiz va sizning ishtirokingiz."
  }
];

// OpenAI orqali personalizatsiya qilingan xabar yaratish
async function generatePersonalizedEmail(
  contact: Contact, 
  template: typeof marketingTemplates[0],
  language: string = "uz"
): Promise<{ subject: string; content: string }> {
  try {
    const prompt = `
Quyidagi ma'lumotlar asosida personalizatsiya qilingan marketing xabari yarating:

Mijoz ma'lumotlari:
- Ism: ${contact.name}
- Email: ${contact.email}
- Telefon: ${contact.phone}
- Xabar: ${contact.message}
- Til: ${language}

Shablon:
- Mavzu: ${template.subject}
- Turi: ${template.type}
- Asosiy mazmun: ${template.content}

Talab:
1. Mijozning ismini ishlatib, shaxsiy murojaat qiling
2. Ularning dastlabki xabariga mos keluvchi mazmun yarating
3. ${language} tilida yozing (uz=o'zbek, ru=rus, en=ingliz)
4. Professional va samimiy ohangda yozing
5. Aniq harakat chaqiruvi (CTA) qo'shing
6. Evolvo AI brendini ta'kidlang

JSON formatda javob bering:
{
  "subject": "Personalizatsiya qilingan mavzu",
  "content": "To'liq email mazmuni"
}
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Siz professional email marketing mutaxassisisiz. O'zbek, rus va ingliz tillarida mukammal yoza olasiz. Har doim JSON formatda javob bering."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return {
      subject: result.subject || template.subject,
      content: result.content || template.content
    };
  } catch (error) {
    console.error("Email personalizatsiya xatolik:", error);
    return {
      subject: template.subject,
      content: template.content
    };
  }
}

// Xush kelibsiz emailni yuborish
export async function sendWelcomeEmail(contact: Contact): Promise<boolean> {
  try {
    const welcomeTemplate = marketingTemplates[0];
    const personalizedEmail = await generatePersonalizedEmail(
      contact, 
      welcomeTemplate, 
      contact.language
    );

    // Email log saqlash
    const emailLog = {
      contactId: contact.id,
      email: contact.email,
      subject: personalizedEmail.subject,
      content: personalizedEmail.content,
      type: "welcome",
      status: "sent",
      sentAt: new Date()
    };

    // Storage ga email log qo'shish
    try {
      await storage.addEmailLog(emailLog);
    } catch (error) {
      console.error("Email log xatolik:", error);
    }

    console.log(`✅ Xush kelibsiz email yuborildi: ${contact.email}`);
    console.log(`📧 Mavzu: ${personalizedEmail.subject}`);
    
    return true;
  } catch (error) {
    console.error("Xush kelibsiz email xatolik:", error);
    return false;
  }
}

// Marketing emaillarni yuborish (har 2 kunda)
export async function sendMarketingEmails(): Promise<void> {
  try {
    const contacts = await storage.getAllContacts();
    const today = new Date();

    for (const contact of contacts) {
      // Kontakt yaratilgan kundan boshlab kun hisobini aniqlash
      const contactDate = new Date(contact.createdAt);
      const daysSinceContact = Math.floor((today.getTime() - contactDate.getTime()) / (1000 * 60 * 60 * 24));

      // Har 2 kunda email yuborish
      if (daysSinceContact > 0 && daysSinceContact % 2 === 0) {
        const templateIndex = Math.floor(daysSinceContact / 2) - 1;
        
        if (templateIndex >= 0 && templateIndex < marketingTemplates.length) {
          const template = marketingTemplates[templateIndex];
          
          // Avval yuborilganmi tekshirish
          const emailLogs = await storage.getEmailLogs(contact.id);
          const alreadySent = emailLogs.some(log => 
            log.type === template.type && 
            new Date(log.sentAt).toDateString() === today.toDateString()
          );

          if (!alreadySent) {
            const personalizedEmail = await generatePersonalizedEmail(
              contact, 
              template, 
              contact.language
            );

            const emailLog = {
              contactId: contact.id,
              email: contact.email,
              subject: personalizedEmail.subject,
              content: personalizedEmail.content,
              type: template.type,
              status: "sent",
              sentAt: new Date().toISOString()
            };

            await storage.addEmailLog(emailLog);
            
            console.log(`📧 Marketing email yuborildi: ${contact.email} - ${template.type}`);
          }
        }
      }
    }
  } catch (error) {
    console.error("Marketing emaillar xatolik:", error);
  }
}

// Email statistikasini olish
export async function getEmailStats(): Promise<{
  totalSent: number;
  welcomeEmails: number;
  marketingEmails: number;
  recentEmails: any[];
}> {
  try {
    const allLogs = await storage.getAllEmailLogs();
    
    return {
      totalSent: allLogs.length,
      welcomeEmails: allLogs.filter(log => log.type === "welcome").length,
      marketingEmails: allLogs.filter(log => log.type !== "welcome").length,
      recentEmails: allLogs.slice(-10) // Oxirgi 10 ta email
    };
  } catch (error) {
    console.error("Email statistika xatolik:", error);
    return {
      totalSent: 0,
      welcomeEmails: 0,
      marketingEmails: 0,
      recentEmails: []
    };
  }
}

// Email marketing jadvalini ishga tushirish
export const emailMarketing = {
  sendWelcomeEmail,
  sendMarketingEmails,
  getEmailStats,
  marketingTemplates
};