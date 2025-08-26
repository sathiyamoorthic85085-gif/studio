import { ShieldCheck } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2" aria-label="ESEC DCA Home">
      <ShieldCheck className="h-8 w-8 text-primary" />
      <h1 className="text-2xl font-bold font-headline text-foreground tracking-tight">
        ESEC DCA
      </h1>
    </div>
  );
}
