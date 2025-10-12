import connectDB from "@/config/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function PATCH(request) {
  try {
    await connectDB();
    const { userId, status } = await request.json();
    if (!userId || !['active', 'blocked'].includes(status)) {
      return NextResponse.json({ success: false, message: 'Invalid input' });
    }
    const user = await User.findByIdAndUpdate(userId, { status }, { new: true });
    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' });
    }
    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
