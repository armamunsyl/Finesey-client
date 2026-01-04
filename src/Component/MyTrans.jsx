import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

const MyTrans = () => {
  const { user } = useContext(AuthContext) || {};
  const baseUrl = import.meta.env.VITE_BaseURL?.replace(/\/+$/, "");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState("dateDesc");
  const [pageSize, setPageSize] = useState(6);
  const [page, setPage] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [selectedTrans, setSelectedTrans] = useState(null);

  useEffect(() => {
    document.body.style.overflow = showModal || viewModal ? "hidden" : "auto";
  }, [showModal, viewModal]);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user?.email) {
        setTransactions([]);
        setLoading(false);
        return;
      }
      const token = localStorage.getItem("access-token");
      const authHeaders = token
        ? { headers: { authorization: `Bearer ${token}` } }
        : {};
      const res = await axios.get(
        `${baseUrl}/transactions?email=${user.email}`,
        authHeaders
      );
      setTransactions(res.data);
      setLoading(false);
    };
    fetchTransactions();
  }, [user?.email]);

  useEffect(() => {
    setPage(1);
  }, [searchQuery, sortKey, pageSize]);

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredTransactions = transactions.filter((t) => {
    if (!normalizedQuery) return true;
    const haystack = [
      t.type,
      t.category,
      t.description,
      t.date,
      t.amount,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(normalizedQuery);
  });

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    const amountA = Number(a.amount) || 0;
    const amountB = Number(b.amount) || 0;
    const dateA = new Date(a.date).getTime() || 0;
    const dateB = new Date(b.date).getTime() || 0;
    const categoryA = (a.category || "").toLowerCase();
    const categoryB = (b.category || "").toLowerCase();
    const typeA = (a.type || "").toLowerCase();
    const typeB = (b.type || "").toLowerCase();

    switch (sortKey) {
      case "dateAsc":
        return dateA - dateB;
      case "amountDesc":
        return amountB - amountA;
      case "amountAsc":
        return amountA - amountB;
      case "categoryAsc":
        return categoryA.localeCompare(categoryB);
      case "categoryDesc":
        return categoryB.localeCompare(categoryA);
      case "typeAsc":
        return typeA.localeCompare(typeB);
      case "typeDesc":
        return typeB.localeCompare(typeA);
      case "dateDesc":
      default:
        return dateB - dateA;
    }
  });

  const totalPages = Math.max(1, Math.ceil(sortedTransactions.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const pagedTransactions = sortedTransactions.slice(
    startIndex,
    startIndex + pageSize
  );

  const pageNumbers = () => {
    const pages = [];
    const start = Math.max(1, safePage - 1);
    const end = Math.min(totalPages, safePage + 1);

    if (start > 1) pages.push(1);
    if (start > 2) pages.push("...");
    for (let i = start; i <= end; i += 1) {
      pages.push(i);
    }
    if (end < totalPages - 1) pages.push("...");
    if (end < totalPages) pages.push(totalPages);
    return pages;
  };

  const handleUpdateClick = (t) => {
    setSelectedTrans(t);
    setShowModal(true);
  };

  const handleViewClick = (t) => {
    setSelectedTrans(t);
    setViewModal(true);
  };

  const handleDeleteClick = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This transaction will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#22C55E",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("access-token");
        const authHeaders = token
          ? { headers: { authorization: `Bearer ${token}` } }
          : {};
        await axios.delete(`${baseUrl}/transactions/${id}`, authHeaders);

        setTransactions((prev) => {
          const next = prev.filter((t) => t._id !== id);
          const nextTotalPages = Math.max(1, Math.ceil(next.length / pageSize));
          setPage((current) => Math.min(current, nextTotalPages));
          return next;
        });

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Transaction removed successfully.",
          confirmButtonColor: "#22C55E",
        });
      }
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const form = e.target;
    const updated = {
      type: form.type.value,
      description: form.description.value,
      category: form.category.value,
      amount: Number(form.amount.value),
      date: form.date.value,
    };

    const token = localStorage.getItem("access-token");
    const authHeaders = token
      ? { headers: { authorization: `Bearer ${token}` } }
      : {};
    await axios.patch(
      `${baseUrl}/transactions/${selectedTrans._id}`,
      updated,
      authHeaders
    );

    setTransactions(
      transactions.map((t) =>
        t._id === selectedTrans._id ? { ...t, ...updated } : t
      )
    );

    setShowModal(false);

    Swal.fire({
      icon: "success",
      title: "Updated!",
      text: "Transaction updated successfully.",
      confirmButtonColor: "#22C55E",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl text-success">
        Loading your transactions...
      </div>
    );
  }

  return (
    <section className="bg-base-100 min-h-screen px-4 md:px-20 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-success/15 text-success text-xs font-semibold tracking-wide">
              Transaction Hub
            </span>
            <h2 className="text-3xl font-semibold text-base-content mt-3">
              My Transactions
            </h2>
            <p className="text-base-content/70 mt-2 max-w-xl">
              Search, sort, and review your income and expenses with a clean
              overview of every entry.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="bg-base-200 border border-base-300 rounded-2xl px-4 py-3 min-w-[150px]">
              <p className="text-xs text-base-content/60">Total Records</p>
              <p className="text-lg font-semibold text-base-content">
                {transactions.length}
              </p>
            </div>
            <div className="bg-base-200 border border-base-300 rounded-2xl px-4 py-3 min-w-[150px]">
              <p className="text-xs text-base-content/60">Visible Now</p>
              <p className="text-lg font-semibold text-base-content">
                {filteredTransactions.length}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-base-200 border border-base-300 rounded-2xl p-4 flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          <div className="flex flex-1 flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <label className="text-xs text-base-content/60">Search</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by type, category, date, amount, notes"
                className="mt-1 w-full border border-base-300 bg-base-100 rounded-lg px-3 py-2 text-sm"
              />
            </div>

            <div className="min-w-[170px]">
              <label className="text-xs text-base-content/60">Sort by</label>
              <select
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value)}
                className="mt-1 w-full border border-base-300 bg-base-100 rounded-lg px-3 py-2 text-sm"
              >
                <option value="dateDesc">Date: Newest</option>
                <option value="dateAsc">Date: Oldest</option>
                <option value="amountDesc">Amount: High to Low</option>
                <option value="amountAsc">Amount: Low to High</option>
                <option value="categoryAsc">Category: A-Z</option>
                <option value="categoryDesc">Category: Z-A</option>
                <option value="typeAsc">Type: A-Z</option>
                <option value="typeDesc">Type: Z-A</option>
              </select>
            </div>

            <div className="min-w-[120px]">
              <label className="text-xs text-base-content/60">Rows</label>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="mt-1 w-full border border-base-300 bg-base-100 rounded-lg px-3 py-2 text-sm"
              >
                <option value={6}>6</option>
                <option value={9}>9</option>
                <option value={12}>12</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <button
              onClick={() => setSearchQuery("")}
              className="px-4 py-2 rounded-lg border border-base-300 text-sm hover:bg-base-100 transition"
            >
              Clear Search
            </button>
            <p className="text-sm text-base-content/60">
              Showing {pagedTransactions.length} of {filteredTransactions.length}
            </p>
          </div>
        </div>

        <div className="hidden md:block overflow-x-auto mt-8 bg-base-100 border border-base-300 rounded-2xl shadow">
          <table className="w-full border-collapse">
            <thead className="bg-success text-white">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Type</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Amount</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {pagedTransactions.length > 0 ? (
              pagedTransactions.map((t, index) => (
                <tr
                  key={t._id}
                  className="border-b border-base-300 hover:bg-base-200 transition-all"
                >
                  <td className="py-3 px-4">{startIndex + index + 1}</td>

                  <td
                    className={`py-3 px-4 font-medium ${
                      t.type === "income" ? "text-success" : "text-error"
                    }`}
                  >
                    {t.type}
                  </td>

                  <td className="py-3 px-4 text-base-content">{t.category}</td>

                  <td
                    className={`py-3 px-4 font-semibold ${
                      t.type === "income" ? "text-success" : "text-error"
                    }`}
                  >
                    {t.type === "income" ? "+" : "-"}
                    {t.amount} BDT
                  </td>

                  <td className="py-3 px-4 text-base-content">{t.date}</td>

                  <td className="py-3 px-4 text-center space-x-2">
                    <button
                      onClick={() => handleUpdateClick(t)}
                      className="px-3 py-1 rounded-md text-white bg-success hover:bg-success/90 transition"
                    >
                      Update
                    </button>

                    <button
                      onClick={() => handleDeleteClick(t._id)}
                      className="px-3 py-1 bg-error text-white rounded-md hover:bg-error/90 transition"
                    >
                      Delete
                    </button>

                    <button
                      onClick={() => handleViewClick(t)}
                      className="px-3 py-1 border border-success text-success rounded-md hover:bg-success/10 transition"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-base-content/60"
                >
                  {searchQuery
                    ? "No transactions match your search."
                    : "No transactions found."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>

        <div className="md:hidden flex flex-col gap-4 mt-6">
          {pagedTransactions.length > 0 ? (
            pagedTransactions.map((t) => (
              <div
                key={t._id}
                className="bg-base-100 border border-base-300 rounded-2xl shadow p-5"
              >
                <div className="flex justify-between mb-2">
                  <p
                    className={`font-semibold ${
                      t.type === "income" ? "text-success" : "text-error"
                    }`}
                  >
                    {t.type}
                  </p>

                  <p
                    className={`font-bold ${
                      t.type === "income" ? "text-success" : "text-error"
                    }`}
                  >
                    {t.type === "income" ? "+" : "-"}
                    {t.amount} BDT
                  </p>
                </div>

                <p className="text-sm text-base-content">
                  Category: {t.category}
                </p>
                <p className="text-sm text-base-content">Date: {t.date}</p>

                <div className="flex justify-between mt-3">
                  <button
                    onClick={() => handleUpdateClick(t)}
                    className="px-3 py-1 text-white rounded-md text-sm bg-success hover:bg-success/90 transition"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => handleDeleteClick(t._id)}
                    className="px-3 py-1 bg-error text-white rounded-md text-sm hover:bg-error/90 transition"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => handleViewClick(t)}
                    className="px-3 py-1 border border-success text-success rounded-md text-sm hover:bg-success/10 transition"
                  >
                    View
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-base-content/60">
              {searchQuery
                ? "No transactions match your search."
                : "No transactions found."}
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={safePage === 1}
              className="px-3 py-1 rounded-lg border border-base-300 text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-base-200 transition"
            >
              Prev
            </button>
            {pageNumbers().map((num, index) =>
              num === "..." ? (
                <span key={`ellipsis-${index}`} className="px-2 text-sm">
                  ...
                </span>
              ) : (
                <button
                  key={num}
                  onClick={() => setPage(num)}
                  className={`px-3 py-1 rounded-lg text-sm border transition ${
                    num === safePage
                      ? "bg-success text-white border-success"
                      : "border-base-300 hover:bg-base-200"
                  }`}
                >
                  {num}
                </button>
              )
            )}
            <button
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={safePage === totalPages}
              className="px-3 py-1 rounded-lg border border-base-300 text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-base-200 transition"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {showModal && selectedTrans && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-4 z-50">
          <div className="bg-base-100 border border-base-300 rounded-2xl shadow-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-3 text-2xl text-base-content"
            >
              ×
            </button>

            <h2 className="text-xl font-bold mb-4 text-center text-base-content">
              Update Transaction
            </h2>

            <form
              onSubmit={handleUpdate}
              className="space-y-4"
              onChange={(e) => {
                if (e.target.name === "type") {
                  setSelectedTrans({
                    ...selectedTrans,
                    type: e.target.value,
                  });
                }
              }}
            >
              <div>
                <label className="block mb-1 text-base-content">Type</label>
                <select
                  name="type"
                  value={selectedTrans.type}
                  onChange={(e) =>
                    setSelectedTrans({ ...selectedTrans, type: e.target.value })
                  }
                  className="w-full border border-base-300 bg-base-100 rounded-lg px-3 py-2"
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 text-base-content">Category</label>
                <select
                  name="category"
                  value={selectedTrans.category}
                  onChange={(e) =>
                    setSelectedTrans({
                      ...selectedTrans,
                      category: e.target.value,
                    })
                  }
                  className="w-full border border-base-300 bg-base-100 rounded-lg px-3 py-2"
                >
                  {(selectedTrans.type === "income"
                    ? ["Job", "Business", "Other"]
                    : [
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
                      ]
                  ).map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1 text-base-content">Amount</label>
                <input
                  type="number"
                  name="amount"
                  defaultValue={selectedTrans.amount}
                  className="w-full border border-base-300 bg-base-100 rounded-lg px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-base-content">
                  Description
                </label>
                <textarea
                  name="description"
                  defaultValue={selectedTrans.description}
                  className="w-full border border-base-300 bg-base-100 rounded-lg px-3 py-2 h-20"
                ></textarea>
              </div>

              <div>
                <label className="block mb-1 text-base-content">Date</label>
                <input
                  type="date"
                  name="date"
                  defaultValue={selectedTrans.date}
                  className="w-full border border-base-300 bg-base-100 rounded-lg px-3 py-2"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 rounded-lg text-white font-semibold mt-3 bg-success hover:bg-success/90 transition"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}

      {viewModal && selectedTrans && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-4 z-50">
          <div className="bg-base-100 border border-base-300 rounded-2xl shadow-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => setViewModal(false)}
              className="absolute right-4 top-3 text-2xl text-base-content"
            >
              ×
            </button>

            <h2 className="text-xl font-bold mb-4 text-center text-base-content">
              Transaction Details
            </h2>

            <div className="space-y-3">
              <p className="text-base-content">
                <span className="font-semibold">Type:</span> {selectedTrans.type}
              </p>

              <p className="text-base-content">
                <span className="font-semibold">Category:</span>{" "}
                {selectedTrans.category}
              </p>

              <p
                className={`font-bold ${
                  selectedTrans.type === "income"
                    ? "text-success"
                    : "text-error"
                }`}
              >
                Amount:{" "}
                {selectedTrans.type === "income" ? "+" : "-"}
                {selectedTrans.amount} BDT
              </p>

              <p className="text-base-content">
                <span className="font-semibold">Date:</span>{" "}
                {selectedTrans.date}
              </p>

              <p className="text-base-content">
                <span className="font-semibold">Description:</span>{" "}
                {selectedTrans.description}
              </p>
            </div>

            <div className="mt-6 p-4 bg-base-200 rounded-xl border border-base-300">
              <p className="font-semibold mb-2 text-base-content">
                Total with this category
              </p>

              <p className="text-lg font-bold text-success">
                {
                  transactions
                    .filter(
                      (t) => t.category === selectedTrans.category
                    )
                    .reduce((sum, t) => sum + Number(t.amount), 0)
                }{" "}
                BDT
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MyTrans;
