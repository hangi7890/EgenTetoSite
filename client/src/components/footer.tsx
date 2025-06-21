import { Facebook, Twitter, Instagram } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-neutral-800 dark:bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-4">{t('site.title')}</h3>
          <p className="text-neutral-400 dark:text-neutral-300 mb-4">{t('footer.description')}</p>
          <div className="flex justify-center space-x-6 mb-8">
            <a href="#" className="text-neutral-400 dark:text-neutral-300 hover:text-white transition-colors">
              <Facebook className="h-6 w-6" />
            </a>
            <a href="#" className="text-neutral-400 dark:text-neutral-300 hover:text-white transition-colors">
              <Twitter className="h-6 w-6" />
            </a>
            <a href="#" className="text-neutral-400 dark:text-neutral-300 hover:text-white transition-colors">
              <Instagram className="h-6 w-6" />
            </a>
          </div>
          <div className="text-neutral-500 dark:text-neutral-400 text-sm">
            <p>{t('footer.reference')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
