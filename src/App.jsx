import { useState } from "react";
import { Howl } from "howler";
import { Welcome } from "./components/Welcome";
import { images } from "./utils/data";
import { players } from "./constants";
import { Board } from "./components/Board";
import { ButtonPlayers } from "./components/ButtonPlayers";
import { Points } from "./components/Points";
import { useEffect } from "react";
import welcomeSound from "./assets/sounds/Welcome_memoryGame.mp3";
import volumenImage from "./assets/images/volumen.png";
import muteImage from "./assets/images/mute.png";
import { WinnerModal } from "./components/WinnerModal";
import Logo from './assets/images/Logo.jpeg'

const sound = new Howl({
    src: [welcomeSound],
    volume: 0.08,
    loop: true,
});

function App() {
    const [data] = useState(() => {
        const shuffled = [...Object.values(images), ...Object.values(images)];
        return shuffled.sort(() => Math.random() - 0.5);
    });
    const [board, setBoard] = useState(Array(16).fill(null));
    const [turn, setTurn] = useState(players.PLAYER1);
    const [isMuted, setIsMuted] = useState(false);
    const [playersNames, setPlayersNames] = useState({
        player1: "",
        player2: "",
    });
    const [points, setPoints] = useState({
        player1: 0,
        player2: 0,
    });
    const [winner, setWinner] = useState({
        status: false,
        player: "",
    });

    const updateBoard = (index) => {
        if (board[index]) return "ready";
        const newBoard = [...board];
        newBoard[index] = data[index];
        setBoard(newBoard);
    };

    const toggleSound = () => {
        if (!isMuted) {
            sound.pause();
            setIsMuted(true);
        } else {
            sound.play();
            setIsMuted(false);
        }
    };
    const resetGame = (event) => {
        const {name} = event.target;
        setBoard(Array(16).fill(null));
        setTurn(players.PLAYER1);
        setPoints({ player1: 0, player2: 0 })
        setWinner(false)
        name === "Exit" && setPlayersNames({ player1: "", player2: "" });
    };
    

    useEffect(() => {
        sound.play();
    }, []);

    useEffect(() => {
        if (points.player1 + points.player2 === 8) {
            if (points.player1 > points.player2)
               return setWinner({ status: true, player: playersNames.player1 })
            else if (points.player1 < points.player2)
                return  setWinner({ status: true, player: playersNames.player2 })
            else
                setWinner({ status: true, player: "Draw" })
        }
        
    },[points])

    return (
        <main className="bg-lime-500 w-screen h-screen text-teal-900 text-8xl font-bold flex flex-col items-center justify-around p-8">
            {!playersNames.player1 && (
                <Welcome setPlayersNames={setPlayersNames} playersNames={playersNames} />
            )}
            <img src={Logo} alt="" className="w-32 h-32 rounded-xl absolute top-8 left-60 z-10" />
            <h1>Memory Game</h1>

            <img
                src={!isMuted ? volumenImage : muteImage}
                className="w-14 h-14 absolute top-8 right-40 z-30 cursor-pointer"
                onClick={toggleSound}
                alt=""
            />

            {winner.status && <WinnerModal player={winner.player} resetGame={resetGame} />}
            <div className="flex gap-4">
                <button
                    className="bg-teal-800 hover:bg-teal-900 text-white text-xl hover:text-orange-200 w-48 h-12 rounded-md"
                    onClick={resetGame}>
                    Reset Game
                </button>
                <button
                    className="bg-teal-800 hover:bg-teal-900 text-white text-xl hover:text-orange-200 w-48 h-12 rounded-md"
                    name="Exit"
                    onClick={resetGame}>
                    Exit
                </button>
            </div>
            <section className="flex flex-row items-center gap-9">
                <Board
                    board={board}
                    setBoard={setBoard}
                    turn={turn}
                    setTurn={setTurn}
                    updateBoard={updateBoard}
                    data={data}
                    points={points}
                    setPoints={setPoints}
                />
                <section className="flex gap-9 flex-col">
                    <div className="flex justify-center gap-3">
                        <ButtonPlayers
                            player={players.PLAYER1}
                            isSelected={turn === players.PLAYER1}
                        />
                        <ButtonPlayers
                            player={players.PLAYER2}
                            isSelected={turn === players.PLAYER2}
                        />
                    </div>
                    <div className="flex gap-2">
                        <Points player={playersNames.player1} points={points.player1} />
                        <Points player={playersNames.player2} points={points.player2} />
                    </div>
                </section>
            </section>
        </main>
    );
}

export default App;
