import React, { useState } from "react";

export const CatFactComponent = () => {
  const [fact, setFact] = useState<string>("");
  const textFieldRef = React.useRef<HTMLInputElement>(null);

  const fetchCatFact = async () => {
    const response = await fetch("https://catfact.ninja/fact");
    const data = await response.json();
    let trimmedFact = data.fact;
    if (trimmedFact.length > 100) {
      trimmedFact = `${trimmedFact.substring(0, 100)}...`;
    }
    setFact(trimmedFact);
    if (textFieldRef.current) {
      textFieldRef.current.value = trimmedFact;
      const firstWordEnd = trimmedFact.indexOf(" ");
      textFieldRef.current.setSelectionRange(firstWordEnd, firstWordEnd);
      textFieldRef.current.focus();
    }
  };

  return (
    <div
      style={{
        margin: "20px",
        padding: "10px",
        border: "1px solid #ccc",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <input
        type="text"
        ref={textFieldRef}
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <button onClick={fetchCatFact}>Get Cat Fact</button>
    </div>
  );
};
