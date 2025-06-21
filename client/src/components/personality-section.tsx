import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Zap, CheckCircle, User, UserCircle, ChevronDown, ChevronUp, Plus, Minus } from "lucide-react";
import type { PersonalityType } from "@shared/schema";

export function PersonalitySection() {
  const [expandedTypes, setExpandedTypes] = useState<Record<number, boolean>>({});
  
  const { data: personalityTypes, isLoading } = useQuery<PersonalityType[]>({
    queryKey: ["/api/personality-types"],
  });

  const toggleExpanded = (typeId: number) => {
    setExpandedTypes(prev => ({
      ...prev,
      [typeId]: !prev[typeId]
    }));
  };

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
    if (type === 'egen') return <Heart className="text-white h-6 w-6" />;
    if (type === 'teto') return <Zap className="text-white h-6 w-6" />;
    if (type === 'egen-male' || type === 'teto-male') return <User className="text-white h-6 w-6" />;
    if (type === 'egen-female' || type === 'teto-female') return <UserCircle className="text-white h-6 w-6" />;
    return <User className="text-white h-6 w-6" />;
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
                <div className="space-y-4 mb-6">
                  {type.characteristics.map((characteristic, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className={`${type.type === 'egen' ? 'text-primary' : 'text-secondary'} mt-1 h-5 w-5`} />
                      <p>{characteristic}</p>
                    </div>
                  ))}
                </div>
                
                {/* More Details Button */}
                <div className="border-t pt-6">
                  <Button
                    onClick={() => toggleExpanded(type.id)}
                    variant="outline"
                    className="w-full"
                  >
                    {expandedTypes[type.id] ? (
                      <>
                        <ChevronUp className="h-4 w-4 mr-2" />
                        접기
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4 mr-2" />
                        더보기
                      </>
                    )}
                  </Button>
                  
                  {expandedTypes[type.id] && (
                    <div className="mt-6 space-y-4">
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center gap-2 mb-3">
                          <Plus className="h-5 w-5 text-green-600" />
                          <h4 className="font-semibold text-green-800">장점</h4>
                        </div>
                        <p className="text-sm text-green-700 leading-relaxed">
                          {type.advantages}
                        </p>
                      </div>
                      
                      <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                        <div className="flex items-center gap-2 mb-3">
                          <Minus className="h-5 w-5 text-red-600" />
                          <h4 className="font-semibold text-red-800">단점</h4>
                        </div>
                        <p className="text-sm text-red-700 leading-relaxed">
                          {type.disadvantages}
                        </p>
                      </div>
                    </div>
                  )}
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
                <ul className="space-y-2 text-sm text-neutral-700 mb-4">
                  {type.characteristics.map((characteristic, index) => (
                    <li key={index}>• {characteristic}</li>
                  ))}
                </ul>
                
                {/* More Details Button for Detailed Types */}
                <div className="border-t pt-4">
                  <Button
                    onClick={() => toggleExpanded(type.id)}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    {expandedTypes[type.id] ? (
                      <>
                        <ChevronUp className="h-3 w-3 mr-1" />
                        접기
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-3 w-3 mr-1" />
                        더보기
                      </>
                    )}
                  </Button>
                  
                  {expandedTypes[type.id] && (
                    <div className="mt-4 space-y-3">
                      <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Plus className="h-4 w-4 text-green-600" />
                          <h5 className="font-semibold text-green-800 text-sm">장점</h5>
                        </div>
                        <p className="text-xs text-green-700 leading-relaxed">
                          {type.advantages}
                        </p>
                      </div>
                      
                      <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Minus className="h-4 w-4 text-red-600" />
                          <h5 className="font-semibold text-red-800 text-sm">단점</h5>
                        </div>
                        <p className="text-xs text-red-700 leading-relaxed">
                          {type.disadvantages}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
