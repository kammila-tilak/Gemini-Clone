import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyDt0HWJyphuhqwv9Ig_YgQ5vT02-gd3V3g");

async function runChat(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent([prompt]);
  const response = await result.response;
  const text = await response.text();

  console.log(text);
  return response.text();
}

export default runChat;

