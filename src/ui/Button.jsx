import React from "react";


export default function Button({ children, className = "", ...props }) {
    return (
      <button
        className={`bg-slate-400 hover:bg-slate-500 text-white font-semibold py-2 px-4  ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
  