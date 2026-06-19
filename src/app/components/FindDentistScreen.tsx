import { useState } from "react";
import { ChevronLeft, Search, MapPin, Star, Phone, ChevronRight, Clock } from "lucide-react";

interface Props {
  onBack: () => void;
}

const dentists = [
  {
    name: "drg. Sari Putri, Sp.Perio",
    clinic: "Klinik Gigi Sehat Bersama",
    distance: "0.8 km",
    rating: 4.9,
    reviews: 128,
    tags: ["Periodonti", "Scaling"],
    available: true,
    nextSlot: "Hari ini, 14:00",
    phone: "+62 21 5555 0001",
  },
  {
    name: "drg. Ahmad Rizal, Sp.KG",
    clinic: "RS Medika Sentral",
    distance: "1.4 km",
    rating: 4.7,
    reviews: 89,
    tags: ["Konservasi", "Endodonti"],
    available: true,
    nextSlot: "Besok, 09:00",
    phone: "+62 21 5555 0002",
  },
  {
    name: "drg. Maya Indra",
    clinic: "Klinik Dental Pro",
    distance: "2.1 km",
    rating: 4.8,
    reviews: 204,
    tags: ["Umum", "Estetik"],
    available: false,
    nextSlot: "Rabu, 10:30",
    phone: "+62 21 5555 0003",
  },
  {
    name: "drg. Budi Santoso, Sp.Ort",
    clinic: "SmileCare Dental",
    distance: "2.9 km",
    rating: 4.6,
    reviews: 67,
    tags: ["Ortodonti", "Implan"],
    available: true,
    nextSlot: "Hari ini, 16:00",
    phone: "+62 21 5555 0004",
  },
];

export function FindDentistScreen({ onBack }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTag, setFilterTag] = useState<string | null>(null);

  const filtered = dentists.filter(d =>
    (d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     d.clinic.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (!filterTag || d.tags.includes(filterTag))
  );

  const allTags = Array.from(new Set(dentists.flatMap(d => d.tags)));

  return (
    <div className="flex flex-col min-h-svh bg-[var(--bg-base)] dark:bg-[#080E18]">
      {/* App Bar */}
      <div className="sticky top-0 z-50 bg-[var(--bg-surface)]/90 dark:bg-[#0F1926]/90 backdrop-blur-xl border-b border-[var(--border)] px-4 pt-12 pb-3">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="w-10 h-10 flex items-center justify-center -ml-2 text-[var(--text-primary)]">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="font-['Syne'] font-bold text-lg text-[var(--text-primary)] flex-1">Cari Dokter Gigi</h1>
        </div>
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Nama dokter atau klinik..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-[var(--bg-surface2)] dark:bg-[#162030] border border-[var(--border)] rounded-xl pl-10 pr-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488] transition-all"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Map placeholder */}
        <div className="bg-[#0A2540]/5 dark:bg-[#0F1926] border border-[var(--border)] rounded-2xl h-40 relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0D9488]/5 to-[#0A2540]/5" />
          {/* Fake map dots */}
          <div className="absolute top-8 left-1/4 w-3 h-3 rounded-full bg-[#F97316] shadow-[0_0_10px_rgba(249,115,22,0.5)] animate-pulse" />
          <div className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full bg-[#0D9488] shadow-[0_0_12px_rgba(13,148,136,0.6)] animate-pulse border-2 border-white" />
          <div className="absolute bottom-8 right-1/3 w-3 h-3 rounded-full bg-[#1B4F8A] shadow-[0_0_8px_rgba(27,79,138,0.5)] animate-pulse" />
          <div className="absolute bottom-6 left-2/3 w-2.5 h-2.5 rounded-full bg-[#EAB308] animate-pulse" />
          <div className="flex items-center gap-2 bg-[var(--bg-surface)]/80 backdrop-blur rounded-full px-3 py-1.5 border border-[var(--border)]">
            <MapPin className="w-3.5 h-3.5 text-[#0D9488]" />
            <span className="text-xs text-[var(--text-primary)] font-medium">4 dokter ditemukan dalam 3km</span>
          </div>
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          <button
            onClick={() => setFilterTag(null)}
            className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold border transition-all ${
              !filterTag
                ? "bg-[#0A2540] text-white border-[#0A2540]"
                : "bg-[var(--bg-surface)] dark:bg-[var(--bg-surface)] border-[var(--border)] text-[var(--text-secondary)]"
            }`}
          >
            Semua
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setFilterTag(filterTag === tag ? null : tag)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                filterTag === tag
                  ? "bg-[#0D9488] text-white border-[#0D9488]"
                  : "bg-[var(--bg-surface)] dark:bg-[var(--bg-surface)] border-[var(--border)] text-[var(--text-secondary)]"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Dentist list */}
        <div className="space-y-3">
          {filtered.map((d, i) => (
            <div
              key={i}
              className="bg-[var(--bg-surface)] dark:bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-4 shadow-[var(--shadow-card)]"
            >
              <div className="flex items-start gap-3 mb-3">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0D9488]/20 to-[#0A2540]/20 border border-[var(--border)] flex items-center justify-center text-lg shrink-0">
                  👨‍⚕️
                </div>
                <div className="flex-1">
                  <h3 className="font-['Syne'] font-bold text-sm text-[var(--text-primary)] leading-tight">{d.name}</h3>
                  <p className="text-[11px] text-[var(--text-muted)] mt-0.5">{d.clinic}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-[#EAB308] text-[#EAB308]" />
                      <span className="text-[11px] font-bold text-[var(--text-primary)]">{d.rating}</span>
                      <span className="text-[10px] text-[var(--text-muted)]">({d.reviews})</span>
                    </div>
                    <span className="text-[10px] text-[var(--text-muted)]">·</span>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[var(--text-muted)]" />
                      <span className="text-[10px] text-[var(--text-muted)]">{d.distance}</span>
                    </div>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full text-[9px] font-bold shrink-0 ${
                  d.available
                    ? "bg-green-50 dark:bg-green-500/10 text-[#22C55E]"
                    : "bg-[var(--bg-surface2)] dark:bg-[#162030] text-[var(--text-muted)]"
                }`}>
                  {d.available ? "Tersedia" : "Penuh"}
                </div>
              </div>

              {/* Tags */}
              <div className="flex gap-1.5 mb-3">
                {d.tags.map((t, j) => (
                  <span key={j} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#0A2540]/8 dark:bg-white/5 text-[var(--text-secondary)]">
                    {t}
                  </span>
                ))}
              </div>

              {/* Slot + Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                  <span className="text-[11px] text-[var(--text-secondary)]">{d.nextSlot}</span>
                </div>
                <div className="flex gap-2">
                  <button className="w-9 h-9 rounded-xl bg-[var(--bg-surface2)] dark:bg-[#162030] border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] active:scale-90 transition-transform">
                    <Phone className="w-4 h-4" />
                  </button>
                  <button className="px-3.5 h-9 rounded-xl bg-[#0A2540] text-white text-[11px] font-bold flex items-center gap-1 active:scale-95 transition-transform">
                    Buat Janji <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="text-5xl mb-4">🔍</div>
            <p className="font-['Syne'] font-bold text-[var(--text-primary)] mb-2">Tidak Ditemukan</p>
            <p className="text-sm text-[var(--text-muted)]">Coba kata kunci yang berbeda</p>
          </div>
        )}
      </div>
    </div>
  );
}
