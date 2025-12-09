import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogOut, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type NavLink = {
  path: string;
  label: string;
};

const navLinks: NavLink[] = [
  { path: "/", label: "Home" },
  { path: "/services", label: "Services" },
  { path: "/pricing", label: "Pricing" },
  { path: "/tools", label: "Tools" },
  { path: "/about", label: "About" },
  { path: "/portfolio", label: "Portfolio" },
  { path: "/blog", label: "Blog" },
  { path: "/contact", label: "Contact" },
  { path: "/content-generator", label: "AI Writer" },
  { path: "/dashboard", label: "Dashboard" },
];

const NavBar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: 'Error signing out',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Signed out',
        description: 'You have been successfully signed out.',
      });
      navigate('/');
    }
  };

  return (
    <header className="fixed w-full z-50 bg-aura-background/80 backdrop-blur-lg border-b border-aura-accent/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold font-heading bg-gradient-to-r from-aura-accent to-aura-accentSecondary bg-clip-text text-transparent">
              Vibe Tech
            </span>
          </Link>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-white hover:text-aura-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          {/* Theme toggle, auth button, and mobile menu button */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {user ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="hidden md:flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/auth')}
                className="hidden md:flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <LogIn className="h-4 w-4" />
                Login
              </Button>
            )}
            
            <button className="md:hidden text-white hover:text-aura-accent">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
