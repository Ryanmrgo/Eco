import mongoose from "mongoose";

const WasteReportSchema = new mongoose.Schema({
  locationName: { type: String, required: true },
  photoUrl: { type: String }, // URL to photo in storage (optional for now)
  lng: { type: Number },
  lat: { type: Number },
  createdAt: { type: Date, default: Date.now },
  confirmed: { type: Boolean, default: false },
});

export default mongoose.models.WasteReport || mongoose.model("WasteReport", WasteReportSchema);
