import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { PersonalitySection } from "@/components/personality-section";
import { CompatibilitySection } from "@/components/compatibility-section";
import { DatingFoodChain } from "@/components/dating-food-chain";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <PersonalitySection />
      <CompatibilitySection />
      <DatingFoodChain />
      <Footer />
    </div>
  );
}
