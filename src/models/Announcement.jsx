function Announcement({ title, description }) {
    return (
        <div className="text-white flex ml-8">
            <span className="font-bold flex flex-col">
                {title}

                <span className="font-medium text-sm wrap-break-word w-[30ch] text-justify break-normal">
                    {description}
                </span>
            </span>
        </div>
    );
}

export default Announcement;
