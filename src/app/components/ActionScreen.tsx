import { ChevronLeft, Pill, UtensilsCrossed, MapPin, ChevronRight, Bell } from "lucide-react";

interface Props {
  onPrev: () => void;
  onFindDentist: () => void;
}

const diets = [
  { time: "07:00", meal: "Smoothie Jeruk + Yogurt", info: "2 buah jeruk · 150g yogurt", tags: [{ l: "Vit C", c: "bg-orange-100 dark:bg-orange-500/10 text-[#F97316]" }, { l: "Kalsium", c: "bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400" }] },
  { time: "10:00", meal: "Kiwi + Almond", info: "2 buah kiwi · 30g almond", tags: [{ l: "Vit C", c: "bg-orange-100 dark:bg-orange-500/10 text-[#F97316]" }, { l: "Mg", c: "bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400" }] },
  { time: "12:00", meal: "Ikan Kakap + Brokoli", info: "200g ikan · 1 cup brokoli kukus", tags: [{ l: "Protein", c: "bg-teal-100 dark:bg-teal-500/10 text-[#0D9488]" }, { l: "Zat Besi", c: "bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400" }] },
  { time: "19:00", meal: "Tahu Sutra + Bayam", info: "300g tahu · 1 cup bayam tumis", tags: [{ l: "Kalsium", c: "bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400" }, { l: "Mg", c: "bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400" }] },
];

const supplements = [
  { name: "Vitamin C", dose: "500mg / Hari · Pagi", emoji: "🍊", color: "bg-orange-50 dark:bg-orange-500/10 text-[#F97316]", taken: false },
  { name: "Kalsium + Vit D3", dose: "600mg / Hari · Malam", emoji: "🦴", color: "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400", taken: true },
  { name: "Magnesium", dose: "300mg / Hari · Malam", emoji: "💊", color: "bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400", taken: false },
];

