import { useEffect, useRef, useState } from "react";

export const MAX_WIDTH = 70;

export default function TruncatedText({ 
    expanded: controlledExpanded, 
    setExpanded: controlledSetExpanded, 
    text, 
    max_width = MAX_WIDTH,
    collapsedHeight = "6rem", // default collapsed height
    scrollThreshold = 400,    // when content is taller than this, enable scrolling
}) {
    const [ defaultExpanded, defaultSetExpanded ] = useState(false);

    const expanded = controlledExpanded ?? defaultExpanded;
    const setExpanded = controlledSetExpanded ?? defaultSetExpanded;

    const ref = useRef(null);
    const [ maxHeight, setMaxHeight ] = useState(collapsedHeight);
    const [ isScrollable, setScrollable ] = useState(false);

    useEffect(() => {
        if (ref.current) {
            const fullHeight = ref.current.scrollHeight;
            
            setScrollable(fullHeight > scrollThreshold);

            if (expanded) {
                setMaxHeight(isScrollable ? `${scrollThreshold}px` : `${fullHeight}px`);
            } else {
                setMaxHeight(collapsedHeight);
            }
        }
    }, [expanded, text, collapsedHeight, scrollThreshold, isScrollable]);

    return (
        <p>
            <div 
                ref={ref}
                className={`max-h-15 lg:max-h-[${maxHeight}px] transition-all duration-300 overflow-hidden ${expanded && isScrollable ? "overflow-y-auto pr-2" : ""}`}
            >
                {expanded ? text : text.slice(0, max_width) + "... "}
            </div>

            <button
                onClick={() => setExpanded(!expanded)}
                className="text-blue-500 hover:underline"    
            >
                {expanded ? "Show less" : "Click more"}
            </button>
        </p>
    );
}