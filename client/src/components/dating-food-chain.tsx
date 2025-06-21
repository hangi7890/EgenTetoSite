import { Card, CardContent } from "@/components/ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function DatingFoodChain() {
  const { t } = useLanguage();
  const hierarchy = [
    {
      type: "테스토스테론 남",
      color: "bg-blue-600 dark:bg-blue-700",
      textColor: "text-white",
      description: "강력한 남성성과 지배력"
    },
    {
      type: "테스토스테론 녀",
      color: "bg-blue-400 dark:bg-blue-500",
      textColor: "text-white",
      description: "강인한 여성성과 독립성"
    },
    {
      type: "에스트로겐 남",
      color: "bg-sky-400 dark:bg-sky-500",
      textColor: "text-white",
      description: "감성적이고 섬세한 남성성"
    },
    {
      type: "에스트로겐 녀",
      color: "bg-sky-200 dark:bg-sky-300",
      textColor: "text-gray-700 dark:text-gray-800",
      description: "전통적인 여성성과 온화함"
    }
  ];

  const relationships = [
    { from: "테스토스테론 남", to: "에스트로겐 녀", description: "강함이 부드러움을 끌어당김" },
    { from: "테스토스테론 녀", to: "에스트로겐 남", description: "강인함이 섬세함을 보완" },
    { from: "에스트로겐 남", to: "테스토스테론 남", description: "섬세함이 강함을 동경" },
    { from: "에스트로겐 녀", to: "테스토스테론 녀", description: "온화함이 강인함을 추구" }
  ];

  return (
    <section id="dating-food-chain" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">{t('dating.title')}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('dating.subtitle')}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{t('dating.source')}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hierarchy Chart */}
          <div className="order-2 lg:order-1">
            <Card className="shadow-xl border-2 border-purple-200 dark:border-purple-700 dark:bg-gray-800">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-6 text-center text-gray-800 dark:text-white">{t('dating.structure')}</h3>
                <div className="space-y-4">
                  {hierarchy.map((level, index) => (
                    <div key={index} className="relative">
                      <div className={`${level.color} ${level.textColor} p-4 rounded-lg text-center font-bold shadow-lg`}>
                        {level.type}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 text-center mt-2">{level.description}</p>
                      {index < hierarchy.length - 1 && (
                        <div className="flex justify-center mt-2">
                          <ArrowDown className="text-purple-400 h-6 w-6" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Relationship Dynamics */}
          <div className="order-1 lg:order-2">
            <Card className="shadow-xl border-2 border-pink-200 dark:border-pink-700 dark:bg-gray-800">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-6 text-center text-gray-800 dark:text-white">{t('dating.attraction')}</h3>
                <div className="space-y-6">
                  {relationships.map((rel, index) => (
                    <div key={index} className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-600">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-700 dark:text-gray-200">{rel.from}</span>
                        <ArrowUp className="text-pink-500 h-5 w-5 transform rotate-45" />
                        <span className="font-semibold text-gray-700 dark:text-gray-200">{rel.to}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 text-center">{rel.description}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-4 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <h4 className="font-bold text-purple-800 dark:text-purple-300 mb-2">{t('dating.principle')}</h4>
                  <ul className="text-sm text-purple-700 dark:text-purple-200 space-y-1">
                    <li>• 호르몬 특성에 따른 자연스러운 끌림</li>
                    <li>• 상반된 특성이 서로를 보완</li>
                    <li>• 순환적 연애 역학 구조</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12">
          <Card className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 border-2 border-purple-300 dark:border-purple-600">
            <CardContent className="p-6">
              <div className="text-center">
                <h4 className="text-lg font-bold text-purple-800 dark:text-purple-300 mb-3">{t('dating.understanding')}</h4>
                <p className="text-purple-700 dark:text-purple-200 text-sm leading-relaxed max-w-4xl mx-auto">
                  {t('dating.description')}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}