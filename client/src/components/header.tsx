import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-primary">에겐-테토 성격 분석</h1>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection('personality-types')}
              className="text-neutral-600 hover:text-primary transition-colors"
            >
              성격 유형
            </button>
            <button 
              onClick={() => scrollToSection('compatibility')}
              className="text-neutral-600 hover:text-primary transition-colors"
            >
              궁합 분석
            </button>
            <button 
              onClick={() => scrollToSection('dating-food-chain')}
              className="text-neutral-600 hover:text-primary transition-colors"
            >
              연애 먹이사슬
            </button>
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
          <div className="md:hidden border-t border-gray-200 py-2">
            <button 
              onClick={() => scrollToSection('personality-types')}
              className="block w-full text-left px-4 py-2 text-neutral-600 hover:text-primary transition-colors"
            >
              성격 유형
            </button>
            <button 
              onClick={() => scrollToSection('compatibility')}
              className="block w-full text-left px-4 py-2 text-neutral-600 hover:text-primary transition-colors"
            >
              궁합 분석
            </button>
            <button 
              onClick={() => scrollToSection('dating-food-chain')}
              className="block w-full text-left px-4 py-2 text-neutral-600 hover:text-primary transition-colors"
            >
              연애 먹이사슬
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
