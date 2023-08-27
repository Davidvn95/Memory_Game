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
// import Logo from './assets/images/MemoryGameLogo.jpeg'

const sound = new Howl({
    src: [welcomeSound],
    volume: 0.1,
    loop: true,
});

function App() {
    const [arrFlippeds, setArrFlippeds] = useState([]);
    const [board, setBoard] = useState(sortBoard())
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
        const { name } = event.target;
        for(const flipped of arrFlippeds) {
            flipped(false)
        }
        setTimeout(() => {
            setBoard(sortBoard());
        }, 300)
        setArrFlippeds([])
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
        
    },[points, playersNames])

    return (
        <main className="flex flex-col justify-around items-center p-5 bg-lime-500 w-screen h-screen text-teal-900 font-bold gap-12 lg:gap-10">
            {!playersNames.player1 && <Welcome setPlayersNames={setPlayersNames} />}
            {/* <img
                src={Logo}
                alt=""
                className="w-[70px] h-[70px] lg:w-32 lg:h-32 rounded-3xl absolute top-16 right-5 z-10"
            /> */}
            <h1 className="relative text-7xl lg:text-7xl z-30">Memory Game</h1>

            <img
                src={!isMuted ? volumenImage : muteImage}
                className="w-10 h-10 lg:w-14 lg:h-14 absolute top-9 lg:top-8 right-6 lg:right-40 z-30 cursor-pointer"
                onClick={toggleSound}
                alt=""
            />

            {winner.status && <WinnerModal player={winner.player} resetGame={resetGame} />}
            <div className="flex gap-4 -mt-3 lg:-mt-0">
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
            <section className="flex flex-col-reverse lg:flex-row items-center -mt-4 lg:-mt-0 gap-6 lg:gap-9">
                <Board
                    board={board}
                    turn={turn}
                    setTurn={setTurn}
                    points={points}
                    setPoints={setPoints}
                    arrFlippeds={arrFlippeds}
                    setArrFlippeds={setArrFlippeds}
                />
                <section className="flex gap-2 lg:gap-9 flex-col">
                    <div className="flex justify-center gap-14">
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
    )
}

export default App;
