import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import { Spin } from "antd";
import { QuestionCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
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
      <div className="advice-title-container">
        <h1 className="advice-title">Advice</h1>
        <p className="advice-intro">
          AI powered medical advice. Input your symptoms, AI will help you
          before getting touch doctor.
        </p>
      </div>
      <div className="question-container">
        {input && (
          <div className="mt-5 input-generated-wrapper">
            <h4>
              <QuestionCircleOutlined />
            </h4>
            <div className="mt-3">
              <p>{input}</p>
            </div>
          </div>
        )}
      </div>
      <div className="output-container">
        {loading ? (
          <div className="mt-5 text-center spin-output-wrapper">
            <Spin />
          </div>
        ) : (
          output && (
            <div className="mt-5 output-generated-wrapper">
              <h4>
                <CheckCircleOutlined />
              </h4>
              <div className="mt-3">
                <p>{output}</p>
              </div>
            </div>
          )
        )}
      </div>
      <div className="openai-query-container">
        <Form onSubmit={handleSubmit}>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              placeholder="Send your symptoms"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button
              variant="outline-secondary"
              id="button-addon2"
              type="submit"
            >
              Enter
            </Button>
          </InputGroup>
        </Form>
      </div>
    </div>
  );
};

export default Advice;
