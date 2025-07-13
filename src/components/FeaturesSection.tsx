import { Brain, Zap, Sparkles, TrendingUp, ShieldCheck, Users } from "lucide-react";

const features = [
  {
    icon: <Brain className="h-8 w-8 text-primary animate-bounce-gentle" />,
    title: "AI-Powered Feedback",
    desc: "Get instant, actionable resume feedback powered by Google Gemini AI.",
  },
  {
    icon: <Zap className="h-8 w-8 text-yellow-400 animate-pulse-glow" />,
    title: "Instant Results",
    desc: "Upload your resume and see your match score and suggestions in seconds.",
  },
  {
    icon: <Sparkles className="h-8 w-8 text-blue-400 animate-float" />,
    title: "Smart Suggestions",
    desc: "Improve your resume with AI-driven, personalized tips and keyword analysis.",
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-green-400 animate-float" />,
    title: "Career Growth",
    desc: "Boost your chances of getting hired with data-backed recommendations.",
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-emerald-400 animate-bounce-gentle" />,
    title: "Secure & Private",
    desc: "Your data is protected with industry-leading security and privacy.",
  },
  {
    icon: <Users className="h-8 w-8 text-purple-400 animate-float" />,
    title: "Personalized Experience",
    desc: "Sign in to save your feedback history and track your progress.",
  },
];

const FeaturesSection = () => (
  <section className="relative py-24 bg-gradient-to-b from-background to-background/80 overflow-hidden">
    <div className="container mx-auto px-4 lg:px-8">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-foreground animate-fade-in">Features</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <div
            key={f.title}
            className="bg-card border border-border rounded-2xl p-8 shadow-lg flex flex-col items-center text-center animate-fade-in"
            style={{ animationDelay: `${i * 0.1 + 0.2}s` }}
          >
            <div className="mb-4">{f.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">{f.title}</h3>
            <p className="text-muted-foreground text-base">{f.desc}</p>
          </div>
        ))}
      </div>
      {/* Animated background sparkles */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-10 left-1/4 w-2 h-2 bg-primary/30 rounded-full animate-float" />
        <div className="absolute bottom-10 right-1/3 w-3 h-3 bg-blue-400/20 rounded-full animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 right-10 w-1 h-1 bg-yellow-400/30 rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-green-400/10 rounded-full blur-2xl animate-pulse-glow" />
      </div>
    </div>
  </section>
);

export default FeaturesSection; 