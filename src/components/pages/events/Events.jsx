import Timeline from "@/models/Timeline.jsx";
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
        <div className='flex flex-col bg-linear-to-b from-[#18230F] via-[#2b5016] to-[#324d22]'>  
                
            <main id="events" className="justify-center mt-[5%] p-10 gap-4">
                <span className="text-center flex justify-self-center flex-col m-10 p-5 bg-green-500 rounded-2xl">
                    Events
                </span>

                <div>
                    <div className="lg:w-1/2 text-2xl text-white font-bold text-center lg:justify-self-center">
                        <Timeline events={events}/>
                    </div>
                </div>

            </main>

            <Footer />
        </div>
    );
}

export default Events;
