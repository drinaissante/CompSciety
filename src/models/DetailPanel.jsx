function DetailPanel({ expanded, item, onClose }) {
    return (
        <div 
            className={
                `h-full order-1 shadow-xl transition-all duration-500 
                ${expanded 
                    ? "w-2/3 translate-x-0" 
                    : "w-0 translate-x-full"} 
                overflow-hidden`}
        >
            {expanded && (
                <div className="h-full overflow-y-scroll p-8">
                    <button onClick={onClose} className="mb-4 text-2xl text-white hover:text-green-800">
                        Back
                    </button>

                    <h2 className="text-2xl font-bold mb-4">
                        {item.name}
                    </h2>

                    <p className="text-white leading-relaxed">
                        {item.description}
                    </p>
                </div>
            )}
        </div>
    )
}

export default DetailPanel;