import connectDB from '@/config/db'
import User from '@/models/User'
import { getAuth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function POST(request) {
    try {
        const { userId } = getAuth(request)

        const { productId } = await request.json()

        await connectDB()
        const user = await User.findById(userId)

        if (!user) {
            return NextResponse.json({ success: false, message: 'User not found' })
        }

        const wishlist = user.wishlist || []
        const index = wishlist.indexOf(productId)
        if (index === -1) {
            wishlist.push(productId)
        } else {
            wishlist.splice(index, 1)
        }

        user.wishlist = wishlist
        await user.save()

        return NextResponse.json({ success: true, wishlist })
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message })
    }
}
