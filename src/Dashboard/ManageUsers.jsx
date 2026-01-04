import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const { user } = useContext(AuthContext) || {};
  const baseUrl = import.meta.env.VITE_BaseURL?.replace(/\/+$/, "");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState("newest");
  const [pageSize, setPageSize] = useState(8);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("access-token");
      const authHeaders = token
        ? { authorization: `Bearer ${token}` }
        : {};
      const res = await fetch(`${baseUrl}/users`, {
        headers: {
          ...authHeaders,
        },
      });
      const data = await res.json();
      setUsers(data);
      setLoading(false);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [searchQuery, sortKey, pageSize]);

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredUsers = users.filter((u) => {
    if (!normalizedQuery) return true;
    const haystack = [u.name, u.email, u.role].join(" ").toLowerCase();
    return haystack.includes(normalizedQuery);
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const nameA = (a.name || "").toLowerCase();
    const nameB = (b.name || "").toLowerCase();
    const emailA = (a.email || "").toLowerCase();
    const emailB = (b.email || "").toLowerCase();
    const roleA = (a.role || "").toLowerCase();
    const roleB = (b.role || "").toLowerCase();
    const dateA = new Date(a.createdAt || 0).getTime();
    const dateB = new Date(b.createdAt || 0).getTime();

    switch (sortKey) {
      case "nameAsc":
        return nameA.localeCompare(nameB);
      case "nameDesc":
        return nameB.localeCompare(nameA);
      case "emailAsc":
        return emailA.localeCompare(emailB);
      case "emailDesc":
        return emailB.localeCompare(emailA);
      case "roleAsc":
        return roleA.localeCompare(roleB);
      case "roleDesc":
        return roleB.localeCompare(roleA);
      case "oldest":
        return dateA - dateB;
      case "newest":
      default:
        return dateB - dateA;
    }
  });

  const totalPages = Math.max(1, Math.ceil(sortedUsers.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const pagedUsers = sortedUsers.slice(startIndex, startIndex + pageSize);

  const handleRoleChange = async (id, role) => {
    const token = localStorage.getItem("access-token");
    const authHeaders = token
      ? { authorization: `Bearer ${token}` }
      : {};

    const res = await fetch(`${baseUrl}/users/${id}/role`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        ...authHeaders,
      },
      body: JSON.stringify({ role }),
    });

    if (res.ok) {
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, role } : u))
      );
      Swal.fire({
        icon: "success",
        title: "Role updated",
        text: `User role updated to ${role}.`,
        confirmButtonColor: "#22C55E",
      });
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete this user?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#22C55E",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    const token = localStorage.getItem("access-token");
    const authHeaders = token
      ? { authorization: `Bearer ${token}` }
      : {};

    const res = await fetch(`${baseUrl}/users/${id}`, {
      method: "DELETE",
      headers: {
        ...authHeaders,
      },
    });

    if (res.ok) {
      setUsers((prev) => prev.filter((u) => u._id !== id));
      Swal.fire({
        icon: "success",
        title: "User deleted",
        confirmButtonColor: "#22C55E",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12 text-success">
        Loading users...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-widest text-success">
          Admin Tools
        </p>
        <h2 className="text-2xl font-semibold text-base-content mt-2">
          Manage Users
        </h2>
        <p className="text-base-content/70 mt-2">
          Review accounts, update roles, and keep the platform organized.
        </p>
      </div>

      <div className="bg-base-200 border border-base-300 rounded-2xl p-4 flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
        <div className="flex-1">
          <label className="text-xs text-base-content/60">Search</label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, or role"
            className="mt-1 w-full border border-base-300 bg-base-100 rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <div className="min-w-[160px]">
          <label className="text-xs text-base-content/60">Sort</label>
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
            className="mt-1 w-full border border-base-300 bg-base-100 rounded-lg px-3 py-2 text-sm"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="nameAsc">Name: A-Z</option>
            <option value="nameDesc">Name: Z-A</option>
            <option value="emailAsc">Email: A-Z</option>
            <option value="emailDesc">Email: Z-A</option>
            <option value="roleAsc">Role: A-Z</option>
            <option value="roleDesc">Role: Z-A</option>
          </select>
        </div>

        <div className="min-w-[110px]">
          <label className="text-xs text-base-content/60">Rows</label>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="mt-1 w-full border border-base-300 bg-base-100 rounded-lg px-3 py-2 text-sm"
          >
            <option value={6}>6</option>
            <option value={8}>8</option>
            <option value={12}>12</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto border border-base-300 rounded-2xl">
        <table className="min-w-full bg-base-100">
          <thead className="bg-base-200 text-base-content">
            <tr>
              <th className="py-3 px-4 text-left text-sm">User</th>
              <th className="py-3 px-4 text-left text-sm">Email</th>
              <th className="py-3 px-4 text-left text-sm">Role</th>
              <th className="py-3 px-4 text-left text-sm">Joined</th>
              <th className="py-3 px-4 text-center text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pagedUsers.map((u) => (
              <tr
                key={u._id}
                className="border-t border-base-300 hover:bg-base-200/60 transition"
              >
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={u.photoURL || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
                      alt={u.name || "User"}
                      className="w-9 h-9 rounded-full object-cover border border-base-300"
                    />
                    <div>
                      <p className="font-medium text-base-content">
                        {u.name || "User"}
                      </p>
                      <p className="text-xs text-base-content/60">
                        {u.role}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-base-content/80">
                  {u.email}
                </td>
                <td className="py-3 px-4">
                  <select
                    value={u.role}
                    onChange={(e) => handleRoleChange(u._id, e.target.value)}
                    className="border border-base-300 bg-base-100 rounded-lg px-2 py-1 text-sm"
                  >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                    <option value="demo-admin">demo-admin</option>
                  </select>
                </td>
                <td className="py-3 px-4 text-sm text-base-content/70">
                  {u.createdAt
                    ? new Date(u.createdAt).toLocaleDateString()
                    : "-"}
                </td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => handleDelete(u._id)}
                    disabled={u.email === user?.email}
                    className="px-3 py-1 text-sm rounded-lg bg-error text-white hover:bg-error/90 transition disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {pagedUsers.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="py-8 text-center text-base-content/60"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={safePage === 1}
            className="px-3 py-1 rounded-lg border border-base-300 text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-base-200 transition"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
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
          ))}
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
  );
};

export default ManageUsers;
