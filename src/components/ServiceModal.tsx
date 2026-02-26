import { X } from "lucide-react";
import { Button } from "./ui/button";

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    title: string;
    description: string;
    details: {
      title: string;
      focusAreas: string[];
    };
  } | null;
}

export function ServiceModal({ isOpen, onClose, service }: ServiceModalProps) {
  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className="relative bg-background rounded-2xl shadow-2xl overflow-hidden" 
        style={{
          width: '80%',
          height: '80vh',
          maxHeight: '80vh'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b flex-shrink-0">
          <h2 className="text-2xl font-bold">{service.details.title}</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1" style={{height: 'calc(100% - 180px)'}}>
          <p className="text-muted-foreground mb-6 text-lg">
            {service.description}
          </p>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-primary">Focus Areas:</h3>
            <div className="grid gap-4">
              {service.details.focusAreas.map((area, index) => {
                const [title, description] = area.split(' – ');
                return (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-foreground">{title}</h4>
                      {description && (
                        <p className="text-sm text-muted-foreground mt-1">{description}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="py-8 px-6 border-t bg-muted/10 flex-shrink-0">
          <div className="flex justify-between items-center pt-8">
            <p className="text-sm text-muted-foreground">
              Ready to get started? Contact us to discuss your specific needs.
            </p>
            <Button onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}