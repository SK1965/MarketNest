import { useState } from "react";
import axios from "axios";
import ThumbnailImage from "../components/ThumbnailImage";
import ProductImages from "../components/ProductImages";
import ProductFile from "../components/ProductFile";
import { usecheckLogin } from "../store/CreatorContext";

export default function AddProduct() {
  const [productName, setProductName] = useState('');
  const [productType, setProductType] = useState('');
  const [description, setDescription] = useState('');
  const [productFile, setProductFile] = useState(null);
  const [price, setPrice] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [images, setImages] = useState([]);
  const [mrp, setMRP] = useState('');
  const [format, setFormat] = useState('');
  const [isResponsive, setIsResponsive] = useState('');
  const [isCustomizable, setIsCustomizable] = useState('');

  const { onUpdate } = usecheckLogin();
  const logindata = JSON.parse(localStorage.getItem("clogindata")) || { user: { products: [] } };
  const userProducts = logindata.user.products || [];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('productType', productType);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('mrp', mrp);
    formData.append('format', format);
    formData.append('isResponsive', isResponsive);
    formData.append('isCustomizable', isCustomizable);
    formData.append('creator', logindata.user.username);

    if (thumbnail) formData.append('thumbnail', thumbnail);
    images.forEach((image, index) => formData.append(`images`, image));
    if (productFile) formData.append('productFile', productFile);

    try {
      const response = await fetch('/server/creators/createproduct', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const updatedProducts = Array.isArray(userProducts) ? [...userProducts, data.product._id] : [data.product._id];
      
      if (logindata.login) {
        const serversendingdata = {
          id: logindata.user._id,
          data: { products: updatedProducts }
        };
        try {
          const response = await axios.post("/server/updatecreator", serversendingdata);
          const newLoginData = { login: true, user: response.data };
          onUpdate(newLoginData);
          localStorage.setItem("clogindata", JSON.stringify(newLoginData));
          // Reset form fields
          setProductName('');
          setProductType('');
          setDescription('');
          setProductFile(null);
          setPrice('');
          setThumbnail(null);
          setImages([]);
          setMRP('');
          setFormat('');
          setIsResponsive('');
          setIsCustomizable('');
          // Add user feedback for successful addition
        } catch (error) {
          console.error("Error updating creator:", error);
          // Add user feedback for update error
        }
      }
    } catch (error) {
      console.error('Error adding product:', error);
      // Add user feedback for product addition error
    }
  };

  return (
    <div className="w-screen bg-gradient-to-r from-gray-200 via-slate-200 to-white-200">
      <div className="max-w-2xl min-h-screen mx-auto p-4 pt-6">
        <h2 className="text-4xl font-bold mb-4 pt-4 text-center">Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="productName" className="block mb-1 bg-transparent border-gray-900">Product Name</label>
            <input
              type="text"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-transparent border-gray-900"
              required
            />
          </div>

          <div>
            <label htmlFor="productType" className="block mb-1">Product Type</label>
            <select
              id="productType"
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              className="w-full text-lg px-3 py-2 border rounded-md bg-transparent border-gray-900"
              required
            >
              <option value="">Select a product type</option>
              <option value="Templates">Templates</option>
              <option value="Designs">Designs</option>
              <option value="Photos">Cards</option>
            </select>
          </div>

          <div>
            <label htmlFor="description" className="block mb-1">Product Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-transparent border-gray-900"
              rows="4"
              required
            ></textarea>
          </div>

          <div>
            <label htmlFor="price" className="block mb-1">Price</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-transparent border-gray-900"
              required
            />
          </div>

          <div>
            <label htmlFor="mrp" className="block mb-1">MRP</label>
            <input
              type="text"
              id="mrp"
              value={mrp}
              onChange={(e) => setMRP(e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-transparent border-gray-900"
              required
            />
          </div>

          <div>
            <label htmlFor="format" className="block mb-1">Format (pdf, jpg, docx, etc)</label>
            <input
              type="text"
              id="format"
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-transparent border-gray-900"
              required
            />
          </div>

          <div>
            <label htmlFor="isResponsive" className="block mb-1">is Responsive?</label>
            <input
              type="text"
              id="isResponsive"
              value={isResponsive}
              onChange={(e) => setIsResponsive(e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-transparent border-gray-900"
              required
            />
          </div>

          <div>
            <label htmlFor="isCustomizable" className="block mb-1">is Customizable?</label>
            <input
              type="text"
              id="isCustomizable"
              value={isCustomizable}
              onChange={(e) => setIsCustomizable(e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-transparent border-gray-900"
              required
            />
          </div>

          <ThumbnailImage setThumbnail={setThumbnail} thumbnail={thumbnail} />
          <ProductImages setImages={setImages} images={images} />
          <ProductFile setProductFile={setProductFile} productFile={productFile} />

          <div className="flex justify-center">
            <button type="submit" className="bg-blue-500 text-white px-8 py-4 rounded-md my-4 hover:bg-green-600">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}