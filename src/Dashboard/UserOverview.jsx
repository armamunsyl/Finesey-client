import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#22C55E", "#14B8A6", "#3B82F6", "#F59E0B", "#EF4444"];

const UserOverview = () => {
  const { user } = useContext(AuthContext) || {};
  const baseUrl = import.meta.env.VITE_BaseURL?.replace(/\/+$/, "");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const totals = transactions.reduce(
    (acc, t) => {
      if (t.type === "income") acc.income += Number(t.amount || 0);
      if (t.type === "expense") acc.expense += Number(t.amount || 0);
      return acc;
    },
    { income: 0, expense: 0 }
  );
  const balance = totals.income - totals.expense;

  const categoryTotals = transactions.reduce((acc, t) => {
    if (!acc[t.category]) acc[t.category] = 0;
    acc[t.category] += Number(t.amount || 0);
    return acc;
  }, {});

  const pieData = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value,
  }));

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12 text-success">
        Loading overview...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-widest text-success">
          Overview
        </p>
        <h2 className="text-2xl font-semibold text-base-content mt-2">
          Your Finance Snapshot
        </h2>
        <p className="text-base-content/70 mt-2 max-w-2xl">
          A quick glance at your totals and spending distribution to keep your
          goals on track.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-base-200 border border-base-300 rounded-2xl p-5">
          <p className="text-sm text-base-content/70">Total Income</p>
          <h3 className="text-2xl font-semibold text-success mt-2">
            ${totals.income.toLocaleString()}
          </h3>
        </div>
        <div className="bg-base-200 border border-base-300 rounded-2xl p-5">
          <p className="text-sm text-base-content/70">Total Expense</p>
          <h3 className="text-2xl font-semibold text-error mt-2">
            ${totals.expense.toLocaleString()}
          </h3>
        </div>
        <div className="bg-base-200 border border-base-300 rounded-2xl p-5">
          <p className="text-sm text-base-content/70">Balance</p>
          <h3
            className={`text-2xl font-semibold mt-2 ${
              balance >= 0 ? "text-success" : "text-error"
            }`}
          >
            ${balance.toLocaleString()}
          </h3>
        </div>
      </div>

      <div className="bg-base-200 border border-base-300 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-base-content">
              Spending by Category
            </h3>
            <p className="text-base-content/70 text-sm mt-1">
              Visual breakdown of where your money goes.
            </p>
          </div>
          <p className="text-sm text-base-content/60">
            Total categories: {pieData.length}
          </p>
        </div>

        <div className="w-full h-72 mt-4">
          {pieData.length > 0 ? (
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  dataKey="value"
                  label
                >
                  {pieData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-base-content/60">
              No data yet. Add a transaction to see the chart.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserOverview;
