import connectDB from '@/config/db'
import Product from '@/models/Product'
import User from '@/models/User'
import { NextResponse } from 'next/server'
import { getAuth } from '@clerk/nextjs/server'

export async function PATCH(request, { params }) {
  try {
    const { userId } = getAuth(request)

    // dev-only bypass header
    const isDevBypass = process.env.NODE_ENV === 'development' && request.headers.get('x-dev-admin') === '1'

    if (!userId && !isDevBypass) {
      return NextResponse.json({ success: false, message: 'Not authenticated' }, { status: 401 })
    }

    await connectDB()

    // verify user is admin (skip check if dev bypass)
    if (!isDevBypass) {
      const user = await User.findById(userId)
      if (!user || !user.isAdmin) {
        return NextResponse.json({ success: false, message: 'Not authorized' }, { status: 403 })
      }
    }

    const id = params?.id
    if (!id) {
      return NextResponse.json({ success: false, message: 'Product id is required' }, { status: 400 })
    }

    const updated = await Product.findByIdAndUpdate(id, { approved: true }, { new: true })
    if (!updated) {
      return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, product: updated }, { status: 200 })
  } catch (error) {
    console.error('Error approving product:', error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}
