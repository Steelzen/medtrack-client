import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import callOpenAI from "./callOpenAI";

const Advice = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const prompt = `Can you provide information on the symptoms and treatment options for "${input}"?`;

    const response = await callOpenAI(prompt, {
      temperature: 0.7,
      max_tokens: 500,
    });

    if (response) {
      setOutput(response.trim());
    }
  };

  return (
    <div className="container mt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formSymptoms">
          <Form.Label>Symptoms:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter symptoms"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Enter
        </Button>
      </Form>
      {output && (
        <div className="mt-5">
          <h3>Advice:</h3>
          <p>{output}</p>
        </div>
      )}
    </div>
  );
};

export default Advice;
