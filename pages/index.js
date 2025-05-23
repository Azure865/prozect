import { useEffect, useState } from "react";

export default function Home() {
  const [count, setCount] = useState(null);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const refreshCount =
      parseInt(sessionStorage.getItem("refreshCount") || "0", 10) + 1;
    sessionStorage.setItem("refreshCount", refreshCount);

    if (refreshCount > 5) {
      setShowWarning(true);
      return;
    }

    async function fetchCount() {
      const res = await fetch("/api/track");
      const data = await res.json();
      setCount(data.count);
    }
    fetchCount();
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h1>👋 Welcome!</h1>
        {showWarning ? (
          <p className="warning">
            Your refresh does nothing to me, it does not make the counter go
            up!!!
          </p>
        ) : count !== null ? (
          <>
            <p className="highlight">
              Hello! You are the <span className="number">#{count}</span>{" "}
              visitor to this site.
            </p>
            <p>We’re glad to have you here. 🎉</p>
          </>
        ) : (
          <p>Loading your visitor number...</p>
        )}
      </div>
      <style jsx>{`
        :global(body) {
          margin: 0;
          background: #000000;
        }
        .container {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          width: 100vw;
          background: #000000;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        }
        .card {
          background: #1e1e1e;
          padding: 3rem 4rem;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          text-align: center;
          color: #ffffff;
        }
        h1 {
          margin-bottom: 1rem;
          font-size: 2.5rem;
          color: #ffffff;
        }
        .highlight {
          font-size: 1.5rem;
          margin: 1rem 0;
        }
        .number {
          font-size: 2rem;
          color: #00ffcc;
          font-weight: bold;
        }
        .warning {
          margin-top: 1.5rem;
          font-size: 1.25rem;
          color: #ff5555;
          font-style: italic;
        }
      `}</style>
    </div>
  );
}
