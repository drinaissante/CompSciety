import cs_wizards from "../assets/CS_WIZARDS.jpg"
import compsciety from "../assets/CompSciety.png"
import mascot from "../assets/mascot.png"

import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay } from "swiper/modules";

import "swiper/css";


const partners = [
    {
        name: "CS Wizards",
        logoSrc: cs_wizards
    },
    
    {
        name: "CSasd",
        logoSrc: compsciety
    },
    
    {
        name: "CS 123",
        logoSrc: mascot
    },
    
    {
        name: "CS Wizards",
        logoSrc: cs_wizards
    },
    
    {
        name: "CSasd",
        logoSrc: compsciety
    },
    
    {
        name: "CS 123",
        logoSrc: mascot
    },
    {
        name: "CS Wizards",
        logoSrc: cs_wizards
    },
    
    {
        name: "CSasd",
        logoSrc: compsciety
    },
    
    {
        name: "CS 123",
        logoSrc: mascot
    },
    
];

// TODO: check if pwede ilipat in exchange sa announcement carousel
function Partners() {
    return (
        <div id="partners" className="mt-20 mb-10 justify-self-center sm:w-[30%] w-[80%] h-50 bg-[#1F7D53] rounded-4xl">
            <h2 className="text-center text-3xl font-extrabold mt-2 ml-2 p-5 sm:text-left">Our Partners</h2>

            <Swiper
                modules={[Autoplay]}
                spaceBetween={30}
                slidesPerView={2.5}
                autoplay={{ delay: 800, disableOnInteraction: false }}
                speed={3000}  
            >
                {
                    Array(partners.length).fill().map((partner, i) => (
                        <SwiperSlide key={i}>
                            <div className="flex flex-col items-center"> 
                                {/* YUNG HOVER THING HERE */}
                                <img 
                                    src={partners[i].logoSrc}
                                    alt={partners[i].name}
                                    className="h-16 w-16 object-contain border-4 rounded-full mx-auto" 
                                />
                                <span className="mt-2 justify-self-center">
                                    {partners[i].name}
                                </span>
                            </div>
                        </SwiperSlide>
                    ))
                }

            </Swiper>
        </div>
    )
}

export default Partners;