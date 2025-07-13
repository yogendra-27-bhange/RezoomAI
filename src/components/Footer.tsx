import { CheckCircle, Github } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="relative bg-background border-t border-border py-8 mt-16 overflow-hidden">
    <div className="container mx-auto px-4 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
      {/* Logo and copyright */}
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
          <CheckCircle className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="font-bold text-lg text-foreground">RezoomAI</span>
        <span className="text-muted-foreground text-sm ml-4">© {new Date().getFullYear()}</span>
      </div>
      {/* Links */}
      <nav className="flex items-center gap-6 text-sm">
        <a href="#hero" className="hover:text-primary transition-colors">Home</a>
        <a href="#features" className="hover:text-primary transition-colors">Features</a>
        <a href="#about" className="hover:text-primary transition-colors">About</a>
        <Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
      </nav>
      {/* Made by */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Made with <span className="text-red-500">❤️</span> by</span>
        <a
          href="https://github.com/yogendra-27-bhange"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 hover:text-primary transition-colors"
        >
          <Github className="h-4 w-4" />
          yogendra-27-bhange
        </a>
      </div>
    </div>
    {/* Animated orb */}
    <div className="pointer-events-none absolute -bottom-10 right-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse-glow -z-10" />
  </footer>
);

export default Footer; 