import { Upload, CheckCircle2, Sparkles, Zap, Brain, TrendingUp, Target, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-hero-gradient overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        {/* Animated particles */}
        <div className="absolute top-20 left-10 w-1 h-1 bg-primary rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-primary/60 rounded-full animate-pulse delay-300"></div>
        <div className="absolute top-60 left-1/4 w-1 h-1 bg-primary/40 rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-40 right-10 w-1 h-1 bg-primary rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-60 left-1/3 w-1 h-1 bg-primary/60 rounded-full animate-pulse delay-1000"></div>
        
        {/* Larger floating elements */}
        <div className="absolute top-32 right-1/4 w-2 h-2 bg-primary/30 rounded-full animate-float"></div>
        <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-primary/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
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

            {/* Feature highlights */}
            <div className="flex flex-wrap gap-4 py-4">
              <div className="flex items-center gap-2 bg-secondary/50 px-3 py-1 rounded-full backdrop-blur-sm">
                <Brain className="h-4 w-4 text-primary" />
                <span className="text-sm text-foreground">Smart Analysis</span>
              </div>
              <div className="flex items-center gap-2 bg-secondary/50 px-3 py-1 rounded-full backdrop-blur-sm">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-sm text-foreground">Instant Feedback</span>
              </div>
              <div className="flex items-center gap-2 bg-secondary/50 px-3 py-1 rounded-full backdrop-blur-sm">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm text-foreground">AI-Powered</span>
              </div>
            </div>

            <div className="pt-4">
              <Button variant="hero" size="lg" className="text-lg px-8 py-6 rounded-xl relative group">
                <Upload className="mr-2 h-5 w-5" />
                Upload Your Resume
                <div className="absolute inset-0 bg-primary/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </Button>
            </div>
          </div>

          {/* Right Content - Enhanced Illustration */}
          <div className="relative flex justify-center lg:justify-end lg:pr-32">
            <div className="relative">
              {/* Floating elements around the resume */}
              <div className="absolute -top-4 -left-4 text-primary animate-float">
                <Sparkles className="h-6 w-6" />
              </div>
              <div className="absolute -top-2 right-8 text-primary/60 animate-float" style={{ animationDelay: '1s' }}>
                <Zap className="h-5 w-5" />
              </div>
              <div className="absolute bottom-4 -left-6 text-primary/40 animate-float" style={{ animationDelay: '2s' }}>
                <Brain className="h-5 w-5" />
              </div>

              {/* Resume Card with enhanced styling */}
              <div className="relative bg-card border border-border rounded-2xl p-6 shadow-2xl max-w-sm w-full animate-float backdrop-blur-sm">
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-muted-foreground mb-4">RESUME</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                      <div className="h-2 bg-gradient-to-r from-primary to-primary/60 rounded flex-1"></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                      <div className="h-2 bg-gradient-to-r from-primary to-primary/60 rounded flex-1"></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                      <div className="h-2 bg-gradient-to-r from-primary to-primary/60 rounded flex-1"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 pt-2">
                    <div className="h-2 bg-muted rounded w-3/4"></div>
                    <div className="h-2 bg-muted rounded w-1/2"></div>
                    <div className="h-2 bg-muted rounded w-2/3"></div>
                  </div>
                </div>
                
                {/* Card glow effect */}
                <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-xl animate-pulse-glow"></div>
              </div>

              {/* AI Analysis Visualization */}
              <div className="absolute -bottom-12 -right-12 lg:-right-16">
                <div className="relative">
                  {/* Central AI Brain */}
                  <div className="relative w-32 h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center animate-pulse-glow">
                    <Brain className="h-14 w-14 lg:h-20 lg:w-20 text-primary-foreground" />
                    <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl animate-pulse"></div>
                  </div>

                  {/* Floating Achievement Icons */}
                  <div className="absolute -top-8 -left-8 bg-card/80 backdrop-blur-sm rounded-full p-2 border border-primary/20 animate-float">
                    <TrendingUp className="h-4 w-4 text-primary" />
                  </div>
                  <div className="absolute -top-4 right-8 bg-card/80 backdrop-blur-sm rounded-full p-2 border border-primary/20 animate-float" style={{ animationDelay: '1s' }}>
                    <Target className="h-4 w-4 text-primary" />
                  </div>
                  <div className="absolute bottom-8 -left-12 bg-card/80 backdrop-blur-sm rounded-full p-2 border border-primary/20 animate-float" style={{ animationDelay: '2s' }}>
                    <Award className="h-4 w-4 text-primary" />
                  </div>

                  {/* Animated Progress Rings */}
                  <div className="absolute inset-0 w-32 h-32 lg:w-36 lg:h-36">
                    <svg className="w-full h-full -rotate-90 animate-spin" style={{ animationDuration: '8s' }}>
                      <circle
                        cx="50%"
                        cy="50%"
                        r="45%"
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="1"
                        strokeDasharray="20 10"
                        opacity="0.3"
                      />
                    </svg>
                  </div>
                  <div className="absolute inset-2 w-28 h-28 lg:w-32 lg:h-32">
                    <svg className="w-full h-full rotate-90 animate-spin" style={{ animationDuration: '12s' }}>
                      <circle
                        cx="50%"
                        cy="50%"
                        r="45%"
                        fill="none"
                        stroke="hsl(var(--primary-glow))"
                        strokeWidth="1"
                        strokeDasharray="15 15"
                        opacity="0.4"
                      />
                    </svg>
                  </div>

                  {/* Data particles */}
                  <div className="absolute top-0 left-0 w-1 h-1 bg-primary rounded-full animate-ping"></div>
                  <div className="absolute top-4 right-2 w-1 h-1 bg-primary/60 rounded-full animate-ping delay-700"></div>
                  <div className="absolute bottom-2 left-4 w-1 h-1 bg-primary/80 rounded-full animate-ping delay-1000"></div>
                </div>
              </div>

              {/* Success Metrics Floating Cards */}
              <div className="absolute top-12 -left-16 lg:-left-20">
                <div className="bg-card/90 backdrop-blur-sm border border-primary/20 rounded-lg p-3 shadow-lg animate-float" style={{ animationDelay: '0.5s' }}>
                  <div className="text-center">
                    <div className="text-sm font-bold text-primary">85%</div>
                    <div className="text-xs text-muted-foreground">Match Rate</div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-20 left-8">
                <div className="bg-card/90 backdrop-blur-sm border border-primary/20 rounded-lg p-3 shadow-lg animate-float" style={{ animationDelay: '1.5s' }}>
                  <div className="text-center">
                    <div className="text-sm font-bold text-primary">12</div>
                    <div className="text-xs text-muted-foreground">Improvements</div>
                  </div>
                </div>
              </div>

              {/* Connecting lines/dots */}
              <div className="absolute top-1/2 right-4 flex flex-col gap-1">
                <div className="w-1 h-1 bg-primary rounded-full animate-pulse"></div>
                <div className="w-1 h-1 bg-primary/60 rounded-full animate-pulse delay-200"></div>
                <div className="w-1 h-1 bg-primary/40 rounded-full animate-pulse delay-400"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;