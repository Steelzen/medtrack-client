import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Spin } from "antd";
import { QuestionCircleOutlined, QuestionOutlined } from "@ant-design/icons";
import callOpenAI from "./callOpenAI";

const Advice = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const prompt = `Can you provide information on the symptoms and treatment options for "${input}"?`;

    const response = await callOpenAI(prompt, {
      temperature: 0.5,
      max_tokens: 512,
    });

    setLoading(false);

    if (response) {
      setOutput(response.trim());
    }
  };

  return (
    <div className="container mt-5">
      <div className="question-container">
        {input && (
          <div className="mt-5">
            <p>
              {" "}
              <QuestionOutlined />
              {input}
            </p>
          </div>
        )}
      </div>
      <div className="output-container">
        {loading ? (
          <div className="mt-5 text-center">
            <Spin />
          </div>
        ) : (
          output && (
            <div className="mt-5">
              <h3>Advice:</h3>
              <p>{output}</p>
            </div>
          )
        )}
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formSymptoms">
          <Form.Label>Symptoms:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Send your symptoms"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Enter
        </Button>
      </Form>
    </div>
  );
};

export default Advice;
