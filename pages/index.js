import { useState } from "react";

export async function getStaticProps() {
  const res = await fetch("http://api.quotable.io/random");
  const data = await res.json();

  const today = new Date();
  const formattedDate = today.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return {
    props: {
      quote: {
        text: data.content,
        author: data.author,
      },
      currentDate: formattedDate,
    },
  };
}

const getWikipediaLink = (author) => {
  const encodedAuthor = encodeURIComponent(author);
  return `https://en.wikipedia.org/wiki/${encodedAuthor}`;
};

export default function Home({ quote, currentDate }) {
  const [copied, setCopied] = useState(false);

  const handleCopyQuote = () => {
    const fullQuote = `${quote.text} — ${quote.author}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(fullQuote).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = fullQuote;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="container">
      <div className="background-gradient"></div>
      <div className="card">
        <h1 className="animate-title">
          <span className="calendar-icon">📅</span> Quote for{" "}
          <span className="date">{currentDate}</span>
        </h1>
        {quote ? (
          <>
            <div
              className="quote-wrapper animate-quote"
              onClick={handleCopyQuote}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleCopyQuote();
                }
              }}
            >
              <span className="quote-mark open">❝</span>
              <p className="quote">
                {quote.text}
              </p>
              <span className="quote-mark close">❞</span>
            </div>
            <p className="author-wrapper animate-author">
              <a
                href={getWikipediaLink(quote.author)}
                target="_blank"
                rel="noopener noreferrer"
                className="author"
              >
                {quote.author}
              </a>
            </p>
            {copied && (
              <div className="toast animate-toast">
                <span className="toast-icon">✓</span> Copied to clipboard!
              </div>
            )}
          </>
        ) : (
          <p className="loading animate-quote">Loading quote...</p>
        )}
      </div>
      <style jsx>{`
        :global(body) {
          margin: 0;
          background: #000000;
          overflow: hidden;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes gradientShift {
          0%,
          100% {
            background: radial-gradient(
              ellipse at 20% 50%,
              rgba(45, 27, 78, 0.08) 0%,
              transparent 50%
            );
          }
          50% {
            background: radial-gradient(
              ellipse at 80% 50%,
              rgba(15, 76, 92, 0.08) 0%,
              transparent 50%
            );
          }
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        @keyframes slideInToast {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .container {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          width: 100vw;
          background: #000000;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          position: relative;
        }

        .background-gradient {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(
            ellipse at 20% 50%,
            rgba(45, 27, 78, 0.08) 0%,
            transparent 50%
          );
          animation: gradientShift 20s ease-in-out infinite;
          pointer-events: none;
          z-index: 0;
        }

        .card {
          background: #1e1e1e;
          padding: 3rem 4rem;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          text-align: center;
          color: #ffffff;
          position: relative;
          z-index: 1;
          animation: fadeInScale 0.4s ease-out;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 15px 40px rgba(0, 255, 204, 0.08);
          border-color: rgba(0, 255, 204, 0.15);
        }

        .animate-title {
          animation: fadeInUp 0.3s ease-out 0.15s both;
        }

        .calendar-icon {
          margin-right: 0.5rem;
          display: inline-block;
          animation: pulse 0.6s ease-out 0.3s both;
        }

        h1 {
          margin-bottom: 1rem;
          font-size: 2.5rem;
          color: #ffffff;
          font-weight: 300;
        }

        .date {
          font-weight: 600;
          color: #ffa500;
        }

        .quote-wrapper {
          margin-top: 2rem;
          cursor: pointer;
          position: relative;
          transition: all 0.2s ease;
          padding: 0.5rem;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .quote-wrapper:hover {
          background: rgba(255, 255, 255, 0.03);
        }

        .animate-quote {
          animation: fadeInUp 0.3s ease-out 0.3s both;
        }

        .quote {
          font-style: italic;
          font-size: 1.3rem;
          color: #cccccc;
          line-height: 1.6;
          margin: 0;
          display: inline;
        }

        .quote-mark {
          font-size: 2rem;
          color: #ffa500;
          opacity: 0.4;
          display: inline-block;
        }

        .author-wrapper {
          margin-top: 1.5rem;
          animation: fadeInUp 0.3s ease-out 0.45s both;
        }

        .author {
          font-weight: 600;
          color: #00ffcc;
          text-decoration: none;
          position: relative;
          display: inline-block;
          transition: color 0.2s ease;
          font-size: 1.1rem;
        }

        .author:hover {
          color: #66ffdd;
        }

        .author::after {
          content: "";
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #00ffcc, #66ffdd);
          transition: width 0.3s ease;
        }

        .author:hover::after {
          width: 100%;
        }

        .loading {
          margin-top: 2rem;
          font-style: italic;
          font-size: 1.2rem;
          color: #cccccc;
          animation: fadeInUp 0.3s ease-out 0.3s both;
        }

        .toast {
          position: absolute;
          bottom: 1.5rem;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 255, 204, 0.15);
          border: 1px solid rgba(0, 255, 204, 0.3);
          color: #00ffcc;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 500;
          animation: slideInToast 0.3s ease-out;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .toast-icon {
          font-size: 1rem;
          font-weight: bold;
        }

        .animate-toast {
          animation: slideInToast 0.3s ease-out;
        }

        @media (max-width: 768px) {
          .card {
            padding: 2rem;
            margin: 1rem;
          }

          h1 {
            font-size: 1.8rem;
          }

          .quote {
            font-size: 1.1rem;
          }

          .quote-mark {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
