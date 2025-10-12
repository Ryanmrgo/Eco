'use client'
import React, { useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const AddProduct = () => {

  const { getToken, user } = useAppContext()

  const [files, setFiles] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Plastic');
  const [price, setPrice] = useState('');
  const [offerPrice, setOfferPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [productType, setProductType] = useState('Refined');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData()

  formData.append('name', name)
  formData.append('description', description)
  formData.append('category', category)
  formData.append('price', price)
  formData.append('offerPrice', offerPrice)
  formData.append('quantity', quantity)
  formData.append('productType', productType)

    for (let i = 0; i < files.length; i++) {
      formData.append('images',files[i])
    }

    try {
      const token = await getToken()
      const { data } = await axios.post('/api/product/add', formData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (data.success) {
        toast.success(data.message)
        setFiles([]);
        setName('');
        setDescription('');
        setCategory('Plastic');
        setPrice('');
        setOfferPrice('');
      } else {
        toast.error('Upload failed: ' + (data.message || 'Unknown error'));
        toast('Debug: ' + JSON.stringify(data), { icon: '🐞' })
      }
    } catch (error) {
      const msg = error?.response?.data?.message || error.message || 'Unknown error';
      toast.error('Upload failed: ' + msg)
      toast('Debug: ' + JSON.stringify(error?.response?.data || error), { icon: '🐞' })
    }


  };

  async function promoteToSeller() {
    try {
      // use fetch with credentials to ensure Clerk session cookie is sent
      const res = await fetch('/api/dev/make-seller', { method: 'POST', credentials: 'include' })
      const data = await res.json()
      if (data && data.success) {
        toast.success('Promoted to seller (dev)')
      } else {
        toast.error(data?.message || 'Failed to promote')
      }
    } catch (err) {
      toast.error(err?.message || 'Failed to promote')
    }
  }

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-5 max-w-lg">
        <div>
          <p className="text-base font-medium">Product Image</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">

            {[...Array(4)].map((_, index) => (
              <label key={index} htmlFor={`image${index}`}>
                <input onChange={(e) => {
                  const updatedFiles = [...files];
                  updatedFiles[index] = e.target.files[0];
                  setFiles(updatedFiles);
                }} type="file" id={`image${index}`} hidden />
                <Image
                  key={index}
                  className="max-w-24 cursor-pointer"
                  src={files[index] ? URL.createObjectURL(files[index]) : assets.upload_area}
                  alt=""
                  width={100}
                  height={100}
                />
              </label>
            ))}

          </div>
        </div>
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="product-name">
            Product Name
          </label>
          <input
            id="product-name"
            type="text"
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>
        <div className="flex flex-col gap-1 max-w-md">
          <label
            className="text-base font-medium"
            htmlFor="product-description"
          >
            Product Description
          </label>
          <textarea
            id="product-description"
            rows={4}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
            placeholder="Type here"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          ></textarea>
        </div>
  <div className="flex items-center gap-5 flex-wrap">
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setCategory(e.target.value)}
              defaultValue={category}
            >
              <option value="Plastics">Plastics</option>
              <option value="Glass">Glass</option>
              <option value="Paper">Paper</option>
              <option value="Metals">Metals</option>
              <option value="Electronics">Electronics</option>
              <option value="Textiles">Textiles</option>
              <option value="HomeMade">HomeMade</option>
            </select>
          </div>
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="product-type">
              Product Type
            </label>
            <select
              id="product-type"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              value={productType}
              onChange={e => setProductType(e.target.value)}
              required
            >
              <option value="Refined">Refined</option>
              <option value="Raw">Raw</option>
            </select>
          </div>
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="product-quantity">
              Product Quantity
            </label>
            <input
              id="product-quantity"
              type="number"
              min={0}
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setQuantity(e.target.value)}
              value={quantity}
              required
            />
          </div>
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="product-price">
              Product Price
            </label>
            <input
              id="product-price"
              type="number"
              min={0}
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
            />
          </div>
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="offer-price">
              Offer Price
            </label>
            <input
              id="offer-price"
              type="number"
              min={0}
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setOfferPrice(e.target.value)}
              value={offerPrice}
              required
            />
          </div>
        </div>
  <button type="submit" className="px-8 py-2.5 bg-green-600 text-white font-medium rounded">
          ADD
        </button>
      </form>
      {/* <Footer /> */}
    </div>
  );
};

export default AddProduct;