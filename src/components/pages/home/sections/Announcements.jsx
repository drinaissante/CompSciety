import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import MotionDiv from "../../../MotionDiv.jsx";

import "swiper/css";
import "swiper/css/navigation";

import { useRef } from "react";
import TruncatedText, { MAX_WIDTH } from "../../../../extras/TruncatedText.jsx"

const announcements = [
  { title: "First Title", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet", date: "January 17, 2025" },
];

/*

  { title: "Second Title", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel risus iaculis, tempor nibh non, condimentum ipsum. Curabitur viverra tortor nec lectus tempor iaculis. Morbi sit amet sem nec enim pharetra cursus sit amet a sapien. Sed a vulputate dolor. Phasellus ut massa ac dolor tempus commodo. Aenean sit amet ex porta, malesuada tellus eget, ultricies diam.", date: "March 24, 2025" },
  { title: "Third Title", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel risus iaculis, tempor nibh non, condimentum ipsum. Curabitur viverra tortor nec lectus tempor iaculis. Morbi sit amet sem nec enim pharetra cursus sit amet a sapien. Sed a vulputate dolor. Phasellus ut massa ac dolor tempus commodo. Aenean sit amet ex porta, malesuada tellus eget, ultricies diam.", date: "April 11, 2025" },
  { title: "Fourth Title", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel risus iaculis, tempor nibh non, condimentum ipsum. Curabitur viverra tortor nec lectus tempor iaculis. Morbi sit amet sem nec enim pharetra cursus sit amet a sapien. Sed a vulputate dolor. Phasellus ut massa ac dolor tempus commodo. Aenean sit amet ex porta, malesuada tellus eget, ultricies diam.", date: "October 30, 2025" },
*/



function Announcements() {
    const swiperRef = useRef(null);

    const handleMouseEnter = (e) => {
        swiperRef.current?.autoplay.stop();
    }

    const handleMouseLeave = (e) => {
        swiperRef.current?.autoplay.start();
    }

    return (
        <MotionDiv className="absolute p-3 text-black flex w-[80%] left-1/9 lg:left-1/4 lg:w-[50%] text-center justify-self-center rounded-2xl -bottom-23 lg:-bottom-20 lg:p-10 shadow-[0_0_7px_3px_rgba(0,200,0,0.4)]">
            <div className="relative w-full group">
                {announcements.length > 1 && (
                    <>
                        <button className="prev-btn absolute left-0 top-0 bottom-0 z-10 w-16 flex items-center justify-center bg-black/40 text-white text-4xl opacity-20 hover:opacity-100 transition-opacity duration-300 rounded-2xl">
                            ◀
                        </button>

                        <button className="next-btn absolute right-0 top-0 bottom-0 z-10 w-16 flex items-center justify-center text-white text-4xl opacity-20 bg-black/40 hover:opacity-100 transition-opacity duration-300 rounded-2xl">
                            ▶
                        </button>
                    </>
                )}

                {announcements.length == 1 ? (
                    <div className="select-none bg-emerald-100 text-black p-2 rounded-2xl">
                        <h1 className="text-lg sm:text-xl font-bold">{announcements[0].title}</h1>

                        {announcements[0].date && <h4>{announcements[0].date}</h4>}

                        <TruncatedText 
                            text={announcements[0].description} 
                            max_width={220}
                            scrollThreshold={8}
                        />
                    </div>
                ) : announcements.length > 0 ? (
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        speed={800}
                        navigation={{ nextEl: ".next-btn", prevEl: ".prev-btn" }}
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
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
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <h1 className="text-xl font-bold">{announcement.title} </h1>
                                {announcement.date && <h6>{announcement.date}</h6>}

                                <TruncatedText 
                                    text={announcement.description} 
                                    max_width={220}
                                    scrollThreshold={70}
                                />
                            </SwiperSlide>
                        ))}
                        
                    </Swiper>
                ) : (
                    <h1 className="select-none text-white text-2xl">There are currently no announcements.</h1>
                )}
                
            </div>
            
        </MotionDiv>
    );
}

export default Announcements;