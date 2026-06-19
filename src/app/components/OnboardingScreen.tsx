import { ChevronRight, ChevronLeft, Camera, BrainCircuit, CalendarCheck2 } from "lucide-react";

interface Props {
  step: 1 | 2 | 3;
  onNext: () => void;
  onBack: () => void;
}

const slides = [
  {
    icon: Camera,
    color: "bg-teal-500",
    glowColor: "shadow-[0_0_60px_rgba(13,148,136,0.4)]",
    bgGlow: "bg-teal-500/10",
    label: "Foto Rongga Mulut",
    title: "Scan Senyummu,\nUngkap Kesehatanmu",
    body: "Cukup foto gigi, gusi, dan lidah selama 60 detik. Tidak perlu alat klinis — hanya kamera smartphone Anda.",
    bullet: "Selfie mulut dalam 60 detik",
  },
  {
    icon: BrainCircuit,
    color: "bg-[#1B4F8A]",
    glowColor: "shadow-[0_0_60px_rgba(27,79,138,0.4)]",
    bgGlow: "bg-blue-500/10",
    label: "Analisis AI Klinis",
    title: "Neural Network yang\nMelihat Lebih Jauh",
    body: "Model AI kami terlatih dengan ribuan kasus klinis untuk mendeteksi plak, inflamasi gingiva, erosi enamel, dan lebih banyak lagi.",
    bullet: "Akurasi 94.7% vs diagnosis klinis",
  },
  {
    icon: CalendarCheck2,
    color: "bg-[#F97316]",
    glowColor: "shadow-[0_0_60px_rgba(249,115,22,0.35)]",
    bgGlow: "bg-orange-500/10",
    label: "Rencana Personal",
    title: "Diet & Suplemen\nKhusus Untukmu",
    body: "Dapatkan rekomendasi makanan, suplemen, dan jadwal kontrol dokter gigi yang disesuaikan dengan kondisi spesifik rongga mulut Anda.",
    bullet: "Rencana 30 hari berbasis data oral",
  },
];

export function OnboardingScreen({ step, onNext, onBack }: Props) {
  const slide = slides[step - 1];
  const Icon = slide.icon;

  return (
    <div className="flex flex-col min-h-svh bg-[var(--bg-base)] dark:bg-[#080E18]">
      {/* Skip button */}
      <div className="flex items-center justify-between px-6 pt-12 pb-4">
        <button
          onClick={onBack}
          className={`w-10 h-10 rounded-full flex items-center justify-center text-[var(--text-muted)] ${step === 1 ? "opacity-0 pointer-events-none" : ""}`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={onNext} className="text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors">
          Lewati
        </button>
      </div>

      {/* Illustration area */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-4">
        {/* Icon circle */}
        <div className={`w-36 h-36 rounded-3xl ${slide.bgGlow} flex items-center justify-center mb-10 ${slide.glowColor}`}>
          <div className={`w-24 h-24 rounded-2xl ${slide.color} flex items-center justify-center`}>
            <Icon className="w-12 h-12 text-white" strokeWidth={1.5} />
          </div>
        </div>

        {/* Label chip */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 dark:bg-teal-500/15 border border-teal-500/20 mb-5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#0D9488]" />
          <span className="text-[11px] font-semibold text-[#0D9488] tracking-wide uppercase">{slide.label}</span>
        </div>

        {/* Title */}
        <h2 className="font-['Syne'] text-[26px] font-extrabold text-center text-[var(--text-primary)] leading-tight mb-4 whitespace-pre-line">
          {slide.title}
        </h2>

        {/* Body */}
        <p className="text-sm text-center text-[var(--text-secondary)] leading-relaxed max-w-[280px] mb-8">
          {slide.body}
        </p>

        {/* Bullet highlight */}
        <div className="bg-[var(--bg-surface)] dark:bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl px-5 py-4 w-full max-w-[300px] shadow-[var(--shadow-card)]">
          <p className="text-sm text-[var(--text-primary)] font-medium">{slide.bullet}</p>
        </div>
      </div>

      {/* Step dots + CTA */}
      <div className="px-6 pb-12 flex flex-col items-center gap-6">
        {/* Dots */}
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-300 ${i === step
                  ? "w-6 h-2 bg-[#0D9488]"
                  : "w-2 h-2 bg-slate-300 dark:bg-slate-700"
                }`}
            />
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={onNext}
          className="w-full bg-[#0A2540] dark:bg-[#0D9488] text-white rounded-2xl h-14 font-['Syne'] font-bold text-base flex items-center justify-center gap-2 active:scale-[0.97] transition-transform shadow-xl shadow-[#0A2540]/20 dark:shadow-[#0D9488]/30"
        >
          {step === 3 ? "Mulai Sekarang" : "Lanjut"}
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
