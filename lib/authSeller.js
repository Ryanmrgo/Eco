import { clerkClient } from '@clerk/nextjs/server';
import connectDB from '@/config/db'
import User from '@/models/User'

const authSeller = async (userId) => {
    if (!userId) return false;
    try {
        // try local DB first
        await connectDB()
        const local = await User.findById(userId)
        // console.log("Local = ", local)
        // Fix here
        if (local && local.role === 'buyer') return true

        // fallback to Clerk if available and mirror role to local DB
        if (clerkClient && clerkClient.users) {
            const remote = await clerkClient.users.getUser(userId)
            const isSeller = Boolean(remote?.publicMetadata?.role === 'seller')
            if (local) {
                local.role = isSeller ? 'seller' : local.role || 'buyer'
                await local.save()
            } else if (remote) {
                await User.create({ _id: userId, name: `${remote.firstName || ''} ${remote.lastName || ''}`.trim() || remote.username || 'Unknown', email: remote.emailAddresses?.[0]?.emailAddress || '', imageUrl: remote.imageUrl || '', role: isSeller })
            }

            return isSeller
        }
        return false
    } catch (error) {
        console.error('authSeller error:', error);
        return false;
    }
}

export default authSeller;