// pages/index.js
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

export default function Home({ quote, currentDate }) {
  return (
    <div className="container">
      <div className="card">
        <h1>👋 Welcome!</h1>
        <p>
          Today is <span className="date">{currentDate}</span>
        </p>
        <p>Here’s your quote of the day:</p>
        <p className="quote">
          “{quote.text}” — <span className="author">{quote.author}</span>
        </p>
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
