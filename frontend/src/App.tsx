import { useState } from "react";
import axios from "axios";
import Map from "./Map";
import ELDLogs from "./ELDLogs";

function App() {
  const [form, setForm] = useState({});
  const [data, setData] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    const res = await axios.post("http://127.0.0.1:8000/api/plan-trip/", form);
    setData(res.data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>ELD Trip Planner 🚛</h1>

      <input name="current_location" placeholder="Current Location" onChange={handleChange} />
      <input name="pickup_location" placeholder="Pickup Location" onChange={handleChange} />
      <input name="dropoff_location" placeholder="Dropoff Location" onChange={handleChange} />
      <input name="cycle_used" placeholder="Cycle Used (hrs)" onChange={handleChange} />

      <button onClick={submit}>Plan Trip</button>

      <div style={{ marginTop: 20 }}>
        <h2>Trip Summary</h2>

        {/* <p>🚚 Pickup Stop: 1 hour</p>
        <p>📦 Dropoff Stop: 1 hour</p> */}

        <p>
          🕒 Total Logs:
          {data && data.eld_logs.length}
        </p>
      </div>

      {data && (
        <>
          <Map route={data.route} />
          <ELDLogs logs={data.eld_logs} />
        </>
      )}
    </div>
  );
}

export default App;