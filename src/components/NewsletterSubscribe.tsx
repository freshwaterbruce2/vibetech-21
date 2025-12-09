import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Mail, Check } from "lucide-react";
import confetti from "canvas-confetti";
interface NewsletterSubscribeProps {
  title?: string;
  description?: string;
  className?: string;
}
const NewsletterSubscribe = ({
  title = "Subscribe to our newsletter",
  description = "Stay updated with our latest tech insights and service offerings.",
  className = ""
}: NewsletterSubscribeProps) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address.",
        variant: "destructive"
      });
      return;
    }
    setIsLoading(true);

    // Simulating API call
    setTimeout(() => {
      // Trigger confetti celebration
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8f2e9b', '#a855f7', '#c084fc', '#e879f9', '#f0abfc']
      });
      
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
        variant: "success"
      });
      setEmail("");
      setIsLoading(false);
    }, 1500);

    // In a real implementation, you would send this to your backend:
    // await fetch('/api/subscribe', {
    //   method: 'POST',
    //   body: JSON.stringify({ email }),
    //   headers: { 'Content-Type': 'application/json' }
    // });
  };
  return <div className="">
      <div className="bg-aura-backgroundLight border border-aura-accent/10 rounded-lg p-6 shadow-lg backdrop-blur-sm">
        <h3 className="text-xl font-bold mb-2 font-heading text-white">{title}</h3>
        <p className="text-white mb-4">{description}</p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#8f2e9b] bg-primary-foreground z-10" />
            <label 
              className={`absolute left-10 transition-all duration-200 pointer-events-none ${
                isFocused || email 
                  ? 'top-0 -translate-y-1/2 text-xs text-aura-accent bg-background px-1' 
                  : 'top-1/2 -translate-y-1/2 text-sm text-muted-foreground'
              }`}
            >
              Enter your email
            </label>
            <Input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="pl-10 pr-10 pt-2" 
            />
            {isValidEmail(email) && (
              <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
            )}
          </div>
          <Button type="submit" disabled={isLoading} className="bg-gradient-to-r from-aura-accent to-aura-accentSecondary hover:opacity-90 transition-opacity">
            {isLoading ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      </div>
    </div>;
};
export default NewsletterSubscribe;