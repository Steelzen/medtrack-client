import { useState, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import { Spin } from "antd";
import { QuestionCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import callOpenAI from "./callOpenAI";

const Advice = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  let inputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const prompt = `Please generate a comprehensive overview of "${input}" medication, covering its uses, potential side effects, and any precautions to be aware of.`;

    const response = await callOpenAI(prompt, {
      temperature: 0.5,
      max_tokens: 512,
    });

    setLoading(false);

    if (response) {
      setOutput(response.trim());
    }

    inputRef.current = input;
  };

  return (
    <div className="container mt-5">
      <div className="advice-title-container">
        <h1 className="advice-title">Advice</h1>
        <p className="advice-intro">
          AI powered medical advice. Input the medication you want to know.
        </p>
      </div>
      <div className="question-container">
        {inputRef && (
          <div className="mt-5 input-generated-wrapper">
            <h4>
              <QuestionCircleOutlined />
            </h4>
            <div className="mt-3">
              <p className="advice-content">{inputRef.current}</p>
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
                <p className="advice-content">{output}</p>
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
              placeholder="Send your medication"
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
