import React, { useCallback } from "react";
import { useEffect, useRef, useState } from "react";
import TimelineItem from "./TimelineItem";
import DetailPanel from "./DetailPanel.jsx";

// THE EVENTS (SHOULD BE YEAR-BASED)


// TODO: make the timeline cover the whole screen (so that when scrolling = move downward)

function Timeline({ events }) {
    const ref = useRef([]);
    const containerRef = useRef(null);
    const observerEnabled = useRef(true);

    const [ activeIdx, setActiveIdx ] = useState(0);
    const [ expanded, setExpanded ] = useState(false);

    const isScrolling = useRef(false);

    useEffect(() => {
        const handleWheel = (e) => {
            e.preventDefault();

            if (isScrolling.current) return;

            isScrolling.current = true;

            if (e.deltaY > 0 && activeIdx < events.length - 1) {
                setActiveIdx((prev) => prev + 1);
            } else if (e.deltaY < 0 && activeIdx > 0) {
                setActiveIdx((prev) => prev - 1);
            }

            setTimeout(() => {
                isScrolling.current = false;
            }, 400);
        };

        const el = containerRef.current;
        el.addEventListener("wheel", handleWheel, { passive: false }); 

        if (observerEnabled.current) {
            ref.current[activeIdx]?.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }

        return () => el.removeEventListener("wheel", handleWheel);
    }, [activeIdx]);

    const handleClick = useCallback((index) => {
        observerEnabled.current = false;
        setActiveIdx(index);
        setExpanded(true);

        setTimeout(() => {
            observerEnabled.current = true;
        }, 500);
    }, []);

    return (
        <div className="relative flex overflow-hidden">

            <div
                ref={containerRef}
                className={`
                    relative overflow-y-scroll snap-y snap-mandatory transition-all duration-800
                    ${expanded 
                        ? "w-1/3" 
                        : "w-full max-w-xl mx-auto"
                    }
                `}
            >

                <div className=" py-32 ">
                    {events.map((event, index) => (
                        <div
                            key={index}
                            ref={(el) => (ref.current[index] = el)}
                            onClick={() => handleClick(index)}
                            className=" m-16 flex justify-center snap-center cursor-pointer"
                        >
                            <TimelineItem
                                active={index === activeIdx}
                                text={event.name}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <DetailPanel
                expanded={expanded}
                item={events[activeIdx]}
                onClose={() => setExpanded(false)}
            />
    </div>
    );
}

export default Timeline;