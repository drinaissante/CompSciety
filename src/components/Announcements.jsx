import { Navigation, Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import MotionDiv from "./MotionDiv.jsx";

import "swiper/css";
import "swiper/css/navigation";

const announcements = [
  { title: "First Title", description: "First Desc" },
  { title: "Second Title", description: "Second Desc" },
  { title: "Third Title", description: "Third Desc" },
  { title: "Fourth Title", description: "Fourth Desc" },
  { title: "Fifth Title", description: "Fifth Desc" },
];
function Announcements() {
    return (
        <MotionDiv className="absolute bg-[#255F38] p-8 text-black flex flex-row w-[80%] left-1/9 lg:left-1/4 lg:w-[50%] text-center justify-self-center rounded-2xl -bottom-14 lg:-bottom-20 lg:p-10 shadow-[0_0_7px_3px_rgba(0,200,0,0.4)]">
            <button
                className="prev-btn absolute left-0 top-0 bottom-0 z-10 w-16 flex items-center justify-center bg-black/40 text-white text-4xl opacity-20 hover:opacity-100 transition-opacity duration-300 rounded-full"
            >
                ◀
            </button>

            <button
                className="next-btn absolute right-0 top-0 bottom-0 z-10 w-16 flex items-center justify-center text-white text-4xl opacity-20 
                bg-black/40 hover:opacity-100 transition-opacity duration-300 rounded-full"
            >
                ▶
            </button>
            <div className="relative w-full group">
                <Swiper
                    modules={[Navigation, Autoplay]}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    speed={3000}
                    navigation={{ nextEl: ".next-btn", prevEl: ".prev-btn" }}
                    spaceBetween={40}
                    slidesPerView={1.2}
                    loop={true}
                    loopPreventsSliding={true}
                    className="rounded-2xl"
                >
                    {announcements.map((announcement, i) => (
                        <SwiperSlide
                            key={i}
                            className="select-none bg-emerald-100 text-black p-10 rounded-2xl"
                        >
                            <h1 className="text-xl font-bold">{announcement.title}</h1>
                            <p className="mt-2">{announcement.description}</p>
                        </SwiperSlide>
                    ))}
                    
                </Swiper>
            </div>
            
        </MotionDiv>
    );
}

export default Announcements;