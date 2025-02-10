import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Skeleton from "react-loading-skeleton"; // Import skeleton loader
import "react-loading-skeleton/dist/skeleton.css"; // Import skeleton styles
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function Dahsboard() {
  const [loading, setLoading] = useState(true); // Loading state to control skeleton loader
  const [apiData, setApiData] = useState(null); // Store API data
  const [pieData, setPieData] = useState([]); // Store Pie chart data

  const [dailyData, setDailyData] = useState({}); // State for daily data
  const [distanceActive, setDistanceActive] = useState([]); // State for active distance chart data
  const COLORS = ["#9b59b6", "#e74c3c", "#2ecc71"]; // Purple, Red, Green

  // Function to summarize the data (intensity analysis)
  const getSummaryData = (data) => {
    return data.reduce(
      (acc, day) => {
        acc.veryActive += day.very_active_minutes;
        acc.fairlyActive += day.fairly_active_minutes;
        acc.lightlyActive += day.lightly_active_minutes;
        return acc;
      },
      { veryActive: 0, fairlyActive: 0, lightlyActive: 0 }
    );
  };

  const todayDataApi = "http://192.168.1.4:8000/api/activity-day/2025-02-07";

  // Fetch data on component mount
  useEffect(() => {
    const token = Cookies.get("token");
    const headers = { Authorization: `Bearer ${token}` };

    // Fetch daily data
    axios
      .get(todayDataApi, { headers })
      .then((response) => {
        setDailyData(response.data);

        const chartData = [
          { name: "Very Active Distance", value: response.data.very_active_distance },
          { name: "Moderately Active Distance", value: response.data.moderately_active_distance },
          { name: "Light Active Distance", value: response.data.light_active_distance },
          { name: "Sedentary Active Distance", value: response.data.sedentary_active_distance },
        ];
        setDistanceActive(chartData);
        setLoading(false); // Stop loading after data is fetched
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Stop loading after data is fetched
      });

    // Fetch weekly data
    axios
      .get("http://192.168.1.4:8000/api/activity-week/?start_date=2025-02-01&end_date=2025-02-07", { headers })
      .then((response) => {
        setApiData(response.data); // Set the API data to state
        setLoading(false); // Stop loading after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Stop loading if error occurs
      });
  }, []);

  // Set pie chart data after apiData is available
  useEffect(() => {
    if (apiData !== null) {
      const summary = getSummaryData(apiData);
      setPieData([
        { name: "Very Active", value: summary.veryActive },
        { name: "Fairly Active", value: summary.fairlyActive },
        { name: "Lightly Active", value: summary.lightlyActive },
      ]);
    }
  }, [apiData]);

  // Loading Skeleton
  if (loading) {
    return (
      <div className="min-w-screen h-screen flex mt-14 gap-1">
        <div className="min-h-screen w-2/5 py-5 flex flex-col gap-3 px-2">
          <Skeleton height={200} />
          <Skeleton height={150} />
          <Skeleton height={150} />
          <Skeleton height={150} />
        </div>

        <div className="h-full w-2/3 flex flex-col gap-5 py-5">
          <Skeleton height={300} />
          <Skeleton height={300} />
        </div>
        <div className="h-full w-2/3 flex flex-col gap-5 py-5">
          <Skeleton height={300} />
          <Skeleton height={300} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-w-screen h-screen flex mt-14">
      <div className="min-h-screen w-2/5 py-5 flex flex-col gap-3 px-2">
        {/* Card 1 */}
        <div className="w-full h-56 flex overflow-hidden rounded-lg bg-gradient-to-b from-green-300 to-green-400 shadow-sm font-madefor">
          <div className="w-full h-1/5">
            <h2 className="p-5 font-medium text-gray-800">Intensity to Time ratio</h2>
            <div>
              <ResponsiveContainer width="80%" height={300}>
                <BarChart data={distanceActive}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="w-full h-1/5 flex items-center rounded-lg p-4 bg-gradient-to-b from-blue-50 to-green-50 shadow font-madefor">
          <img
            src="./images/footsteps.png"
            alt="Steps icon"
            className="h-full mr-4 -ml-4"
          />
          <div>
            <h1 className="text-2xl font-bold flex gap-2 items-center">
              <h2>{dailyData.total_steps}</h2>
              <p className="text-sm">STEPS</p>
            </h1>
            <p className="text-sm font-medium text-gray-900">You have walked today</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="h-1/5 w-full rounded-lg flex items-center p-4 bg-gradient-to-b from-yellow-50 to-red-50 shadow-sm font-madefor overflow-hidden">
          <img
            src="./images/calories.png"
            alt="Calories icon"
            className="h-full"
          />
          <div>
            <h1 className="text-2xl font-bold flex gap-2 items-center">
              <h2>{dailyData.calories}</h2>
              <p className="text-sm">CALORIES</p>
            </h1>
            <p className="text-sm font-medium text-gray-700">You have Burned today</p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="w-full h-1/5 rounded-lg flex items-center p-4 bg-gradient-to-b from-blue-100 to-gray-300 shadow-sm font-madefor overflow-hidden">
          <img
            src="./images/measure-distance.png"
            alt="Distance icon"
            className="h-full mr-10 -ml-4"
          />
          <div>
            <h1 className="text-2xl font-bold flex gap-2 text-black items-center">
              <h2>{Math.ceil(dailyData.total_distance)}</h2>
              <p className="text-sm">KM</p>
            </h1>
            <p className="text-sm font-medium text-gray-500">You have Covered</p>
          </div>
        </div>
      </div>

      <div className="h-full w-2/3 flex flex-col gap-5 py-5">
        {/* Card 5 */}
        <div className="overflow-hidden w-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900 h-1/2 shadow flex-col rounded-lg">
          <div className="w-full h-1/5 flex">
            <h1 className="font-madefor items-center w-full h-full text-white flex pt-2 px-5">
              Weekly Walking Steps Analysis
            </h1>
          </div>
          <div className="w-full h-full pt-10">
            <ResponsiveContainer width="90%" height={250}>
              <BarChart data={apiData}>
                <XAxis dataKey="activity_date" tick={{ fontSize: 12, fill: "#ffffff" }} />
                <YAxis tick={{ fill: "#ffffff" }} />
                <Tooltip />
                <Bar dataKey="total_steps" fill="#ffffff" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card 6 */}
        <div className="w-full h-1/2 rounded-lg shadow bg-gradient-to-br from-purple-700 to-gray-800 overflow-hidden">
          <div className="w-full h-1/5">
            <h1 className="h-full font-madefor w-full items-center px-5 flex pt-2 text-white font-medium">
              Weekly Steps Analysis
            </h1>
            <div className="w-full h-1/5">
              <ResponsiveContainer width="80%" height={250}>
                <LineChart data={apiData}>
                  <XAxis dataKey="activity_date" tick={{ fontSize: 12, fill: "#ffffff" }} />
                  <YAxis tick={{ fill: "#ffffff" }} />
                  <Tooltip contentStyle={{ backgroundColor: "#333", color: "#ffffff" }} />
                  <Line type="monotone" dataKey="total_distance" stroke="#49f582" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="h-full w-2/3 flex flex-col gap-5 p-5">
        {/* Card 7 */}
        <div className="w-full h-3/5 border bg-gradient-to-br from-pink-300 to-red-300 rounded-lg shadow overflow-hidden">
          <div className="w-full h-1/5 flex items-center px-5">
            <h1 className="font-madefor text-white">Weekly Calories Burn Analysis</h1>
          </div>
          <div className="w-full h-4/5 pt-8">
            <ResponsiveContainer width="95%" height={250}>
              <AreaChart data={apiData}>
                <XAxis dataKey="activity_date" tick={{ fontSize: 12, fill: "#ffffff" }} />
                <YAxis tick={{ fill: "#ffffff" }} />
                <Tooltip contentStyle={{ backgroundColor: "#333", color: "#ffffff" }} />
                <Area type="monotone" dataKey="calories" stroke="#4F46E5" fill="#4F46E5" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card 8 */}
        <div className="w-full h-2/5 border bg-white shadow bg-gradient-to-br from-yellow-300 to-red-400 rounded-lg">
          <div className="w-full h-1/5 flex items-center px-5">
            <h1 className="font-madefor text-black font-medium">Activity intensity analysis</h1>
          </div>

          <div className="w-full">
            <ResponsiveContainer width="80%" height={200}>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} fill="#8884d8" label>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="top" align="center" iconType="circle" iconSize={10} wrapperStyle={{ color: "#ffffff", fontSize: "14px", paddingTop: "10px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
