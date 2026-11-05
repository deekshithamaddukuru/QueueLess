import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  customerName: { type: String, required: true, trim: true, maxlength: 60 },
  service: { type: String, required: true, enum: ["Hospital", "Bank", "College Office"] },
  tokenNumber: { type: Number, required: true },
  status: { type: String, enum: ["waiting", "serving", "completed", "cancelled"], default: "waiting" },
  createdAt: { type: Date, default: Date.now }
});

tokenSchema.index({ service: 1, createdAt: 1 });

export default mongoose.model("Token", tokenSchema);
