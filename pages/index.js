import { useEffect, useState } from "react";

export default function Home() {
  const [quote, setQuote] = useState(null);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];
    const formattedDate = today.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setCurrentDate(formattedDate);

    const lastQuoteDate = localStorage.getItem("lastQuoteDate");

    if (lastQuoteDate !== todayStr) {
      async function fetchQuote() {
        try {
          const res = await fetch("http://api.quotable.io/random");
          const data = await res.json();
          setQuote({ text: data.content, author: data.author });
          localStorage.setItem("dailyQuote", JSON.stringify(data));
          localStorage.setItem("lastQuoteDate", todayStr);
        } catch (error) {
          setQuote({ text: "Error fetching quote.", author: "" });
        }
      }
      fetchQuote();
    } else {
      const stored = localStorage.getItem("dailyQuote");
      if (stored) {
        const data = JSON.parse(stored);
        setQuote({ text: data.content, author: data.author });
      }
    }
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h1>
          {" "}
          Quote for <span className="date">{currentDate}</span>{" "}
        </h1>
        <p></p>
        {quote ? (
          <p className="quote">
            “{quote.text}” — <span className="author">{quote.author}</span>
          </p>
        ) : (
          <p>Loading quote...</p>
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
        .date {
          font-weight: bold;
          color: #ffa500;
        }
        .quote {
          margin-top: 2rem;
          font-style: italic;
          font-size: 1.2rem;
          color: #cccccc;
        }
        .author {
          font-weight: bold;
          color: #00ffcc;
        }
      `}</style>
    </div>
  );
}
