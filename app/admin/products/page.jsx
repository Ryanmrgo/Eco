"use client";
import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { useAppContext } from '@/context/AppContext';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function ProductsPage() {
  const { fetchProductData } = useAppContext();
  const [products, setProducts] = useState([]);
  const [tab, setTab] = useState("all");
  const [loading, setLoading] = useState(false);
  const [busyId, setBusyId] = useState(null);

  async function fetchProducts() {
    try {
      setLoading(true)
      const { data } = await axios.get('/api/product/list?includeUnapproved=true');
      if (data && data.products) {
        // normalize to expected shape
        setProducts(data.products.map(p => ({ id: p._id, name: p.name, seller: p.userId, status: p.approved ? 'approved' : 'pending', price: p.offerPrice || p.price || 0, date: p.date || 0, thumbnail: (p.image && p.image[0]) || null })));
      }
    } catch (e) {
      console.error(e)
      toast.error('Failed to load products')
    } finally { setLoading(false) }
  }

  useEffect(() => {
    fetchProducts();
  }, [])

  async function handleApprove(id) {
    try {
      setBusyId(id)
      const headers = {}
      if (process.env.NODE_ENV === 'development') headers['x-dev-admin'] = '1'
      const { data } = await axios.patch(`/api/product/approve/${id}`, null, { headers });
      if (data && data.success) {
        setProducts(products.map(p => p.id === id ? { ...p, status: 'approved' } : p))
        toast.success('Product approved')
        // refresh public product list
        try { fetchProductData() } catch {}
      } else {
        toast.error((data && data.message) || 'Approve failed')
      }
    } catch (e) {
      console.error(e)
      const msg = e?.response?.data?.message || e.message || 'Approve failed'
      toast.error(msg)
    } finally { setBusyId(null) }
  }

  async function handleReject(id) {
    try {
      setBusyId(id)
      const headers = {}
      if (process.env.NODE_ENV === 'development') headers['x-dev-admin'] = '1'
      const { data } = await axios.delete(`/api/product/delete?id=${id}`, { headers });
      if (data && data.success) {
        setProducts(products.filter(p => p.id !== id))
        toast.success('Product deleted')
        try { fetchProductData() } catch {}
      } else {
        toast.error((data && data.message) || 'Delete failed')
      }
    } catch (e) {
      console.error(e)
      const msg = e?.response?.data?.message || e.message || 'Delete failed'
      toast.error(msg)
    } finally { setBusyId(null) }
  }

  async function promoteToSeller() {
    try {
      const { data } = await axios.post('/api/dev/make-seller');
      if (data && data.success) {
        toast.success('Promoted to seller (dev)')
        // refresh both admin and public lists
        fetchProducts();
        try { fetchProductData() } catch {}
      } else {
        toast.error((data && data.message) || 'Failed to promote')
      }
    } catch (e) {
      const msg = e?.response?.data?.message || e.message || 'Failed'
      toast.error(msg)
    }
  }

  const filtered = tab === 'all' ? products : products.filter(p => p.status === tab);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">Products Management</h1>
        <div className="flex gap-4 mb-6 items-center">
            <div className="flex gap-2">
            <button className={`px-4 py-2 rounded ${tab === "all" ? "bg-blue-600 text-white" : "bg-gray-200"}`} onClick={() => setTab("all")}>All</button>
            <button className={`px-4 py-2 rounded ${tab === "pending" ? "bg-yellow-500 text-white" : "bg-gray-200"}`} onClick={() => setTab("pending")}>Pending</button>
            <button className={`px-4 py-2 rounded ${tab === "approved" ? "bg-green-600 text-white" : "bg-gray-200"}`} onClick={() => setTab("approved")}>Approved</button>
          </div>
            <div className="ml-auto flex items-center gap-4">
              {/* counts */}
              <div className="text-sm text-gray-600">
                <span className="font-medium">Total:</span> {products.length} &nbsp; 
                <span className="font-medium">Approved:</span> {products.filter(p => p.status === 'approved').length} &nbsp;
                <span className="font-medium">Pending:</span> {products.filter(p => p.status === 'pending').length}
              </div>
              <div className="flex items-center gap-2">
              <button onClick={fetchProducts} className="px-3 py-1 bg-gray-200 rounded">Refresh</button>
            
              {loading && <span className="text-sm text-gray-500">Loading...</span>}
              </div>
            </div>
        </div>

        <table className="w-full border mb-6">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Product</th>
              <th className="p-2">Seller</th>
              <th className="p-2">Price</th>
              <th className="p-2">Date</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={6} className="text-center p-4">No products found.</td></tr>
            )}
            {filtered.map(p => (
              <tr key={p.id} className="border-t">
                <td className="p-2 flex items-center gap-3">
                  {p.thumbnail ? <img src={p.thumbnail} alt="thumb" className="w-12 h-12 object-cover rounded" /> : <div className="w-12 h-12 bg-gray-200 rounded" />}
                  <div>
                    <div className="font-medium">{p.name}</div>
                  </div>
                </td>
                <td className="p-2 text-center">{p.seller}</td>
                <td className="p-2 text-center">{(p.price/100).toFixed(2)}</td>
                <td className="p-2 text-center">{p.date ? new Date(Number(p.date)).toLocaleString() : '-'}</td>
                <td className="p-2 text-center">
                  <span className={`px-2 py-1 rounded-full text-sm ${p.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-800'}`}>{p.status}</span>
                </td>
                <td className="p-2 text-center">
                  {p.status === 'pending' ? (
                    <div className="flex justify-center gap-2">
                      <button disabled={busyId === p.id} className={`px-3 py-1 rounded ${busyId === p.id ? 'bg-gray-300' : 'bg-green-600 text-white'}`} onClick={() => handleApprove(p.id)}>{busyId === p.id ? 'Working...' : 'Approve'}</button>
                      <button disabled={busyId === p.id} className={`px-3 py-1 rounded ${busyId === p.id ? 'bg-gray-300' : 'bg-red-600 text-white'}`} onClick={() => handleReject(p.id)}>{busyId === p.id ? 'Working...' : 'Delete'}</button>
                    </div>
                  ) : (
                    <span className="text-gray-500">No actions</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
