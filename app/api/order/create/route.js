

import { inngest } from "@/config/inngest";
import Product from "@/models/Product";
import User from "@/models/User";
import Order from "@/models/Order";
import { getAuth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";



export async function POST(request) {
    try {


    const { userId } = getAuth(request);
    const userData = await currentUser(request);
    const { address, items } = await request.json();

        if (!address || items.length === 0) {
            return NextResponse.json({ success: false, message: 'Invalid data' });
        }



        // Ensure user exists in DB with email
        // Always upsert user with latest info before placing order
        await User.findByIdAndUpdate(
            userId,
            {
                _id: userId,
                name: userData?.firstName && userData?.lastName 
                    ? `${userData.firstName} ${userData.lastName}` 
                    : userData?.username || 'Unknown User',
                email: userData?.emailAddresses?.[0]?.emailAddress || '',
                imageUrl: userData?.imageUrl || '',
                updatedAt: new Date(),
            },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        // calculate amount and update product quantity atomically
        let totalAmount = 0;
        for (const item of items) {
            const product = await Product.findById(item.product);
            if (!product) {
                return NextResponse.json({ success: false, message: `Product not found: ${item.product}` });
            }
            if (product.quantity < item.quantity) {
                return NextResponse.json({ success: false, message: `Not enough stock for ${product.name}` });
            }
            totalAmount += product.offerPrice * item.quantity;
            product.quantity -= item.quantity;
            await product.save();
        }


        // Save the order to the database
        const order = new Order({
            userId,
            address,
            items,
            amount: totalAmount + Math.floor(totalAmount * 0.02),
            status: 'Order Placed',
            date: Date.now()
        });
        await order.save();

        await inngest.send({
            name: 'order/created',
            data: {
                userId,
                address,
                items,
                amount: totalAmount + Math.floor(totalAmount * 0.02),
                date: Date.now()
            }
        });


    // clear user cart
    user.cartItems = {}
    await user.save()

        return NextResponse.json({ success: true, message: 'Order Placed' })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: error.message })
    }
}