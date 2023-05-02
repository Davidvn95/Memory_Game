import { useState } from "react";
import { Howl } from "howler";
import { Welcome } from "./components/Welcome";
import { sortBoard } from "./logic/logicGame";
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
    const [data, setData] = useState(sortBoard());
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
        setData(sortBoard());
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
        <main className="bg-lime-500 w-screen h-screen lg:max-h-screen overflow-hidden overflow-y-auto lg:overflow-y-hidden text-teal-900 font-bold flex flex-col items-center justify-center gap-10 p-8">
            {!playersNames.player1 && (
                <Welcome setPlayersNames={setPlayersNames} playersNames={playersNames} />
            )}
            <img
                src={Logo}
                alt=""
                className="w-24 h-24 lg:w-32 lg:h-32 rounded-xl absolute top-16 right-5 z-10"
            />
            <h1 className="text-6xl mt-48 lg:m-0 -ml-4 lg:text-7xl">Memory Game</h1>

            <img
                src={!isMuted ? volumenImage : muteImage}
                className="w-10 h-10 lg:w-14 lg:h-14 absolute top-3 lg:top-8 lg:right-40 z-30 cursor-pointer"
                onClick={toggleSound}
                alt=""
            />

            {winner.status && <WinnerModal player={winner.player} resetGame={resetGame} />}
            <div className="flex gap-4">
                <button
                    className="bg-teal-800 hover:bg-teal-900 text-white text-xl hover:text-orange-200 w-40 h-11 lg:w-48 lg:h-12 rounded-md"
                    onClick={resetGame}>
                    Reset Game
                </button>
                <button
                    className="bg-teal-800 hover:bg-teal-900 text-white text-xl hover:text-orange-200 w-40 h-11 lg:w-48 lg:h-12 rounded-md"
                    name="Exit"
                    onClick={resetGame}>
                    Exit
                </button>
            </div>
            <section className="flex flex-col lg:flex-row items-center lg:gap-9">
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
