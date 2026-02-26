import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Mail, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import emailjs from '@emailjs/browser';
import { SITE } from '@/constants';

/** Escape HTML to prevent injection in email body. */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (ch) => map[ch] ?? ch);
}

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    details: SITE.contactEmail,
    description: "Send us an email anytime"
  },
  // {
  //   icon: Phone,
  //   title: "Call Us",
  //   details: "+1 (555) 123-4567",
  //   description: "Mon-Fri 9am-6pm EST"
  // },
  // {
  //   icon: MapPin,
  //   title: "Visit Us",
  //   details: "123 Business Ave, Tech City, TC 12345",
  //   description: "Our headquarters"
  // },
  {
    icon: Clock,
    title: "Business Hours",
    details: "24/7 Support Available",
    description: "Emergency support included"
  }
];

export function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
    privacy: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize EmailJS
  useEffect(() => {
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
      emailjs.init(publicKey);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, service: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message || !formData.privacy) {
      toast.error('Please fill in all required fields and accept the privacy policy.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Method 1: Try EmailJS if configured
      const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (serviceID && templateID && publicKey) {
        const templateParams = {
          to_email: SITE.contactEmail,
          from_name: `${formData.firstName} ${formData.lastName}`,
          from_email: formData.email,
          phone: formData.phone || 'Not provided',
          company: formData.company || 'Not provided',
          service: formData.service || 'Not specified',
          message: formData.message,
          reply_to: formData.email
        };

        await emailjs.send(serviceID, templateID, templateParams, publicKey);

        toast.success('Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.');
        
        // Clear form on success
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          message: '',
          privacy: false
        });
        
        return;
      }

      // Method 2: Backend API fallback
      const apiUrl = import.meta.env.VITE_API_URL || '/api';
      const safe = {
        name: escapeHtml(`${formData.firstName} ${formData.lastName}`),
        email: escapeHtml(formData.email),
        phone: escapeHtml(formData.phone || 'Not provided'),
        company: escapeHtml(formData.company || 'Not provided'),
        service: escapeHtml(formData.service || 'Not specified'),
        message: escapeHtml(formData.message).replace(/\n/g, '<br>'),
      };

      const emailData = {
        to: SITE.contactEmail,
        subject: `Contact Form Submission from ${formData.firstName} ${formData.lastName}`,
        html: `
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> ${safe.name}</p>
            <p><strong>Email:</strong> ${safe.email}</p>
            <p><strong>Phone:</strong> ${safe.phone}</p>
            <p><strong>Company:</strong> ${safe.company}</p>
            <p><strong>Service Interest:</strong> ${safe.service}</p>
            <h4>Message:</h4>
            <p>${safe.message}</p>
            <hr>
            <p><em>This message was sent from the IgnisCore Holdings LLC contact form.</em></p>
          `,
        replyTo: formData.email
      };

      const response = await fetch(`${apiUrl}/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData)
      });

      if (!response.ok) {
        let message = 'Unable to send message. Please try again later.';
        try {
          const contentType = response.headers.get('content-type');
          const body = contentType?.includes('application/json')
            ? await response.json()
            : await response.text();
          if (typeof body === 'object' && body?.message && typeof body.message === 'string') {
            message = body.message.slice(0, 200);
          } else if (typeof body === 'string' && body.length) {
            message = body.slice(0, 200);
          }
        } catch {
          // use default message
        }
        throw new Error(message);
      }

      toast.success('Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        message: '',
        privacy: false
      });
      return;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to send email. Please try again or contact us directly.';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full">
            <span className="text-sm text-primary">Contact Us</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get in touch with our experts to discuss your IT needs and discover how 
            we can help accelerate your digital transformation journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="firstName" className="text-sm font-medium">
                          First Name *
                        </label>
                        <Input 
                          id="firstName" 
                          placeholder="John" 
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="lastName" className="text-sm font-medium">
                          Last Name *
                        </label>
                        <Input 
                          id="lastName" 
                          placeholder="Doe" 
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email Address *
                        </label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="john@company.com" 
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium">
                          Phone Number
                        </label>
                        <Input 
                          id="phone" 
                          type="tel" 
                          placeholder="+1 (555) 123-4567" 
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="company" className="text-sm font-medium">
                          Company Name
                        </label>
                        <Input 
                          id="company" 
                          placeholder="Your Company" 
                          value={formData.company}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="service" className="text-sm font-medium">
                          Service Interest
                        </label>
                        <Select value={formData.service} onValueChange={handleSelectChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cloud">Cloud Migration</SelectItem>
                            <SelectItem value="security">Cybersecurity</SelectItem>
                            <SelectItem value="ai">AI & Machine Learning</SelectItem>
                            <SelectItem value="analytics">Data Analytics</SelectItem>
                            <SelectItem value="software">Software Development</SelectItem>
                            <SelectItem value="digital">Digital Transformation</SelectItem>
                            <SelectItem value="consulting">IT Consulting</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message *
                      </label>
                      <Textarea 
                        id="message" 
                        placeholder="Tell us about your project requirements..."
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="flex items-start space-x-2">
                      <input 
                        type="checkbox" 
                        id="privacy" 
                        className="mt-1" 
                        checked={formData.privacy}
                        onChange={handleInputChange}
                        required
                      />
                      <label htmlFor="privacy" className="text-sm text-muted-foreground">
                        I agree to the privacy policy and terms of service. *
                      </label>
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full md:w-auto" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <Card key={index} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <info.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold">{info.title}</h3>
                    <p className="font-medium">{info.details}</p>
                    <p className="text-sm text-muted-foreground">{info.description}</p>
                  </div>
                </div>
              </Card>
            ))}

            <Card className="p-6 bg-primary text-primary-foreground">
              <h3 className="font-semibold mb-2">Get a Free Consultation</h3>
              <p className="text-sm mb-4 opacity-90">
                Schedule a 30-minute call with our experts to discuss your IT challenges and opportunities.
              </p>
              <Button 
                variant="secondary" 
                size="sm" 
                className="w-full"
                onClick={() => window.open(SITE.calendlyUrl, '_blank')}
              >
                Book Consultation
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}