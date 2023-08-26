import { useState } from 'react'
import { useEffect } from 'react'
import { checkGame} from '../logic/logicGame'
import { Howl } from 'howler'
import soundTarget from '../assets/sounds/Target.mp3'
import '../App.css'

const sound = new Howl({
    src: [soundTarget],
    volume: 0.5,
    loop: false,
})

export function Square({
    index,
    image,
    pair,
    setPair,
    turn,
    setTurn,
    points,
    setPoints,
    arrFlippeds,
    setArrFlippeds
}) {
    const [playing, setPlaying] = useState(false)
    const [flipped, setFlipped] = useState(false)

    const handleClick = () => {
        checkGame(pair, setPair, turn, setTurn, points, setPoints, image, setFlipped, arrFlippeds, setArrFlippeds)
        !playing && setPlaying(true)
        setFlipped(!flipped)
    }

    useEffect(() => {
        playing && sound.play()
    }, [playing, flipped])

    return (
        <div className={`relative bg-orange-300 border-green-700 border w-[90px] h-[90px] lg:w-24 lg:h-24 flex justify-center items-center font-bold text-6xl text-teal-900 cursor-pointer rounded-xl overflow-hidden card ${
                flipped ? 'flipped' : ''
            }`}>
            <div className="card-inner h-full w-full">
                <span onClick={handleClick} className="card-front w-full h-full text-4xl">
                    {index + 1}
                </span>
                <div className="card-back h-full w-full">
                    <img
                        src={image}
                        alt=""
                        className="w-full h-full object-cover line-through"
                    />
                </div>
            </div>
            {/* TODO: la etiqueta de abajo es para sombrear las imagenes que hayan hecho match */}

            {/* <div class="absolute top-0 left-0 w-full h-full bg-gray-900 opacity-70"/> */}
        </div>
    )
}
