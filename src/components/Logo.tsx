import logoImage from '../assets/logo346x346white.jpg';
import { SITE } from '@/constants';

export function Logo({ className = "" }: { className?: string }) {
  return (
    <a 
      href={SITE.companyUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      className={`flex items-center space-x-3 hover:opacity-80 transition-opacity ${className}`}
    >
      <div className="w-10 h-10">
        <img 
          src={logoImage} 
          alt={`${SITE.companyName} Logo`}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-bold leading-tight">IgnisCore</span>
        <span className="text-xs text-muted-foreground leading-tight tracking-wide">HOLDINGS LLC</span>
        <span className="text-xs leading-tight tracking-wide italic">{SITE.tagline}</span>
      </div>
    </a>
  );
}

export function LogoCompact({ className = "" }: { className?: string }) {
  return (
    <a 
      href={SITE.companyUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      className={`flex items-center space-x-2 hover:opacity-80 transition-opacity ${className}`}
    >
      <div className="w-8 h-8">
        <img 
          src={logoImage} 
          alt={`${SITE.companyName} Logo`}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-base font-bold leading-tight">IgnisCore</span>
        <span className="text-xs text-muted-foreground leading-tight tracking-wide">HOLDINGS LLC</span>
        <span className="text-xs text-muted-foreground leading-tight tracking-wide italic">{SITE.tagline}</span>
      </div>
    </a>
  );
}