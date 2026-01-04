import React, { useContext, useState } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

const AddTrans = () => {
  const { user } = useContext(AuthContext) || {};
  const baseUrl = import.meta.env.VITE_BaseURL?.replace(/\/+$/, "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    type: "",
    category: "",
    amount: "",
    description: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    const newTransaction = {
      ...formData,
      userEmail: user?.email,
      userName: user?.displayName,
    };

    try {
      const token = localStorage.getItem("access-token");
      const authHeaders = token
        ? { headers: { authorization: `Bearer ${token}` } }
        : {};
      const res = await axios.post(
        `${baseUrl}/transactions`,
        newTransaction,
        authHeaders
      );

      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Transaction Added!",
          text: "Your transaction was saved successfully.",
          confirmButtonColor: "#22C55E",
        });

        setFormData({
          type: "",
          category: "",
          amount: "",
          description: "",
          date: "",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const incomeCategories = ["Job", "Business", "Other"];
  const expenseCategories = [
    "Food",
    "Transport",
    "Education",
    "Shopping",
    "Home",
    "Freelance",
    "Entertainment",
    "Health",
    "Investment",
    "Others",
  ];

  return (
    <div className="min-h-screen bg-base-200 flex items-start justify-center px-4 py-8">
      <div className="bg-base-100 shadow border border-base-300 rounded-2xl p-4 w-full max-w-lg">
        <h2 className="text-xl font-semibold text-center text-base-content mb-4">
          Add New Transaction
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block mb-1 text-xs text-base-content">Type</label>
            <select
              name="type"
              required
              value={formData.type}
              onChange={handleChange}
              className="w-full border border-base-300 bg-base-100 rounded-lg px-2.5 py-1.5 text-sm"
            >
              <option value="">Select Type</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-xs text-base-content">Category</label>
            <select
              name="category"
              required
              disabled={!formData.type}
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-base-300 bg-base-100 rounded-lg px-2.5 py-1.5 text-sm"
            >
              <option value="">Select Category</option>
              {(formData.type === "income"
                ? incomeCategories
                : expenseCategories
              ).map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 text-xs text-base-content">Amount</label>
            <input
              type="number"
              required
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full border border-base-300 bg-base-100 rounded-lg px-2.5 py-1.5 text-sm"
            />
          </div>

          <div>
            <label className="block mb-1 text-xs text-base-content">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-base-300 bg-base-100 rounded-lg px-2.5 py-1.5 h-14 text-sm"
            ></textarea>
          </div>

          <div>
            <label className="block mb-1 text-xs text-base-content">Date</label>
            <input
              type="date"
              required
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border border-base-300 bg-base-100 rounded-lg px-2.5 py-1.5 text-sm"
            />
          </div>

          <div>
            <label className="block mb-1 text-xs text-base-content">User Email</label>
            <input
              type="text"
              readOnly
              value={user?.email}
              className="w-full border border-base-300 bg-base-100 rounded-lg px-2.5 py-1.5 text-sm opacity-70 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block mb-1 text-xs text-base-content">User Name</label>
            <input
              type="text"
              readOnly
              value={user?.displayName}
              className="w-full border border-base-300 bg-base-100 rounded-lg px-2.5 py-1.5 text-sm opacity-70 cursor-not-allowed"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full text-white py-1.5 rounded-lg font-semibold text-sm bg-success hover:bg-success/90 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Saving..." : "Add Transaction"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTrans;
