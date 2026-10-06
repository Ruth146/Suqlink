import React from "react";
import { Search, ShoppingBag, Store, Sparkles, ArrowRight } from "lucide-react";

export default function HeroLanding({
  onExplore,
  onRegister,
  searchTerm,
  setSearchTerm,
  onQuickCategory,
  t,
}) {
  const quickTags = ["Leather Bags", "Cake", "Jewelry", "Bole"];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onExplore();
  };

  return (
    <div className="space-y-12 pb-8 w-full">
      {/* Unboxed, Clean Hero Section */}
      <section className="pt-6 sm:pt-10 pb-4 text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200/60 shadow-xs">
          <Sparkles size={14} className="text-emerald-600" /> {t?.heroBadge}
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
          {t?.heroTitle}
        </h1>

        <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          {t?.heroSubtitle}
        </p>

        {/* Clean Floating Search Bar */}
        <form onSubmit={handleSearchSubmit} className="w-full max-w-2xl mx-auto pt-2">
          <div className="flex flex-col sm:flex-row gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-md focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-emerald-500 transition">
            <div className="relative flex-1 flex items-center">
              <Search className="absolute left-3.5 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder={t?.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-transparent text-slate-900 placeholder-slate-400 text-sm focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl transition text-sm flex items-center justify-center gap-2 shadow-sm active:scale-95"
            >
              {t?.searchBtn} <ArrowRight size={16} />
            </button>
          </div>
        </form>

        {/* Quick Tag Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
          <span className="text-slate-400 font-medium">{t?.popularLabel}</span>
          {quickTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => onQuickCategory(tag)}
              className="px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition font-medium"
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* Two-Sided CTA Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-xs hover:shadow-md transition">
          <div className="space-y-2.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShoppingBag size={22} />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">{t?.lookingTitle}</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {t?.lookingDesc}
            </p>
          </div>
          <button
            onClick={onExplore}
            className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 hover:text-emerald-700 pt-2"
          >
            {t?.browseShopsBtn} <ArrowRight size={14} />
          </button>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-xs hover:shadow-md transition">
          <div className="space-y-2.5">
            <div className="w-11 h-11 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Store size={22} />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">{t?.ownerTitle}</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {t?.ownerDesc}
            </p>
          </div>
          <button
            onClick={onRegister}
            className="text-xs font-bold text-sky-600 flex items-center gap-1.5 hover:text-sky-700 pt-2"
          >
            {t?.listBusinessBtn} <ArrowRight size={14} />
          </button>
        </div>
      </section>
    </div>
  );
}