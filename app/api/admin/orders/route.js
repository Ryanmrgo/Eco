import { NextResponse } from 'next/server';

// Example: Replace with your real DB logic
let mockOrders = [
  { id: 1, user: "Alice", product: "Eco Bottle", amount: 2, status: "delivered", date: "2025-09-20" },
  { id: 2, user: "Bob", product: "Reusable Bag", amount: 1, status: "pending", date: "2025-09-22" },
];

// GET: List all orders
export async function GET(request) {
  return NextResponse.json({ orders: mockOrders });
}

// POST: Create a new order (optional for admin)
export async function POST(request) {
  const data = await request.json();
  const newOrder = { id: Date.now(), ...data };
  mockOrders.push(newOrder);
  return NextResponse.json({ order: newOrder }, { status: 201 });
}

// PATCH: Update an order (status/details)
export async function PATCH(request) {
  const data = await request.json();
  const { id, ...updates } = data;
  mockOrders = mockOrders.map(o => o.id === id ? { ...o, ...updates } : o);
  return NextResponse.json({ success: true });
}

// DELETE: Delete an order
export async function DELETE(request) {
  const { id } = await request.json();
  mockOrders = mockOrders.filter(o => o.id !== id);
  return NextResponse.json({ success: true });
}
