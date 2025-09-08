import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import WasteReport from "@/models/WasteReport";
import { Parser } from "json2csv";

export async function GET() {
  await connectDB();
  const reports = await WasteReport.find().sort({ createdAt: -1 });

  // Convert to CSV
  const fields = ["_id", "locationName", "photoUrl", "createdAt"];
  const opts = { fields };
  const parser = new Parser(opts);
  const csv = parser.parse(reports.map(r => r.toObject()));

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=waste-reports.csv"
    }
  });
}
