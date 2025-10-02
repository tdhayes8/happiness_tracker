import { useState, useEffect, use } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import {Line} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [score, setScore] = useState(5);
  const [entry, setEntry] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/happiness');
      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
    useEffect(() => {
      fetchData();
    }, []);
  }

  const submit = async () => {
    try {
      const res = await fetch('/api/happiness', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({date, score, entry}),
      });
      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }
      fetchData();
      setEntry("");
    } catch (err) {
      setError("Failed to save entry");
    }
  }

  const chartData = {
    labels: data.map(d => d.date),
    datasets: [
      {
        label: 'Happiness Score',
        data: data.map(d => ({x: d.date, y: d.score, entry: d.entry})),
        borderColor: "blue",
      },
    ]
  }



  return (
    <div classname="container p-4">
      <h1> Happiness Tracker</h1>;
    
      <div classname="mb-2">
        <input
          type = "date"
          value = {date}
          onChange={(e) => setDate(e.target.value)}
          className = "form-control mb-2"
        />
        <input
          type="number"
          min = "1"
          max = "10"
          value = {score}
          onChange={(e) => setScore(e.target.value)}
          className = "form-control mb-2"
        />
        <textarea
          value = {entry}
          onChange={(e) => setEntry(e.target.value)}
          className = "form-control mb-2"
          placeholder = "How was your day?"
        />
        <button onClick = {submit} className = "btn btn-primary">Save</button>
      </div>
      <Line data = {chartData} />
    </div>
  );
}
 

export default App;
