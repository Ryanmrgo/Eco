import { getAuth, clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    if (process.env.NODE_ENV !== 'development') {
      return NextResponse.json({ success: false, message: 'Not allowed' }, { status: 403 })
    }

      const { userId } = getAuth(request)
      console.log('/api/dev/make-seller called, NODE_ENV=', process.env.NODE_ENV)
      if (!userId) {
        console.log('make-seller: no userId from getAuth')
        return NextResponse.json({ success: false, message: 'Not authenticated' }, { status: 401 })
      }

      console.log('make-seller: promoting user', userId)
      // update Clerk user's publicMetadata
      const updated = await clerkClient.users.updateUser(userId, { publicMetadata: { role: 'seller' } })
      console.log('make-seller: update result', updated?.publicMetadata)

      return NextResponse.json({ success: true, message: 'User promoted to seller', userId, publicMetadata: updated?.publicMetadata })
  } catch (error) {
    console.error('dev/make-seller error', error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}
