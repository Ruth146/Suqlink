import React from "react";
import { X, Send, Phone } from "lucide-react";

export default function ProductModal({ product, business, onClose }) {
  if (!product || !business) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition z-10"
        >
          <X size={18} />
        </button>

        <div className="h-64 sm:h-72 w-full bg-slate-100">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">{product.title}</h3>
              <p className="text-xs text-slate-500 mt-0.5">Sold by {business.name}</p>
            </div>
            <span className="text-base font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-xl">
              {product.price}
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Interested in this item? Contact the seller directly with the product name to check availability and arrange delivery.
          </p>

          <div className="pt-2 flex gap-2">
            {business.socials.telegram && (
              <a
                href={business.socials.telegram}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white py-2.5 rounded-xl font-semibold text-xs transition"
              >
                <Send size={15} /> Order on Telegram
              </a>
            )}
            {business.socials.phone && (
              <a
                href={`tel:${business.socials.phone}`}
                className="flex items-center justify-center gap-2 border border-slate-200 px-4 py-2.5 rounded-xl text-slate-700 font-semibold text-xs hover:bg-slate-50 transition"
              >
                <Phone size={15} /> Call Shop
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}