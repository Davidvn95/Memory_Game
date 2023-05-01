import { useState } from 'react';
import { useEffect } from "react";
import { checkGame } from "../logic/logicGame";
import { Howl } from "howler";
import soundTarget from "../assets/sounds/Target.mp3"


const sound = new Howl({
    src: [soundTarget],
    volume: 0.5,
    loop: false,
});

export function Square({ index, image, updateBoard, pair, setPair, turn, setTurn, board, setBoard, data, points, setPoints }) {

    const [playing, setPlaying] = useState(false)

    const handleClick = () => {
        const result = updateBoard(index)
        if(result === 'ready')return
        checkGame(pair, setPair, index, turn, setTurn, board, setBoard, data, points, setPoints)
    }

    useEffect(() => {
        playing && sound.play()
        setPlaying(true)
    },[image])

    
    return (
        <div
            onClick={handleClick}
            className="relative bg-orange-300 border-green-700 border w-24 h-24 flex justify-center items-center font-bold text-6xl text-teal-900 cursor-pointer rounded-xl overflow-hidden">
            {image ? (
                <img src={image} alt="" className="w-full h-full object-cover line-through" />
            ) : (
                <span>{index + 1}</span>
            )}
            {/* TODO: la etiqueta de abajo es para sombrear las imagenes que hayan hecho match */}

            {/* <div class="absolute top-0 left-0 w-full h-full bg-gray-900 opacity-70"/> */}
        </div>
    );
}
