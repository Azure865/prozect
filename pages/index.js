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
      <div className="card fade-in">
        <h1 className="slide-up">
          Quotes for <span className="date">{currentDate}</span>
        </h1>
        {quote ? (
          <p className="quote slide-up">
            “{quote.text}” — <span className="author">{quote.author}</span>
          </p>
        ) : (
          <p className="slide-up">Loading quote...</p>
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
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }
        .card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 40px rgba(255, 255, 255, 0.1);
        }
        h1 {
          margin-bottom: 1rem;
          font-size: 2.5rem;
          color: #ffffff;
          transition: color 0.3s;
        }
        h1:hover {
          color: #00ffff;
        }
        .date {
          font-weight: bold;
          color: #ffa500;
          transition: color 0.3s;
        }
        .date:hover {
          color: #ffd700;
        }
        .quote {
          margin-top: 2rem;
          font-style: italic;
          font-size: 1.2rem;
          color: #cccccc;
          transition: color 0.3s;
        }
        .quote:hover {
          color: #ffffff;
        }
        .author {
          font-weight: bold;
          color: #00ffcc;
          transition: color 0.3s;
        }
        .author:hover {
          color: #00bfff;
        }

        /* Animations */
        .fade-in {
          animation: fadeIn 1s ease-in forwards;
        }

        .slide-up {
          opacity: 0;
          transform: translateY(20px);
          animation: slideUp 1s ease-out forwards;
        }

        .slide-up:nth-child(2) {
          animation-delay: 0.3s;
        }
        .slide-up:nth-child(3) {
          animation-delay: 0.6s;
        }
        .slide-up:nth-child(4) {
          animation-delay: 0.9s;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
