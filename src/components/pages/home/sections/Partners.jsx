import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";

import { motion, AnimatePresence } from "framer-motion";

import cs_wizards from "@assets/CS_WIZARDS.jpg"
import jpcs from "@assets/jpcs.png"
import thecrunch from "@assets/thecrunch.png"
import swits from "@assets/SWITS.png"
import bliss from "@assets/BLISS.png"

import MotionDiv from "../../../MotionDiv.jsx"

import "swiper/css";
import "swiper/css/pagination"

import "@css/Partners.css"

// PUT THESE IN A SEPARATE MODEL FILE FOR READABILITY AND IMPORT NALANG

const partners = [
  { name: "The Crunch", logoSrc: thecrunch, mission: "", vision: "", url: "https://www.facebook.com/TheCrunch.Malolos" },
  { name: "CS Wizards", logoSrc: cs_wizards, mission: "", vision: "", url: "https://www.facebook.com/thenewCSWIZARDS", college: "CS"},
  {
    name: "Junior Philippine Computer Society (JPCS)",
    logoSrc: jpcs,
    mission:
      "To unite and commit the youth to: technical and leadership excellence; fostering among themselves, lasting friendship, and constructive cooperation in genuine love of God and country.",
    vision: "",
    url: "https://www.facebook.com/JPCSCEUMLLS",
    college: "(CEU Malolos) - CIT"
  },
  { name: "Society for the Welfare of Information Technology Students (SWITS) ", logoSrc: swits, mission: "The Society for the Welfare of Information Technology Students (SWITS) of the College of Information and Communications Technology (CICT) is a college-based organization founded in 2001. SWITS focuses its goals on addressing the needs of our IT students and anchors its activities on the organization's passion, mission, and vision. SWITS became recognized for their projects and yearly events; including Enablement Seminars, IT Mentorship and IT Congress.", vision: "", url: "https://www.facebook.com/SWITS.org", college: "CICT" },
  { name: "BLISS", logoSrc: bliss, mission: "The Brigade of Library and Information Science Students Organization (BLISS) empower future information specialists. BLISS is a college-based organization at Bulacan State University under the College of Information and Communications Technology, an organization for Bachelor of Library and Information Science (BLIS) students, committed to empower future information professionals to bridge gaps, foster unity, and strengthen the access to information resources. Through students’ collective efforts, we aim to connect people with knowledge, ensuring that libraries, archives, and information centers remain vibrant and relevant.", vision: "", url: "https://www.facebook.com/BLISSorgCICT", college: "CICT" },
];

function HoverPreview({ bb, partner }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);


    if (!mounted || !bb || !partner || !document?.body) return null;

    const cardWidth = 700;
    const left = bb.left + bb.width / 2 - cardWidth / 2 + window.scrollX;
    
    const cardHeight = 220; // estimate or measure - change if too short / tall

    let top = bb.top - cardHeight - 40 + window.scrollY;

    if (partner.mission.length > 200) {
        top -= 30;
    } else {
        top += 90;
    }

    return createPortal(
        <AnimatePresence>
            <motion.div
                key={partner.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                style={{
                    position: "absolute",
                    top,
                    left,
                    width: cardWidth,
                    zIndex: 9999,
                    pointerEvents: "auto",
                }}
                className="hidden sm:block"
            >
                
            <div className="bg-[#12230F] rounded-xl shadow-lg overflow-hidden">
                <img
                    src={partner.logoSrc}
                    alt={`${partner.name} hover`}
                    className="w-full h-36 object-contain bg-[#1a1a1a]"
                />

                <div className="p-4 text-white text-center overflow-y-auto max-h-full">
                    <h3 className="font-bold text-lg"> {partner.name} {partner.college ? "- " + partner.college : ""} </h3>

                    <p className="text-sm mt-1"> {partner.mission || ""} </p>
                    <p className="text-sm mt-1"> {partner.vision || ""} </p>

                </div>
            </div>
            </motion.div>
        </AnimatePresence>,
        
        document.body
    )
}

function Partners() {
    const [hover, setHover] = useState(null);

    const swiperRef = useRef(null);

    const handleMouseEnter = (e, partner) => {
        const bb = e.currentTarget.getBoundingClientRect();

        setHover({ bb, partner });

        swiperRef.current?.autoplay.stop();
    }

    const handleMouseLeave = () => {
        setHover(null);

        swiperRef.current?.autoplay.start();
    }

    return (
        <div className="relative">
            <h2 className="absolute bottom-5/6 left-1/2 -translate-x-1/2 text-4xl font-extrabold p-5">Our Partners</h2>

            <MotionDiv
                id="partners"
                className="mt-20 mb-10 justify-self-center sm:w-[30%] w-[88%] h-auto rounded-4xl shadow-[0_0_10px_5px_rgba(0,255,0,0.2)]   bg-[#18230F] overflow-visible"
            >
                <Swiper
                    modules={[Autoplay, Pagination]}
                    pagination={{ clickable: true }}
                    spaceBetween={30}
                    slidesPerView={2}
                    autoplay={{ delay: 1000, disableOnInteraction: false }}
                    speed={2000}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    loop={true}
                    loopPreventsSliding={true}
                >
                    {partners.map((partner, i) => (
                        <SwiperSlide key={i}>
                            <div 
                                className="relative group flex flex-col items-center text-center pb-5"
                                onMouseEnter={(e) => handleMouseEnter(e, partner)}
                                onMouseLeave={handleMouseLeave}
                            >
                                
                                <a
                                    href={partner.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="select-none"
                                >
                                    <div className="flex flex-col items-center text-center">
                                        <img
                                            src={partner.logoSrc}
                                            alt={partner.name}
                                            className="mt-15 h-16 w-16 object-contain border-4 rounded-full cursor-pointer transition-transform duration-300 group-hover:scale-105"
                                            draggable="false"
                                        />

                                        <span className="block mt-2 text-center">{partner.name}</span>
                                    </div>
                                </a>
                            </div>

                        </SwiperSlide>

                    ))}
                </Swiper>
                
                {hover && (
                    <HoverPreview bb={hover.bb} partner={hover.partner} />
                )}

            </MotionDiv>


        </div>
    )
}

export default Partners;