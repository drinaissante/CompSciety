import Announcement from "../models/Announcement.jsx";
import Event from "../models/Event.jsx";

const events = [
    {
        name: "Event 1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
        location: "LOC",
        date: "September 11, 2001",
    },
    {
        name: "Event 2",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
        location: "LOC",
        date: "September 11, 2001",
    },
    {
        name: "Event 3",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
        location: "LOC",
        date: "September 11, 2001",
    }
];

const announcements = [
    {
        title: "Announcement 1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
    },
    {
        title: "Announcement 2",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
    },
    {
        title: "Announcement 3",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
    }
];

function Events() {
    return (
        <main id="events" className="flex flex-col lg:flex-row justify-center p-10 gap-4">
            {/* Events Column */}
            <div className="lg:w-1/2 text-2xl text-black font-bold">
                Events

                <div className="mt-5 text-xl flex flex-col justify-between gap-5 h-90">
                    {events.map((event, index) => (
                        <div key={index} className="flex rounded-xl overflow-hidden transform transition duration-300 hover:scale-101 shadow-xl/15">
                            <div className="bg-[#0e6b11] w-4 rounded-l-xl"></div>
                            <div className="bg-[#5e936c] p-4 flex-1">
                                <Event {...event} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Announcement Column */}
            <div className="lg:w-1/4 text-2xl text-black font-bold mt-10 lg:mt-0 lg:min-w-1/4">
                Announcements

                <div className="bg-[#5e936c] text-xl mt-5 rounded-2xl flex flex-col gap-3 p-4 transform transition duration-300 hover:scale-101 shadow-xl/15">
                    {announcements.map((event, index) => (
                        <div key={index}>
                            <Announcement {...event} />
                            {index !== announcements.length - 1 && (
                                <hr className="border-t border-white my-2.5 mx-auto" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}

export default Events;
