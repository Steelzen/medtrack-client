import { useState, useEffect } from "react";
import callOpenAI from "./callOpenAI";

const Advice = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const prompt = `I am an AI language model trained on a wide range of medical information. While I am not a doctor and cannot provide personalized medical advice, I can offer general information about "${input}". Please consult a medical professional for personalized advice.`;

    const response = await callOpenAI(prompt, {
      temperature: 0.7,
      max_tokens: 500,
    });

    if (response) {
      setOutput(response.trim());
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Contents:
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </label>
        <button type="submit">Enter</button>
      </form>
      {output && (
        <div>
          <h3>Advice:</h3>
          <p>{output}</p>
        </div>
      )}
    </div>
  );
};

export default Advice;
