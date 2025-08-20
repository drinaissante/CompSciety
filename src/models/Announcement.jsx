function Announcement({ title, description }) {
    return (
        <div className="text-white flex ml-8">
            <span className="font-bold flex flex-col">
                {title}

                <span className="font-medium text-sm break-words w-[30ch]">
                    {description}
                </span>
            </span>
        </div>
    );
}

export default Announcement;
