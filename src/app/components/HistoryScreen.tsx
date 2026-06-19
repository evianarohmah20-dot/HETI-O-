import { ChevronRight, TrendingUp, TrendingDown, Minus, Filter } from "lucide-react";

interface Props {
  onSelectReport: () => void;
}

const history = [
  {
    id: "SN-4821",
    date: "12 Jun 2026",
    score: 60,
    delta: -12,
    status: "Perlu Perhatian",
    statusColor: "text-[#F97316]",
    badge: "bg-orange-50 dark:bg-orange-500/10 border-orange-200 dark:border-orange-500/20",
    findings: ["Inflamasi Gingiva", "Plak Akumulasi"],
    nutrients: ["Vit C ⬇", "Kalsium ⬇"],
  },
  {
    id: "SN-4312",
    date: "28 Mei 2026",
    score: 72,
    delta: -13,
    status: "Cukup Baik",
    statusColor: "text-[#EAB308]",
    badge: "bg-yellow-50 dark:bg-yellow-500/10 border-yellow-200 dark:border-yellow-500/20",
    findings: ["Plak Ringan"],
    nutrients: ["Kalsium ⬇"],
  },
  {
    id: "SN-3956",
    date: "10 Mei 2026",
    score: 85,
    delta: +5,
    status: "Baik",
    statusColor: "text-[#22C55E]",
    badge: "bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/20",
    findings: ["Normal"],
    nutrients: ["Semua Normal"],
  },
  {
    id: "SN-3401",
    date: "22 Apr 2026",
    score: 80,
    delta: 0,
    status: "Baik",
    statusColor: "text-[#22C55E]",
    badge: "bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/20",
    findings: ["Normal"],
    nutrients: ["Vit D ⬇ Ringan"],
  },
];

export function HistoryScreen({ onSelectReport }: Props) {
  return (
    <div className="flex flex-col min-h-svh bg-[var(--bg-base)] dark:bg-[#080E18] pb-[100px]">
      {/* Header */}
      <div className="bg-[#0A2540] px-6 pt-12 pb-6 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full border-[24px] border-teal-500/10" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-teal-400/80 text-[11px] font-bold uppercase tracking-widest">Total Scan</p>
              <h1 className="font-['Syne'] font-extrabold text-3xl text-white">{history.length}</h1>
            </div>
            <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70">
              <Filter className="w-5 h-5" />
            </button>
          </div>

          {/* Mini trend */}
          <div className="flex items-end gap-1.5 h-10">
            {history.slice().reverse().map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-md transition-all"
                style={{
                  height: `${(h.score / 100) * 40}px`,
                  background: h.score >= 80 ? "#0D9488" : h.score >= 65 ? "#EAB308" : "#F97316",
                  opacity: i === history.length - 1 ? 1 : 0.6,
                }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[9px] text-white/30">Apr</span>
            <span className="text-[9px] text-white/30">Mei</span>
            <span className="text-[9px] text-white/30">Jun</span>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 px-4 py-4">
        {[
          { label: "Rata-Rata", value: "74", unit: "/100" },
          { label: "Terbaik",   value: "85", unit: "/100" },
          { label: "Terakhir",  value: "60", unit: "/100" },
        ].map((s, i) => (
          <div key={i} className="bg-[var(--bg-surface)] dark:bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-3 text-center shadow-[var(--shadow-card)]">
            <p className="text-[10px] text-[var(--text-muted)] mb-1">{s.label}</p>
            <p className="font-['Syne'] font-extrabold text-xl text-[var(--text-primary)]">
              {s.value}<span className="text-[10px] text-[var(--text-muted)] font-normal">{s.unit}</span>
            </p>
          </div>
        ))}
      </div>

      {/* History list */}
      <div className="px-4 space-y-3">
        <h2 className="font-['Syne'] font-bold text-base text-[var(--text-primary)] px-1">Semua Scan</h2>
        {history.map((h, i) => (
          <button
            key={i}
            onClick={onSelectReport}
            className="w-full bg-[var(--bg-surface)] dark:bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-4 shadow-[var(--shadow-card)] text-left active:scale-[0.98] transition-transform"
          >
            <div className="flex items-start gap-4">
              {/* Score circle */}
              <div className="relative w-14 h-14 shrink-0">
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 60 60">
                  <circle cx="30" cy="30" r="24" stroke={`rgba(0,0,0,0.05)`} strokeWidth="5" fill="none" className="dark:stroke-white/5" />
                  <circle
                    cx="30" cy="30" r="24"
                    stroke={h.score >= 80 ? "#0D9488" : h.score >= 65 ? "#EAB308" : "#F97316"}
                    strokeWidth="5" fill="none"
                    strokeDasharray={`${2 * Math.PI * 24}`}
                    strokeDashoffset={`${2 * Math.PI * 24 * (1 - h.score / 100)}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-['Syne'] font-extrabold text-base text-[var(--text-primary)]">{h.score}</span>
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] text-[var(--text-muted)]">{h.date}</span>
                  <div className="flex items-center gap-1">
                    {h.delta > 0
                      ? <TrendingUp className="w-3.5 h-3.5 text-[#22C55E]" />
                      : h.delta < 0
                      ? <TrendingDown className="w-3.5 h-3.5 text-[#EF4444]" />
                      : <Minus className="w-3.5 h-3.5 text-[var(--text-muted)]" />}
                    <span className={`text-[11px] font-bold ${h.delta > 0 ? "text-[#22C55E]" : h.delta < 0 ? "text-[#EF4444]" : "text-[var(--text-muted)]"}`}>
                      {h.delta > 0 ? `+${h.delta}` : h.delta === 0 ? "=" : h.delta}
                    </span>
                  </div>
                </div>

                <span className={`text-xs font-bold ${h.statusColor}`}>{h.status}</span>

                <div className="flex flex-wrap gap-1 mt-2">
                  {h.findings.map((f, j) => (
                    <span key={j} className="text-[9px] px-2 py-0.5 rounded-md bg-[var(--bg-surface2)] dark:bg-[#162030] text-[var(--text-muted)] border border-[var(--border)]">
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <ChevronRight className="w-4 h-4 text-[var(--text-muted)] shrink-0 mt-1" />
            </div>

            {/* ID */}
            <div className="mt-3 pt-3 border-t border-[var(--border)] flex items-center justify-between">
              <span className="text-[10px] text-[var(--text-muted)] font-mono">{h.id}</span>
              <span className="text-[10px] text-[var(--text-muted)]">{h.nutrients.join(" · ")}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
