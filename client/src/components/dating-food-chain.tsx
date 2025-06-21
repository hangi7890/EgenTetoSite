import { Card, CardContent } from "@/components/ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";

export function DatingFoodChain() {
  const hierarchy = [
    {
      type: "테스토스테론 남",
      color: "bg-red-500",
      textColor: "text-white",
      description: "강력한 남성성과 지배력"
    },
    {
      type: "테스토스테론 녀",
      color: "bg-red-300",
      textColor: "text-white",
      description: "강인한 여성성과 독립성"
    },
    {
      type: "에스트로겐 남",
      color: "bg-pink-400",
      textColor: "text-white",
      description: "감성적이고 섬세한 남성성"
    },
    {
      type: "에스트로겐 녀",
      color: "bg-pink-200",
      textColor: "text-gray-700",
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
    <section id="dating-food-chain" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">연애 먹이사슬</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            호르몬 기반 성격 유형에 따른 연애 역학 관계를 분석해보세요.
          </p>
          <p className="text-sm text-gray-500 mt-2">출처: 수성인기 블로그</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hierarchy Chart */}
          <div className="order-2 lg:order-1">
            <Card className="shadow-xl border-2 border-purple-200">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-6 text-center text-gray-800">연애 역학 구조</h3>
                <div className="space-y-4">
                  {hierarchy.map((level, index) => (
                    <div key={index} className="relative">
                      <div className={`${level.color} ${level.textColor} p-4 rounded-lg text-center font-bold shadow-lg`}>
                        {level.type}
                      </div>
                      <p className="text-sm text-gray-600 text-center mt-2">{level.description}</p>
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
            <Card className="shadow-xl border-2 border-pink-200">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-6 text-center text-gray-800">끌림의 방향</h3>
                <div className="space-y-6">
                  {relationships.map((rel, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-700">{rel.from}</span>
                        <ArrowUp className="text-pink-500 h-5 w-5 transform rotate-45" />
                        <span className="font-semibold text-gray-700">{rel.to}</span>
                      </div>
                      <p className="text-sm text-gray-600 text-center">{rel.description}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-4 bg-purple-100 rounded-lg">
                  <h4 className="font-bold text-purple-800 mb-2">핵심 원리</h4>
                  <ul className="text-sm text-purple-700 space-y-1">
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
          <Card className="bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300">
            <CardContent className="p-6">
              <div className="text-center">
                <h4 className="text-lg font-bold text-purple-800 mb-3">연애 먹이사슬의 이해</h4>
                <p className="text-purple-700 text-sm leading-relaxed max-w-4xl mx-auto">
                  이 이론은 호르몬(테스토스테론/에스트로겐)이 성격과 연애 성향에 미치는 영향을 바탕으로 합니다. 
                  각 유형은 서로 다른 매력 포인트를 가지며, 자연스러운 끌림의 방향성이 존재한다고 봅니다. 
                  하지만 이는 하나의 관점일 뿐이며, 실제 연애에서는 개인의 성격과 가치관이 더 중요할 수 있습니다.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}