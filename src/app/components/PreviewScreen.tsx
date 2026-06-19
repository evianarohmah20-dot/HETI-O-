import { ChevronLeft, RotateCcw, ChevronRight, CheckCircle2, ZoomIn } from "lucide-react";

interface Props {
  onAnalyze: () => void;
  onRetake: () => void;
  onBack: () => void;
}

export function PreviewScreen({ onAnalyze, onRetake, onBack }: Props) {
  return (
    <div className="fixed inset-0 bg-[#080E18] z-[200] flex flex-col font-['Inter',system-ui,sans-serif]">
      {/* Top bar */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-b from-black/60 to-transparent z-10">
        <button
          onClick={onBack}
          className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white active:scale-90 transition-transform"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex flex-col items-center">
          <span className="text-white text-sm font-bold">Pratinjau Foto</span>
          <span className="text-white/50 text-[11px]">Gigi Depan & Gusi</span>
        </div>
        <button className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white/70 active:scale-90 transition-transform">
          <ZoomIn className="w-5 h-5" />
        </button>
      </div>

      {/* Photo preview area */}
      <div className="flex-1 relative flex items-center justify-center px-6">
        {/* Mock photo frame */}
        <div className="w-full max-w-[300px] aspect-[3/4] rounded-3xl overflow-hidden border-2 border-white/10 relative bg-gradient-to-b from-[#0F1926] to-[#162030] shadow-2xl">
          {/* Simulated oral photo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-8xl opacity-40 select-none">😁</div>
          </div>

          {/* AI analysis overlay markers */}
          <div className="absolute top-[30%] left-[35%] w-3 h-3 rounded-full bg-red-500 border-2 border-white shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse" />
          <div className="absolute top-[42%] right-[28%] w-3 h-3 rounded-full bg-orange-500 border-2 border-white shadow-[0_0_8px_rgba(249,115,22,0.8)] animate-pulse" style={{ animationDelay: "0.4s" }} />
          <div className="absolute bottom-[35%] left-[25%] w-2.5 h-2.5 rounded-full bg-teal-400 border-2 border-white shadow-[0_0_8px_rgba(20,184,166,0.8)] animate-pulse" style={{ animationDelay: "0.8s" }} />

          {/* Quality badge */}
          <div className="absolute top-3 right-3 bg-green-500/90 backdrop-blur rounded-full px-2.5 py-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-white" />
            <span className="text-white text-[10px] font-bold">Kualitas Baik</span>
          </div>

          {/* Bottom gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#080E18] to-transparent" />
        </div>

        {/* Markers legend */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-3">
          {[
            { color: "bg-red-500", label: "Inflamasi" },
            { color: "bg-orange-500", label: "Plak" },
            { color: "bg-teal-400", label: "Normal" },
          ].map((m, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${m.color}`} />
              <span className="text-[10px] text-white/60">{m.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quality metrics */}
      <div className="px-6 py-4">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex gap-4">
          {[
            { label: "Fokus", val: "Tajam", ok: true },
            { label: "Cahaya", val: "Baik", ok: true },
            { label: "Jarak", val: "Pas", ok: true },
          ].map((m, i) => (
            <div key={i} className="flex-1 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <div className={`w-1.5 h-1.5 rounded-full ${m.ok ? "bg-green-400" : "bg-red-400"}`} />
                <span className="text-[10px] text-white/50 uppercase tracking-wider font-semibold">{m.label}</span>
              </div>
              <span className="text-xs font-bold text-white">{m.val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom actions */}
      <div className="px-6 pb-10 flex gap-3">
        <button
          onClick={onRetake}
          className="flex-1 h-14 rounded-2xl bg-white/10 border border-white/10 text-white font-['Syne'] font-bold text-sm flex items-center justify-center gap-2 active:scale-[0.97] transition-transform"
        >
          <RotateCcw className="w-4 h-4" />
          Ambil Ulang
        </button>
        <button
          onClick={onAnalyze}
          className="flex-[2] h-14 rounded-2xl bg-[#0D9488] text-white font-['Syne'] font-bold text-sm flex items-center justify-center gap-2 active:scale-[0.97] transition-transform shadow-[var(--shadow-fab)]"
        >
          Analisis Foto Ini
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
