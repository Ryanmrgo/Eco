import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import WasteReport from "@/models/WasteReport";

export async function DELETE(req, { params }) {
  await connectDB();
  const { id } = params;
  const deleted = await WasteReport.findByIdAndDelete(id);
  if (!deleted) {
    return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
