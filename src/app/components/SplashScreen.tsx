import { useEffect } from "react";
import { ShieldCheck } from "lucide-react";

export function SplashScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2400);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#0A2540] overflow-hidden">
      {/* Decorative rings */}
      <div className="absolute w-[500px] h-[500px] rounded-full border border-teal-500/10 animate-ping" style={{ animationDuration: "3s" }} />
      <div className="absolute w-[360px] h-[360px] rounded-full border border-teal-500/15" />
      <div className="absolute w-[240px] h-[240px] rounded-full border border-teal-400/20" />

      {/* Glow blobs */}
      <div className="absolute top-1/4 -left-16 w-48 h-48 bg-teal-600/20 blur-3xl rounded-full" />
      <div className="absolute bottom-1/4 -right-16 w-48 h-48 bg-orange-500/15 blur-3xl rounded-full" />

      {/* Logo */}
      <div className="relative z-10 flex flex-col items-center gap-5">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-500/30 to-[#0A2540] border border-teal-500/30 flex items-center justify-center shadow-[0_0_40px_rgba(13,148,136,0.3)]">
          <ShieldCheck className="w-10 h-10 text-teal-400" />
        </div>

        <div className="flex flex-col items-center gap-1">
          <h1 className="font-['Syne'] font-extrabold text-4xl text-white tracking-tight">
            SONRI
          </h1>
          <p className="text-xs text-teal-400 tracking-[0.25em] uppercase font-bold">
            Oralytic
          </p>
        </div>

        <p className="text-white/40 text-xs tracking-wider text-center max-w-[180px]">
          AI-Powered Oral Health &<br />Nutrition Analytics
        </p>
      </div>

      {/* Loading dots */}
      <div className="absolute bottom-16 flex items-center gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-teal-500/60"
            style={{
              animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Version */}
      <p className="absolute bottom-8 text-[10px] text-white/20 tracking-widest">
        v1.0 · Clinical Edition
      </p>
    </div>
  );
}
