import React, { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, Search, Filter, X, Image as ImageIcon, CheckCircle2 } from "lucide-react";
import { db, storage } from "../../firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

const uploadImage = async (file) => {
  const storageRef = ref(storage, `products/${Date.now()}-${file.name}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
};

const saveProduct = async (productData) => {
  await addDoc(collection(db, "products"), productData);
};

const Products = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStage, setSubmitStage] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const snapshot = await getDocs(collection(db, "products"));
      const list = snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));
      setProducts(list);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setSubmitError("");
    setSubmitStage("");

    if (
      !formData.name.trim() ||
      !formData.price ||
      !formData.stock ||
      !formData.category.trim() ||
      !formData.description.trim() ||
      !imageFile
    ) {
      return alert("Fill all fields");
    }

    try {
      setIsSubmitting(true);
      setSubmitStage("Uploading image...");
      const imageUrl = await uploadImage(imageFile);

      setSubmitStage("Saving product...");
      await saveProduct({
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        imageUrl,
        createdAt: serverTimestamp(),
      });

      setFormData({
        name: "",
        price: "",
        stock: "",
        category: "",
        description: "",
      });
      setImageFile(null);
      setIsOpen(false);
      setSubmitStage("");

      await fetchProducts();
    } catch (error) {
      console.error("Product add failed:", error);
      const message = `${error?.code || "unknown_error"}: ${error?.message || "Unable to save product"}`;
      setSubmitError(message);
      alert(`Product save failed\n${message}`);
    } finally {
      setSubmitStage("");
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-8 bg-slate-50/50 min-h-screen animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Products</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">
            Manage your inventory, pricing and stock levels.
          </p>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 active:scale-95"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          <span className="font-semibold text-sm">Add Product</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1 max-w-md group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-100/50 transition-all text-sm text-slate-600 shadow-sm"
          />
        </div>
        <button className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-2xl text-slate-600 hover:bg-slate-50 transition-all text-sm font-semibold shadow-sm">
          <Filter size={18} />
          Filters
        </button>
      </div>

      <div className="bg-white rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="p-6 text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400">Item Details</th>
                <th className="p-6 text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400">Category</th>
                <th className="p-6 text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400">Price</th>
                <th className="p-6 text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400">Stock Availability</th>
                <th className="p-6 text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400">Status</th>
                <th className="p-6 text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-50">
              {products.map((product) => (
                <tr key={product.id} className="group hover:bg-indigo-50/20 transition-all duration-300">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="relative shrink-0">
                        <img
                          src={product.imageUrl || product.image}
                          alt={product.name}
                          className="w-14 h-14 rounded-2xl object-cover ring-4 ring-white shadow-md group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div>
                        <span className="block font-bold text-slate-800 text-sm group-hover:text-indigo-600 transition-colors">
                          {product.name}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">ID: #{product.id}</span>
                      </div>
                    </div>
                  </td>

                  <td className="p-6">
                    <span className="text-slate-500 text-xs font-semibold bg-slate-100 px-3 py-1 rounded-lg">
                      {product.category}
                    </span>
                  </td>

                  <td className="p-6">
                    <span className="font-extrabold text-slate-900 text-sm tracking-tight">
                      ₹{Number(product.price || 0).toLocaleString("en-IN")}
                    </span>
                  </td>

                  <td className="p-6 text-sm">
                    {Number(product.stock || 0) === 0 ? (
                      <div className="flex items-center gap-2 text-red-500">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="font-bold text-xs uppercase tracking-wider">Sold Out</span>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${Number(product.stock || 0) < 6 ? "bg-orange-400" : "bg-green-500"}`} />
                          <span className="text-slate-700 font-bold text-xs uppercase tracking-wider">{product.stock} Units</span>
                        </div>
                        <div className="w-24 h-1 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${Number(product.stock || 0) < 6 ? "bg-orange-400" : "bg-green-500"}`}
                            style={{ width: `${Math.min(Number(product.stock || 0) * 10, 100)}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </td>

                  <td className="p-6">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest
                      ${Number(product.stock || 0) === 0
                        ? "bg-slate-100 text-slate-400"
                        : "bg-green-100 text-green-700"}`}>
                      {Number(product.stock || 0) === 0 ? "Offline" : "Live"}
                    </span>
                  </td>

                  <td className="p-6 text-center">
                    <div className="flex justify-center items-center gap-2">
                      <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-white hover:shadow-md rounded-xl transition-all active:scale-90">
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-white hover:shadow-md rounded-xl transition-all active:scale-90"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 bg-slate-50/30 border-t border-slate-100 flex justify-between items-center">
          <span className="text-xs text-slate-400 font-medium">
            {loading ? "Loading products..." : `Showing ${products.length} products`}
          </span>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors">Previous</button>
            <button className="px-4 py-2 text-xs font-bold text-indigo-600 bg-indigo-50 rounded-lg">Next</button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity" onClick={() => setIsOpen(false)} />

          <div className="relative bg-white w-full max-w-xl rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="px-8 pt-8 pb-4 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Add New Product</h2>
                <p className="text-slate-500 text-sm font-medium mt-1">Fill in the details to list your new item.</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
                <X size={20} />
              </button>
            </div>

            <div className="p-8 pt-2 space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Sunflower Crochet"
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:bg-white transition-all outline-none text-slate-700 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Price (₹)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="799"
                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:bg-white transition-all outline-none text-slate-700 font-medium"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Stock</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="10"
                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:bg-white transition-all outline-none text-slate-700 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:bg-white transition-all outline-none text-slate-700 font-medium appearance-none cursor-pointer"
                >
                  <option value="">Select Category</option>
                  <option>Bouquets</option>
                  <option>Flower pots</option>
                  <option>Keychains</option>
                  <option>Accessories</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your product..."
                  rows="3"
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:bg-white transition-all outline-none text-slate-700 font-medium resize-none"
                />
              </div>

              <input
                type="file"
                onChange={(e) => setImageFile(e.target.files[0])}
                accept="image/*"
                className="hidden"
                id="productImage"
              />
              <label
                htmlFor="productImage"
                className="border-2 border-dashed border-slate-200 rounded-2xl p-6 hover:border-indigo-400 hover:bg-indigo-50/50 transition-all cursor-pointer group block"
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                    <ImageIcon size={20} />
                  </div>
                  <span className="text-sm font-bold text-slate-600">
                    {imageFile ? imageFile.name : "Click to upload image"}
                  </span>
                </div>
              </label>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-3 rounded-2xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-slate-900 text-white font-bold text-sm hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 active:scale-95 disabled:opacity-60"
                >
                  <CheckCircle2 size={18} />
                  {isSubmitting ? submitStage || "Saving..." : "Save Product"}
                </button>
              </div>
              {submitError ? (
                <p className="text-xs font-medium text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
                  {submitError}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
