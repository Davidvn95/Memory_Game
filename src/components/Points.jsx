

export function Points({ player, points }) {

    return (
        <div className="w-44 h-48 border-1 rounded-2xl border-black bg-green-950 p-2 text-xl text-white text-center">
            {player}
            <hr />
            <div className="flex flex-col border-2 border-white w-auto h-4/5 rounded-b-xl mt-1">
                <span className="m-auto text-8xl">{points}</span>
            </div>
        </div>
    );
}
