import { useState } from "react";
import temppfp from "@assets/temppfp.jpg"


// need i-lista dito mga departments/committees then pagka-click -> show list of names
const main_core = [
    {
        role: "INTERNAL VICE", name: "Name.exe"
    },
    {
        role: "PRESIDENT", name: "Name.exe"
    },
    {
        role: "EXTERNAL VICE", name: "Name.exe"
    }
]

function Officers() {
    const [ selected, setSelected ] = useState(1);

    return (
        <div className="relative flex justify-center items-center mt-10 mb-32 h-[500px]">
            {main_core.map((officer, index) => {
                const isSelected = selected === index;

                return (
                    <div 
                        key={index} 
                        onClick={() => setSelected(index)}
                        className={`
                            absolute transition-all duration-700 ease-in-out cursor-pointer
                            ${isSelected 
                                ? "z-20 scale-100 translate-x-0 opacity-100 ring-4 ring-green-400 shadow-[0_0_100px_#00ff41]"
                                : index < selected
                                    ? "z-10 -translate-x-[350px] scale-90 opacity-60 brightness-50"
                                    : "z-10 translate-x-[350px] scale-90 opacity-60 brightness-50"
                            }
                        `}
                    >
                        <div className="bg-black/70 backdrop-blur-xl border border-green-400/40 rounded-full p-12 text-center shadow-[0_0_80px_rgba(0,255,65,0.3)]">
                            <img
                                src={temppfp}
                                className="w-40 h-40 object-cover rounded-full mx-auto border-4 border-green-400 shadow-[0_0_40px_#00ff41]"
                                alt={officer.role}
                            />

                            <p className="text-green-300 font-mono text-lg tracking-[0.3em] mt-6">
                                {officer.role}
                            </p>

                            <p className="text-green-400 font-bold mt-2">
                                {officer.name}
                            </p>

                        </div>

                    </div>
                )
            })}
        </div>
    )
}

export default Officers;