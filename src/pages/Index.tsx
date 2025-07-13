import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturesSection from "@/components/FeaturesSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <Hero />
      <div id="features">
        <FeaturesSection />
      </div>
      <div id="about">
        <AboutSection />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
