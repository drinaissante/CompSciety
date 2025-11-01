import Announcement from "../../../models/Announcement.jsx";
import Event from "../../../models/Event.jsx";

import MotionDiv from "../../MotionDiv.jsx";
import Footer from "../home/sections/Footer.jsx";

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

function Events() {
    return (
        <div className='flex flex-col scroll-smooth bg-linear-to-tr from-[#18230F] via-[#2b5016] to-[#324d22]'>  
                
            <main id="events" className="min-h-screen flex flex-col lg:flex-row justify-center mt-[5%] p-10 gap-4">
                {/* Events Column */}
                <div className="lg:w-1/2 text-2xl text-white font-bold">
                    Events

                    <MotionDiv className="mt-5 text-xl flex flex-col justify-between gap-5 h-90">
                        {events.map((event, index) => (
                            <div key={index} className="flex rounded-xl overflow-hidden transform transition duration-300 hover:scale-101 shadow-xl/15">
                                <div className="bg-[#0e6b11] w-4 rounded-l-xl"></div>
                                <div className="bg-[#5e936c] p-4 flex-1">
                                    <Event {...event} />
                                </div>
                            </div>
                        ))}
                    </MotionDiv>
                </div>

            </main>

            <Footer />
        </div>
    );
}

export default Events;
