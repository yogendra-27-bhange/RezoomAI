import { Upload, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import aiRobot from "@/assets/ai-robot.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-hero-gradient overflow-hidden">
      {/* Background particles effect */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-1 h-1 bg-primary rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-primary/60 rounded-full animate-pulse delay-300"></div>
        <div className="absolute top-60 left-1/4 w-1 h-1 bg-primary/40 rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-40 right-10 w-1 h-1 bg-primary rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-60 left-1/3 w-1 h-1 bg-primary/60 rounded-full animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 pt-24 pb-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-6rem)]">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-foreground">
                Refine Your Resume.{" "}
                <span className="text-primary">Get Hired Smarter.</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-muted-foreground max-w-lg">
                AI-powered resume feedback using Gemini
              </p>
            </div>

            <div className="pt-4">
              <Button variant="hero" size="lg" className="text-lg px-8 py-6 rounded-xl">
                <Upload className="mr-2 h-5 w-5" />
                Upload Your Resume
              </Button>
            </div>
          </div>

          {/* Right Content - Illustration */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Resume Card */}
              <div className="relative bg-card border border-border rounded-2xl p-6 shadow-2xl max-w-sm w-full animate-float">
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-muted-foreground mb-4">RESUME</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                      <div className="h-2 bg-muted rounded flex-1"></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                      <div className="h-2 bg-muted rounded flex-1"></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                      <div className="h-2 bg-muted rounded flex-1"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 pt-2">
                    <div className="h-2 bg-muted rounded w-3/4"></div>
                    <div className="h-2 bg-muted rounded w-1/2"></div>
                    <div className="h-2 bg-muted rounded w-2/3"></div>
                  </div>
                </div>
              </div>

              {/* AI Robot */}
              <div className="absolute -bottom-8 -right-8 lg:-right-12">
                <div className="relative">
                  <img 
                    src={aiRobot} 
                    alt="AI Assistant Robot" 
                    className="w-32 h-32 lg:w-40 lg:h-40 animate-float"
                    style={{ animationDelay: '1s' }}
                  />
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse-glow"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;