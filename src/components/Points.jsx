

export function Points({ player, points }) {

    return (
        <div className="flex items-end lg:items-center justify-center gap-2 lg:gap-0 lg:flex-col w-44 lg:h-48 border-1 rounded-2xl border-black bg-green-950 p-1 lg:p-2 text-xl text-white text-center">
            <span className="h-7">{player} :</span>
            <hr />
            <div className="flex lg:border-2 border-white lg:w-full lg:h-4/5 rounded-b-xl mt-1">
                <span className="m-auto text-2xl lg:text-8xl">{points}</span>
            </div>
        </div>
    )
}
