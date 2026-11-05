import { useEffect, useState } from "react";

const API = "http://localhost:5000/api";
const SERVICES = ["Hospital", "Bank", "College Office"];

export default function App() {
  const [tab, setTab] = useState("book");
  const [name, setName] = useState("");
  const [service, setService] = useState("Hospital");
  const [myToken, setMyToken] = useState(null);
  const [queue, setQueue] = useState([]);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function request(path, options = {}) {
    const response = await fetch(`${API}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Request failed");
    return data;
  }

  async function createToken(event) {
    event.preventDefault();
    setMessage("");
    setBusy(true);
    try {
      const token = await request("/tokens", {
        method: "POST",
        body: JSON.stringify({ customerName: name, service })
      });
      setMyToken(token);
      setName("");
      await refreshToken(token._id);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setBusy(false);
    }
  }

  async function refreshToken(id = myToken?._id) {
    if (!id) return;
    try {
      const data = await request(`/tokens/${id}`);
      setMyToken(data);
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function loadQueue() {
    try {
      setQueue(await request("/admin/tokens"));
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function callNext(selectedService) {
    setMessage("");
    try {
      await request(`/admin/${encodeURIComponent(selectedService)}/next`, { method: "POST" });
      await loadQueue();
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function completeToken(id) {
    try {
      await request(`/admin/tokens/${id}/complete`, { method: "PATCH" });
      await loadQueue();
    } catch (error) {
      setMessage(error.message);
    }
  }

  useEffect(() => {
    if (tab !== "admin") return;
    loadQueue();
    const timer = setInterval(loadQueue, 5000);
    return () => clearInterval(timer);
  }, [tab]);

  useEffect(() => {
    if (!myToken?._id) return;
    const timer = setInterval(() => refreshToken(myToken._id), 5000);
    return () => clearInterval(timer);
  }, [myToken?._id]);

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#"><span className="brand-mark">Q</span> QueueLess</a>
        <nav>
          <button className={tab === "book" ? "nav active" : "nav"} onClick={() => setTab("book")}>Get a token</button>
          <button className={tab === "admin" ? "nav active" : "nav"} onClick={() => setTab("admin")}>Admin</button>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="eyebrow">SMART QUEUE MANAGEMENT</div>
          <h1>Less waiting.<br /><span>More living.</span></h1>
          <p>Take a digital token, track your place, and spend your time doing what matters.</p>
          <div className="hero-badges"><span>● Digital tokens</span><span>● Live queue updates</span><span>● Simple and convenient</span></div>
        </section>

        {message && <div className="notice" role="alert">{message}</div>}

        {tab === "book" ? (
          <section className="content-grid">
            <form className="card booking-card" onSubmit={createToken}>
              <div className="card-kicker">GET STARTED</div>
              <h2>Get your token</h2>
              <p className="muted">Choose where you need service. We'll add you to the queue.</p>
              <label htmlFor="customerName">Your name</label>
              <input id="customerName" value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" maxLength="60" required />
              <label htmlFor="service">Select a service</label>
              <select id="service" value={service} onChange={e => setService(e.target.value)}>
                {SERVICES.map(item => <option key={item}>{item}</option>)}
              </select>
              <button className="primary-btn" disabled={busy}>{busy ? "Generating..." : "Generate my token →"}</button>
              <small className="muted">Demo project: please don't enter sensitive personal information.</small>
            </form>

            <section className="card token-card">
              <div className="card-kicker">YOUR QUEUE PASS</div>
              {myToken ? (
                <>
                  <div className="token-label">TOKEN NUMBER</div>
                  <div className="token-number">Q{String(myToken.tokenNumber).padStart(3, "0")}</div>
                  <div className="status-pill">{myToken.status}</div>
                  <div className="stats">
                    <div><strong>{myToken.peopleAhead ?? "—"}</strong><span>People ahead</span></div>
                    <div><strong>{myToken.estimatedWaitMinutes ?? "—"} min</strong><span>Estimated wait</span></div>
                  </div>
                  <p className="muted token-service">{myToken.service} · {myToken.customerName}</p>
                  <button className="secondary-btn" onClick={() => refreshToken()}>Refresh status ↻</button>
                </>
              ) : (
                <div className="empty-state">
                  <div className="ticket-icon">▤</div>
                  <h3>Your token will appear here</h3>
                  <p>Generate a token to see your queue position and estimated waiting time.</p>
                </div>
              )}
            </section>
          </section>
        ) : (
          <section className="card admin-card">
            <div className="admin-heading">
              <div><div className="card-kicker">CONTROL CENTRE</div><h2>Queue dashboard</h2><p className="muted">Demo admin view. Queue refreshes every 5 seconds.</p></div>
              <button className="secondary-btn" onClick={loadQueue}>Refresh ↻</button>
            </div>
            <div className="service-actions">
              {SERVICES.map(item => <button className="primary-btn" key={item} onClick={() => callNext(item)}>Call next · {item}</button>)}
            </div>
            <div className="table-wrap">
              <table>
                <thead><tr><th>Token</th><th>Name</th><th>Service</th><th>Status</th><th>Action</th></tr></thead>
                <tbody>
                  {queue.map(token => <tr key={token._id}>
                    <td className="table-token">Q{String(token.tokenNumber).padStart(3, "0")}</td>
                    <td>{token.customerName}</td><td>{token.service}</td><td><span className="status-pill">{token.status}</span></td>
                    <td>{token.status === "serving" && <button className="text-btn" onClick={() => completeToken(token._id)}>Complete</button>}</td>
                  </tr>)}
                  {queue.length === 0 && <tr><td colSpan="5" className="empty-row">No active tokens yet.</td></tr>}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>
      <footer>QueueLess <span>·</span> Smart queue management project</footer>
    </div>
  );
}
