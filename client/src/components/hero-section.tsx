import { Button } from "@/components/ui/button";

export function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-gradient-to-br from-primary to-secondary text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">에겐-테토 성격 유형</h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">당신의 성격을 이해하고 관계를 개선해보세요</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => scrollToSection('personality-types')}
            variant="secondary"
            size="lg"
            className="bg-white text-primary hover:bg-neutral-100"
          >
            성격 유형 알아보기
          </Button>
          <Button
            onClick={() => scrollToSection('compatibility')}
            variant="outline"
            size="lg"
            className="border-2 border-white text-white hover:bg-white hover:text-primary"
          >
            궁합 분석하기
          </Button>
        </div>
      </div>
    </section>
  );
}
