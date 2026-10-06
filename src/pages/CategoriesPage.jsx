import React from "react";
import { useNavigate } from "react-router-dom";
import { Scissors, Cake, Sparkles, Home, Laptop, ArrowRight } from "lucide-react";

export default function CategoriesPage({ lang, onSelectCategory }) {
  const navigate = useNavigate();
  const isAmharic = lang === "am";

  const categories = [
    {
      key: "Crafts & Leather",
      title: isAmharic ? "የቆዳ ስራ እና እደ-ጥበብ" : "Crafts & Leather",
      desc: isAmharic ? "የእጅ ቦርሳዎች፣ የኪስ ቦርሳ እና ባህላዊ እደ-ጥበብ" : "Handmade bags, cardholders, leather shoes & artisanal work",
      icon: Scissors,
      color: "bg-amber-500/10 text-amber-700 border-amber-200",
    },
    {
      key: "Food & Pastry",
      title: isAmharic ? "ምግብ እና ኬክ" : "Food & Pastry",
      desc: isAmharic ? "የልደት ኬኮች፣ ጣፋጮች እና የቤት ውስጥ ምግቦች" : "Custom cakes, fresh bakery goods, and homemade treats",
      icon: Cake,
      color: "bg-rose-500/10 text-rose-700 border-rose-200",
    },
    {
      key: "Beauty",
      title: isAmharic ? "ውበት እና ጤና" : "Beauty & Cosmetics",
      desc: isAmharic ? "የተፈጥሮ የቆዳ እና የፀጉር እንክብካቤ ምርቶች" : "Organic skincare, hair oils, soaps, and natural cosmetics",
      icon: Sparkles,
      color: "bg-pink-500/10 text-pink-700 border-pink-200",
    },
    {
      key: "Home Decor",
      title: isAmharic ? "የቤት ማስጌጫ" : "Home Decor & Living",
      desc: isAmharic ? "ሻማዎች፣ የቤት ማስዋቢያ እቃዎች እና የእጅ ስራዎች" : "Hand-poured candles, pottery, cushions, and artwork",
      icon: Home,
      color: "bg-indigo-500/10 text-indigo-700 border-indigo-200",
    },
    {
      key: "Tech",
      title: isAmharic ? "ቴክኖሎጂ እና እቃዎች" : "Tech & Accessories",
      desc: isAmharic ? "የስልክ መያዣዎች፣ ገመዶች እና መለዋወጫዎች" : "Phone cases, chargers, desk accessories, and electronics",
      icon: Laptop,
      color: "bg-sky-500/10 text-sky-700 border-sky-200",
    },
  ];

  const handleCategoryClick = (key) => {
    onSelectCategory(key);
    navigate("/");
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto py-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          {isAmharic ? "የስራ ዘርፎች" : "Browse by Category"}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          {isAmharic
            ? "ፍላጎትዎን የሚመጥኑ ልዩ ልዩ የንግድ ዘርፎችን ይምረጡ"
            : "Discover small businesses by their trade and specialty"}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map((cat) => {
          const IconComponent = cat.icon;
          return (
            <div
              key={cat.key}
              onClick={() => handleCategoryClick(cat.key)}
              className="bg-white border border-slate-200/90 rounded-2xl p-5 hover:border-emerald-500 hover:shadow-md transition cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border ${cat.color}`}>
                  <IconComponent size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 group-hover:text-emerald-600 transition text-sm">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>
              </div>
              <ArrowRight size={18} className="text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-1 transition flex-shrink-0 ml-2" />
            </div>
          );
        })}
      </div>
    </div>
  );
}