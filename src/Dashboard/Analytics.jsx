import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const Analytics = () => {
  const baseUrl = import.meta.env.VITE_BaseURL?.replace(/\/+$/, "");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const token = localStorage.getItem("access-token");
      const authHeaders = token
        ? { authorization: `Bearer ${token}` }
        : {};
      const res = await fetch(`${baseUrl}/users/analytics`, {
        headers: {
          ...authHeaders,
        },
      });
      const response = await res.json();
      setData(response);
      setLoading(false);
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12 text-success">
        Loading analytics...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-widest text-success">
          Analytics
        </p>
        <h2 className="text-2xl font-semibold text-base-content mt-2">
          Monthly New Users
        </h2>
        <p className="text-base-content/70 mt-2">
          Track how many new users join the platform each month.
        </p>
      </div>

      <div className="bg-base-200 border border-base-300 rounded-2xl p-6">
        <div className="w-full h-80">
          {data.length > 0 ? (
            <ResponsiveContainer>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#22C55E" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-base-content/60">
              No analytics data yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
