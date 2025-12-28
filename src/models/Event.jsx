import { IoLocationOutline } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";

function Event({ name, description, location, date }) {
    return (
        <div className="text-white flex flex-col md:flex-row ml-5 md:items-start gap-4">
            <div className="font-bold flex flex-col">
                {name}

                <span className="font-medium text-sm wrap-break-word w-[40ch]">
                    {description}
                </span>
            </div>

            <div className="flex flex-col p-2 gap-3 text-nowrap text-sm">
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
