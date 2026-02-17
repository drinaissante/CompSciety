import MotionDiv from "../../MotionDiv.jsx";

import mascot from "@assets/mascot.png"

import adv1 from "@assets/adv1_temp.jpg"
import adv2 from "@assets/adv2_temp.jpg"
import temppfp from "@assets/temppfp.jpg"

import Footer from "../home/sections/Footer.jsx";
import { useEffect } from "react";
import Bobbing from "@/components/Bobbing.jsx";
import Officers from "./Officers.jsx";

import committees from "../../../lib/committees.json"

function AboutPage() {
    useEffect(() => {
        document.title = "About | BulSU Computer Science Society"
    }, []);

    function showMembers(members) {
        // members - array

        for (let i = 0; i < members.length; i++) {
            const member = members[i];
            
            // member has 'name' and 'role'

            <p>
                {/* TODO: find a way how to sort the roles
                
                    in a committee, pwedeng maraming roles

                    like sa multimedia

                    graphic designer:
                       * name
                       * name
                       
                    video editor:
                       * name
                       * name
                    
                    parang ganiyan ^^
                */}
            </p>
        }
    }

    return (
        <div className='min-h-screen flex flex-col scroll-smooth'>    
            <div className="bg-linear-to-b from-[#18230F] via-[#2b5016] to-[#324d22] select-none">
                <div
                    id="about"
                    className="relative rounded-[50px] bg-[#18230F] flex flex-col items-center gap-10 p-10 m-6 mt-35 sm:p-10 sm:mt-50 sm:mr-50 sm:ml-50 shadow-[0_0_1px_0.8px_rgba(0,255,0,0.3)]"
                >
                    <MotionDiv className="font-mono absolute -top-6 font-outfit font-bold text-4xl sm:text-7xl text-white sm:-top-10 sm:left-10">
                        About CompSciety
                    </MotionDiv>

                    <MotionDiv className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-8 max-w-6xl w-full">

                        <div className="flex flex-col max-w-3xl">
                            <p className="font-mono text-base m-5 sm:text-xl sm:m-0 text-white">
                                CompSciety exists to build a strong, united, and future-ready generation of Computer Science
                                students, not merely to keep up with the times, but to define them. Guided by the values of excellence,
                                innovation, integrity, collaboration, and inclusivity, we strive to turn knowledge into action, elevate
                                the role of Computer Science in society, and contribute to the advancement of the field within and
                                beyond the university.
                            </p>
                        </div>

                        <Bobbing logo={mascot} className="sm:ml-20 w-32 sm:w-44 h-auto " />
                    </MotionDiv>

                    <div className="flex flex-col lg:flex-row justify-center gap-6 w-full max-w-6xl">

                        
                        {/* Mission */}
                        <MotionDiv className="bg-[#255F38] rounded-2xl flex flex-col gap-7 p-8 text-white text-center flex-1 transform transition-all duration-300 hover:scale-105 max-w-lg">
                            <span className="font-outfit font-bold text-xl lg:text-3xl">Mission</span>

                            <p className="font-mono text-lg">
                                To cultivate a united community of socially responsible future-ready scholars and innovators committed to excellence, ethical reasoning, and technological advancement in the service of the people and society.
                            </p>
                            </MotionDiv>

                            {/* Vision */}
                            <MotionDiv transition={{ duration: 1.2, ease: "easeOut" }} className="bg-[#255F38] rounded-2xl flex flex-col gap-7 p-8 text-white text-center flex-1 transform transition-all duration-300 hover:scale-105 max-w-lg">
                            <span className="font-outfit font-bold text-xl lg:text-3xl">Vision</span>
                            
                            <p className="font-mono text-lg">
                                To empower students through inclusive education, collaborative innovation, and ethical leadership, fostering a culture of service that responds to the evolving needs of the Filipino nation and the global community.
                            </p>
                        </MotionDiv>

                    </div>

                </div>
                

                <div className="font-mono tracking-wide flex justify-center text-center mt-10 text-3xl pb-4 max-w-[450px] lg:max-w-6xl mx-auto border-b border-green-500/30">
                    Advisers
                </div>

                <div className="flex flex-col lg:flex-row m-10 gap-15">

                    <MotionDiv transition={{ duration: 0.9, ease: "easeIn" }} className="text-center p-8 bg-linear-to-br from-[#18230F] via-[#2b5016] to-[#324d22] rounded-xl lg:flex lg:items-center lg:text-left shadow-[0_0_80px_rgba(0,255,65,0.2)]">

                        {/* possible image */}
                        <img 
                            src={adv1}
                            className="w-32 sm:w-44 rounded-lg border-4 border-white mb-4 justify-self-center"
                            alt="adviser"
                            draggable={false}
                            loading="lazy"
                            decoding="async"
                        />
                        
                        <div className="flex flex-col m-5 font-mono">
                            <div>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum sollicitudin enim, vitae ultrices eros hendrerit at. Maecenas vitae dui libero. Vestibulum sed faucibus augue, et gravida diam. Etiam ultricies faucibus viverra. Pellentesque tristique risus a malesuada elementum. Nam id tincidunt felis. Integer ut venenatis elit. Curabitur non aliquet turpis.
                            </div>
                            <div className="font-extrabold mt-5">
                                — NAME
                            </div>
                        </div>

                    </MotionDiv>
                    
                    {/* right side org adv */}
                    <MotionDiv transition={{ duration: 1.2, ease: "easeIn" }} className="flex flex-col-reverse text-center items-center p-8 bg-linear-to-tl from-[#18230F] via-[#2b5016] to-[#324d22] rounded-xl lg:flex-row lg:text-right shadow-[0_0_80px_rgba(0,255,65,0.2)]">


                        <div className="flex flex-col m-5 font-mono">
                            <div>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum sollicitudin enim, vitae ultrices eros hendrerit at. Maecenas vitae dui libero. Vestibulum sed faucibus augue, et gravida diam. Etiam ultricies faucibus viverra. Pellentesque tristique risus a malesuada elementum. Nam id tincidunt felis. Integer ut venenatis elit. Curabitur non aliquet turpis.
                            </div>
                            <div className="font-extrabold mt-5">
                                — NAME
                            </div>
                        </div>

                        {/* possible image */}
                        <img 
                            src={adv2}
                            className="w-30 sm:w-44 rounded-lg border-4 border-white mb-4 justify-self-center"
                            alt="adviser2"
                            draggable={false}
                            loading="lazy"
                            decoding="async"
                        />
                    </MotionDiv>

                </div>

                

                <div className="font-mono tracking-wide flex justify-center text-center mt-10 mb-15 text-3xl border-b pb-4 max-w-sm lg:max-w-6xl mx-auto border-green-500/20">
                    Officers
                </div>

                {/* <Officers /> */}

                {/* pres + vps*/}
                <div className="relative justify-center items-center gap-20 mb-20
                                lg:flex lg:gap-0 lg:mb-32">
                    
                    {/* internal vice */}
                    <div className="bg-black/60 backdrop-blur-xl 
                        border border-green-400/30
                        rounded-3xl text-center 
                        shadow-[0_0_60px_rgba(0,255,65,0.2)]
                        opacity-90 self-end
                       
                        hover:border-green-400/80
                        p-9 lg:p-4 lg:m-2
                        m-30 mt-10 mb-10 lg:mt-0 lg:mb-0 ">

                        <img
                            src={temppfp}
                            className="w-40 h-40 object-cover rounded-full mx-auto 
                                    border-4 border-green-400/70"
                            alt="Internal Vice President"
                        />

                        <p className="text-green-300 font-mono text-lg tracking-[0.3em] mt-6">
                            INTERNAL VICE PRESIDENT
                        </p>

                        <p className="text-green-400 font-bold mt-2">
                            Name.exe
                        </p>
                    </div>

                    {/* pres */}
                    <div className="bg-black/70 backdrop-blur-xl 
                        border border-green-400/60
                        rounded-3xl text-center 
                        shadow-[0_0_100px_rgba(0,255,65,0.4)]
                        scale-110 self-start
                       
                        hover:border-green-400/80
                        p-10 m-28 lg:p-8
                        mt-10 mb-10 lg:mt-0 lg:mb-0 ">

                        <img
                            src={temppfp}
                            className="w-44 h-44 object-cover rounded-full mx-auto 
                                    border-4 border-green-400 
                                    shadow-[0_0_60px_#00ff41]"
                            alt="President"
                        />

                        <p className="text-green-300 font-mono text-lg tracking-[0.3em] mt-6">
                            PRESIDENT
                        </p>

                        <p className="text-green-400 font-bold mt-2">
                            Name.exe
                        </p>
                    </div>

                    {/* external vice */}
                    <div className="bg-black/60 backdrop-blur-xl 
                        border border-green-400/30
                        rounded-3xl text-center 
                        shadow-[0_0_60px_rgba(0,255,65,0.2)]
                        opacity-90 self-end

                        hover:border-green-400/80
                        p-9 lg:p-4 lg:m-2
                        m-32 mt-10 mb-10 lg:mt-0 lg:mb-0 ">

                        <img
                            src={temppfp}
                            className="w-40 h-40 object-cover rounded-full mx-auto 
                                    border-4 border-green-400/70"
                            alt="External Vice President"
                        />

                        <p className="text-green-300 font-mono text-lg tracking-[0.3em] mt-6">
                            EXTERNAL VICE PRESIDENT
                        </p>

                        <p className="text-green-400 font-bold mt-2">
                            Name.exe
                        </p>
                    </div>

                </div>


                {/* executives / committees */}
                <div className="mx-auto mb-24 max-w-sm lg:max-w-6xl ">

                    <h2 className="text-green-300 font-mono text-2xl tracking-widest mb-10 border-b border-green-500/20 pb-4 text-center ">
                        EXECUTIVES
                    </h2>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-h-60 overflow-y-auto pr-2">

                        {/* change array to executives */}
                        {[1,2,3,4,5,6,7,8,9].map((member) => (
                            <div key={member} className="bg-black/40 backdrop-blur-md 
                                border border-green-500/10 
                                rounded-xl p-6 
                                hover:border-green-400/40 
                                transition-all duration-300">


                                <p className="text-green-300 font-mono text-sm tracking-widest">
                                    Development Core Committee
                                </p>

                                <p className="text-green-400 font-semibold">
                                    Head: Gabriel Budano
                                </p>
                            </div>
                        ))}

                        {/* 
                            list:

                            executives 
                            ----------
                            (secretary, chief of staff, deputy secretary internal & external)


                        
                        */}

                        {/* TODO: pagka-click sa executive div, need may drop down ng mga things*/}

                    </div>

                    <h2 className="text-green-300 font-mono text-2xl tracking-widest mb-10 border-b border-green-500/20 pb-4 text-center mt-10">
                        COMMITTEES
                    </h2>
                    
                    <div className="mx-auto mb-24 max-w-sm lg:max-w-6xl ">
                        {committees.map((committee) => (
                            <div key={committee.id} className="p-6 border rounded-xl">
                                <p>
                                    {committee.name}
                                </p>

                                <p>
                                    Head: {committee.head}
                                </p>

                                {/* members = array */}

                                {showMembers(committee.members)}
                            </div>
                        ))}
                    </div>


                    {/* 
                        committees
                        ----------
                        PIC
                        membership
                        wellness and engagement head

                        finance head

                        multimedia committee 
                        
                        technical head

                        logistics head

                        developer core committee 


                        OR


                        papakita lahat then head head ganon
                        make it scroll-able
                    */}

                </div>



                {/* officers pictures and such */}
                {/* pwedeng org chart */}

                {/* 
                                org adv                 org adv
                                            pres
                                        ext      int

                
                
                
                */}
            </div>
            
            <Footer />
        </div>
    
  );
}  

export default AboutPage;