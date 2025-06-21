import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export function HeroSection() {
  const { t } = useLanguage();
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-gradient-to-br from-primary to-secondary dark:from-blue-800 dark:to-blue-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">{t('hero.title')}</h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">{t('hero.subtitle')}</p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button
            onClick={() => scrollToSection('personality-types')}
            size="lg"
            className="bg-white text-primary dark:text-black hover:bg-neutral-100 shadow-lg transition-all duration-300"
          >
            {t('hero.btn.personality')}
          </Button>
          <Button
            onClick={() => scrollToSection('compatibility')}
            size="lg"
            className="bg-white text-primary dark:text-black hover:bg-neutral-100 shadow-lg transition-all duration-300"
          >
            {t('hero.btn.compatibility')}
          </Button>
          <Button
            onClick={() => scrollToSection('dating-food-chain')}
            size="lg"
            className="bg-white text-primary dark:text-black hover:bg-neutral-100 shadow-lg transition-all duration-300"
          >
            {t('hero.btn.dating')}
          </Button>
        </div>
      </div>
    </section>
  );
}
