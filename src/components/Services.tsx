import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Cloud, Shield, BrainCircuit, BarChart2, Code, Users } from "lucide-react";
import { ServiceModal } from "./ServiceModal";
import { useState } from "react";

const services = [
  {
    icon: Shield,
    title: "Cybersecurity",
    description: "Protect your business with enterprise-grade security solutions and 24/7 monitoring.",
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwbmV0d29yayUyMHByb3RlY3Rpb258ZW58MXx8fHwxNzU4NTc3MDc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    details: {
      title: "Cybersecurity",
      focusAreas: [
        "Risk Assessment & Compliance – Conducting security posture reviews, gap assessments, and ensuring compliance with frameworks (ISO 27001, NIST, HIPAA, etc.).",
        "Security Architecture & Zero Trust – Designing secure architectures, network segmentation, and zero-trust implementations.",
        "Application Security – Secure SDLC, code review, penetration testing, and threat modeling.",
        "Cloud & Container Security – Hardening cloud workloads, Kubernetes/Docker security, and IAM controls.",
        "Incident Response & Forensics – Preparing, detecting, and responding to breaches; digital forensics investigations.",
        "Security Awareness & Training – Educating staff on phishing, social engineering, and secure practices."
      ]
    }
  },
  {
    icon: BrainCircuit,
    title: "AI & Machine Learning",
    description: "Leverage artificial intelligence to automate processes and gain valuable business insights.",
    image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    details: {
      title: "AI & Machine Learning",
      focusAreas: [
        "AI Strategy & Roadmapping – Assessing business needs, identifying use cases, and creating an AI adoption roadmap.",
        "Model Development & Deployment – Building custom ML/AI models, fine-tuning existing ones, and deploying them at scale.",
        "Responsible & Ethical AI – Bias detection, fairness, explainability, and regulatory compliance in AI systems.",
        "AI Security & Privacy – Protecting AI models, data pipelines, and outputs from adversarial attacks or data leakage.",
        "Automation & Intelligent Workflows – Implementing AI-driven process automation, chatbots, and decision support systems.",
        "AI Infrastructure Optimization – Selecting cloud/on-prem infrastructure, MLOps, and cost optimization."
      ]
    }
  },
  {
    icon: BarChart2,
    title: "Data Analytics",
    description: "Transform raw data into actionable insights with advanced analytics and visualization tools.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    details: {
      title: "Data Analytics",
      focusAreas: [
        "Data Governance & Compliance – Creating policies for data ownership, privacy, security, and regulatory adherence (GDPR, CCPA, HIPAA).",
        "Data Architecture & Warehousing – Designing data lakes, warehouses, and pipelines to handle structured/unstructured data.",
        "Data Quality & Master Data Management (MDM) – Improving accuracy, consistency, and deduplication of enterprise data.",
        "ETL/ELT & Integration – Optimizing ingestion, transformation, and distribution of data between systems.",
        "Analytics & BI Enablement – Helping organizations unlock insights with dashboards, predictive analytics, and self-service BI.",
        "Data Security & Access Controls – Protecting sensitive data with encryption, masking, and role-based access."
      ]
    }
  },
  {
    icon: Code,
    title: "Software Development",
    description: "Custom software solutions built with modern technologies to meet your specific business requirements.",
    image: "https://images.unsplash.com/photo-1625459201773-9b2386f53ca2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGRldmVsb3BtZW50JTIwY29kaW5nJTIwcHJvZ3JhbW1pbmd8ZW58MXx8fHwxNzU4NTYwMDQ3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    details: {
      title: "Software Development",
      focusAreas: [
        "Requirements Gathering & Solution Design – Helping clients define product vision, user stories, and technical architecture.",
        "Agile & DevOps Transformation – Coaching teams on Scrum/Kanban, CI/CD pipelines, and DevSecOps practices.",
        "Code Quality & Modernization – Auditing and refactoring legacy systems, improving maintainability, and introducing best practices.",
        "Cloud-native & Microservices Architecture – Designing scalable applications using microservices and container orchestration.",
        "Integration & API Strategy – Building secure, efficient APIs and integrating third-party services.",
        "Performance & Scalability Optimization – Profiling, tuning, and load testing to meet growth demands."
      ]
    }
  },
  {
    icon: Users,
    title: "IT Consulting",
    description: "Strategic IT guidance from certified experts to optimize your technology investments.",
    image: "https://images.unsplash.com/photo-1758518731706-be5d5230e5a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHRlYW0lMjBtZWV0aW5nfGVufDF8fHx8MTc1ODUzMzg5M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    details: {
      title: "IT Consulting",
      focusAreas: [
        "IT Strategy & Transformation – Aligning IT initiatives with business goals, technology roadmaps, and digital transformation plans.",
        "Infrastructure & Network Design – Architecting reliable, scalable, and secure on-premises, cloud, and hybrid infrastructures.",
        "Systems Integration & Interoperability – Ensuring seamless connectivity between enterprise applications, platforms, and legacy systems.",
        "IT Operations & Service Management – Implementing ITIL, incident/change management, and optimizing IT service delivery.",
        "Business Continuity & Disaster Recovery (BC/DR) – Designing resilient systems, backup strategies, and recovery plans to minimize downtime.",
        "IT Governance, Risk & Compliance – Establishing policies, controls, and audits to meet regulatory and organizational standards."
      ]
    }
  },
  {
    icon: Cloud,
    title: "Cloud Migration & Digital Transformation",
    description: "Seamlessly migrate your infrastructure to the cloud and modernize your business processes with cutting-edge digital solutions.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    details: {
      title: "Cloud Migration & Digital Transformation",
      focusAreas: [
        "Cloud Strategy & Assessment – Evaluating current infrastructure, defining migration strategies, and selecting optimal cloud platforms (AWS, Azure, GCP).",
        "Application Modernization – Refactoring legacy applications, containerization, and cloud-native development.",
        "Infrastructure Migration – Lift-and-shift, re-platforming, and hybrid cloud implementations with minimal downtime.",
        "Security & Compliance in the Cloud – Implementing cloud security best practices, identity management, and regulatory compliance.",
        "Cost Optimization & FinOps – Monitoring, analyzing, and optimizing cloud spending through automation and governance.",
        "Business Process Digitization – Automating workflows, implementing digital tools, and improving operational efficiency."
      ]
    }
  }
];

export function Services() {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (service: typeof services[0]) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  return (
    <>
      <section id="services" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full">
              <span className="text-sm text-primary">Our Services</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              Comprehensive IT Solutions for Modern Businesses
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From cloud migration to cybersecurity, we provide end-to-end technology solutions 
              that drive innovation and business growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <button 
                    onClick={() => openModal(service)}
                    className="text-sm text-primary hover:underline cursor-pointer transition-colors"
                  >
                    Learn more →
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <ServiceModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        service={selectedService}
      />
    </>
  );
}