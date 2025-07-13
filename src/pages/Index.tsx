import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturesSection from "@/components/FeaturesSection";
import AboutSection from "@/components/AboutSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <div id="features">
        <FeaturesSection />
      </div>
      <div id="about">
        <AboutSection />
      </div>
    </div>
  );
};

export default Index;
