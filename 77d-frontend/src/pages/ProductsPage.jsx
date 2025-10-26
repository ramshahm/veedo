import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.js";
import { motion } from "framer-motion";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    ProdName: "",
    ProdCode: "",
    CategID: "",
    ProdDesc: "",
    price: "",
    OriginalPrice: "",
    Rating: 0,
    ReviewCount: 0,
    prodsize: "",
    prodcolor: "",
    ProdColorCode: "",
    Status: "Active",
  });

  // ✅ Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        let data = [];
        try {
          const text = await res.text();
          data = text ? JSON.parse(text) : [];
        } catch {
          console.warn("Empty or invalid JSON response from backend");
        }

        if (!res.ok) {
          throw new Error(data.message || `Server responded with ${res.status}`);
        }

        setProducts(data);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
        alert("Error fetching products: " + err.message);
      }
    };
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Add / Update Product
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Required fields check
    if (!form.ProdName || !form.price) {
      alert("Please fill required fields: ProdName and price");
      return;
    }

    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `/api/products/${editingId}` : "/api/products";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      let data = {};
      try {
        const text = await res.text();
        data = text ? JSON.parse(text) : {};
      } catch {
        console.warn("Empty or invalid JSON response from backend");
      }

      if (!res.ok) {
        throw new Error(data.message || `Server responded with ${res.status}`);
      }

      if (editingId) {
        setProducts(products.map((p) => (p._id === editingId ? data : p)));
        alert("✅ Product updated successfully");
      } else {
        setProducts([data, ...products]);
        alert("✅ Product added successfully");
      }

      resetForm();
    } catch (err) {
      console.error("❌ Error submitting product:", err);
      alert("Error: " + err.message);
    }
  };

  // ✅ Edit existing product
  const handleEdit = (p) => {
    setForm(p);
    setEditingId(p._id);
  };

  // ✅ Delete product safely
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Delete failed: ${text}`);
      }
      setProducts(products.filter((p) => p._id !== id));
      alert("🗑️ Product deleted successfully");
    } catch (err) {
      console.error("❌ Error deleting product:", err);
      alert("Error deleting: " + err.message);
    }
  };

  // ✅ Reset form
  const resetForm = () => {
    setForm({
      ProdName: "",
      ProdCode: "",
      CategID: "",
      ProdDesc: "",
      price: "",
      OriginalPrice: "",
      Rating: 0,
      ReviewCount: 0,
      prodsize: "",
      prodcolor: "",
      ProdColorCode: "",
      Status: "Active",
    });
    setEditingId(null);
  };

  return (
    <div className="flex min-h-screen bg-[#071029] text-white">
      <Sidebar />

      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-3xl mb-6 font-semibold text-yellow-400">
          Jewellery Management
        </h1>

        <motion.form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 border border-yellow-800 rounded-2xl p-4 bg-[#0F172A]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {[
            "ProdName",
            "ProdCode",
            "CategID",
            "prodsize",
            "prodcolor",
            "ProdColorCode",
            "Status",
          ].map((key) => (
            <div key={key} className="flex flex-col">
              <label className="text-sm opacity-70 mb-1">{key}</label>
              <input
                name={key}
                value={form[key] || ""}
                onChange={handleChange}
                className="p-2 rounded bg-[#071029] border border-yellow-900 text-white"
              />
            </div>
          ))}

          {["price", "OriginalPrice", "Rating", "ReviewCount"].map((key) => (
            <div key={key} className="flex flex-col">
              <label className="text-sm opacity-70 mb-1">{key}</label>
              <input
                name={key}
                type="number"
                value={form[key] || ""}
                onChange={handleChange}
                className="p-2 rounded bg-[#071029] border border-yellow-900 text-white"
              />
            </div>
          ))}

          <div className="col-span-full flex flex-col">
            <label className="text-sm opacity-70 mb-1">ProdDesc</label>
            <textarea
              name="ProdDesc"
              value={form.ProdDesc}
              onChange={handleChange}
              rows={3}
              className="p-2 rounded bg-[#071029] border border-yellow-900 text-white resize-none"
            />
          </div>

          <div className="col-span-full text-right mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-500 text-black font-bold rounded mr-2"
            >
              {editingId ? "Update Product" : "Add Product"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 border border-yellow-700 text-yellow-400 rounded"
            >
              Reset
            </button>
          </div>
        </motion.form>

        {/* ✅ Product Table */}
        <table className="min-w-full border border-yellow-900 text-sm">
          <thead className="bg-[#0F172A]">
            <tr>
              {[
                "ProdName",
                "ProdCode",
                "price",
                "OriginalPrice",
                "Status",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  className="p-2 border-b border-yellow-900 text-left"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="hover:bg-[#112233]">
                <td className="p-2 border-b border-yellow-900">{p.ProdName}</td>
                <td className="p-2 border-b border-yellow-900">{p.ProdCode}</td>
                <td className="p-2 border-b border-yellow-900">${p.price}</td>
                <td className="p-2 border-b border-yellow-900">
                  ${p.OriginalPrice}
                </td>
                <td className="p-2 border-b border-yellow-900">{p.Status}</td>
                <td className="p-2 border-b border-yellow-900 flex gap-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="px-2 py-1 bg-yellow-600 text-black rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="px-2 py-1 bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
