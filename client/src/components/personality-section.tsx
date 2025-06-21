import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Heart, CheckCircle, User } from "lucide-react";
import type { PersonalityType } from "@shared/schema";

export function PersonalitySection() {
  const { data: personalityTypes, isLoading } = useQuery<PersonalityType[]>({
    queryKey: ["/api/personality-types"],
  });

  if (isLoading) {
    return (
      <section id="personality-types" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const mainTypes = personalityTypes?.filter(type => type.type === 'egen' || type.type === 'teto') || [];
  const detailedTypes = personalityTypes?.filter(type => 
    type.type === 'egen-male' || type.type === 'egen-female' || 
    type.type === 'teto-male' || type.type === 'teto-female'
  ) || [];

  const getIcon = (type: string) => {
    if (type === 'egen') return <Brain className="text-white text-2xl" />;
    if (type === 'teto') return <Heart className="text-white text-2xl" />;
    return <User className="text-white" />;
  };

  const getColorClass = (type: string) => {
    if (type.includes('egen')) return 'border-primary text-primary';
    if (type.includes('teto')) return 'border-secondary text-secondary';
    return 'border-gray-500 text-gray-500';
  };

  const getBgColorClass = (type: string) => {
    if (type === 'egen') return 'bg-primary';
    if (type === 'teto') return 'bg-secondary';
    if (type.includes('egen')) return 'bg-primary';
    if (type.includes('teto')) return 'bg-secondary';
    return 'bg-gray-500';
  };

  return (
    <section id="personality-types" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">에겐-테토 성격 유형</h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            에겐과 테토는 사람의 성격을 분류하는 독특한 방식으로, 각각의 특성과 행동 패턴을 이해할 수 있습니다.
          </p>
        </div>

        {/* Main Types */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {mainTypes.map((type) => (
            <Card key={type.id} className="bg-neutral-50 shadow-lg">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className={`w-16 h-16 ${getBgColorClass(type.type)} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    {getIcon(type.type)}
                  </div>
                  <h3 className={`text-2xl font-bold mb-2 ${type.type === 'egen' ? 'text-primary' : 'text-secondary'}`}>
                    {type.name}
                  </h3>
                  <p className="text-neutral-600">{type.description}</p>
                </div>
                <div className="space-y-4">
                  {type.characteristics.map((characteristic, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className={`${type.type === 'egen' ? 'text-primary' : 'text-secondary'} mt-1 h-5 w-5`} />
                      <p>{characteristic}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed Types */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {detailedTypes.map((type) => (
            <Card key={type.id} className={`border-2 ${getColorClass(type.type)} hover:shadow-lg transition-shadow`}>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className={`w-12 h-12 ${getBgColorClass(type.type)} rounded-full flex items-center justify-center mx-auto mb-3`}>
                    {getIcon(type.type)}
                  </div>
                  <h4 className={`text-lg font-bold ${getColorClass(type.type)}`}>
                    {type.name}
                  </h4>
                </div>
                <ul className="space-y-2 text-sm text-neutral-700">
                  {type.characteristics.map((characteristic, index) => (
                    <li key={index}>• {characteristic}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
