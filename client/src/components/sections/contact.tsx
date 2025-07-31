import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLanguage } from "@/hooks/use-language";
import { useToast } from "@/hooks/use-toast";
import { insertContactSchema, InsertContact } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin } from "lucide-react";

export function ContactSection() {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema.extend({
      name: insertContactSchema.shape.name.min(2, "Kamida 2 ta belgi"),
      email: insertContactSchema.shape.email.email("To'g'ri email manzilini kiriting"),
      message: insertContactSchema.shape.message.min(10, "Kamida 10 ta belgi")
    })),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
      language: language
    }
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Muvaffaqiyat!",
        description: t("contact.form.success"),
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['/api/contacts'] });
    },
    onError: (error: any) => {
      toast({
        title: "Xatolik!",
        description: t("contact.form.error"),
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: InsertContact) => {
    contactMutation.mutate({ ...data, language });
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">{t("contact.title")}</h2>
          <p className="text-xl text-gray-600">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">{t("contact.info")}</h3>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-evolvo-blue rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{t("contact.phone")}</div>
                  <div className="text-gray-600">+998 (71) 123-45-67</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-evolvo-blue rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{t("contact.email")}</div>
                  <div className="text-gray-600">info@evolvo-ai.uz</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-evolvo-blue rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{t("contact.address")}</div>
                  <div className="text-gray-600">Toshkent sh., Chilonzor t., IT Park</div>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">{t("contact.social")}</h4>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                  <i className="fab fa-telegram"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-blue-800 rounded-lg flex items-center justify-center text-white hover:bg-blue-900 transition-colors">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white hover:bg-blue-600 transition-colors">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-pink-600 rounded-lg flex items-center justify-center text-white hover:bg-pink-700 transition-colors">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-900">
                          {t("contact.form.name")}
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder={t("contact.form.namePlaceholder")}
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-evolvo-blue focus:border-transparent"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-900">
                          {t("contact.form.email")}
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="email"
                            placeholder={t("contact.form.emailPlaceholder")}
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-evolvo-blue focus:border-transparent"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-900">
                          {t("contact.form.phone")}
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="tel"
                            placeholder={t("contact.form.phonePlaceholder")}
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-evolvo-blue focus:border-transparent"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-900">
                          {t("contact.form.company")}
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder={t("contact.form.companyPlaceholder")}
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-evolvo-blue focus:border-transparent"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-900">
                        {t("contact.form.message")}
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          rows={4}
                          placeholder={t("contact.form.messagePlaceholder")}
                          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-evolvo-blue focus:border-transparent"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  disabled={contactMutation.isPending}
                  className="w-full bg-evolvo-blue text-white py-4 font-semibold hover:bg-evolvo-blue/90"
                >
                  {contactMutation.isPending ? "Yuklanmoqda..." : t("contact.form.submit")}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
