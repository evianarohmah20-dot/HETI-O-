import { useState } from "react";
import { ChevronLeft, Zap, Info } from "lucide-react";

interface Props {
  onCapture: () => void;
  onBack: () => void;
}

const areas = [
  { label: "Depan", full: "Gigi Depan & Gusi" },
  { label: "Kiri",  full: "Samping Kiri" },
  { label: "Kanan", full: "Samping Kanan" },
  { label: "Atas",  full: "Palatum Atas" },
  { label: "Lidah", full: "Permukaan Lidah" },
];

export function CameraScreen({ onCapture, onBack }: Props) {
  const [activeArea, setActiveArea] = useState("Depan");
  const [flash, setFlash] = useState(false);
  const [lightOk] = useState(true);

  const currentArea = areas.find(a => a.label === activeArea);

  return (
    <div className="fixed inset-0 bg-black z-[200] flex flex-col font-['Inter',system-ui,sans-serif] select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-b from-black/70 to-transparent z-10">
        <button
          onClick={onBack}
          className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white active:scale-90 transition-transform"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="bg-black/50 backdrop-blur-md rounded-full px-4 py-2 flex items-center gap-2 border border-white/10">
          <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <span className="text-white text-xs font-medium">Kamera Aktif</span>
        </div>

        <button
          onClick={() => setFlash(!flash)}
          className={`w-11 h-11 rounded-full backdrop-blur-md flex items-center justify-center transition-all active:scale-90 ${
            flash ? "bg-yellow-400 text-black" : "bg-white/10 text-white"
          }`}
        >
          <Zap className="w-5 h-5" fill={flash ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Viewfinder */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        {/* Simulated camera feed vignette */}
        <div className="absolute inset-0 bg-radial-[circle_at_center] from-transparent via-transparent to-black/40" />

        {/* Oval guide frame */}
        <div className="relative w-[220px] h-[280px] flex items-center justify-center">
          <div className="absolute inset-0 border-2 border-dashed border-teal-400/80 rounded-[100px]" />

          {/* Corner accents */}
          {[["top-0 left-4", "-translate-y-px"], ["top-0 right-4", "-translate-y-px -translate-x-px"], ["bottom-0 left-4", "translate-y-px"], ["bottom-0 right-4", "translate-y-px"]].map(([pos], i) => (
            <div key={i} className={`absolute ${pos} w-4 h-4 border-2 border-teal-400 rounded-sm`} />
          ))}

          {/* Scan line */}
          <div
            className="absolute left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-teal-400 to-transparent scan-line"
            style={{ top: "8%" }}
          />

          {/* Emoji placeholder for camera feed */}
          <div className="text-7xl opacity-20 select-none">😁</div>
        </div>

        {/* Instruction */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md rounded-full px-4 py-2 border border-white/10 whitespace-nowrap">
          <span className="text-white text-xs font-medium">
            Posisikan <span className="text-teal-400 font-bold">{currentArea?.full}</span>
          </span>
        </div>

        {/* Status indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
          <div className="bg-black/60 backdrop-blur-md rounded-full px-3 py-1.5 flex items-center gap-1.5 border border-white/10">
            <div className={`w-1.5 h-1.5 rounded-full ${lightOk ? "bg-green-400" : "bg-red-400"}`} />
            <span className="text-[10px] text-white">{lightOk ? "Cahaya OK" : "Kurang Cahaya"}</span>
          </div>
          <div className="bg-black/60 backdrop-blur-md rounded-full px-3 py-1.5 flex items-center gap-1.5 border border-white/10">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
            <span className="text-[10px] text-white">Terlalu Dekat</span>
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="bg-[#080E18] rounded-t-[32px] pt-5 pb-10 px-5 border-t border-white/5 flex flex-col items-center">
        {/* Area selector */}
        <div className="w-full flex gap-2 overflow-x-auto hide-scrollbar pb-5">
          {areas.map(area => (
            <button
              key={area.label}
              onClick={() => setActiveArea(area.label)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                activeArea === area.label
                  ? "bg-teal-500/20 border-[#0D9488] text-teal-400"
                  : "bg-white/5 border-white/10 text-white/50"
              }`}
            >
              {area.label}
            </button>
          ))}
        </div>

        {/* Shutter row */}
        <div className="flex items-center justify-between w-full px-6">
          <button className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/60 active:scale-90 transition-transform">
            <Info className="w-5 h-5" />
          </button>

          {/* Main shutter */}
          <button
            onClick={onCapture}
            className="w-20 h-20 rounded-full border-4 border-white/30 p-1 active:scale-90 transition-transform group"
          >
            <div className="w-full h-full rounded-full bg-white group-active:bg-teal-100 transition-colors shadow-[0_0_24px_rgba(255,255,255,0.4)]" />
          </button>

          {/* Progress dots */}
          <div className="w-12 flex flex-col items-center gap-1">
            {areas.map((a, i) => (
              <div
                key={i}
                className={`w-1.5 rounded-full transition-all ${
                  a.label === activeArea ? "h-4 bg-teal-400" : "h-1.5 bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>

        <p className="text-white/30 text-[10px] mt-5 text-center">
          Tahan stabil · Gunakan flash jika gelap
        </p>
      </div>
    </div>
  );
}
