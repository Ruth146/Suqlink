import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { mockBusinesses } from "./data/mockBusinesses";
import { translations } from "./data/translations";
import Navbar from "./components/Navbar";
import BusinessCard from "./components/BusinessCard";
import BusinessRoute from "./components/BusinessRoute";
import RegisterModal from "./components/RegisterModal";
import HeroLanding from "./components/HeroLanding";
import Footer from "./components/Footer";
import AboutPage from "./pages/AboutPage";
import CategoriesPage from "./pages/CategoriesPage";
import ContactPage from "./pages/ContactPage";
import { Search } from "lucide-react";

const CATEGORY_KEYS = ["All", "Crafts & Leather", "Food & Pastry", "Beauty", "Home Decor"];

export default function App() {
  const navigate = useNavigate();
  const [lang, setLang] = useState(() => localStorage.getItem("suqlink_lang") || "en");
  const t = translations[lang];

  const [businesses, setBusinesses] = useState(() => {
    const saved = localStorage.getItem("suqlink_businesses");
    return saved ? JSON.parse(saved) : mockBusinesses;
  });

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [editingBusiness, setEditingBusiness] = useState(null);

  useEffect(() => {
    localStorage.setItem("suqlink_businesses", JSON.stringify(businesses));
  }, [businesses]);

  const toggleLanguage = () => {
    const nextLang = lang === "en" ? "am" : "en";
    setLang(nextLang);
    localStorage.setItem("suqlink_lang", nextLang);
  };

  const handleSaveBusiness = (businessData) => {
    if (editingBusiness) {
      setBusinesses((prev) =>
        prev.map((b) => (b.id === businessData.id ? businessData : b))
      );
    } else {
      setBusinesses((prev) => [businessData, ...prev]);
      navigate(`/biz/${businessData.id}`);
    }
    setEditingBusiness(null);
  };

  const handleDeleteBusiness = (id) => {
    if (window.confirm("Are you sure you want to remove this listing?")) {
      setBusinesses((prev) => prev.filter((b) => b.id !== id));
      navigate("/");
    }
  };

  const openEditModal = (biz) => {
    setEditingBusiness(biz);
    setIsRegisterOpen(true);
  };

  const handleQuickTag = (tag) => {
    setSearchTerm(tag);
    const directorySection = document.getElementById("directory-section");
    if (directorySection) {
      directorySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToDirectory = () => {
    const directorySection = document.getElementById("directory-section");
    if (directorySection) {
      directorySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const filteredBusinesses = businesses.filter((b) => {
    const matchesCat = activeCategory === "All" || b.category === activeCategory;
    const matchesQuery =
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.shortBio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.products.some((p) => p.title.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between">
      <div>
        {/* Persistent Global Navbar */}
        <Navbar
          lang={lang}
          toggleLanguage={toggleLanguage}
          onOpenRegister={() => {
            setEditingBusiness(null);
            setIsRegisterOpen(true);
          }}
          t={t}
        />

        {/* Dynamic Route Pages */}
<main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20 md:pb-8">          <Routes>
            {/* Main Explore Directory View */}
            <Route
              path="/"
              element={
                <div className="space-y-10">
                  <HeroLanding
                    onExplore={scrollToDirectory}
                    onRegister={() => {
                      setEditingBusiness(null);
                      setIsRegisterOpen(true);
                    }}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    onQuickCategory={handleQuickTag}
                    t={t}
                  />

                  <section id="directory-section" className="space-y-6 pt-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                      <h2 className="text-xl font-black text-slate-900">{t.exploreTitle}</h2>
                      <span className="text-xs text-slate-500 font-medium">
                        {filteredBusinesses.length} {t.verifiedListings}
                      </span>
                    </div>

                    <div className="relative">
                      <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                      <input
                        type="text"
                        placeholder={t.searchPlaceholder}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                      {CATEGORY_KEYS.map((catKey) => (
                        <button
                          key={catKey}
                          onClick={() => setActiveCategory(catKey)}
                          className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                            activeCategory === catKey
                              ? "bg-slate-900 text-white"
                              : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          {t.categories[catKey] || catKey}
                        </button>
                      ))}
                    </div>

                    {filteredBusinesses.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredBusinesses.map((biz) => (
                          <BusinessCard
                            key={biz.id}
                            business={biz}
                            onEdit={openEditModal}
                            onDelete={handleDeleteBusiness}
                            t={t}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200">
                        <p className="text-sm font-semibold text-slate-700">
                          {t.noResults} "{searchTerm}"
                        </p>
                        <p className="text-xs text-slate-400 mt-1">{t.noResultsSub}</p>
                      </div>
                    )}
                  </section>
                </div>
              }
            />

            {/* Individual Business Storefront */}
            <Route
              path="/biz/:id"
              element={<BusinessRoute businesses={businesses} t={t} />}
            />

            {/* Dedicated Categories Hub */}
            <Route
              path="/categories"
              element={
                <CategoriesPage
                  lang={lang}
                  onSelectCategory={(cat) => setActiveCategory(cat)}
                />
              }
            />

            {/* About Page */}
            <Route path="/about" element={<AboutPage lang={lang} />} />

            {/* Contact & Support Page */}
            <Route path="/contact" element={<ContactPage lang={lang} />} />
          </Routes>
        </main>
      </div>

      <Footer t={t} onRegister={() => setIsRegisterOpen(true)} />

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => {
          setIsRegisterOpen(false);
          setEditingBusiness(null);
        }}
        onSaveBusiness={handleSaveBusiness}
        initialData={editingBusiness}
        t={t}
      />
    </div>
  );
}