import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import axios from "axios";

const Overview = () => {
  const { user } = useContext(AuthContext) || {};
  const baseUrl = import.meta.env.VITE_BaseURL?.replace(/\/+$/, "");
  const token = localStorage.getItem("access-token");
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    const fetchTransactions = async () => {
      try {
        const authHeaders = token
          ? { headers: { authorization: `Bearer ${token}` } }
          : {};
        const res = await axios.get(
          `${baseUrl}/transactions?email=${user.email}`,
          authHeaders
        );
        const transactions = res.data;

        const income = transactions
          .filter((t) => t.type === "income")
          .reduce((sum, t) => sum + Number(t.amount || 0), 0);

        const expense = transactions
          .filter((t) => t.type === "expense")
          .reduce((sum, t) => sum + Number(t.amount || 0), 0);

        setTotalIncome(income);
        setTotalExpense(expense);
        setBalance(income - expense);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load overview data", error);
      }
    };

    fetchTransactions();
  }, [user?.email]);

  if (loading) {
    return (
      <section className="bg-base-100 py-16 px-6 md:px-20 text-center">
        <p className="text-[#22C55E] text-lg font-medium">Loading overview...</p>
      </section>
    );
  }

  return (
    <section className="bg-base-100 py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-base-content mb-3 text-center">
          Financial Overview
        </h2>
        <p className="text-base-content/70 text-center max-w-2xl mx-auto mb-10">
          A quick snapshot of your income, expenses, and current balance.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-base-200 rounded-2xl border border-base-300 p-8 text-center min-h-[180px] flex flex-col justify-center hover:shadow-lg transition-all duration-300">
            <h3 className="text-lg font-medium text-base-content/70 mb-2">
              Total Income
            </h3>
            {user ? (
              <p className="text-4xl font-bold text-[#22C55E]">
                ${totalIncome.toLocaleString()}
              </p>
            ) : (
              <p className="text-base-content/60 text-base font-medium">
                Login to see total income
              </p>
            )}
          </div>

          <div className="bg-base-200 rounded-2xl border border-base-300 p-8 text-center min-h-[180px] flex flex-col justify-center hover:shadow-lg transition-all duration-300">
            <h3 className="text-lg font-medium text-base-content/70 mb-2">
              Total Expense
            </h3>
            {user ? (
              <p className="text-4xl font-bold text-[#EF4444]">
                ${totalExpense.toLocaleString()}
              </p>
            ) : (
              <p className="text-base-content/60 text-base font-medium">
                Login to see total expense
              </p>
            )}
          </div>

          <div className="bg-base-200 rounded-2xl border border-base-300 p-8 text-center min-h-[180px] flex flex-col justify-center hover:shadow-lg transition-all duration-300">
            <h3 className="text-lg font-medium text-base-content/70 mb-2">
              Total Balance
            </h3>
            {user ? (
              <p
                className={`text-4xl font-bold ${
                  balance >= 0 ? "text-[#22C55E]" : "text-[#EF4444]"
                }`}
              >
                ${balance.toLocaleString()}
              </p>
            ) : (
              <p className="text-base-content/60 text-base font-medium">
                Login to see your balance
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;
