import React from "react";
import { Search, ShoppingBag, Store, Sparkles, ArrowRight } from "lucide-react";

export default function HeroLanding({
  onExplore,
  onRegister,
  searchTerm,
  setSearchTerm,
  onQuickCategory,
  t
}) {
  const quickTags = ["Leather Bags", "Cake", "Jewelry", "Bole"];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onExplore();
  };

  return (
    <div className="space-y-12 pb-8">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-slate-900 to-slate-950 text-white p-8 sm:p-14 shadow-xl">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Sparkles size={14} /> {t.heroBadge}
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            {t.heroTitle}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
            {t.heroSubtitle}
          </p>

          <form onSubmit={handleSearchSubmit} className="pt-2">
            <div className="flex flex-col sm:flex-row gap-2 bg-white/10 p-2 rounded-2xl backdrop-blur-md border border-white/10">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-3 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 bg-transparent text-white placeholder-slate-400 text-sm focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-6 py-2.5 rounded-xl transition text-sm flex items-center justify-center gap-2"
              >
                {t.searchBtn} <ArrowRight size={16} />
              </button>
            </div>
          </form>

          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="text-slate-400">{t.popularLabel}</span>
            {quickTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => onQuickCategory(tag)}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 transition"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Two-Sided CTA Banner Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-sm hover:shadow transition">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShoppingBag size={20} />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">{t.lookingTitle}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.lookingDesc}
            </p>
          </div>
          <button
            onClick={onExplore}
            className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 hover:text-emerald-700"
          >
            {t.browseShopsBtn} <ArrowRight size={14} />
          </button>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-sm hover:shadow transition">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Store size={20} />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">{t.ownerTitle}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.ownerDesc}
            </p>
          </div>
          <button
            onClick={onRegister}
            className="text-xs font-bold text-sky-600 flex items-center gap-1.5 hover:text-sky-700"
          >
            {t.listBusinessBtn} <ArrowRight size={14} />
          </button>
        </div>
      </section>
    </div>
  );
}