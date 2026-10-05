import React from "react";
import { Heart } from "lucide-react";

export default function Footer({ t, onRegister }) {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-1.5 font-medium">
          <span>Made with</span>
          <Heart size={14} className="text-rose-500 fill-rose-500" />
          <span>for Ethiopian Small Businesses</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onRegister}
            className="hover:text-emerald-600 transition font-semibold"
          >
            {t?.registerBtn || "+ Register Business"}
          </button>
          <span>•</span>
          <span className="text-slate-400">© {new Date().getFullYear()} SuqLink</span>
        </div>
      </div>
    </footer>
  );
}