import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import BusinessProfile from "./BusinessProfile";

export default function BusinessRoute({ businesses, t }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const business = businesses.find((b) => b.id === id);

  if (!business) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Business Not Found</h2>
        <p className="text-sm text-slate-500">
          The business you're looking for doesn't exist or may have been removed.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-5 py-2.5 rounded-full transition"
        >
          Return to Directory
        </button>
      </div>
    );
  }

  return (
    <BusinessProfile
      business={business}
      onBack={() => navigate("/")}
      t={t}
    />
  );
}
