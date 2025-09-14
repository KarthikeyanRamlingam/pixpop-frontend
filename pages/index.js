import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    setLoading(true);
    setImage(null);

    const response = await fetch("https://huggingface.co/spaces/karthikn11/Pixpopai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: [prompt] }),
    });

    const result = await response.json();
    const imgUrl = result.data[0]; // Hugging Face returns image URL/base64
    setImage(imgUrl);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">🖼️ AI Image Generator</h1>

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




