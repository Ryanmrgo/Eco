import connectDB from "@/config/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    let users = await User.find({});
    // Ensure status is always present for backward compatibility
    users = users.map(u => ({ ...u.toObject(), status: u.status || 'active' }));
    return NextResponse.json({ success: true, users });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
