import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Award, Users, Target, Zap } from "lucide-react";

const stats = [
  { icon: Users, label: "Clients Served", value: "100+" },
  { icon: Award, label: "Years Experience", value: "9+" },
  { icon: Target, label: "Success Rate", value: "99%" },
  { icon: Zap, label: "Projects Delivered", value: "500+" }
];

export function About() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full">
                <span className="text-sm text-primary">About Us</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                Clarity and Vision for 
                <span className="text-primary block">Your Digital Future</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                IgnisCore Holdings LLC provides strategic IT guidance with 
                unparalleled clarity and foresight. We help businesses see beyond today's challenges 
                to build tomorrow's solutions with confidence and precision.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold">Industry Expertise</h4>
                  <p className="text-muted-foreground">Deep knowledge across healthcare, finance, retail, and manufacturing sectors.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold">Strategic Foresight</h4>
                  <p className="text-muted-foreground">We anticipate future trends and help you prepare with forward-thinking technology strategies.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold">Client-Centric Approach</h4>
                  <p className="text-muted-foreground">Every solution is tailored to meet your unique business requirements and goals.</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center p-4">
                  <CardContent className="p-0 space-y-2">
                    <stat.icon className="h-8 w-8 text-primary mx-auto" />
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="Digital vision and clarity for business future"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
            </div>

            {/* Mission statement overlay */}
            <div className="absolute bottom-8 left-8 right-8 bg-background/95 backdrop-blur-sm rounded-lg p-6 border">
              <h4 className="font-semibold mb-2">Our Mission</h4>
              <p className="text-sm text-muted-foreground">
                To provide businesses with the clarity and foresight needed to navigate the digital landscape and achieve sustainable technological excellence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}