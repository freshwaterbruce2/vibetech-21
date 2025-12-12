import { memo } from "react";
import { Link } from "react-router-dom";
import NewsletterSubscribe from "./NewsletterSubscribe";
import { COOKIE_CONSENT_REOPEN_EVENT } from "./CookieConsent";
import { 
  socialLinks, 
  contactMethods, 
  quickLinks, 
  serviceLinks, 
  companyInfo 
} from "@/data/marketingData";

const SocialLink = memo(({ link }: { link: typeof socialLinks[0] }) => {
  const Icon = link.icon;
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={link.label}
      className="p-2 rounded-lg bg-muted/50 hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all duration-300"
    >
      <Icon className="h-5 w-5" />
    </a>
  );
});
SocialLink.displayName = 'SocialLink';

const ContactItem = memo(({ method }: { method: typeof contactMethods[0] }) => {
  const Icon = method.icon;
  const isInternal = method.href.startsWith('/');
  
  return isInternal ? (
    <Link
      to={method.href}
      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
    >
      <Icon className="h-4 w-4" />
      <span>{method.value}</span>
    </Link>
  ) : (
    <a
      href={method.href}
      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
    >
      <Icon className="h-4 w-4" />
      <span>{method.value}</span>
    </a>
  );
});
ContactItem.displayName = 'ContactItem';

const Footer = memo(() => {
  const handleManageCookies = () => {
    window.dispatchEvent(new Event(COOKIE_CONSENT_REOPEN_EVENT));
  };

  return (
    <footer className="border-t border-border/10 mt-auto py-12 relative z-10 bg-background/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4 font-heading bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {companyInfo.name}
            </h3>
            <p className="text-muted-foreground mb-4 max-w-sm">
              {companyInfo.tagline}
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3 mb-6">
              {socialLinks.map((link) => (
                <SocialLink key={link.name} link={link} />
              ))}
            </div>
            
            {/* Contact Methods */}
            <div className="space-y-2">
              {contactMethods.map((method) => (
                <ContactItem key={method.name} method={method} />
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Services</h4>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Stay Updated</h4>
            <p className="text-muted-foreground text-sm mb-4">
              Get weekly insights on AI, web development, and digital strategy.
            </p>
            <NewsletterSubscribe className="w-full" />
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            &copy; {companyInfo.year} {companyInfo.name}. All rights reserved.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Terms of Service
            </Link>
            <button 
              onClick={handleManageCookies}
              className="text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              Manage Cookies
            </button>
            <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
});
Footer.displayName = 'Footer';

export default Footer;
