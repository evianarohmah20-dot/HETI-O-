import { Bell, Camera, ChevronRight, AlertTriangle, TrendingUp, Clock, Sparkles } from "lucide-react";

interface Props {
  onScan: () => void;
  onReport: () => void;
}

const recentScans = [
  { date: "12 Jun 2026", score: 60, status: "Perlu Perhatian", statusColor: "text-[#F97316]", bg: "bg-orange-50 dark:bg-orange-500/10", border: "border-orange-200 dark:border-orange-500/20" },
  { date: "28 Mei 2026", score: 72, status: "Cukup Baik", statusColor: "text-[#EAB308]", bg: "bg-yellow-50 dark:bg-yellow-500/10", border: "border-yellow-200 dark:border-yellow-500/20" },
  { date: "10 Mei 2026", score: 85, status: "Baik", statusColor: "text-[#22C55E]", bg: "bg-green-50 dark:bg-green-500/10", border: "border-green-200 dark:border-green-500/20" },
];

const quickTips = [
  { icon: "🦷", text: "Sikat gigi 2×/hari setelah makan" },
  { icon: "💧", text: "Minum 8 gelas air per hari" },
  { icon: "🥦", text: "Konsumsi Vit C: 90mg/hari" },
];

export function HomeScreen({ onScan, onReport }: Props) {
  const score = 60;
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col min-h-svh bg-[var(--bg-base)] dark:bg-[#080E18] pb-[100px]">
      {/* Header */}
      <div className="bg-[#0A2540] px-6 pt-12 pb-8 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full border-[32px] border-teal-500/10" />
        <div className="absolute -bottom-10 left-8 w-32 h-32 rounded-full border-[20px] border-orange-500/10" />

        <div className="relative z-10">
          {/* Top row */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500/40 to-transparent border border-teal-500/30 flex items-center justify-center">
                <span className="text-lg">👩‍⚕️</span>
              </div>
              <div>
                <p className="text-white/60 text-[11px] tracking-widest uppercase font-semibold">Selamat Datang</p>
                <h2 className="font-['Syne'] font-bold text-white text-lg leading-tight">Rina Kusuma</h2>
              </div>
            </div>
            <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 relative">
              <Bell className="w-5 h-5" />
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#F97316] border border-[#0A2540]" />
            </button>
          </div>

          {/* Score Card */}
          <div className="bg-white/10 backdrop-blur rounded-2xl p-5 border border-white/10">
            <div className="flex items-center gap-5">
              {/* Circular score */}
              <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.1)" strokeWidth="9" fill="none" />
                  <circle
                    cx="50" cy="50" r="40"
                    stroke="#F97316" strokeWidth="9" fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="flex flex-col items-center">
                  <span className="font-['Syne'] font-extrabold text-2xl text-white leading-none">{score}</span>
                  <span className="text-[9px] text-white/40 font-bold">/100</span>
                </div>
              </div>

              <div className="flex-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 mb-2">
                  <AlertTriangle className="w-3 h-3 text-orange-400" />
                  <span className="text-[10px] font-bold text-orange-400">Perlu Perhatian</span>
                </div>
                <h3 className="text-white font-bold text-sm mb-1">Skor Kesehatan Oral</h3>
                <p className="text-white/60 text-[11px] leading-relaxed">Defisiensi Vit C terdeteksi. Scan terakhir: 12 Jun</p>
                <button onClick={onReport} className="mt-2.5 text-[11px] text-teal-400 font-bold flex items-center gap-1">
                  Lihat Laporan <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-5 space-y-5">
        {/* Quick actions */}
        <div>
          <h3 className="font-['Syne'] font-bold text-base text-[var(--text-primary)] mb-3 px-1">Aksi Cepat</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: "📊", label: "Laporan", desc: "Terakhir · 12 Jun", action: onReport },
              { icon: "🕒", label: "Riwayat", desc: "3 scan tersimpan", action: undefined },
              { icon: "💊", label: "Suplemen", desc: "2 aktif hari ini", action: undefined },
            ].map((item, i) => (
              <button
                key={i}
                onClick={item.action}
                className="bg-[var(--bg-surface)] dark:bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-3.5 flex flex-col items-center gap-1.5 shadow-[var(--shadow-card)] active:scale-95 transition-transform text-center"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-xs font-bold text-[var(--text-primary)]">{item.label}</span>
                <span className="text-[9px] text-[var(--text-muted)]">{item.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Progress trend */}
        <div className="bg-[var(--bg-surface)] dark:bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-4 shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#0D9488]" />
              <span className="font-['Syne'] font-bold text-sm text-[var(--text-primary)]">Tren 3 Bulan</span>
            </div>
            <span className="text-[10px] text-[var(--text-muted)]">Mei – Jun 2026</span>
          </div>
          {/* Mini bar chart */}
          <div className="flex items-end gap-2 h-16">
            {[85, 72, 60].map((s, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-lg transition-all"
                  style={{
                    height: `${(s / 100) * 56}px`,
                    background: i === 2 ? "#F97316" : i === 1 ? "#EAB308" : "#0D9488",
                    opacity: i === 2 ? 1 : 0.6,
                  }}
                />
                <span className="text-[9px] text-[var(--text-muted)] font-medium">{["Mei", "Jun·1", "Jun·2"][i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent scans */}
        <div>
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="font-['Syne'] font-bold text-base text-[var(--text-primary)]">Riwayat Scan</h3>
            <button className="text-[11px] text-[#0D9488] font-semibold">Lihat Semua</button>
          </div>
          <div className="space-y-2.5">
            {recentScans.map((scan, i) => (
              <button
                key={i}
                onClick={onReport}
                className="w-full bg-[var(--bg-surface)] dark:bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-4 flex items-center gap-4 shadow-[var(--shadow-card)] active:scale-[0.98] transition-transform"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--bg-surface2)] dark:bg-[#162030] flex items-center justify-center shrink-0">
                  <span className="font-['Syne'] font-extrabold text-base text-[var(--text-primary)]">{scan.score}</span>
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] text-[var(--text-muted)] flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {scan.date}
                    </span>
                  </div>
                  <span className={`text-xs font-bold ${scan.statusColor}`}>{scan.status}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[var(--text-muted)]" />
              </button>
            ))}
          </div>
        </div>

        {/* Daily tips */}
        <div className="bg-gradient-to-br from-[#0A2540] to-[#0D9488]/80 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-teal-300" />
            <span className="font-['Syne'] font-bold text-sm text-white">Tips Harian AI</span>
          </div>
          <div className="space-y-2.5">
            {quickTips.map((tip, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-base shrink-0">{tip.icon}</span>
                <span className="text-xs text-white/80">{tip.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAB: Scan Baru */}
      <div className="fixed bottom-[80px] left-1/2 -translate-x-1/2 z-[90] w-full max-w-[390px] px-6 pointer-events-none">
        <button
          onClick={onScan}
          className="w-full h-14 rounded-2xl bg-[#0D9488] text-white font-['Syne'] font-bold flex items-center justify-center gap-2.5 fab-pulse pointer-events-auto active:scale-[0.97] transition-transform shadow-[0_8px_24px_rgba(13,148,136,0.4)]"
        >
          <Camera className="w-5 h-5" />
          Mulai Scan Baru
        </button>
      </div>
    </div>
  );
}
