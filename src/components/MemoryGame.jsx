import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import question from "./../assets/question.png";

const MemoryGame = () => {
  const [gridSize, setGridSize] = useState(4);
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [won, setWon] = useState(false);

  const handleGridSize = (e) => {
    const size = parseInt(e.target.value);
    if (size >= 2 && size <= 8) {
      setGridSize(size);
    }
  };

  const emojies = [
    "🐱",
    "🐷",
    "🐼",
    "🍒",
    "🌻",
    "☘️",
    "🎨",
    "🌷",
    "🌼",
    "🩷",
    "🧡",
    "💖",
    "🍑",
    "🍅",
    "🍇",
    "🍉",
    "🥦",
    "🌸",
    "🌺",
    "🍟",
    "🍿",
    "🍔",
    "🍕",
    "🥗",
    "🍩",
    "🧁",
    "🍧",
    "🍷",
    "🍃",
    "🍂",
    "🍁",
    "🏵️",
  ];

  const getEmojiPairs = () => {
    const totalBoxes = gridSize * gridSize;
    const emojiPairsNeeded = totalBoxes / 2;
    const selectedEmojies = emojies.slice(0, emojiPairsNeeded);
    const pairs = [...selectedEmojies, ...selectedEmojies];

    //suffle
    for (let i = pairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
    }
    console.log("Pairs:", pairs.length, pairs);

    setCards(pairs);
  };

  const handleCardClick = (i) => {
  if (disabled || flipped.includes(i) || matched.includes(i)) return;

  const newFlipped = [...flipped, i];
  setFlipped(newFlipped);

  if (newFlipped.length === 2) {
    setDisabled(true);

    setTimeout(() => {
      const [first, second] = newFlipped;

      if (cards[first] === cards[second]) {
        const updatedMatched = [...matched, first, second];
        setMatched(updatedMatched);

        // ✅ Check win condition here
        if (updatedMatched.length === cards.length) {
          setWon(true);
        }
      }

      setFlipped([]);
      setDisabled(false);
    }, 1000);
  }
};


  const isFlipped = (i) => flipped.includes(i) || matched.includes(i);
 

  useEffect(() => {
    getEmojiPairs();
  }, [gridSize]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-700 ">
      <h1 className="text-center font-extrabold text-3xl py-5">Memory Card Game</h1>
      <div className="flex flex-col justify-center items-center inset-0 fixed">
        <div className="flex">
          <label htmlFor="grid-input" className="my-1 me-2 font-bold text-xl text-gray-300">
            Grid Size: 
          </label>
          <input
            type="number"
            placeholder="Grid Size?"
            value={gridSize}
            onChange={handleGridSize}
            min="2"
            max="8"
            className="bg-gray-100 px-3 py-1 rounded-md mb-4 text-black w-[150px] focus:outline-none"
          />
        </div>
        <div
          className="grid gap-2 justify-center items-center"
          style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
        >
          {cards.map((card, i) => {
            return (
              <div
                key={i}
                className={`w-20 h-20 bg-gray-100 text-3xl p-2 flex justify-center items-center rounded-md shadow-xl cursor-pointer ${isFlipped(i)? "rotate-y-180": ""}`}
                onClick={() => {
                  handleCardClick(i);
                }}
              >
                {isFlipped(i) ? card : "❓"}
              </div>
            );
          })}
        </div>
        <p className="my-5 font-bold text-xl text-pink-800">{won? "YOU WON 🥳": ""}</p>
      </div>
      <Toaster />
    </div>
  );
};

export default MemoryGame;
