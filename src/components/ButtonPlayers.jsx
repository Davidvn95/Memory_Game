export function ButtonPlayers({ player, isSelected }) {

    const className = `border border-orange-500 rounded-xl p-1 w-32 h-fit text-2xl text-center font-bold ${isSelected ? "bg-orange-400 shadow-outline" : ""}`
    
    return (
        <div className={className}>
            {player}
        </div>
    )
}