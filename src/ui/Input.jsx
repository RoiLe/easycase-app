import React from "react";


export default function Input({ className = "", ...props }) {
    return (
      <input
        className={`border border-gray-300 p-2 rounded w-full ${className}`}
        {...props}
      />
    );
  }
  