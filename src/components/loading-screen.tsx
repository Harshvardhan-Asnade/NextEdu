import { Hexagon } from 'lucide-react';

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/95 backdrop-blur-sm animate-in fade-in duration-500">
      <div className="flex items-center gap-4 text-primary">
        <Hexagon className="h-16 w-16 animate-spin-slow" />
        <h1 className="text-5xl font-bold tracking-tight">NeoEdu</h1>
      </div>
      <p className="mt-4 text-center text-lg text-muted-foreground animate-pulse">
        Next-gen education dashboard. by harshvardhan
      </p>
    </div>
  );
}
