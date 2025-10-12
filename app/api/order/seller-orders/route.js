import connectDB from "@/config/db";
import authSeller from "@/lib/authSeller";
import Address from "@/models/Address";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        
        const { userId } = getAuth(request)

        const isSeller = await authSeller(userId)

        if (!isSeller) {
            return NextResponse.json({ success: false, message: 'not authorized' })
        }

        await connectDB()

        await Address.length
        await Product.length


        // Find all products owned by this seller
        const sellerProducts = await Product.find({ userId });
        const sellerProductIds = sellerProducts.map(p => p._id.toString());

        // Find all orders that include at least one product owned by this seller
        const orders = await Order.find({
            'items.product': { $in: sellerProductIds }
        }).populate('address items.product');

        return NextResponse.json({ success: true, orders });

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message })
    }
}