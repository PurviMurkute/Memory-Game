import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

const MemoryGame = () => {
    const [gridSize, setGridSize] = useState(4);


    const handleGridSize = (e) => {
        const size = parseInt(e.target.value);
        if(size>=2 && size<=10){
            setGridSize(size);
        }else{
            toast.error("Grid size should not be greater than 8 and and less than 2");
        }
    }

    const emojies = ["🐱", "🐷", "🐼", "🍒", "🌻", "☘️", "🍀", "🌷", "🌼", "🩷", "🧡", "💖", "🍑", "🍅", "🍇", "🍉", "🥦", "🌸", "🌺", "🍟", "🍿", "🍔", "🍕", "🥗", "🍩", "🧁", "🍧", "🍷", "🍃", "🍂", "🍁", "🏵️"];

    const getEmojiPairs = () => {
        const totalBoxes = gridSize*gridSize;
        const emojiPairsNeeded = totalBoxes/2;
        const selectedEmojies = emojies.slice(0, emojiPairsNeeded);
        const pairs = [...selectedEmojies, ...selectedEmojies];


        //suffle
        for(let i=pairs.length-1; i>0; i--){
            const j = Math.floor(Math.random() * (i+1));
            [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
        }
        console.log("Pairs:", pairs.length, pairs);

        return pairs;
    }

  return (
    <div>
        <h1>MemoryGame</h1>
        <div>
            <input type='number' placeholder='Grid Size?' value={gridSize} onChange={handleGridSize} min="2" max="8" />
            <button onClick={()=>{getEmojiPairs()}}>Apply</button>
        </div>
        <Toaster/>
    </div>
  )
}

export default MemoryGame