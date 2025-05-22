import React from "react";


export default function Button({ children, className = "", ...props }) {
    return (
      <button
        className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
  