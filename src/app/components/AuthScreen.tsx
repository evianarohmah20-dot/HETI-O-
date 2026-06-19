import { useState } from "react";
import { Lock, ShieldCheck, Zap, Mail, Eye, EyeOff, ChevronRight } from "lucide-react";

interface Props {
  defaultTab?: "login" | "register";
  onLogin: () => void;
  onSwitchToRegister: () => void;
}

const chips = [
  "Gusi berdarah", "Gigi sensitif", "Mulut kering",
  "Gigi berlubang", "Bau mulut", "Lidah berwarna", "Tidak ada keluhan"
];

export function AuthScreen({ defaultTab = "login", onLogin, onSwitchToRegister }: Props) {
  const [tab, setTab] = useState<"login" | "register">(defaultTab);
  const [showPass, setShowPass] = useState(false);
  const [activeChips, setActiveChips] = useState<Record<string, boolean>>({
    "Gusi berdarah": true,
    "Gigi berlubang": true,
  });

  const toggleChip = (label: string) =>
    setActiveChips((prev) => ({ ...prev, [label]: !prev[label] }));

  const handlePrimary = () => {
    if (tab === "login") onLogin();
    else onSwitchToRegister(); // goes to onboarding-1
  };

  return (
    <div className="flex flex-col min-h-svh bg-[var(--bg-base)] dark:bg-[#080E18]">
      {/* Hero */}
      <div className="bg-[#0A2540] dark:bg-[#080E18] rounded-b-[40px] px-6 pt-14 pb-10 shadow-[0_12px_40px_rgba(10,37,64,0.2)] relative overflow-hidden shrink-0">
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full border-[36px] border-teal-500/8" />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full border-[28px] border-orange-500/8" />

        <div className="relative z-10">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-500/30 to-[#0A2540] flex items-center justify-center border border-teal-500/30 shadow-[0_0_20px_rgba(13,148,136,0.2)]">
              <ShieldCheck className="text-teal-400 w-6 h-6" />
            </div>
            <div>
              <h1 className="font-['Syne'] font-extrabold text-white text-xl leading-none">SONRI</h1>
              <p className="text-[10px] text-teal-400 tracking-[0.15em] uppercase font-bold mt-0.5">Oralytic</p>
            </div>
          </div>

          <h2 className="font-['Syne'] font-extrabold text-[28px] text-white leading-tight mb-4">
            {tab === "login" ? (
              <>Selamat<br />Kembali </>
            ) : (
              <>Mulai Perjalanan<br /><span className="text-teal-400">Senyum Sehat</span></>
            )}
          </h2>

          {tab === "login" && (
            <div className="space-y-3">
              {[
                { icon: Lock, text: "Foto terenkripsi, dihapus dalam 72 jam." },
                { icon: Zap, text: "Analisis klinis instan dalam 60 detik." },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-teal-400" />
                  </div>
                  <p className="text-[11px] text-white/70 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 pt-7 pb-32">
        {/* Tab switcher */}
        <div className="flex bg-[var(--bg-surface2)] dark:bg-[#162030] border border-[var(--border)] p-1 rounded-2xl mb-7">
          <button
            onClick={() => setTab("login")}
            className={`flex-1 py-2.5 text-sm font-['Syne'] font-bold rounded-xl transition-all ${tab === "login"
                ? "bg-[var(--bg-surface)] dark:bg-[#0F1926] text-[#0A2540] dark:text-white shadow-sm"
                : "text-[var(--text-muted)]"
              }`}
          >
            Masuk
          </button>
          <button
            onClick={() => setTab("register")}
            className={`flex-1 py-2.5 text-sm font-['Syne'] font-bold rounded-xl transition-all ${tab === "register"
                ? "bg-[var(--bg-surface)] dark:bg-[#0F1926] text-[#0A2540] dark:text-white shadow-sm"
                : "text-[var(--text-muted)]"
              }`}
          >
            Daftar
          </button>
        </div>

        {tab === "login" && (
          <div className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                <input
                  type="email"
                  placeholder="nama@email.com"
                  className="w-full bg-[var(--bg-surface)] dark:bg-[#0F1926] border border-[var(--border)] rounded-xl pl-12 pr-4 py-3.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488] transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full bg-[var(--bg-surface)] dark:bg-[#0F1926] border border-[var(--border)] rounded-xl pl-12 pr-12 py-3.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488] transition-all"
                />
                <button
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                >
                  {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button className="text-right w-full text-xs text-[#0D9488] font-semibold">
              Lupa password?
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 my-2">
              <div className="h-px bg-[var(--border)] flex-1" />
              <span className="text-[11px] text-[var(--text-muted)]">atau lanjutkan dengan</span>
              <div className="h-px bg-[var(--border)] flex-1" />
            </div>

            {/* Google */}
            <button className="w-full bg-[var(--bg-surface)] dark:bg-[#0F1926] border border-[var(--border)] rounded-xl py-3.5 flex items-center justify-center gap-3 text-sm font-medium text-[var(--text-primary)] active:bg-[var(--bg-surface2)] transition-colors">
              <svg viewBox="0 0 24 24" className="w-5 h-5">
                <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 01-5.279-5.28 5.27 5.27 0 015.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 00-8.934 8.934 8.908 8.908 0 008.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z" fill="#4285F4" />
              </svg>
              Google
            </button>
          </div>
        )}

        {tab === "register" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2">Nama</label>
                <input type="text" placeholder="Rina" className="w-full bg-[var(--bg-surface)] dark:bg-[#0F1926] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[#0D9488] transition-all" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2">Belakang</label>
                <input type="text" placeholder="Kusuma" className="w-full bg-[var(--bg-surface)] dark:bg-[#0F1926] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[#0D9488] transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                <input type="email" placeholder="nama@email.com" className="w-full bg-[var(--bg-surface)] dark:bg-[#0F1926] border border-[var(--border)] rounded-xl pl-12 pr-4 py-3.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[#0D9488] transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2">Keluhan Utama</label>
              <div className="flex flex-wrap gap-2">
                {chips.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => toggleChip(chip)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${activeChips[chip]
                        ? "border-[#0D9488] bg-[#0D9488]/10 text-[#0D9488]"
                        : "border-[var(--border)] bg-[var(--bg-surface)] dark:bg-[#0F1926] text-[var(--text-muted)]"
                      }`}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/20 rounded-2xl p-4 flex gap-3">
              <ShieldCheck className="w-5 h-5 text-[#0D9488] shrink-0 mt-0.5" />
              <p className="text-xs text-teal-800 dark:text-teal-300/80 leading-relaxed">
                Data Anda dienkripsi end-to-end dan tidak pernah dijual ke pihak ketiga.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-[var(--bg-surface)]/90 dark:bg-[#0F1926]/90 backdrop-blur-xl border-t border-[var(--border)] p-4 pb-8 z-50">
        <button
          onClick={handlePrimary}
          className="w-full h-14 rounded-2xl bg-[#0A2540] dark:bg-[#0D9488] text-white font-['Syne'] font-bold text-base flex items-center justify-center gap-2 active:scale-[0.97] transition-transform shadow-[0_8px_24px_rgba(10,37,64,0.2)] dark:shadow-[0_8px_24px_rgba(13,148,136,0.3)]"
        >
          {tab === "login" ? "Masuk ke Akun" : "Buat Akun & Lanjut"}
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
