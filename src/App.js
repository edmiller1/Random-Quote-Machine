import "./App.css";
import { useState, useEffect } from "react";

function App() {
  //State
  const colorList = [
    "#16a085",
    "#27ae60",
    "#2c3e50",
    "#f39c12",
    "#e74c3c",
    "#9b59b6",
    "#FB6964",
    "#342224",
    "#472E32",
    "#BDBB99",
    "#77B1A9",
    "#73A857",
  ];
  const [quote, setQuote] = useState(null);
  let [color, setColor] = useState(
    colorList[Math.floor(Math.random() * colorList.length)]
  );

  const getQuote = async () => {
    const response = await fetch(
      "https://goquotes-api.herokuapp.com/api/v1/random?count=1"
    );
    const data = await response.json();
    const [item] = data.quotes;
    setQuote(item);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    getQuote();
  }, []);

  const colorStyle = {
    backgroundColor: color,
  };

  const textStyle = {
    color: color,
  };

  return (
    <div
      className="App flex flex-col justify-center items-center min-h-screen"
      style={colorStyle}
    >
      <h1 className="text-white text-6xl">Random Quote Machine</h1>
      <div
        id="quote-box"
        className="mt-32 w-1/3 bg-white py-8 px-8 rounded-lg shadow-lg"
      >
        <div id="quote-text" className="mb-10">
          <i class="fas fa-quote-left fa-2x"></i>
          {quote && (
            <span id="text" className="text-2xl px-3 tracking-wide text-center">
              {quote.text}
            </span>
          )}
        </div>
        <div id="quote-author" className="bg-purple-50 mb-10">
          {quote && (
            <span id="author" className="italic float-right" style={textStyle}>
              - {quote.author}
            </span>
          )}
        </div>
        <div
          id="buttons"
          className="mt-24 flex justify-between flex-row-reverse"
        >
          <button
            id="new-quote"
            className="bg-purple-400 px-3 py-2 rounded-lg text-white focus:outline-none hover:opacity-75"
            style={colorStyle}
            onClick={() => getQuote()}
          >
            New Quote
          </button>
          <a
            id="tweet-quote"
            href="https://twitter.com/intent/tweet"
            rel="noreferrer"
            target="_blank"
            className="bg-purple-400 px-3 py-2 rounded-lg text-white hover:opacity-75"
            style={colorStyle}
          >
            <i class="fa fa-twitter"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
