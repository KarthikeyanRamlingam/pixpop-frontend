import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [size, setSize] = useState("1024x1024");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    setLoading(true);
    setImage(null);
    try {
      const response = await axios.post(
        "https://<your-space>.hf.space/run/predict",
        {
          data: [prompt, size] // send prompt + size
        }
      );
      const base64 = response.data.data[0];
      setImage(base64);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  // Download function
  const downloadImage = () => {
    if (!image) return;
    const link = document.createElement("a");
    link.href = image;
    link.download = "ai-image.png";
    link.click();
  };

  return (
    <div className="container">
      <h1>AI Image Generator 🎨</h1>

      {/* Input Section */}
      <div className="input-section">
        <input
          type="text"
          placeholder="Enter your prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <select value={size} onChange={(e) => setSize(e.target.value)}>
          <option value="512x512">512x512</option>
          <option value="768x768">768x768</option>
          <option value="1024x1024">1024x1024</option>
        </select>

        <button onClick={generateImage}>Generate</button>
      </div>

      {/* Spinner */}
      {loading && (
        <div className="spinner">
          <div className="loader" />
          <p>Generating...</p>
        </div>
      )}

      {/* Result */}
      {image && (
        <div className="result">
          <h3>Result:</h3>
          <img src={image} alt="Generated" />
          <button onClick={downloadImage}>Download Image</button>
        </div>
      )}

      {/* Styles */}
      <style jsx>{`
        .container {
          text-align: center;
          padding: 30px;
          font-family: Arial, sans-serif;
        }

        .input-section {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 20px;
        }

        input,
        select,
        button {
          padding: 10px;
          font-size: 16px;
        }

        button {
          background: #3498db;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        button:hover {
          background: #2980b9;
        }

        .spinner {
          margin-top: 20px;
        }

        .loader {
          border: 6px solid #f3f3f3;
          border-top: 6px solid #3498db;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          margin: 0 auto;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .result img {
          max-width: 90%;
          height: auto;
          margin-top: 20px;
          border-radius: 10px;
        }

        .result button {
          margin-top: 15px;
          padding: 10px 20px;
          background: green;
        }

        /* Mobile Styles */
        @media (max-width: 600px) {
          input {
            width: 100%;
          }
          select {
            width: 100%;
          }
          button {
            width: 100%;
          }
          .input-section {
            flex-direction: column;
            align-items: stretch;
          }
        }
      `}</style>
    </div>
  );
}
