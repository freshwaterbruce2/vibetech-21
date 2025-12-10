import { Linkedin, Twitter, Github, Mail, Phone, MessageCircle } from 'lucide-react';

export const socialLinks = [
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/brucefreshwater',
    icon: Linkedin,
    label: 'Connect on LinkedIn'
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/vibetech',
    icon: Twitter,
    label: 'Follow on Twitter'
  },
  {
    name: 'GitHub',
    href: 'https://github.com/vibetech',
    icon: Github,
    label: 'View on GitHub'
  }
];

export const contactMethods = [
  {
    name: 'Email',
    value: 'freshwaterbruce@icloud.com',
    href: 'mailto:freshwaterbruce@icloud.com',
    icon: Mail,
    label: 'Send an email'
  },
  {
    name: 'Phone',
    value: '(803) 825-8860',
    href: 'tel:+18038258860',
    icon: Phone,
    label: 'Call us'
  },
  {
    name: 'Live Chat',
    value: 'Start a conversation',
    href: '/contact',
    icon: MessageCircle,
    label: 'Chat with us'
  }
];

export const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Tools', href: '/tools' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' }
];

export const serviceLinks = [
  { name: 'AI-First Development', href: '/services#ai' },
  { name: 'Edge-Native Web Apps', href: '/services#edge' },
  { name: 'Zero-Trust Security', href: '/services#security' },
  { name: 'Custom Integrations', href: '/services#integrations' }
];

export const leadMagnets = [
  {
    title: 'Free Consultation',
    description: 'Get a 30-minute strategy session',
    href: '/contact',
    cta: 'Book Now'
  },
  {
    title: 'Newsletter',
    description: 'Weekly insights on web development',
    href: '#newsletter',
    cta: 'Subscribe'
  }
];

export const companyInfo = {
  name: 'Vibe Tech',
  owner: 'Bruce Freshwater',
  tagline: 'Your Partner in Next-Level Digital Experiences',
  email: 'freshwaterbruce@icloud.com',
  phone: '(803) 825-8860',
  year: new Date().getFullYear()
};
