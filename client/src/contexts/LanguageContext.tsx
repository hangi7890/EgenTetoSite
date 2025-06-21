import { createContext, useContext, useState } from "react";

type Language = "ko" | "en" | "zh";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const translations = {
  ko: {
    "site.title": "에겐-테토 성격 분석",
    "nav.personality": "성격 유형",
    "nav.compatibility": "궁합 분석",
    "nav.dating": "연애 먹이사슬",
    "hero.title": "에겐-테토 성격 유형",
    "hero.subtitle": "당신의 성격을 이해하고 관계를 개선해보세요",
    "hero.btn.personality": "성격 유형 알아보기",
    "hero.btn.compatibility": "궁합 분석하기",
    "hero.btn.dating": "연애 먹이사슬",
    "personality.title": "에겐-테토 성격 유형",
    "personality.subtitle": "에겐과 테토는 사람의 성격을 분류하는 독특한 방식으로, 각각의 특성과 행동 패턴을 이해할 수 있습니다.",
    "compatibility.title": "궁합 분석",
    "compatibility.subtitle": "각 성격 유형 간의 궁합을 친구 관계와 연인 관계로 나누어 분석해보세요.",
    "dating.title": "연애 먹이사슬",
    "dating.subtitle": "호르몬 기반 성격 유형에 따른 연애 역학 관계를 분석해보세요.",
    "dating.source": "출처: 수성인기 블로그",
    "more": "더보기",
    "close": "접기",
    "advantages": "장점",
    "disadvantages": "단점",
    "friendship": "친구 관계",
    "romance": "연인 관계",
    "close.btn": "닫기"
  },
  en: {
    "site.title": "Egen-Teto Personality Analysis",
    "nav.personality": "Personality Types",
    "nav.compatibility": "Compatibility",
    "nav.dating": "Dating Hierarchy",
    "hero.title": "Egen-Teto Personality Types",
    "hero.subtitle": "Understand your personality and improve your relationships",
    "hero.btn.personality": "Explore Personality Types",
    "hero.btn.compatibility": "Analyze Compatibility",
    "hero.btn.dating": "Dating Hierarchy",
    "personality.title": "Egen-Teto Personality Types",
    "personality.subtitle": "Egen and Teto are unique ways to classify human personality, helping understand individual characteristics and behavioral patterns.",
    "compatibility.title": "Compatibility Analysis",
    "compatibility.subtitle": "Analyze compatibility between personality types in friendship and romantic relationships.",
    "dating.title": "Dating Hierarchy",
    "dating.subtitle": "Analyze romantic dynamics based on hormone-based personality types.",
    "dating.source": "Source: Suseong Popular Blog",
    "more": "More",
    "close": "Less",
    "advantages": "Advantages",
    "disadvantages": "Disadvantages",
    "friendship": "Friendship",
    "romance": "Romance",
    "close.btn": "Close"
  },
  zh: {
    "site.title": "Egen-Teto 性格分析",
    "nav.personality": "性格类型",
    "nav.compatibility": "配对分析",
    "nav.dating": "恋爱食物链",
    "hero.title": "Egen-Teto 性格类型",
    "hero.subtitle": "了解你的性格，改善你的人际关系",
    "hero.btn.personality": "探索性格类型",
    "hero.btn.compatibility": "分析配对",
    "hero.btn.dating": "恋爱食物链",
    "personality.title": "Egen-Teto 性格类型",
    "personality.subtitle": "Egen和Teto是独特的人格分类方式，帮助理解个人特征和行为模式。",
    "compatibility.title": "配对分析",
    "compatibility.subtitle": "分析性格类型之间在友谊和恋爱关系中的配对情况。",
    "dating.title": "恋爱食物链",
    "dating.subtitle": "基于荷尔蒙性格类型分析恋爱动态关系。",
    "dating.source": "来源：水星人气博客",
    "more": "更多",
    "close": "收起",
    "advantages": "优点",
    "disadvantages": "缺点",
    "friendship": "友谊关系",
    "romance": "恋爱关系",
    "close.btn": "关闭"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("ko");

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}