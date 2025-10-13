import connectDB from '@/config/db';
import Product from '@/models/Product';
import User from '@/models/User';
import { getAuth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function DELETE(request) {
  try {
    const { userId } = getAuth(request)

    // dev-only bypass header
    const isDevBypass = process.env.NODE_ENV === 'development' && request.headers.get('x-dev-admin') === '1'

    if (!userId && !isDevBypass) return NextResponse.json({ success: false, message: 'Not authenticated' }, { status: 401 })

    await connectDB();


    let user = null;
    if (!isDevBypass) {
      user = await User.findById(userId);
      if (!user) return NextResponse.json({ success: false, message: 'Not authorized' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, message: 'Product ID is required' }, { status: 400 })
    }
    // Find the product first
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
    }

    // Only allow delete if admin or seller owns the product
    if (!isDevBypass && user && !user.isAdmin && product.userId !== userId) {
      return NextResponse.json({ success: false, message: 'Not authorized to delete this product' }, { status: 403 });
    }

    await product.deleteOne();
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}
