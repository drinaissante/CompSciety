import Timeline from "@/models/Timeline.jsx";
import Footer from "../home/sections/Footer.jsx";
import MotionDiv from "@/components/MotionDiv.jsx";

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
                
            <main id="events" className="justify-center mt-[5%] p-10 gap-4 min-h-screen">
                <span className="text-center flex justify-self-center flex-col m-10 p-5 bg-green-500 rounded-2xl mt-25">
                    Events
                </span>

                <div className="lg:w-1/2 text-center lg:justify-self-center flex flex-col gap-11">

                    {/* 2025 events here */}
                    <MotionDiv className="hover:scale-105 hover:-translate-y-1 transition-transform duration-300 hover:inset-0 hover:bg-black/50 relative bg-[url('@assets/bg.jpg')] hover:text-white lg:p-15 cbg-center bg-cover rounded-full cursor-pointer">
                        <h1 className="relative text-5xl font-bold text-black">2025</h1>
                    </MotionDiv>





                    {/* next few years (?) */}
                    <MotionDiv className="hover:scale-105 hover:-translate-y-1 transition-transform duration-300 hover:inset-0 hover:bg-black/50 relative bg-[url('@assets/BG_COVER.jpg')] hover:text-white lg:p-15 p-6 bg-center bg-cover rounded-full cursor-pointer">
                        <h1 className="relative text-5xl font-bold text-black">Coming Soon</h1>
                    </MotionDiv>
                    
                    <MotionDiv className="hover:scale-105 hover:-translate-y-1 transition-transform duration-300 hover:inset-0 hover:bg-black/50 relative bg-[url('@assets/BG_COVER.jpg')] hover:text-white lg:p-15 p-6 bg-center bg-cover rounded-full cursor-pointer">
                        <h1 className="relative lg:text-5xl text-2xl font-bold text-black">Coming Soon</h1>
                    </MotionDiv>
                </div>

            </main>

            <Footer />
        </div>
    );
}

export default Events;
