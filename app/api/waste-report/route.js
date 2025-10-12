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
    photoUrl = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "waste-reports",
          resource_type: "image",
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result.secure_url);
        }
      );
      stream.end(buffer);
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
