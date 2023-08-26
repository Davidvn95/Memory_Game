import { players } from "../constants";
import confetti from "canvas-confetti";
import { Howl } from "howler";
import WinnerSound from '../assets/sounds/Winning.mp3'
import { images } from "../utils/data";

const sound = new Howl({
    src: [WinnerSound],
    volume: 0.5,
    loop: false,
})

// * Función que hace la lógica del juego, comprueba si las imagenes són iguales, cambia los turnos

export function checkGame(
    pair,
    setPair,
    turn,
    setTurn,
    points,
    setPoints,
    image,
    setFlipped,
    arrFlippeds,
    setArrFlippeds
) {
    if (!pair.image) {
        setPair({image, setFlipped})
        return
    } else if (pair.image === image) {
        setPair({})
        setArrFlippeds([...arrFlippeds, pair.setFlipped, setFlipped])
        setTimeout(() => {
            fireConfetti()
            sound.play()
            if (turn === players.PLAYER1) setPoints({ ...points, player1: points.player1 + 1 })
            if (turn === players.PLAYER2) setPoints({ ...points, player2: points.player2 + 1 })
        }, 300)

        setTurn(turn === players.PLAYER1 ? players.PLAYER2 : players.PLAYER1)
        return
    } else {
        setTurn(turn === players.PLAYER1 ? players.PLAYER2 : players.PLAYER1)
        setTimeout(() => {
            pair.setFlipped(false)
            setFlipped(false)
        }, 1200);
        setPair({})
    }
}


// * Función que actualiza el tablero en cada Click
export const updateBoard = (index, board, setBoard, data) => {
    if (board[index]) return 'ready'
    const newBoard = [...board]
    newBoard[index] = data[index]
    setBoard(newBoard)
}


// * Función que reordena el tablero en caso de reinicio o nueva partida.

export function sortBoard() {
    const shuffled = [...Object.values(images), ...Object.values(images)];
    return shuffled.sort(() => Math.random() - 0.5);
}

//* Función que genera los confetines al encontrar una pareja

const count = 200;
const defaults = {
    origin: { y: 0.7 },
};

function fire(particleRatio, opts) {
    confetti(
        Object.assign({}, defaults, opts, {
            particleCount: Math.floor(count * particleRatio),
        })
    );
}

function fireConfetti() {
    fire(0.25, {
        spread: 26,
        startVelocity: 55,
    });
    fire(0.2, {
        spread: 60,
    });
    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });
}

// * Función que genera los confetines finalizando el juego con un ganador



export function finalConfetti() {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaultsValue = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }
    const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti(
            Object.assign({}, defaultsValue, {
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            })
        );
        confetti(
            Object.assign({}, defaultsValue, {
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            })
        );
    }, 250);
}

// * Función que genera los confetines al finalizarl el juego con un empate.
export function frameSnow() {
    const durationTime = 15 * 1000;
    const animationEnd = Date.now() + durationTime;
    let skew = 1;

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    (function frame() {
        const timeLeft = animationEnd - Date.now();
        const ticks = Math.max(200, 500 * (timeLeft / durationTime));
        skew = Math.max(0.8, skew - 0.001);

        confetti({
            particleCount: 1,
            startVelocity: 0,
            ticks: ticks,
            origin: {
                x: Math.random(),
                // since particles fall down, skew start toward the top
                y: Math.random() * skew - 0.2,
            },
            colors: ["#ffffff"],
            shapes: ["circle"],
            gravity: randomInRange(0.4, 0.6),
            scalar: randomInRange(0.4, 1),
            drift: randomInRange(-0.4, 0.4),
        });

        if (timeLeft > 0) {
            requestAnimationFrame(frame);
        }
    })();
}

