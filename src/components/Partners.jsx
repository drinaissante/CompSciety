import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";

import {motion, AnimatePresence} from "framer-motion";

import cs_wizards from "../assets/CS_WIZARDS.jpg"
import jpcs from "../assets/jpcs.png"
import mascot from "../assets/mascot.png"
import thecrunch from "../assets/thecrunch.png"
import swits from "../assets/SWITS.png"

import MotionDiv from "../components/MotionDiv.jsx"

import "swiper/css";

const partners = [
  { name: "The Crunch", logoSrc: thecrunch, mission: "", vision: "", url: "" },
  { name: "CS Wizards", logoSrc: cs_wizards, mission: "", vision: "", url: "", college: "CS"},
  {
    name: "Junior Philippine Computer Society (JPCS)",
    logoSrc: jpcs,
    mission:
      "To unite and commit the youth to: technical and leadership excellence; fostering among themselves, lasting friendship, and constructive cooperation in genuine love of God and country.",
    vision: "",
    url: "",
    college: "CEU Malolos - CS"
  },
  { name: "Society for the Welfare of Information Technology Students (SWITS) ", logoSrc: swits, mission: "The Society for the Welfare of Information Technology Students (SWITS) of the College of Information and Communications Technology (CICT) is a college-based organization founded in 2001. SWITS focuses its goals on addressing the needs of our IT students and anchors its activities on the organization's passion, mission, and vision. SWITS became recognized for their projects and yearly events; including Enablement Seminars, IT Mentorship and IT Congress.", vision: "", url: "", college: "CICT" },
  { name: "BLISS", logoSrc: mascot, mission: "", vision: "", url: "", college: "CICT" },
];

function HoverPreview({ bb, partner }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);


    if (!mounted || !bb || !partner || !document?.body) return null;

    const cardWidth = 700;
    const left= bb.left + bb.width / 2 - cardWidth / 2 + window.scrollX;
    
    const cardHeight = 220; // estimate or measure
    let top = bb.top - cardHeight - 12 + window.scrollY;

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

                <div className="p-4 text-white text-center max-h-60 overflow-y-auto">
                    <h3 className="font-bold text-lg"> {partner.name} - {partner.college} </h3>

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
            <h2 className="absolute left-1/4 lg:left-0 lg:ml-200 -top-13 text-4xl font-extrabold mt-2 p-5 sm:text-left">Our Partners</h2>

            <MotionDiv
                id="partners"
                className="mt-20 mb-10 justify-self-center sm:w-[30%] w-[80%] h-auto pb-20 rounded-4xl shadow-[0_0_10px_5px_rgba(0,255,0,0.2)] overflow-visible"
            >
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={30}
                    slidesPerView={2.5}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    speed={3000}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                >
                    {partners.map((partner, i) => (

                        <SwiperSlide key={i} className="overflow-visible">

                            <div 
                                className="relative group flex flex-col items-center text-center"
                                onMouseEnter={(e) => handleMouseEnter(e, partner)}
                                onMouseLeave={handleMouseLeave}
                            >

                                <a
                                    href={partner.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img
                                        src={partner.logoSrc}
                                        alt={partner.name}
                                        className="mt-15 h-16 w-16 object-contain border-4 rounded-full mx-auto cursor-pointer transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <span className="mt-2 text-center">{partner.name}</span>
                                </a>
                            </div>

                        </SwiperSlide>

                    ))}
                </Swiper>

            </MotionDiv>

            {hover && (
                <HoverPreview bb={hover.bb} partner={hover.partner} />
            )}

        </div>
    )
}

export default Partners;