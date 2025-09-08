import { NextResponse } from "next/server";

import connectDB from "@/config/db";
import WasteReport from "@/models/WasteReport";
import cloudinary from "@/lib/cloudinary";

export async function POST(req) {
  await connectDB();
  const formData = await req.formData();
  const locationName = formData.get("locationName");
  const photo = formData.get("photo");

  // Upload photo to Cloudinary and save only the URL
  let photoUrl = null;
  if (photo && typeof photo.arrayBuffer === "function") {
    const buffer = Buffer.from(await photo.arrayBuffer());
    const uploadRes = await cloudinary.uploader.upload_stream({
      folder: "waste-reports",
      resource_type: "image",
    }, async (error, result) => {
      if (error) throw error;
      photoUrl = result.secure_url;
    });
    // Use stream to upload
    const stream = uploadRes;
    stream.end(buffer);
    // Wait for upload to finish
    await new Promise((resolve, reject) => {
      stream.on('finish', resolve);
      stream.on('error', reject);
    });
  }

  const report = await WasteReport.create({
    locationName,
    photoUrl,
  });

  return NextResponse.json({ success: true, report });
}

export async function GET() {
  await connectDB();
  const reports = await WasteReport.find().sort({ createdAt: -1 });
  return NextResponse.json({ reports });
}
