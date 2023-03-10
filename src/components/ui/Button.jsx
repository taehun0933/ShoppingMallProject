import React from "react";

export default function Button({ onClick, text, cssOptions }) {
  return (
    <button
      className={`bg-brand text-white px-4 py-2 rounded-sm hover:brightness-105 ${cssOptions}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
