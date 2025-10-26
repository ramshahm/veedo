import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  ProdName: { type: String, required: true },
  ProdCode: { type: String, required: true, unique: true },
  CategID: { type: Number },
  ProdDesc: { type: String },
  Status: { type: String, default: "Active" },
  CreatedAt: { type: Date, default: Date.now },
  UpdatedAt: { type: Date, default: Date.now },
  ProdSrtDesc: { type: String },
  Rating: { type: Number, default: 0 },
  ReviewCount: { type: Number, default: 0 },
  price: { type: Number, required: true },
  prodsize: { type: String },
  prodcolor: { type: String },
  OriginalPrice: { type: Number },
  ProdColorCode: { type: String },
});

export default mongoose.model("Product", productSchema);
