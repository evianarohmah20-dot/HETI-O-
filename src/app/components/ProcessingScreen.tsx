import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, ScanFace, Sparkles, BrainCircuit, ChevronRight } from "lucide-react";

export function ProcessingScreen({ onNext }: { onNext: () => void }) {
  const [pct, setPct] = useState(0);
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPct((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setDone(true);
          return 100;
        }
        return prev + 1;
      });
    }, 42);

    const t1 = setTimeout(() => setStep(2), 1100);
    const t2 = setTimeout(() => setStep(3), 2400);
    const t3 = setTimeout(() => setStep(4), 3600);

    return () => {
      clearInterval(interval);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const steps = [
    { id: 1, text: "Normalisasi pencahayaan & warna", icon: Sparkles },
    { id: 2, text: "Deteksi area gigi, gusi & lidah", icon: ScanFace },
    { id: 3, text: "Identifikasi inflamasi & plak", icon: BrainCircuit },
    { id: 4, text: "Korelasi biomarker nutrisi", icon: CheckCircle2 },
  ];

  const circumference = 2 * Math.PI * 44;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="fixed inset-0 z-[200] bg-[#080E18] flex flex-col items-center justify-between py-16 px-6 font-['Inter',system-ui,sans-serif]">
      {/* Branding top */}
      <div className="flex flex-col items-center gap-2">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500/20 to-transparent border border-teal-500/20 flex items-center justify-center">
          <ScanFace className="w-6 h-6 text-teal-400" />
        </div>
        <div className="font-['Syne'] font-extrabold text-white text-lg tracking-widest">SONRI AI</div>
      </div>

      {/* Radar center */}
      <div className="flex flex-col items-center gap-8 w-full">
        <div className="relative w-56 h-56 flex items-center justify-center">
          {/* Rotating rings */}
          <div className="absolute inset-0 rounded-full border border-teal-500/15 radar-spin-slow" />
          <div className="absolute inset-4 rounded-full border border-white/8 radar-spin-medium" />
          <div className="absolute inset-10 rounded-full border border-orange-500/15 radar-spin-fast" />

          {/* Glow dots */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_10px_rgba(20,184,166,0.8)] animate-pulse" />
          <div className="absolute bottom-10 right-8 w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.8)] animate-pulse" style={{ animationDelay: "0.5s" }} />
          <div className="absolute top-1/2 left-5 w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: "1s" }} />

          {/* SVG progress circle */}
          <svg className="absolute inset-8 -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="44" stroke="rgba(255,255,255,0.06)" strokeWidth="5" fill="none" />
            <circle
              cx="50" cy="50" r="44"
              stroke={done ? "#0D9488" : "#0D9488"}
              strokeWidth="5" fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 0.3s ease" }}
            />
          </svg>

          {/* Center display */}
          <div className="bg-white/5 border border-white/10 rounded-full w-24 h-24 flex flex-col items-center justify-center backdrop-blur-sm">
            <span className="font-['Syne'] text-3xl font-extrabold text-white">{pct}</span>
            <span className="text-[9px] text-teal-400 font-bold tracking-widest">
              {done ? "SELESAI" : "ANALISA"}
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="flex flex-col items-center gap-2">
          <h2 className="font-['Syne'] text-2xl font-bold text-white text-center">
            {done ? "Analisis Selesai!" : "Memproses Gambar"}
          </h2>
          <p className="text-white/40 text-xs text-center max-w-[240px] leading-relaxed">
            {done
              ? "Laporan kesehatan oral siap untuk Anda tinjau."
              : "Model neural sedang mengekstrak biomarker oral dari foto Anda."}
          </p>
        </div>

        {/* Steps */}
        <div className="w-full space-y-2.5">
          {steps.map((s) => {
            const isDone = s.id < step || done;
            const isActive = s.id === step && !done;
            return (
              <div
                key={s.id}
                className={`flex items-center gap-3 p-3.5 rounded-2xl transition-all duration-300 ${
                  isActive ? "bg-white/8 border border-white/12" : "bg-transparent"
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                  isDone    ? "bg-teal-500/20 text-teal-400"
                  : isActive ? "bg-orange-500/20 text-orange-400"
                  : "bg-white/5 text-white/25"
                }`}>
                  {isDone   ? <CheckCircle2 className="w-4 h-4" />
                  : isActive ? <Loader2 className="w-4 h-4 animate-spin" />
                  : <s.icon className="w-4 h-4" />}
                </div>
                <p className={`text-sm font-medium transition-all ${
                  isDone ? "text-white/40 line-through" : isActive ? "text-white" : "text-white/25"
                }`}>
                  {s.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom action */}
      {done ? (
        <button
          onClick={onNext}
          className="w-full h-14 rounded-2xl bg-[#0D9488] text-white font-['Syne'] font-bold flex items-center justify-center gap-2 active:scale-[0.97] transition-transform shadow-[var(--shadow-fab)]"
        >
          Lihat Laporan
          <ChevronRight className="w-5 h-5" />
        </button>
      ) : (
        <button
          onClick={onNext}
          className="text-white/30 text-xs font-medium active:text-white/60 transition-colors"
        >
          Lewati (Demo)
        </button>
      )}
    </div>
  );
}
