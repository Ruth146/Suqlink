  import React, { useState } from "react";
import { ArrowLeft, Send, Phone, Sparkles, Share2, Check } from "lucide-react";
import ProductModal from "./ProductModal";

export default function BusinessProfile({ business, onBack, t }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    const shareText = `Check out ${business.name} on SuqLink!\n${business.shortBio}`;
    const shareUrl = window.location.href;

    if (navigator.share) {
      navigator.share({
        title: business.name,
        text: shareText,
        url: shareUrl,
      }).catch(() => {});
    } else {
      // Fallback: Copy link to clipboard
      navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const telegramShareLink = `https://t.me/share/url?url=${encodeURIComponent(
    window.location.origin
  )}&text=${encodeURIComponent(
    `Check out ${business.name} on SuqLink:${business.shortBio}`
  )}`;

  return (
    <div className="space-y-6 pb-12">
      {/* Top action row */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition"
        >
          <ArrowLeft size={16} /> {t?.backBtn || "Back to Directory"}
        </button>

        <div className="flex items-center gap-2">
          {/* Telegram direct share */}
          <a
            href={telegramShareLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-sky-200 bg-sky-50 text-sky-700 hover:bg-sky-100 text-xs font-semibold transition"
          >
            <Send size={13} /> Share on Telegram
          </a>

          {/* Copy link button */}
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold transition shadow-sm"
          >
            {copied ? (
              <>
                <Check size={14} className="text-emerald-600" /> Copied!
              </>
            ) : (
              <>
                <Share2 size={14} /> Copy Link
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Business Header Card */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="h-44 sm:h-52 w-full bg-slate-100 relative">
          <img
            src={business.coverImage}
            alt={business.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-5 sm:p-6 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-10 sm:-mt-12 mb-4">
            <div className="flex items-end gap-3.5">
              <img
                src={business.avatar}
                alt={business.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-4 border-white shadow-sm bg-white"
              />
              <div className="mb-1">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                  {business.name}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  {business.category} • {business.location}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {business.socials.telegram && (
                <a
                  href={business.socials.telegram}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 bg-sky-500 hover:bg-sky-600 text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl transition shadow-sm"
                >
                  <Send size={15} /> Telegram
                </a>
              )}
              {business.socials.phone && (
                <a
                  href={`tel:${business.socials.phone}`}
                  className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-700 transition"
                  title="Call"
                >
                  <Phone size={16} />
                </a>
              )}
              {business.socials.instagram && (
                <a
                  href={business.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 border border-slate-200 rounded-xl hover:bg-pink-50 text-pink-600 transition"
                  title="Instagram"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {business.promoBanner && (
            <div className="mt-4 bg-amber-50 border border-amber-200/80 rounded-xl p-3 flex items-center gap-2.5 text-amber-900 text-xs sm:text-sm">
              <Sparkles size={18} className="text-amber-600 flex-shrink-0" />
              <span className="font-medium">{business.promoBanner}</span>
            </div>
          )}

          <div className="mt-5 pt-5 border-t border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {t?.aboutTitle || "About"}
            </h3>
            <p className="text-sm text-slate-700 mt-1.5 leading-relaxed">{business.fullBio}</p>
          </div>
        </div>
      </div>

      {/* Product Showcase Grid */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900">
          {t?.featuredProducts || "Featured Products & Work"}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
          {business.products.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedProduct(item)}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-slate-300 transition cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-36 sm:h-44 w-full object-cover bg-slate-50"
              />
              <div className="p-3">
                <p className="text-xs sm:text-sm font-semibold text-slate-800 truncate">{item.title}</p>
                <p className="text-xs font-bold text-emerald-600 mt-0.5">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProductModal
        product={selectedProduct}
        business={business}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}