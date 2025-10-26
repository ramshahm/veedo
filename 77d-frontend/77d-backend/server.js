import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/products.js";

dotenv.config();
const app = express();

connectDB();
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/products", productRoutes);
app.get('/', (req, res) => {
  res.send('API is working');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
