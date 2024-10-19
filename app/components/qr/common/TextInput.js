import React from "react";

export default function TextInput({ text, setText, placeholder, className, style }) {
  return (
    <div className="mb-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        className={className}
        style={style}
      />
    </div>
  );
}
