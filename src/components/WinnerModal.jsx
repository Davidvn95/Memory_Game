import { useEffect } from "react";
import { finalConfetti, frameSnow } from "../logic/logicGame";

export function WinnerModal({ player, resetGame }) {
    useEffect(() => {
        player !== "Draw" ? finalConfetti() : frameSnow()
     },[player])
    return (
        <div className="w-full h-full grid place-items-center absolute z-30 bg-slate-800 bg-opacity-10 shadow-2xl">
            <div className="bg-emerald-600 w-96 h-96 rounded-lg flex flex-col justify-around items-center p-4">
                <span className="text-white text-2xl">Congratulations:</span>
                <span className="text-white text-5xl">{player!== "Draw" ? player : "It's a draw"}</span>
                <span className="text-5xl">{player === "Draw" ? "🤪" : "🥳"}</span>
                <span className="text-white text-2xl">You won!</span>
                <button className="bg-white text-black p-2 rounded-lg text-xl" onClick={resetGame}>Play Again</button>
            </div>
        </div>
    );
} 