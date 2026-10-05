import React from "react";
import { useNavigate } from "react-router-dom";
import { Send, Phone, Edit3, Trash2 } from "lucide-react";

export default function BusinessCard({ business, onEdit, onDelete, t }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/biz/${business.id}`)}
      className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 hover:shadow-md hover:border-slate-300 transition duration-150 cursor-pointer flex flex-col justify-between group"
    >
      <div className="flex items-start gap-3.5">
        <img
          src={business.avatar}
          alt={business.name}
          className="w-14 h-14 rounded-xl object-cover bg-slate-100 flex-shrink-0 border border-slate-100"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-bold text-slate-900 truncate text-base">{business.name}</h3>
            <span className="text-[11px] bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded-md whitespace-nowrap">
              {business.category}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">{business.location}</p>
          <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">{business.shortBio}</p>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs font-semibold text-emerald-600 group-hover:text-emerald-700">
          {t?.viewShop || "View shop →"}
        </span>

        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => onEdit(business)}
            title="Edit shop"
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
          >
            <Edit3 size={14} />
          </button>
          <button
            onClick={() => onDelete(business.id)}
            title="Delete shop"
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
          >
            <Trash2 size={14} />
          </button>

          {business.socials.telegram && (
            <a
              href={business.socials.telegram}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-lg bg-sky-50 text-sky-600 hover:bg-sky-100 transition"
              title="Telegram"
            >
              <Send size={14} />
            </a>
          )}
          {business.socials.phone && (
            <a
              href={`tel:${business.socials.phone}`}
              className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition"
              title="Call"
            >
              <Phone size={14} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}