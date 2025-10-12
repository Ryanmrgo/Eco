import { getAuth, clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function GET(request) {
  try {
    if (process.env.NODE_ENV !== 'development') {
      return NextResponse.json({ success: false, message: 'Not allowed' }, { status: 403 })
    }

    const { userId } = getAuth(request)
    if (!userId) return NextResponse.json({ success: false, message: 'Not authenticated' }, { status: 401 })

    const user = await clerkClient.users.getUser(userId)

    return NextResponse.json({ success: true, userId, publicMetadata: user.publicMetadata })
  } catch (err) {
    console.error('dev/whoami error', err)
    return NextResponse.json({ success: false, message: err.message }, { status: 500 })
  }
}
