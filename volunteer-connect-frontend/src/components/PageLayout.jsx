import React from "react";

export default function PageLayout({ title, subtitle, children }) {
  return (
    <div className="page bg-slate-50 dark:bg-slate-900 min-h-screen p-4">
      <div className="container mx-auto">
        {/* Page header */}
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold dark:text-white">{title}</h2>
          {subtitle && <p className="text-slate-600 dark:text-slate-300">{subtitle}</p>}
        </div>

        {/* Page content */}
        {children}
      </div>
    </div>
  );
}
