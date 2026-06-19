import { useState } from "react";
import { ChevronLeft, Share2, Download, AlertTriangle, CheckCircle2, ChevronDown, ChevronUp, ChevronRight, Info, TrendingUp } from "lucide-react";

interface Props {
  onAction: () => void;
  onBack: () => void;
}

type Tab = "oral" | "nutrisi" | "rencana";

const findings = [
  {
    id: 1, title: "Inflamasi Gingiva", severity: "Tinggi",
    dot: "bg-[#EF4444]", textColor: "text-[#EF4444]",
    desc: "Kemerahan dan pembengkakan signifikan pada marginal gingiva gigi anterior atas. Konsisten dengan defisiensi kolagen terkait Vitamin C."
  },
  {
    id: 2, title: "Akumulasi Plak", severity: "Sedang",
    dot: "bg-[#F97316]", textColor: "text-[#F97316]",
    desc: "Biofilm terdeteksi di area servikal dan interproksimal. Risiko karies meningkat jika tidak ditangani dalam 14 hari."
  },
  {
    id: 3, title: "Erosi Enamel", severity: "Sedang",
    dot: "bg-[#EAB308]", textColor: "text-[#EAB308]",
    desc: "Permukaan enamel tampak translusen di gigi 11, 21, 31. Mengindikasikan demineralisasi melebihi remineralisasi — cek asupan Kalsium & Vit D."
  },
  {
    id: 4, title: "Kondisi Lidah", severity: "Normal",
    dot: "bg-[#22C55E]", textColor: "text-[#22C55E]",
    desc: "Tidak ditemukan geographic tongue atau kepucatan mengindikasikan anemia. Status Zat Besi tampak normal."
  },
];

const nutrients = [
  { name: "Vitamin C",   pct: 22,  status: "Sangat Rendah", barColor: "#EF4444", badge: "bg-red-50 dark:bg-red-500/10 text-[#EF4444]",    icon: "🍊", impact: "Langsung menyebabkan inflamasi gingiva" },
  { name: "Kalsium",     pct: 55,  status: "Sedang",        barColor: "#F97316", badge: "bg-orange-50 dark:bg-orange-500/10 text-[#F97316]", icon: "🥛", impact: "Berperan dalam kekuatan enamel" },
  { name: "Vitamin D3",  pct: 80,  status: "Cukup Baik",    barColor: "#0D9488", badge: "bg-teal-50 dark:bg-teal-500/10 text-[#0D9488]",    icon: "☀️", impact: "Mendukung penyerapan kalsium" },
  { name: "Zat Besi",    pct: 70,  status: "Normal",        barColor: "#1B4F8A", badge: "bg-blue-50 dark:bg-blue-500/10 text-[#1B4F8A]",    icon: "🥩", impact: "Status normal — lidah sehat" },
  { name: "Magnesium",   pct: 62,  status: "Cukup",         barColor: "#EAB308", badge: "bg-yellow-50 dark:bg-yellow-500/10 text-[#EAB308]", icon: "🥦", impact: "Cukup — pantau rutin" },
];

const insights = [
  { title: "Prioritas Utama", body: "Tingkatkan asupan Vitamin C minimal 500mg/hari selama 30 hari untuk membalikkan inflamasi gingiva.", urgency: "Segera", color: "#EF4444", bg: "bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20" },
  { title: "Jangka Menengah", body: "Suplemen Kalsium 600mg + Vit D3 1000 IU setiap hari untuk memperkuat enamel yang terdeteksi melemah.", urgency: "14 Hari", color: "#F97316", bg: "bg-orange-50 dark:bg-orange-500/10 border-orange-200 dark:border-orange-500/20" },
  { title: "Monitoring Rutin", body: "Scan ulang dalam 30 hari untuk memantau perkembangan. Skor minimal 75 sebelum hentikan suplemen.", urgency: "30 Hari", color: "#0D9488", bg: "bg-teal-50 dark:bg-teal-500/10 border-teal-200 dark:border-teal-500/20" },
];

