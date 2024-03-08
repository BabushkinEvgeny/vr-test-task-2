import React, { useState, useEffect } from "react";

export const AgeFormComponent = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(
    null
  );

  const fetchAgeWithDelay = async (name: string) => {
    const abortController = new AbortController();
    const { signal } = abortController;

    setIsLoading(true);
    try {
      if (timer) {
        clearTimeout(timer);
      }
      const newTimer = setTimeout(async () => {
        const response = await fetch(`https://api.agify.io/?name=${name}`, {
          signal,
        });
        const jsonData = await response.json();
        setAge(jsonData.age);
        setIsLoading(false);
      }, 5000);
      setTimer(newTimer);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Fetch error:", error.message);
      } else {
        console.error("Unknown error", error);
      }
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(setTimeout(() => fetchAgeWithDelay(e.target.value), 3000));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchAgeWithDelay(name);
  };

  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timer]);

  return (
    <div
      style={{
        margin: "20px",
        padding: "10px",
        border: "1px solid #ccc",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        marginTop: "30px",
      }}
    >
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={handleInputChange}
          style={{ width: "100%", marginBottom: "10px" }}
        />
        <button type="submit">Submit</button>
      </form>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        age !== null && (
          <>
            <p>Age: {age}</p>
            <p>Name: {name}</p>
          </>
        )
      )}
    </div>
  );
};
