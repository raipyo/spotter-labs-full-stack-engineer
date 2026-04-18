import { useState } from "react";
import axios from "axios";
import Map from "./Map";

export default function App() {
  const [form, setForm] = useState({});
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/plan-trip/", form);
      setData(res.data);
    } catch (e) {
      alert("Error planning trip");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-6">
        🚛 ELD Trip Planner
      </h1>

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* INPUT CARD */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">Trip Details</h2>

          <div className="space-y-3">
            <input name="current_location" placeholder="Current Location"
              className="w-full border p-2 rounded"
              onChange={handleChange} />

            <input name="pickup_location" placeholder="Pickup Location"
              className="w-full border p-2 rounded"
              onChange={handleChange} />

            <input name="dropoff_location" placeholder="Dropoff Location"
              className="w-full border p-2 rounded"
              onChange={handleChange} />

            <input name="cycle_used" placeholder="Cycle Used (out of 70 hrs)"
              className="w-full border p-2 rounded"
              onChange={handleChange} />

            <button
              onClick={submit}
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 flex items-center justify-center"
            >
              {loading ? "Calculating route..." : "Plan Trip"}
            </button>
          </div>
        </div>

        {/* MAP */}
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-2">Route Map</h2>
          <div className="h-[400px]">
            {data ? <Map route={data.route} /> : <p>No route yet</p>}
          </div>
        </div>
      </div>

      {/* SUMMARY */}
      {data && (
        <div className="grid md:grid-cols-3 gap-4 mt-6">

          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold">🚚 Pickup</h3>
            <p>
              {data?.route?.to_pickup
                ? `${data.route.to_pickup.duration_hours.toFixed(2)} hrs driving + 1 hr stop`
                : "Loading..."}
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold">📦 Dropoff</h3>
            <p>
              {data?.route?.to_dropoff
                ? `${data.route.to_dropoff.duration_hours.toFixed(2)} hrs driving + 1 hr stop`
                : "Loading..."}
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold">📊 Logs</h3>
            <p>{Object.keys(data.eld_logs).length} Days</p>
          </div>
        </div>
      )}

      {/* ELD LOGS */}
      {data && (
        <div className="mt-6 space-y-6">
          {Object.keys(data.eld_logs).map((day) => (
            <div key={day} className="bg-white p-4 rounded-xl shadow">
              <h2 className="text-lg font-semibold mb-2">
                📓 Day {Number(day) + 1}
              </h2>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="font-bold">Hour</div>
                <div className="font-bold">Status</div>

                {data.eld_logs[day].map((log, i) => (
                  <div key={i} className="contents">
                    <div>{log.hour}</div>
                    <div className={
                      log.status.includes("DRIVING")
                        ? "text-green-600"
                        : log.status.includes("REST")
                        ? "text-yellow-600"
                        : "text-red-600"
                    }>
                      {log.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}