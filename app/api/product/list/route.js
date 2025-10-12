import connectDB from '@/config/db'
import Product from '@/models/Product'
import { NextResponse } from 'next/server'

export async function GET(request) {
    try {

        await connectDB()
        const { searchParams } = new URL(request.url)
        const includeUnapproved = searchParams.get('includeUnapproved') === 'true'

        const filter = includeUnapproved ? {} : { approved: true }
        const products = await Product.find(filter)
        return NextResponse.json({ success:true, products })

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message })
    }
}