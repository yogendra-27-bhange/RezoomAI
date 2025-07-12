import { CheckCircle, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <CheckCircle className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">RezoomAI</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Button variant="nav" className="text-base">
              Home
            </Button>
            <Button variant="nav" className="text-base">
              Features
            </Button>
            <Button variant="nav" className="text-base">
              About
            </Button>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button variant="outline" size="lg" className="text-base">
              Try Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="border-t border-border/50 py-4 md:hidden">
            <nav className="flex flex-col gap-4">
              <Button variant="nav" className="justify-start text-base">
                Home
              </Button>
              <Button variant="nav" className="justify-start text-base">
                Features
              </Button>
              <Button variant="nav" className="justify-start text-base">
                About
              </Button>
              <Button variant="outline" size="lg" className="mt-2 text-base">
                Try Now
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;