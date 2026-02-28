import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

// ----------------------
// Dummy AI Generate Route
// ----------------------
app.post("/generate", (req, res) => {
  const { roomType, budget, style, color } = req.body;

  try {
    const design = `Sample ${style} ${roomType} design\n- Budget: ${budget}\n- Main Color: ${color}\n- Features: Spacious, well-lit, modern furniture.`;

    const imageUrl = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80";

    res.json({ design, imageUrl });
  } catch (error) {
    console.error("Dummy generation error:", error);
    res.status(500).json({ error: "Dummy generation error" });
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("Backend is working");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});