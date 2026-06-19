import { ChevronLeft, ChevronRight, Lightbulb, Smile, Move, Focus } from "lucide-react";

interface Props {
  onStart: () => void;
  onBack: () => void;
}

const tips = [
  { icon: Lightbulb, color: "bg-yellow-500/10 text-yellow-500", title: "Cahaya Terang", desc: "Pastikan ada pencahayaan cukup di depan wajah Anda. Hindari backlight." },
  { icon: Focus,     color: "bg-teal-500/10 text-[#0D9488]",   title: "Jarak 20–30 cm", desc: "Pegang ponsel pada jarak sepanjang lengan bawah dari mulut Anda." },
  { icon: Move,      color: "bg-blue-500/10 text-blue-500",     title: "Tangan Stabil", desc: "Tahan napas sebentar saat mengambil foto agar tidak blur." },
  { icon: Smile,     color: "bg-orange-500/10 text-[#F97316]",  title: "Buka Mulut Penuh", desc: "Buka mulut selebar mungkin untuk mengekspos gigi depan dan gusi." },
];

const areas = ["Gigi Depan & Gusi", "Samping Kiri", "Samping Kanan", "Palatum Atas", "Permukaan Lidah"];

export function CaptureGuideScreen({ onStart, onBack }: Props) {
  return (
    <div className="flex flex-col min-h-svh bg-[var(--bg-base)] dark:bg-[#080E18]">
      {/* App Bar */}
      <div className="flex items-center gap-3 px-4 pt-12 pb-4">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-[var(--bg-surface)] dark:bg-[var(--bg-surface)] border border-[var(--border)] flex items-center justify-center text-[var(--text-primary)] active:scale-95 transition-transform shadow-[var(--shadow-card)]"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="font-['Syne'] font-bold text-lg text-[var(--text-primary)]">Panduan Foto</h1>
          <p className="text-[11px] text-[var(--text-muted)]">Ikuti langkah berikut untuk hasil terbaik</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-32 space-y-5">
        {/* Visual demo */}
        <div className="bg-[#0A2540] rounded-3xl overflow-hidden relative h-48 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Oval guide illustration */}
            <div className="w-36 h-44 border-2 border-dashed border-teal-400/70 rounded-[80px] relative flex items-center justify-center">
              <div className="absolute top-4 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-teal-400/80 to-transparent scan-line" />
              <div className="text-5xl">😁</div>
            </div>
          </div>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur rounded-full px-4 py-1.5">
            <span className="text-white text-[11px] font-medium">Area Deteksi AI</span>
          </div>
        </div>

        {/* Tips */}
        <div>
          <h2 className="font-['Syne'] font-bold text-base text-[var(--text-primary)] mb-3 px-1">Tips Foto Terbaik</h2>
          <div className="space-y-2.5">
            {tips.map((tip, i) => (
              <div
                key={i}
                className="bg-[var(--bg-surface)] dark:bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-4 flex items-start gap-4 shadow-[var(--shadow-card)]"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${tip.color}`}>
                  <tip.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm text-[var(--text-primary)] mb-0.5">{tip.title}</h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Area yang akan difoto */}
        <div>
          <h2 className="font-['Syne'] font-bold text-base text-[var(--text-primary)] mb-3 px-1">Area yang Akan Difoto</h2>
          <div className="bg-[var(--bg-surface)] dark:bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-4 shadow-[var(--shadow-card)]">
            <div className="space-y-2.5">
              {areas.map((area, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#0D9488]/10 border border-[#0D9488]/20 flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold text-[#0D9488]">{i + 1}</span>
                  </div>
                  <span className="text-sm text-[var(--text-secondary)]">{area}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Privacy note */}
        <div className="bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/20 rounded-2xl p-4 flex gap-3">
          <span className="text-lg shrink-0">🔒</span>
          <p className="text-xs text-teal-800 dark:text-teal-300/80 leading-relaxed">
            Foto dienkripsi end-to-end dan dihapus otomatis setelah 72 jam. Tidak ada data yang dijual ke pihak ketiga.
          </p>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-[var(--bg-surface)]/90 dark:bg-[#0F1926]/90 backdrop-blur-xl border-t border-[var(--border)] p-4 pb-8 z-50">
        <button
          onClick={onStart}
          className="w-full h-14 rounded-2xl bg-[#0D9488] text-white font-['Syne'] font-bold text-base flex items-center justify-center gap-2 active:scale-[0.97] transition-transform shadow-[var(--shadow-fab)]"
        >
          Aktifkan Kamera
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
