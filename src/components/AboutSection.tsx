import { Github } from "lucide-react";

const AboutSection = () => (
  <section className="relative py-24 bg-gradient-to-b from-background/80 to-background overflow-hidden" id="about">
    <div className="container mx-auto px-4 lg:px-8">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-foreground animate-fade-in">About</h2>
      <div className="max-w-2xl mx-auto text-center animate-fade-in">
        <p className="text-lg text-muted-foreground mb-6">
          <b>RezoomAI</b> is a next-generation, AI-powered resume feedback platform. It leverages Google Gemini to provide instant, actionable suggestions, match scores, and improvement tips to help you get hired smarter. Built with a focus on privacy, security, and a beautiful mobile-first experience.
        </p>
        <div className="flex flex-col items-center gap-4">
          <span className="text-base text-foreground font-semibold">Contact Developer</span>
          <a
            href="https://github.com/yogendra-27-bhange"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card hover:bg-primary/10 transition-colors text-primary font-medium shadow animate-float"
          >
            <Github className="h-5 w-5" />
            yogendra-27-bhange
          </a>
        </div>
      </div>
      {/* Animated background orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 w-24 h-24 bg-primary/10 rounded-full blur-2xl animate-float" />
        <div className="absolute bottom-10 right-1/4 w-16 h-16 bg-blue-400/10 rounded-full blur-2xl animate-pulse-glow" />
      </div>
    </div>
  </section>
);

export default AboutSection; 