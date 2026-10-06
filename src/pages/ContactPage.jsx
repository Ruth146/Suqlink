import React, { useState } from "react";
import { Send, Mail, MapPin, CheckCircle2 } from "lucide-react";

export default function ContactPage({ lang }) {
  const isAmharic = lang === "am";
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto py-4 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          {isAmharic ? "ያግኙን" : "Get in Touch"}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          {isAmharic
            ? "ጥያቄ ወይም አስተያየት ካለዎት መልዕክት ይላኩልን"
            : "Have questions, need verification, or want to partner with SuqLink?"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Contact Info Cards */}
        <div className="space-y-3">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1">
            <div className="text-emerald-600 mb-1"><Mail size={18} /></div>
            <h4 className="text-xs font-bold text-slate-900">Email</h4>
            <p className="text-xs text-slate-500">support@suqlink.et</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1">
            <div className="text-sky-600 mb-1"><Send size={18} /></div>
            <h4 className="text-xs font-bold text-slate-900">Telegram Channel</h4>
            <p className="text-xs text-slate-500">@suqlink_official</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1">
            <div className="text-slate-700 mb-1"><MapPin size={18} /></div>
            <h4 className="text-xs font-bold text-slate-900">Location</h4>
            <p className="text-xs text-slate-500">Addis Ababa, Ethiopia</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-slate-200">
          {submitted ? (
            <div className="text-center py-10 space-y-2">
              <CheckCircle2 size={36} className="text-emerald-600 mx-auto" />
              <h3 className="font-bold text-slate-900">
                {isAmharic ? "መልዕክትዎ ተልኳል!" : "Message Sent Successfully!"}
              </h3>
              <p className="text-xs text-slate-500">
                {isAmharic ? "በቅርቡ እናገኝዎታለን።" : "Our team will respond to your inquiry shortly."}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {isAmharic ? "ሙሉ ስም" : "Your Name"}
                </label>
                <input
                  required
                  placeholder="e.g. Abebe Bikila"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {isAmharic ? "ስልክ ወይም የቴሌግራም አድራሻ" : "Phone or Telegram handle"}
                </label>
                <input
                  required
                  placeholder="+251 9... or @username"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {isAmharic ? "መልዕክት" : "Message"}
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder={isAmharic ? "የጥያቄዎ ዝርዝር..." : "How can we help your business?"}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl transition"
              >
                {isAmharic ? "መልዕክት ላክ" : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}