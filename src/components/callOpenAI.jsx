import axios from "axios";

const callOpenAI = async (prompt, { temperature, max_tokens }) => {
  try {
    const response = await axios.post("http://localhost:4001/openai/", {
      prompt,
      temperature,
      max_tokens,
    });
    return response.data.choices[0].text;
  } catch (error) {
    console.error("Error calling OpenAI API:", error.message);
    return null;
  }
};

export default callOpenAI;
