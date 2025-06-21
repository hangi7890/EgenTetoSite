import { useState } from "react";
import { Menu, X, Moon, Sun, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-primary dark:text-blue-400">{t('site.title')}</h1>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('personality-types')}
              className="text-neutral-600 dark:text-neutral-300 hover:text-primary dark:hover:text-blue-400 transition-colors"
            >
              {t('nav.personality')}
            </button>
            <button 
              onClick={() => scrollToSection('compatibility')}
              className="text-neutral-600 dark:text-neutral-300 hover:text-primary dark:hover:text-blue-400 transition-colors"
            >
              {t('nav.compatibility')}
            </button>
            <button 
              onClick={() => scrollToSection('dating-food-chain')}
              className="text-neutral-600 dark:text-neutral-300 hover:text-primary dark:hover:text-blue-400 transition-colors"
            >
              {t('nav.dating')}
            </button>
            
            {/* Language Selector */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              className="bg-transparent text-neutral-600 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-600 rounded px-2 py-1 text-sm"
            >
              <option value="ko">한국어</option>
              <option value="en">English</option>
              <option value="zh">中文</option>
            </select>
            
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="text-neutral-600 dark:text-neutral-300"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-600 py-2">
            <button 
              onClick={() => scrollToSection('personality-types')}
              className="block w-full text-left px-4 py-2 text-neutral-600 dark:text-neutral-300 hover:text-primary dark:hover:text-blue-400 transition-colors"
            >
              {t('nav.personality')}
            </button>
            <button 
              onClick={() => scrollToSection('compatibility')}
              className="block w-full text-left px-4 py-2 text-neutral-600 dark:text-neutral-300 hover:text-primary dark:hover:text-blue-400 transition-colors"
            >
              {t('nav.compatibility')}
            </button>
            <button 
              onClick={() => scrollToSection('dating-food-chain')}
              className="block w-full text-left px-4 py-2 text-neutral-600 dark:text-neutral-300 hover:text-primary dark:hover:text-blue-400 transition-colors"
            >
              {t('nav.dating')}
            </button>
            
            <div className="px-4 py-2 space-y-2">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="w-full bg-transparent text-neutral-600 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-600 rounded px-2 py-1 text-sm"
              >
                <option value="ko">한국어</option>
                <option value="en">English</option>
                <option value="zh">中文</option>
              </select>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="w-full justify-start text-neutral-600 dark:text-neutral-300"
              >
                {theme === 'light' ? <Moon className="h-4 w-4 mr-2" /> : <Sun className="h-4 w-4 mr-2" />}
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
