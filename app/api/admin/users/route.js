import { NextResponse } from 'next/server';

// Example: Replace with your real DB logic
let mockUsers = [
  { id: 1, name: "Alice Smith", email: "alice@email.com", status: "active" },
  { id: 2, name: "Bob Johnson", email: "bob@email.com", status: "blocked" },
  { id: 3, name: "Charlie Lee", email: "charlie@email.com", status: "active" },
];

// GET: List all users
export async function GET(request) {
  return NextResponse.json({ users: mockUsers });
}

// POST: Create a new user
export async function POST(request) {
  const data = await request.json();
  const newUser = { id: Date.now(), ...data };
  mockUsers.push(newUser);
  return NextResponse.json({ user: newUser }, { status: 201 });
}

// PATCH: Update a user (edit/block/unblock)
export async function PATCH(request) {
  const data = await request.json();
  const { id, ...updates } = data;
  mockUsers = mockUsers.map(u => u.id === id ? { ...u, ...updates } : u);
  return NextResponse.json({ success: true });
}

// DELETE: Delete a user
export async function DELETE(request) {
  const { id } = await request.json();
  mockUsers = mockUsers.filter(u => u.id !== id);
  return NextResponse.json({ success: true });
}
