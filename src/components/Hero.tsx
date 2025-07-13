// Hero.tsx
// This component renders the main hero section of the landing page, including the headline, features, and the right-side AI resume analysis illustration.

import { Upload, CheckCircle2, Sparkles, Zap, Brain, TrendingUp, Target, Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { signInWithGoogle } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleGetStarted = async () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      try {
        await signInWithGoogle();
        toast({
          title: "Welcome to RezoomAI!",
          description: "You've been signed in successfully.",
        });
        navigate('/dashboard');
      } catch (error) {
        toast({
          title: "Sign in failed",
          description: "Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <section id="hero" className="relative min-h-screen bg-hero-gradient overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        {/* Animated sparkles and orbs */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-float" />
        <div className="absolute top-40 right-20 w-3 h-3 bg-primary/60 rounded-full animate-float" style={{ animationDelay: '0.7s' }} />
        <div className="absolute top-60 left-1/4 w-2 h-2 bg-primary/40 rounded-full animate-float" style={{ animationDelay: '1.2s' }} />
        <div className="absolute bottom-40 right-10 w-2 h-2 bg-primary rounded-full animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-60 left-1/3 w-3 h-3 bg-primary/60 rounded-full animate-float" style={{ animationDelay: '2.1s' }} />
        {/* Floating orbs */}
        <div className="absolute top-32 right-1/4 w-8 h-8 bg-primary/20 rounded-full blur-2xl animate-pulse-glow" />
        <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-primary/10 rounded-full blur-2xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />
        {/* Extra animated sparkles */}
        <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-blue-400/60 rounded-full animate-float" style={{ animationDelay: '1.8s' }} />
        <div className="absolute bottom-10 right-1/3 w-2 h-2 bg-yellow-400/40 rounded-full animate-float" style={{ animationDelay: '2.5s' }} />
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-6rem)]">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-foreground">
                Refine Your Resume.{" "}
                <span className="text-primary">Get Hired Smarter.</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-muted-foreground max-w-lg">
                AI-powered resume feedback using Google Gemini. Get instant analysis, improvement suggestions, and match scores to boost your career.
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

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                onClick={handleGetStarted}
                className="relative overflow-hidden group"
              >
                {isAuthenticated ? (
                  <>
                    <span className="relative z-10">Go to Dashboard</span>
                    <ArrowRight className="h-4 w-4 ml-2 relative z-10 group-hover:translate-x-1 transition-transform" />
                  </>
                ) : (
                  <>
                    <span className="relative z-10">Get Started Free</span>
                    <ArrowRight className="h-4 w-4 ml-2 relative z-10 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => {
                  const element = document.getElementById('features');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Learn More
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>Instant results</span>
              </div>
            </div>
          </div>

          {/* Right Content - AI Resume Analysis Illustration */}
          <div className="relative animate-fade-in-delayed">
            <div className="relative z-10">
              {/* Main AI Brain Card */}
              <div className="bg-gradient-to-br from-primary/10 to-secondary/20 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-primary/20 rounded-xl">
                    <Brain className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">AI Analysis</h3>
                    <p className="text-muted-foreground">Powered by Gemini</p>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-background/50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-primary mb-1">85</div>
                    <div className="text-xs text-muted-foreground">Overall Score</div>
                  </div>
                  <div className="bg-background/50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-500 mb-1">92%</div>
                    <div className="text-xs text-muted-foreground">Match Rate</div>
                  </div>
                </div>

                {/* Progress bars */}
                <div className="space-y-3 mb-6">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Content Quality</span>
                      <span>88%</span>
                    </div>
                    <div className="w-full bg-background/30 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '88%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Format & Design</span>
                      <span>76%</span>
                    </div>
                    <div className="w-full bg-background/30 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '76%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Keyword Match</span>
                      <span>94%</span>
                    </div>
                    <div className="w-full bg-background/30 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '94%' }}></div>
                    </div>
                  </div>
                </div>

                {/* Quick feedback */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-foreground">Strong technical skills</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-foreground">Good quantifiable achievements</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-foreground">Consider adding more keywords</span>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-500/20 rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-blue-500" />
                  <span className="text-xs font-medium">Target Role</span>
                </div>
                <div className="text-sm font-semibold mt-1">Senior Developer</div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-500/20 rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-xs font-medium">Improvement</span>
                </div>
                <div className="text-sm font-semibold mt-1">+15% Score</div>
              </div>
            </div>

            {/* Background glow effects */}
            <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-3xl -z-10"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-20"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;