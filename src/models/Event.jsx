import { IoLocationOutline } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";

function Event({ name, description, location, date }) {
    return (
        <div className="text-white flex ml-5">
            <span className="font-bold flex flex-col">
                {name}

                <span className="font-medium text-sm break-words w-[40ch]">
                    {description}
                </span>
            </span>

            <div className="flex flex-col ml-2 p-2 gap-3 text-nowrap text-sm">
                <div className="flex items-center gap-2">
                    <IoLocationOutline className="text-lg" />
                    <span>{location}</span>
                </div>

                <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-lg" />
                    <span>{date}</span>
                </div>
            </div>
        </div>
    );
}

export default Event;