export function ReportScreen({ onAction, onBack }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("oral");
  const [openAccordion, setOpenAccordion] = useState<number | null>(1);

  const tabs: { id: Tab; label: string }[] = [
    { id: "oral",    label: "Oral" },
    { id: "nutrisi", label: "Nutrisi" },
    { id: "rencana", label: "Rencana" },
  ];

  return (
    <div className="flex flex-col min-h-svh bg-[var(--bg-base)] dark:bg-[#080E18] pb-[100px]">
      {/* App Bar */}
      <div className="sticky top-0 z-50 bg-[var(--bg-surface)]/90 dark:bg-[#0F1926]/90 backdrop-blur-xl border-b border-[var(--border)] flex items-center justify-between px-4 pt-12 pb-3">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center -ml-2 text-[var(--text-primary)]">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="font-['Syne'] font-bold text-lg text-[var(--text-primary)]">Hasil Analisis</h1>
        <div className="flex items-center gap-0 -mr-2">
          <button className="w-10 h-10 flex items-center justify-center text-[var(--text-secondary)]">
            <Download className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center text-[var(--text-secondary)]">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="px-4 pt-5">
        {/* Meta */}
        <p className="text-[10px] text-[var(--text-muted)] mb-1 uppercase tracking-widest font-bold">
          12 Jun 2026 · ID: SN-4821
        </p>

        {/* Score card */}
        <div className="bg-gradient-to-br from-[#0A2540] to-[#0D9488]/60 rounded-3xl p-5 mb-5 relative overflow-hidden shadow-[var(--shadow-modal)]">
          <div className="absolute -top-16 -right-16 w-44 h-44 border-[18px] border-white/5 rounded-full" />
          <div className="flex items-center gap-5 relative z-10">
            <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="none" />
                <circle cx="50" cy="50" r="40" stroke="#F97316" strokeWidth="8" fill="none"
                  strokeDasharray="251.2" strokeDashoffset="100.48" strokeLinecap="round" />
              </svg>
              <div className="flex flex-col items-center">
                <span className="font-['Syne'] font-extrabold text-2xl text-white">60</span>
                <span className="text-[9px] text-white/40 font-bold">/100</span>
              </div>
            </div>
            <div className="flex-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 mb-2">
                <AlertTriangle className="w-3 h-3 text-orange-400" />
                <span className="text-[10px] font-bold text-orange-400">Perlu Perhatian</span>
              </div>
              <h3 className="text-white font-bold text-sm mb-0.5">Skor Oral Health</h3>
              <p className="text-white/60 text-[11px] leading-relaxed">Defisiensi Vit C terdeteksi. Tindakan dini sangat disarankan.</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-[var(--bg-surface2)] dark:bg-[#162030] border border-[var(--border)] p-1 rounded-2xl mb-5">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex-1 py-2.5 text-sm font-['Syne'] font-bold rounded-xl transition-all ${
                activeTab === t.id
                  ? "bg-[var(--bg-surface)] dark:bg-[#0F1926] text-[var(--clinical-blue)] dark:text-white shadow-sm"
                  : "text-[var(--text-muted)]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-4 flex-1 space-y-3">
        {/* ── ORAL TAB ── */}
        {activeTab === "oral" && (
          <>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1 h-5 bg-[#0D9488] rounded-full" />
              <h3 className="font-['Syne'] font-bold text-base text-[var(--text-primary)]">Temuan Klinis</h3>
            </div>
            {findings.map((f) => {
              const isOpen = openAccordion === f.id;
              return (
                <div key={f.id} className="bg-[var(--bg-surface)] dark:bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-[var(--shadow-card)]">
                  <button
                    onClick={() => setOpenAccordion(isOpen ? null : f.id)}
                    className="w-full flex items-center justify-between p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${f.dot}`} />
                      <div className="text-left">
                        <h4 className="text-sm font-bold text-[var(--text-primary)]">{f.title}</h4>
                        <span className={`text-[10px] font-bold ${f.textColor}`}>{f.severity}</span>
                      </div>
                    </div>
                    {isOpen ? <ChevronUp className="w-5 h-5 text-[var(--text-muted)] shrink-0" /> : <ChevronDown className="w-5 h-5 text-[var(--text-muted)] shrink-0" />}
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-40 pb-4 opacity-100" : "max-h-0 opacity-0"}`}>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed px-4 pl-9 border-l-2 border-[var(--border)] ml-7 mr-4">
                      {f.desc}
                    </p>
                  </div>
                </div>
              );
            })}

            <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-2xl p-4 flex gap-3 mt-2">
              <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
              <p className="text-xs text-blue-800 dark:text-blue-300/80 leading-relaxed">
                Temuan ini bersifat indikatif. Konsultasikan dengan dokter gigi untuk diagnosis definitif.
              </p>
            </div>
          </>
        )}

        {/* ── NUTRISI TAB ── */}
        {activeTab === "nutrisi" && (
          <>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1 h-5 bg-[#F97316] rounded-full" />
              <h3 className="font-['Syne'] font-bold text-base text-[var(--text-primary)]">Status Nutrisi</h3>
            </div>
            {nutrients.map((n, i) => (
              <div key={i} className="bg-[var(--bg-surface)] dark:bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-4 shadow-[var(--shadow-card)]">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{n.icon}</span>
                    <div>
                      <h4 className="font-bold text-sm text-[var(--text-primary)]">{n.name}</h4>
                      <p className="text-[10px] text-[var(--text-muted)]">{n.impact}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="font-['Syne'] font-bold text-lg" style={{ color: n.barColor }}>{n.pct}%</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${n.badge}`}>{n.status}</span>
                  </div>
                </div>
                <div className="w-full h-2 bg-[var(--bg-surface2)] dark:bg-[#162030] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${n.pct}%`, background: n.barColor }}
                  />
                </div>
              </div>
            ))}
          </>
        )}

        {/* ── RENCANA TAB ── */}
        {activeTab === "rencana" && (
          <>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1 h-5 bg-[#1B4F8A] rounded-full" />
              <h3 className="font-['Syne'] font-bold text-base text-[var(--text-primary)]">Rencana Intervensi</h3>
            </div>

            {/* Timeline */}
            <div className="space-y-3">
              {insights.map((ins, i) => (
                <div key={i} className={`border rounded-2xl p-4 ${ins.bg}`}>
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-['Syne'] font-bold text-sm text-[var(--text-primary)]">{ins.title}</h4>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full text-white shrink-0 ml-2" style={{ background: ins.color }}>
                      {ins.urgency}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{ins.body}</p>
                </div>
              ))}
            </div>

            {/* Prediction */}
            <div className="bg-[var(--bg-surface)] dark:bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-4 shadow-[var(--shadow-card)]">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-[#0D9488]" />
                <span className="font-['Syne'] font-bold text-sm text-[var(--text-primary)]">Prediksi 30 Hari</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <span className="font-['Syne'] font-extrabold text-2xl text-[#F97316]">60</span>
                  <span className="text-[10px] text-[var(--text-muted)]">Sekarang</span>
                </div>
                <div className="flex-1 h-0.5 bg-gradient-to-r from-[#F97316] to-[#0D9488] rounded-full" />
                <div className="flex flex-col items-center">
                  <span className="font-['Syne'] font-extrabold text-2xl text-[#0D9488]">80+</span>
                  <span className="text-[10px] text-[var(--text-muted)]">Prediksi</span>
                </div>
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] mt-3 leading-relaxed">
                Dengan konsistensi diet & suplemen, skor diperkirakan mencapai 78–85 dalam 30 hari.
              </p>
            </div>

            <div className="bg-[var(--success-faint)] border border-green-200 dark:border-green-500/20 rounded-2xl p-4 flex gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#22C55E] shrink-0" />
              <p className="text-xs text-green-800 dark:text-green-300/80 leading-relaxed">
                Rencana aksi lengkap tersedia — termasuk jadwal makan, suplemen, dan reminder konsultasi dokter.
              </p>
            </div>
          </>
        )}
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-[var(--bg-surface)]/90 dark:bg-[#0F1926]/90 backdrop-blur-xl border-t border-[var(--border)] p-4 pb-8 z-50">
        <button
          onClick={onAction}
          className="w-full h-14 rounded-2xl bg-[#0D9488] text-white font-['Syne'] font-bold text-base flex items-center justify-center gap-2 active:scale-[0.97] transition-transform shadow-[var(--shadow-fab)]"
        >
          Lihat Rencana Aksi
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
