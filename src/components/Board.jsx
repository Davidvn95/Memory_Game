import { useState } from 'react';
import { Square } from "./Square";

export function Board({ board, turn, setTurn, updateBoard, setBoard, data, points, setPoints }) {

    const [pair, setPair] = useState({image:'', index:''})
    
    return (
        <section className="grid grid-cols-4 gap-3 justify-center">
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
                        updateBoard={updateBoard}
                        board={board}
                        setBoard={setBoard}
                        data={data}
                        points={points}
                        setPoints = {setPoints}
                    />
                );
            })}
        </section>
    );
}