export function ActionScreen({ onPrev, onFindDentist }: Props) {
  return (
    <div className="flex flex-col min-h-svh bg-[var(--bg-base)] dark:bg-[#080E18] pb-[130px]">
      {/* App Bar */}
      <div className="sticky top-0 z-50 bg-[var(--bg-surface)]/90 dark:bg-[#0F1926]/90 backdrop-blur-xl border-b border-[var(--border)] flex items-center justify-between px-4 pt-12 pb-3">
        <button onClick={onPrev} className="w-10 h-10 flex items-center justify-center -ml-2 text-[var(--text-primary)]">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="font-['Syne'] font-bold text-lg text-[var(--text-primary)]">Rencana Aksi</h1>
        <button className="w-10 h-10 flex items-center justify-center text-[var(--text-secondary)]">
          <Bell className="w-5 h-5" />
        </button>
      </div>

      <div className="px-4 pt-5 space-y-5">
        {/* Hero */}
        <div className="bg-[#0A2540] rounded-3xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-28 h-28 bg-teal-500/20 blur-2xl rounded-full" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-500/20 border border-teal-500/30 mb-3">
              <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider">30 Hari · Personal</span>
            </div>
            <h2 className="font-['Syne'] text-xl font-bold text-white mb-2">Rencana Pemulihan Gingiva</h2>
            <p className="text-white/60 text-xs leading-relaxed max-w-[240px]">
              Disesuaikan untuk memperbaiki gingivitis dan memperkuat enamel berdasarkan hasil analisis AI Anda.
            </p>
          </div>
        </div>

        {/* Diet Plan */}
        <div>
          <div className="flex items-center gap-2 mb-3 px-1">
            <div className="w-1 h-5 bg-green-500 rounded-full" />
            <h3 className="font-['Syne'] font-bold text-base text-[var(--text-primary)]">Jadwal Makan Hari Ini</h3>
          </div>

          <div className="bg-[var(--bg-surface)] dark:bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-4 shadow-[var(--shadow-card)]">
            <div className="flex items-center gap-2 pb-3 mb-3 border-b border-[var(--border)]">
              <UtensilsCrossed className="w-4 h-4 text-[var(--text-muted)]" />
              <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Senin · 19 Jun 2026</span>
            </div>
            <div className="space-y-0">
              {diets.map((d, i) => (
                <div key={i} className="flex gap-4 relative pb-5 last:pb-0">
                  {i !== diets.length - 1 && (
                    <div className="absolute top-6 left-[19px] w-px h-full bg-[var(--border)]" />
                  )}
                  <div className="w-10 h-10 rounded-full bg-[var(--bg-surface2)] dark:bg-[#162030] border border-[var(--border)] flex items-center justify-center text-[10px] font-bold text-[var(--text-secondary)] shrink-0 z-10">
                    {d.time}
                  </div>
                  <div className="flex-1 pt-1">
                    <h4 className="text-sm font-bold text-[var(--text-primary)] mb-0.5">{d.meal}</h4>
                    <p className="text-[11px] text-[var(--text-muted)] mb-2">{d.info}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {d.tags.map((t, idx) => (
                        <span key={idx} className={`text-[9px] font-bold px-2 py-0.5 rounded-md ${t.c}`}>
                          +{t.l}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Supplements */}
        <div>
          <div className="flex items-center gap-2 mb-3 px-1">
            <div className="w-1 h-5 bg-[#1B4F8A] rounded-full" />
            <h3 className="font-['Syne'] font-bold text-base text-[var(--text-primary)]">Suplemen Hari Ini</h3>
          </div>

          <div className="space-y-2.5">
            {supplements.map((s, i) => (
              <div key={i} className="bg-[var(--bg-surface)] dark:bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-4 flex items-center gap-4 shadow-[var(--shadow-card)]">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-xl ${s.color}`}>
                  {s.emoji}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-[var(--text-primary)] mb-0.5">{s.name}</h4>
                  <p className="text-[10px] text-[var(--text-muted)]">{s.dose}</p>
                </div>
                <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                  s.taken
                    ? "bg-[#0D9488] border-[#0D9488]"
                    : "border-[var(--border)] bg-transparent"
                }`}>
                  {s.taken && <span className="text-white text-xs font-bold">✓</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Scan */}
        <div className="bg-[var(--bg-surface2)] dark:bg-[#162030] border border-[var(--border)] rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">Scan Berikutnya</p>
              <p className="font-['Syne'] font-bold text-[var(--text-primary)]">19 Jul 2026</p>
              <p className="text-xs text-[var(--text-secondary)]">30 hari dari sekarang</p>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-[#0D9488]/10 border border-[#0D9488]/20 flex flex-col items-center justify-center">
              <span className="font-['Syne'] font-extrabold text-xl text-[#0D9488]">30</span>
              <span className="text-[9px] text-[#0D9488]/70 font-bold">HARI</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Actions */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-[var(--bg-surface)]/90 dark:bg-[#0F1926]/90 backdrop-blur-xl border-t border-[var(--border)] p-4 pb-8 z-50 flex flex-col gap-2.5">
        <button
          onClick={onFindDentist}
          className="w-full h-14 rounded-2xl bg-[#0A2540] dark:bg-[#0D9488] text-white font-['Syne'] font-bold text-sm flex items-center justify-center gap-2 active:scale-[0.97] transition-transform"
        >
          <MapPin className="w-4 h-4" />
          Cari Dokter Gigi Terdekat
          <ChevronRight className="w-4 h-4" />
        </button>
        <button className="w-full h-12 rounded-2xl bg-[var(--bg-surface2)] dark:bg-[#162030] text-[var(--text-primary)] border border-[var(--border)] font-['Syne'] font-bold text-sm flex items-center justify-center gap-2 active:scale-[0.97] transition-transform">
          <Pill className="w-4 h-4" />
          Tanya Ahli Gizi Online
        </button>
      </div>
    </div>
  );
}
