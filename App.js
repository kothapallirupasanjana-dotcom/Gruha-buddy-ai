import React, { useState } from "react";
import "./App.css";

function App() {
  const [roomType, setRoomType] = useState("");
  const [budget, setBudget] = useState("");
  const [style, setStyle] = useState("");
  const [color, setColor] = useState("");
  const [design, setDesign] = useState("");
  const [imageUrl, setImageUrl] = useState(""); 
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setDesign("");
    setImageUrl("");

    try {
      const response = await fetch("http://localhost:5000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomType, budget, style, color }),
      });

      const data = await response.json();
      setDesign(data.design || "No design returned");
      if (data.imageUrl) setImageUrl(data.imageUrl);
    } catch (error) {
      console.error(error);
      setDesign("Error generating design. Check backend.");
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>GruhaBuddy AI</h1>

      <label>Room Type:</label>
      <input type="text" placeholder="e.g. Bedroom" value={roomType} onChange={(e) => setRoomType(e.target.value)} />

      <label>Budget:</label>
      <input type="text" placeholder="e.g. 50000 INR" value={budget} onChange={(e) => setBudget(e.target.value)} />

      <label>Style:</label>
      <input type="text" placeholder="e.g. Modern" value={style} onChange={(e) => setStyle(e.target.value)} />

      <label>Color:</label>
      <input type="text" placeholder="e.g. White" value={color} onChange={(e) => setColor(e.target.value)} />

      <button onClick={handleGenerate}>{loading ? "Generating..." : "Generate Design"}</button>

      {loading && <div className="loader"></div>}

      {design && (
        <div className="ai-result">
          <h3>AI Design:</h3>
          {design}
        </div>
      )}

      {imageUrl && (
        <div className="ai-result">
          <h3>AI Image:</h3>
          <img src={imageUrl} alt="Room Design" />
        </div>
      )}
    </div>
  );
}

export default App;