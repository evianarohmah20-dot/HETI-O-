import { Sun, Moon, ChevronRight, Bell, Shield, FileText, HelpCircle, LogOut, Edit3 } from "lucide-react";

interface Props {
  isDark: boolean;
  onToggleDark: () => void;
}

const menuItems = [
  { icon: Bell, label: "Notifikasi", desc: "Pengingat suplemen & scan", chevron: true },
  { icon: Shield, label: "Privasi & Data", desc: "Kelola data kesehatan Anda", chevron: true },
  { icon: FileText, label: "Riwayat Laporan", desc: "4 laporan tersimpan", chevron: true },
  { icon: HelpCircle, label: "Bantuan & FAQ", desc: "Cara penggunaan aplikasi", chevron: true },
];

export function ProfileScreen({ isDark, onToggleDark }: Props) {
  return (
    <div className="flex flex-col min-h-svh bg-[var(--bg-base)] dark:bg-[#080E18] pb-[100px]">
      {/* Header */}
      <div className="bg-[#0A2540] px-6 pt-12 pb-8 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full border-[24px] border-teal-500/10" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500/5 blur-2xl rounded-full" />

        <div className="relative z-10 flex flex-col items-center">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-500/40 to-[#1B4F8A]/40 border border-white/20 flex items-center justify-center text-4xl mb-4 relative">
            <button className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-[#0D9488] border-2 border-[#0A2540] flex items-center justify-center text-white active:scale-90 transition-transform">
              <Edit3 className="w-3.5 h-3.5" />
            </button>
          </div>

          <h2 className="font-['Syne'] font-bold text-xl text-white mb-0.5">Rina Kusuma</h2>
          <p className="text-teal-400/80 text-[11px] mb-4">rina.kusuma@email.com</p>

          {/* Member badge */}
          <div className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-2">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
            <span className="text-white text-[11px] font-bold">Anggota Sejak April 2026</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 px-4 py-4">
        {[
          { label: "Total Scan", value: "4" },
          { label: "Streak", value: "7 hr" },
          { label: "Skor Terbaik", value: "85" },
        ].map((s, i) => (
          <div key={i} className="bg-[var(--bg-surface)] dark:bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-3 text-center shadow-[var(--shadow-card)]">
            <p className="font-['Syne'] font-extrabold text-lg text-[var(--text-primary)]">{s.value}</p>
            <p className="text-[10px] text-[var(--text-muted)]">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="px-4 space-y-4">
        {/* Health profile */}
        <div className="bg-[var(--bg-surface)] dark:bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-4 shadow-[var(--shadow-card)]">
          <h3 className="font-['Syne'] font-bold text-sm text-[var(--text-primary)] mb-3">Profil Kesehatan</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Usia", value: "28 tahun" },
              { label: "Jenis Kelamin", value: "Perempuan" },
              { label: "Keluhan Utama", value: "Gusi Berdarah" },
              { label: "Frekuensi Scan", value: "2× / bulan" },
            ].map((f, i) => (
              <div key={i} className="bg-[var(--bg-surface2)] dark:bg-[#162030] rounded-xl p-2.5">
                <p className="text-[10px] text-[var(--text-muted)] mb-0.5">{f.label}</p>
                <p className="text-xs font-semibold text-[var(--text-primary)]">{f.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dark mode toggle */}
        <div className="bg-[var(--bg-surface)] dark:bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-4 flex items-center justify-between shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--bg-surface2)] dark:bg-[#162030] border border-[var(--border)] flex items-center justify-center">
              {isDark ? <Moon className="w-5 h-5 text-[#0D9488]" /> : <Sun className="w-5 h-5 text-[#EAB308]" />}
            </div>
            <div>
              <p className="text-sm font-bold text-[var(--text-primary)]">Tema {isDark ? "Gelap" : "Terang"}</p>
              <p className="text-[10px] text-[var(--text-muted)]">Mode tampilan saat ini</p>
            </div>
          </div>
          <button
            onClick={onToggleDark}
            className={`w-12 h-6 rounded-full transition-all duration-300 relative ${isDark ? "bg-[#0D9488]" : "bg-slate-200 dark:bg-slate-700"}`}
          >
            <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all duration-300 ${isDark ? "left-6" : "left-0.5"}`} />
          </button>
        </div>

        {/* Menu items */}
        <div className="bg-[var(--bg-surface)] dark:bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-[var(--shadow-card)]">
          {menuItems.map((m, i) => (
            <button
              key={i}
              className={`w-full flex items-center gap-3 px-4 py-3.5 text-left active:bg-[var(--bg-surface2)] dark:active:bg-[#162030] transition-colors ${i < menuItems.length - 1 ? "border-b border-[var(--border)]" : ""
                }`}
            >
              <div className="w-9 h-9 rounded-xl bg-[var(--bg-surface2)] dark:bg-[#162030] border border-[var(--border)] flex items-center justify-center shrink-0">
                <m.icon className="w-4.5 h-4.5 text-[var(--text-secondary)]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-[var(--text-primary)]">{m.label}</p>
                <p className="text-[10px] text-[var(--text-muted)]">{m.desc}</p>
              </div>
              {m.chevron && <ChevronRight className="w-4 h-4 text-[var(--text-muted)]" />}
            </button>
          ))}
        </div>

        {/* App version */}
        <div className="text-center py-2">
          <p className="text-[10px] text-[var(--text-muted)]">SONRI Oralytic · v1.0.0 · Clinical Edition</p>
        </div>

        {/* Logout */}
        <button className="w-full h-12 rounded-2xl border border-[#EF4444]/30 bg-[#EF4444]/5 text-[#EF4444] font-['Syne'] font-bold text-sm flex items-center justify-center gap-2 active:scale-[0.97] transition-transform">
          <LogOut className="w-4 h-4" />
          Keluar dari Akun
        </button>
      </div>
    </div>
  );
}
