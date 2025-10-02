import { useState, useEffect } from 'react'
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
  plugins,
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
      setError(err?.message ?? String(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

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
      
      await fetchData();
      setEntry("");
    } catch (err) {
      setError("Failed to save entry");
    }
  }

  const chartData = {
    labels: data.map(d =>
      new Date(d.date).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    ),
    datasets: [
      {
        label: "Happiness Score",
        data: data.map(d => d.score),
        borderColor: "blue",
        fill: false,
        entry: data.map(d => d.entry), // Include the entry data here
      },
    ],
  };

  const bestDay = data.length > 0
    ? data.reduce((max, d) => d.score > max.score ? d : max)
    : null;
    const [bestDate, setBestDate] = useState(null);
    const [bestEntryText, setBestEntryText] = useState("");

    useEffect(() => {
      if (bestDay) {
        setBestDate(bestDay.date);
        setBestEntryText(bestDay.entry ?? "");
      } else {
        setBestDate(null);
        setBestEntryText("");
      }
    }, [bestDay]);

    const options = {
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              const entryText = context.dataset.entry[context.dataIndex]; // Access entry data correctly
              return `Score: ${context.parsed.y}${
                entryText ? ` - "${entryText}"` : ""
              }`;
            },
          },
        },
      },
    };

  return (
    
    <div className="container p-4">
      
      <div className="mb-4">
        <div
          className="p-3 mb-3 rounded"
          style={{
            background: "linear-gradient(90deg, #6C5CE7, #00B894)",
            color: "white",
          }}
        >
          <div className="d-flex align-items-center">
            <img src={reactLogo} alt="logo" style={{ width: 48, height: 48, marginRight: 16 }} />
            <div>
              <h2 className="mb-0">Happiness Tracker</h2>
              <small className="text-white-50">Track feelings, spot trends, celebrate good days</small>
            </div>

            <div className="ms-auto text-end">
              {loading ? (
                <div className="d-flex align-items-center">
                  <div className="spinner-border text-light me-2" role="status" aria-hidden="true"></div>
                  <small>Loading…</small>
                </div>
              ) : (
                <small className="text-white-50">Synced: {new Date().toLocaleTimeString()}</small>
              )}
            </div>
          </div>
        </div>

        {error && (
          <div className="alert alert-danger shadow-sm">
            {error}
          </div>
        )}

        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h6 className="card-subtitle mb-2 text-muted">Entries</h6>
                <h3 className="card-title">{data.length}</h3>
                <small className="text-muted">Total days logged</small>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h6 className="card-subtitle mb-2 text-muted">Average Score</h6>
                <h3 className="card-title">
                  {data.length ? (data.reduce((s, d) => s + d.score, 0) / data.length).toFixed(1) : "—"}
                </h3>
                <small className="text-muted">Across all entries</small>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h6 className="card-subtitle mb-2 text-muted">Best Day</h6>
                {bestDay ? (
                  <>
                    <h5 className="card-title mb-1">
                      {new Date(bestDay.date).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </h5>
                    <p className="mb-0">
                      <strong>Score:</strong> {bestDay.score}
                    </p>
                    {bestDay.entry && <p className="text-muted small mt-1 mb-0">{bestDay.entry}</p>}
                  </>
                ) : (
                  <p className="card-text text-muted">No entries yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <div className="row g-2 align-items-end">
          <div className="col-sm-3">
            <label className="form-label">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="col-sm-2">
            <label className="form-label">Score</label>
            <input
              type="number"
              min="1"
              max="10"
              value={score}
              onChange={(e) => setScore(Number(e.target.value))}
              className="form-control"
            />
          </div>

          <div className="col-sm-5">
            <label className="form-label">Entry</label>
            <input
              type="text"
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
              className="form-control"
              placeholder="How was your day?"
            />
          </div>

          <div className="col-sm-2">
            <button onClick={submit} className="btn btn-primary w-100">Save</button>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <Line data={chartData} options = {options} />
      </div>

      <div className="mt-4">
        <h2>Best Day</h2>
        {bestDay ? (
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{new Date(bestDay.date).toLocaleDateString(undefined, 
                {year: 'numeric', month: 'short', day: "numeric"})} — Score: {bestDay.score}</h5>
              {bestDay.entry && <p className="card-text">{bestDay.entry}</p>}
            </div>
          </div>
        ) : (
          <p className="text-muted">No entries yet.</p>
        )}
      </div>
    </div>
  );
}
 

export default App;
