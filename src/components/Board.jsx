import { useState } from 'react';
import { Square } from "./Square";

export function Board({ board, turn, setTurn, points, setPoints, arrFlippeds, setArrFlippeds }) {

    const [pair, setPair] = useState({})
    
    return (
        <section className="grid grid-cols-4 gap-2 justify-center items-center">
            {board.map((image, index) => {
                return (
                    <Square
                        key={index}
                        index={index}
                        image={image}
                        turn={turn}
                        setTurn={setTurn}
                        pair={pair}
                        setPair={setPair}
                        points={points}
                        setPoints={setPoints}
                        arrFlippeds={arrFlippeds}
                        setArrFlippeds={setArrFlippeds}
                    />
                );
            })}
        </section>
    );
}