import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Globe, Plus, Compass, Grid, Info, MessageSquare } from "lucide-react";

export default function Navbar({ lang, toggleLanguage, onOpenRegister, t }) {
  const location = useLocation();

  const navLinks = [
    { to: "/", label: lang === "en" ? "Explore" : "አስስ", icon: Compass },
    { to: "/categories", label: lang === "en" ? "Categories" : "ዘርፎች", icon: Grid },
    { to: "/about", label: lang === "en" ? "About" : "ስለ እኛ", icon: Info },
    { to: "/contact", label: lang === "en" ? "Contact" : "አግኙን", icon: MessageSquare },
  ];

  return (
    <>
      {/* Top Header (Mobile & Desktop) */}
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">          {/* Logo */}
          <Link
            to="/"
            className="text-xl sm:text-2xl font-black text-emerald-600 tracking-tight flex items-center gap-1.5"
          >
            {t?.brandName || "SuqLink"}
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-xs font-bold transition py-1 ${
                    isActive
                      ? "text-emerald-600 border-b-2 border-emerald-600"
                      : "text-slate-600 hover:text-slate-900"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Action Area */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold transition active:scale-95"
            >
              <Globe size={13} />
              <span>{lang === "en" ? "አማርኛ" : "EN"}</span>
            </button>

            {/* Desktop Register Button */}
            <button
              onClick={onOpenRegister}
              className="hidden sm:inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2 rounded-full transition shadow-sm active:scale-95"
            >
              <Plus size={14} /> {t?.registerBtn || "Register Business"}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile-Only Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 flex justify-around items-center shadow-lg">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition ${
                isActive ? "text-emerald-600 font-bold" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Icon size={19} className={isActive ? "stroke-[2.5]" : "stroke-[1.8]"} />
              <span className="text-[10px] mt-0.5">{link.label}</span>
            </Link>
          );
        })}
        {/* Floating Register button on mobile */}
        <button
          onClick={onOpenRegister}
          className="flex flex-col items-center justify-center py-1 px-2 text-emerald-600 font-bold"
        >
          <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-sm">
            <Plus size={16} />
          </div>
          <span className="text-[10px] mt-0.5">መዝግብ</span>
        </button>
      </nav>
    </>
  );
}