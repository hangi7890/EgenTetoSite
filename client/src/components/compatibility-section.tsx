import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Heart, Handshake, User, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { CompatibilityAnalysis } from "@shared/schema";

export function CompatibilitySection() {
  const [selectedCompatibility, setSelectedCompatibility] = useState<CompatibilityAnalysis | null>(null);
  const { t } = useLanguage();

  const { data: compatibilityData, isLoading } = useQuery<CompatibilityAnalysis[]>({
    queryKey: ["/api/compatibility"],
  });

  if (isLoading) {
    return (
      <section id="compatibility" className="py-20 bg-neutral-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const getCompatibilityTitle = (type1: string, type2: string) => {
    const typeNames: { [key: string]: string } = {
      'egen-male': '에겐남',
      'egen-female': '에겐녀',
      'teto-male': '테토남',
      'teto-female': '테토녀'
    };
    return `${typeNames[type1]} × ${typeNames[type2]}`;
  };

  const getButtonColor = (index: number) => {
    const colors = [
      'border-primary hover:bg-primary',
      'border-secondary hover:bg-secondary',
      'border-accent hover:bg-accent',
      'border-neutral-600 hover:bg-neutral-600'
    ];
    return colors[index % colors.length];
  };

  const showCompatibility = (compatibility: CompatibilityAnalysis) => {
    setSelectedCompatibility(compatibility);
    setTimeout(() => {
      const element = document.getElementById('compatibility-results');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const hideCompatibility = () => {
    setSelectedCompatibility(null);
  };

  return (
    <section id="compatibility" className="py-20 bg-neutral-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">{t('compatibility.title')}</h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
            {t('compatibility.subtitle')}
          </p>
        </div>

        {/* Compatibility Buttons */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {compatibilityData?.map((compatibility, index) => (
            <Button
              key={compatibility.id}
              onClick={() => showCompatibility(compatibility)}
              variant="outline"
              className={`${getButtonColor(index)} hover:text-white transition-all group h-auto p-6`}
            >
              <div className="flex flex-col items-center gap-3">
                <div className="flex gap-2">
                  <User className="h-5 w-5" />
                  <User className="h-5 w-5" />
                </div>
                <span className="font-semibold">
                  {getCompatibilityTitle(compatibility.type1, compatibility.type2)}
                </span>
              </div>
            </Button>
          ))}
        </div>

        {/* Compatibility Results */}
        {selectedCompatibility && (
          <div id="compatibility-results">
            <Card className="shadow-lg dark:bg-gray-900">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-8 text-center text-gray-900 dark:text-white">
                  {getCompatibilityTitle(selectedCompatibility.type1, selectedCompatibility.type2)} {t('compatibility.title')}
                </h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Friendship */}
                  <Card className="border-2 border-accent dark:bg-gray-800">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Handshake className="text-accent text-xl h-6 w-6" />
                        <h4 className="text-xl font-bold text-accent">{t('friendship')}</h4>
                      </div>
                      <div className="space-y-3">
                        {selectedCompatibility.friendshipTraits.map((trait, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <CheckCircle className="text-accent mt-1 h-5 w-5 flex-shrink-0" />
                            <p className="text-neutral-700 dark:text-neutral-300">{trait}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Romance */}
                  <Card className="border-2 border-red-500 dark:bg-gray-800">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Heart className="text-red-500 text-xl h-6 w-6" />
                        <h4 className="text-xl font-bold text-red-500">{t('romance')}</h4>
                      </div>
                      <div className="space-y-3">
                        {selectedCompatibility.romanceTraits.map((trait, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <Heart className="text-red-500 mt-1 h-5 w-5 flex-shrink-0" />
                            <p className="text-neutral-700 dark:text-neutral-300">{trait}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-8 text-center">
                  <Button
                    onClick={hideCompatibility}
                    variant="secondary"
                    className="bg-neutral-600 text-white hover:bg-neutral-700"
                  >
                    닫기
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
}
