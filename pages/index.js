import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setImage(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) throw new Error("Failed to generate image");

      const blob = await response.blob();
      const imgUrl = URL.createObjectURL(blob);
      setImage(imgUrl);
    } catch (error) {
      console.error(error);
      alert("Error generating image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">🖼️ Pixpop AI Image Generator</h1>

      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter a prompt..."
        className="w-full max-w-lg p-3 rounded-lg text-black"
      />

      <button
        onClick={generateImage}
        disabled={loading}
        className="mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold"
      >
        {loading ? "Generating..." : "Generate Image"}
      </button>

      {image && (
        <div className="mt-6">
          <img src={image} alt="Generated" className="rounded-xl shadow-lg" />
        </div>
      )}
    </div>
  );
}
