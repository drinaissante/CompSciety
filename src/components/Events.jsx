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
]

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
]

function Events() {
    return (
        <main className="bg-[#e8ffd7] flex flex-col sm:flex-row justify-center p-5 gap-4">

            {/* Events Column */}
            <div className="ml-5 text-2xl text-black font-bold">
                Events

                <div className="mt-5 text-xl flex flex-col gap-5">

                    {events.map((event, index) => (
                        <div key={index} className="flex rounded-xl overflow-hidden">

                            <div className="bg-[#0e6b11] w-4 rounded-l-xl"></div>

                            <div className="bg-[#5e936c] p-4 flex-1">
                                <Event {...event}/>
                            </div>

                        </div>
                    ))}

                </div>
            </div>

            {/* Announcement column */}
            <div className="mr-5 ml-5 text-2xl text-black font-bold">
                Announcements

                <div className="bg-[#5e936c] text-xl mt-5 rounded-2xl flex flex-col gap-3 p-2">
                    
                    {announcements.map((event, index) => (
                        <div key={index}>
                            <Announcement {...event} />
                            
                            {index !== events.length - 1 && (
                                <hr className="border-t border-white my-2.5 align-center w-50 mx-auto"/>
                            )}
                        </div>
                    ))}
                </div> 
            </div>
        </main>
    );
}

export default Events;
