function TimelineItem({ active, text }) {
    return (
    <div
      className={`
        px-6 py-3 rounded-full text-sm font-medium
        transition-all duration-300
        ${
          active
            ? "bg-linear-to-r from-green-400 to-blue-400 shadow-[0_0_10px_5px_rgba(0,255,0,0.6)] flex align-center hover:opacity-90 transition text-white scale-110"
            : "bg-gray-200 text-gray-600 opacity-60 hover:opacity-100"
        }
      `}
    >
      {text}
    </div>
  );
}

export default TimelineItem;