import React from "react";
import { Sparkles, Compass, ShieldCheck } from "lucide-react";

export default function AboutPage({ lang }) {
  const isAmharic = lang === "am";

  return (
    <div className="space-y-10 max-w-3xl mx-auto py-4">
      {/* Intro Header */}
      <div className="space-y-3 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100">
          <Sparkles size={14} /> {isAmharic ? "ራዕያችን" : "Our Mission"}
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          {isAmharic ? "ስለ ሱቅሊንክ" : "Bridging Ethiopian Commerce"}
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
          {isAmharic
            ? "ሱቅሊንክ በማህበራዊ ሚዲያ (ቴሌግራም፣ ኢንስታግራም) የሚሰሩ የሀገር ውስጥ አነስተኛ ንግዶችን በአንድ ማዕከል በማሰባሰብ ደንበኞች በቀላሉ እንዲያገኟቸው የተሰራ መድረክ ነው።"
            : "SuqLink bridges the gap between fragmented social media commerce and structured local discovery for small businesses across Ethiopia."}
        </p>
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Compass size={20} />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">
            {isAmharic ? "ቀላል ፍለጋ" : "Instant Discovery"}
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            {isAmharic
              ? "ምርቶችን በስም፣ በቦታ እና በስራ ዘርፍ በቀላሉ ፈልገው ያግኙ።"
              : "Search products and local artisans by keyword, location, and specific categories without getting lost in endless channel feeds."}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
            <Sparkles size={20} />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">
            {isAmharic ? "የራስዎ መገለጫ" : "Merchant Hub"}
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            {isAmharic
              ? "እያንዳንዱ ንግድ የራሱ ገጽ እና የምርት ማሳያ ይኖረዋል።"
              : "Every small enterprise gets a dedicated showcase link to highlight their catalog, deals, and direct social contacts."}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <ShieldCheck size={20} />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">
            {isAmharic ? "ቀጥተኛ ግንኙነት" : "Zero Intermediaries"}
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            {isAmharic
              ? "ያለ ደላላ በቀጥታ በቴሌግራም ወይም በስልክ ከሻጩ ጋር ይገናኙ።"
              : "Connect directly with creators and sellers via Telegram or direct phone call. No hidden commissions or middleman markups."}
          </p>
        </div>
      </div>
    </div>
  );
}