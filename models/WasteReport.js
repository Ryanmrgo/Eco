import mongoose from "mongoose";

const WasteReportSchema = new mongoose.Schema({
  locationName: { type: String, required: true },
  photoUrl: { type: String }, // URL to photo in storage (optional for now)
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.WasteReport || mongoose.model("WasteReport", WasteReportSchema);
