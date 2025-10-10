import { NextResponse } from 'next/server';

// Example: Replace with your real DB logic
let mockProducts = [
  { id: 1, name: "Eco Water Bottle", seller: "Alice Smith", status: "pending" },
  { id: 2, name: "Reusable Bag", seller: "Bob Johnson", status: "approved" },
  { id: 3, name: "Solar Charger", seller: "Charlie Lee", status: "pending" },
];

// GET: List all products
export async function GET(request) {
  return NextResponse.json({ products: mockProducts });
}

// POST: Create a new product
export async function POST(request) {
  const data = await request.json();
  const newProduct = { id: Date.now(), ...data };
  mockProducts.push(newProduct);
  return NextResponse.json({ product: newProduct }, { status: 201 });
}

// PATCH: Update a product (approve/reject/update)
export async function PATCH(request) {
  const data = await request.json();
  const { id, ...updates } = data;
  mockProducts = mockProducts.map(p => p.id === id ? { ...p, ...updates } : p);
  return NextResponse.json({ success: true });
}

// DELETE: Delete a product
export async function DELETE(request) {
  const { id } = await request.json();
  mockProducts = mockProducts.filter(p => p.id !== id);
  return NextResponse.json({ success: true });
}
