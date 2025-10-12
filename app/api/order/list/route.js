import connectDB from "@/config/db";
import Address from "@/models/Address";
import Order from "@/models/Order";
import Product from "@/models/Product";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        await connectDB();
        await Address.length;
        await Product.length;

        // Get all orders
    let orders = await Order.find({}).sort({ date: -1 }).populate('address items.product');

        // Attach user email to each order
        const userIds = [...new Set(orders.map(o => o.userId))];
        const users = await User.find({ _id: { $in: userIds } });
        const userMap = {};
        users.forEach(u => { userMap[u._id] = u.email; });
        orders = orders.map(o => ({
            ...o.toObject(),
            userEmail: userMap[o.userId] || o.userId
        }));

        return NextResponse.json({ success: true, orders });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}