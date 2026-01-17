import React from "react";

export default function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 ${className}`}
    >
      {children}
    </div>
  );
}
