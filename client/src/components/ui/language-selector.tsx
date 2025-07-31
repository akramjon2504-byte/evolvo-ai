import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/hooks/use-language";

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <Select value={language} onValueChange={(value) => setLanguage(value as any)}>
      <SelectTrigger className="w-20 text-sm border-gray-300">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="uz">O'zbek</SelectItem>
        <SelectItem value="ru">Русский</SelectItem>
        <SelectItem value="en">English</SelectItem>
      </SelectContent>
    </Select>
  );
}
