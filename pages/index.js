import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateImage = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt");
      return;
    }

    setLoading(true);
    setImage(null);
    setError("");

    try {
      const response = await fetch(
        "https://karthikn11-pixpopai.hf.space/api/predict/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            data: [prompt] // Hugging Face expects `data` array
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const result = await response.json();
      console.log("HF API result:", result);

      // The image usually comes as result.data[0] (base64 or URL)
      const imgUrl = result.data[0];
      setImage(imgUrl);
    } catch (err) {
      console.error(err);
      setError("Failed to generate image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-6">🎨 PixpopAI</h1>
      <p className="mb-4 text-gray-300">Enter a prompt and generate AI images</p>

      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="e.g. A futuristic city at night"
        className="w-full max-w-lg p-3 rounded-lg

