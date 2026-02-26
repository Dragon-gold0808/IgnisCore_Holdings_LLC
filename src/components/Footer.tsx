import { Separator } from "./ui/separator";
import { Linkedin, Twitter, Facebook, Youtube } from "lucide-react";
import { Logo } from "./Logo";
import { toast } from "sonner";

const footerLinks = {
  Services: [
    "Cloud Migration & Digital Transformation",
    "Cybersecurity",
    "AI & Machine Learning",
    "Data Analytics",
    "Software Development",
    "IT Consulting"
  ],
  Company: [
    "About Us",
    // "Our Team",
    "Careers",
    "News & Blog",
    "Case Studies",
    "Contact"
  ],
  Resources: [
    "Documentation",
    "Support Center",
    "Community",
    "White Papers",
    "Webinars",
    "Training"
  ]
};

export function Footer() {
  return (
    <footer className="bg-muted/30 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-4">
            <Logo />
            <p className="text-muted-foreground leading-relaxed max-w-md">
              IgnisCore Holdings LLC provides strategic IT consulting, software development, 
              and comprehensive technology solutions. We help businesses gain clarity and 
              foresight in their digital transformation journey.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                <Linkedin className="h-5 w-5" />
              </div>
              <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </div>
              <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                <Facebook className="h-5 w-5" />
              </div>
              <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                <Youtube className="h-5 w-5" />
              </div>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h3 className="font-semibold">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} IgnisCore Holdings LLC. All rights reserved.
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors" onClick={(e) => { e.preventDefault(); toast.info('Cookie preferences can be managed via your browser settings or contact us for requests.'); }} aria-label="Cookie settings">Cookie Settings</a>
            <a href="#" className="hover:text-primary transition-colors">Security</a>
            <a href="#" className="hover:text-primary transition-colors">Compliance</a>
            <a href="#" className="hover:text-primary transition-colors">SLA</a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground">
            Ready to transform your business? 
            <a href="#contact" className="text-primary hover:underline ml-1">Get started today</a>
          </p>
        </div>
      </div>
    </footer>
  );
}