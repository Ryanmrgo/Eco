import connectDB from "@/config/db";
import WasteReport from "@/models/WasteReport";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const reports = await WasteReport.find({});
    return NextResponse.json({ success: true, reports });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
