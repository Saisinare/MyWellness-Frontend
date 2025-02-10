import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function ActivityChart() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      const apiResponse = [
        { activity_date: "2025-02-01", total_steps: 772, total_distance: 0.52, very_active_minutes: 0, fairly_active_minutes: 0, lightly_active_minutes: 40 },
        { activity_date: "2025-02-02", total_steps: 3634, total_distance: 2.45, very_active_minutes: 5, fairly_active_minutes: 6, lightly_active_minutes: 123 },
        { activity_date: "2025-02-03", total_steps: 7443, total_distance: 5.02, very_active_minutes: 20, fairly_active_minutes: 10, lightly_active_minutes: 206 },
        { activity_date: "2025-02-04", total_steps: 1201, total_distance: 0.81, very_active_minutes: 0, fairly_active_minutes: 0, lightly_active_minutes: 52 },
        { activity_date: "2025-02-05", total_steps: 5202, total_distance: 3.51, very_active_minutes: 0, fairly_active_minutes: 11, lightly_active_minutes: 223 },
        { activity_date: "2025-02-06", total_steps: 4878, total_distance: 3.29, very_active_minutes: 0, fairly_active_minutes: 0, lightly_active_minutes: 204 },
        { activity_date: "2025-02-07", total_steps: 7379, total_distance: 4.97, very_active_minutes: 0, fairly_active_minutes: 0, lightly_active_minutes: 319 }
      ];
      setData(apiResponse);
    }, 1000);
  }, []);

  if (!data) return <div className="text-center text-gray-500">Loading data...</div>;

  const pieData = [
    { name: "Very Active", value: data.reduce((acc, day) => acc + day.very_active_minutes, 0) },
    { name: "Fairly Active", value: data.reduce((acc, day) => acc + day.fairly_active_minutes, 0) },
    { name: "Lightly Active", value: data.reduce((acc, day) => acc + day.lightly_active_minutes, 0) },
  ];

  const colors = ["#FF0000", "#FFA500", "#4F46E5"];

  return (
    <div className="p-4 shadow-lg w-full max-w-4xl mx-auto bg-white rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-center">Activity Summary (7 Days)</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Total Steps (Bar Graph)</h3>
          <ResponsiveContainer width="90%" height={250}>
            <BarChart data={data}>
              <XAxis dataKey="activity_date" tick={{ fontSize: 12, fill: "#ffffff" }} />
              <YAxis tick={{ fill: "#ffffff" }} />
              <Tooltip />
              <Bar dataKey="total_steps" fill="#4F46E5" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Total Distance (Line Graph)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="activity_date" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="total_distance" stroke="#4F46E5" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2 text-center">Activity Breakdown (Pie Chart)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
