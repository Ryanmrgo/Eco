import connectDB from "@/config/db";
import User from "@/models/User";
import { getAuth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function GET(request) {
    
    try {
        
        const { userId } = getAuth(request)
        const userData = await currentUser(request)

        await connectDB()
        let user = await User.findById(userId)

        if (!user) {
            // Create a new user if not found
            user = new User({
                _id: userId,
                name: userData?.firstName && userData?.lastName 
                    ? `${userData.firstName} ${userData.lastName}` 
                    : userData?.username || 'Unknown User',
                email: userData?.emailAddresses?.[0]?.emailAddress || '',
                imageUrl: userData?.imageUrl || '',
                // Add any default fields you want for new users
                createdAt: new Date(),
                updatedAt: new Date()
            })
            
            await user.save()
        }

        return NextResponse.json({success: true, user})

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message })
    }
}