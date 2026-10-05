import React, { useState, useEffect } from "react";
import { X, Plus, Trash2, Upload, Image as ImageIcon } from "lucide-react";

export default function RegisterModal({ isOpen, onClose, onSaveBusiness, initialData = null, t }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "Crafts & Leather",
    location: "",
    shortBio: "",
    fullBio: "",
    promoBanner: "",
    avatar: "",
    coverImage: "",
    telegram: "",
    phone: "",
    instagram: "",
  });

  const [products, setProducts] = useState([
    { id: 1, title: "", price: "", image: "" },
  ]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        category: initialData.category || "Crafts & Leather",
        location: initialData.location || "",
        shortBio: initialData.shortBio || "",
        fullBio: initialData.fullBio || "",
        promoBanner: initialData.promoBanner || "",
        avatar: initialData.avatar || "",
        coverImage: initialData.coverImage || "",
        telegram: initialData.socials?.telegram?.replace("https://t.me/", "") || "",
        phone: initialData.socials?.phone || "",
        instagram: initialData.socials?.instagram?.replace("https://instagram.com/", "") || "",
      });
      setProducts(
        initialData.products?.length > 0
          ? initialData.products
          : [{ id: 1, title: "", price: "", image: "" }]
      );
    } else {
      setFormData({
        name: "",
        category: "Crafts & Leather",
        location: "",
        shortBio: "",
        fullBio: "",
        promoBanner: "",
        avatar: "",
        coverImage: "",
        telegram: "",
        phone: "",
        instagram: "",
      });
      setProducts([{ id: 1, title: "", price: "", image: "" }]);
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleImageUpload = (file, callback) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductChange = (index, field, value) => {
    const updated = [...products];
    updated[index][field] = value;
    setProducts(updated);
  };

  const handleProductFile = (index, file) => {
    handleImageUpload(file, (base64) => {
      handleProductChange(index, "image", base64);
    });
  };

  const addProductRow = () => {
    setProducts((prev) => [
      ...prev,
      { id: Date.now(), title: "", price: "", image: "" },
    ]);
  };

  const removeProductRow = (index) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const businessPayload = {
      id: initialData ? initialData.id : formData.name.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now(),
      name: formData.name,
      category: formData.category,
      location: formData.location || "Addis Ababa",
      shortBio: formData.shortBio,
      fullBio: formData.fullBio || formData.shortBio,
      promoBanner: formData.promoBanner,
      avatar:
        formData.avatar ||
        "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=300&q=80",
      coverImage:
        formData.coverImage ||
        "https://images.unsplash.com/photo-1473187983305-f615310e7daa?auto=format&fit=crop&w=1000&q=80",
      socials: {
        telegram: formData.telegram ? `https://t.me/${formData.telegram.replace("@", "")}` : "",
        phone: formData.phone,
        instagram: formData.instagram ? `https://instagram.com/${formData.instagram.replace("@", "")}` : "",
      },
      products: products.filter((p) => p.title.trim() !== ""),
    };

    onSaveBusiness(businessPayload);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">
            {initialData ? (t?.editTitle || "Edit Business Details") : (t?.modalTitle || "List Your Business")}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Shop Branding */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {t?.brandingTitle || "Shop Branding"}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t?.logoLabel || "Logo / Profile Photo"}
                </label>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center flex-shrink-0">
                    {formData.avatar ? (
                      <img src={formData.avatar} alt="Logo" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon size={20} className="text-slate-400" />
                    )}
                  </div>
                  <label className="cursor-pointer text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-xl border border-slate-200 flex items-center gap-1.5 transition">
                    <Upload size={14} /> {t?.uploadLogoBtn || "Upload"}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleImageUpload(e.target.files[0], (url) =>
                          setFormData((prev) => ({ ...prev, avatar: url }))
                        )
                      }
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t?.bannerLabel || "Cover Banner"}
                </label>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-20 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center flex-shrink-0">
                    {formData.coverImage ? (
                      <img src={formData.coverImage} alt="Cover" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon size={20} className="text-slate-400" />
                    )}
                  </div>
                  <label className="cursor-pointer text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-xl border border-slate-200 flex items-center gap-1.5 transition">
                    <Upload size={14} /> {t?.uploadBannerBtn || "Upload"}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleImageUpload(e.target.files[0], (url) =>
                          setFormData((prev) => ({ ...prev, coverImage: url }))
                        )
                      }
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Basic Info */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {t?.basicInfoTitle || "Basic Info"}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t?.bizNameLabel || "Business Name *"}
                </label>
                <input
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t?.categoryLabel || "Category *"}
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Crafts & Leather">Crafts & Leather</option>
                  <option value="Food & Pastry">Food & Pastry</option>
                  <option value="Beauty">Beauty</option>
                  <option value="Home Decor">Home Decor</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t?.locationLabel || "Location"}
              </label>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t?.shortBioLabel || "Short Description *"}
              </label>
              <input
                required
                name="shortBio"
                value={formData.shortBio}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t?.promoLabel || "Special Promo (Optional)"}
              </label>
              <input
                name="promoBanner"
                value={formData.promoBanner}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {t?.socialTitle || "Social Links"}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t?.telegramLabel || "Telegram"}
                </label>
                <input
                  name="telegram"
                  value={formData.telegram}
                  onChange={handleChange}
                  placeholder="@username"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t?.phoneLabel || "Phone"}
                </label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+251..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t?.instaLabel || "Instagram"}
                </label>
                <input
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleChange}
                  placeholder="@handle"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Product Items */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {t?.productsTitle || "Products"}
              </h3>
              <button
                type="button"
                onClick={addProductRow}
                className="text-xs text-emerald-600 font-bold hover:text-emerald-700 flex items-center gap-1"
              >
                <Plus size={14} /> {t?.addProductBtn || "Add Product"}
              </button>
            </div>

            {products.map((item, idx) => (
              <div
                key={item.id}
                className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80"
              >
                <label className="w-10 h-10 rounded-lg bg-white border border-slate-200 overflow-hidden flex items-center justify-center flex-shrink-0 cursor-pointer hover:border-emerald-500 transition">
                  {item.image ? (
                    <img src={item.image} alt="Product" className="w-full h-full object-cover" />
                  ) : (
                    <Upload size={14} className="text-slate-400" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleProductFile(idx, e.target.files[0])}
                  />
                </label>

                <input
                  placeholder="Title"
                  value={item.title}
                  onChange={(e) => handleProductChange(idx, "title", e.target.value)}
                  className="flex-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                />

                <input
                  placeholder="Price"
                  value={item.price}
                  onChange={(e) => handleProductChange(idx, "price", e.target.value)}
                  className="w-24 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                />

                {products.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeProductRow(idx)}
                    className="p-1 text-slate-400 hover:text-rose-500 transition"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 font-semibold hover:bg-slate-100 rounded-xl"
            >
              {t?.cancelBtn || "Cancel"}
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-sm transition"
            >
              {initialData ? (t?.saveChangesBtn || "Save Changes") : (t?.publishBtn || "Publish Listing")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}