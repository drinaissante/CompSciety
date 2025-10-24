import { Link } from "react-router-dom";
import Footer from "../home/sections/Footer.jsx";
import MotionDiv from "../../MotionDiv.jsx";
import { useEffect } from "react";

/*
- get profile picture, profile details

- discord (dito na rin discord verifcation)

- dito rin pwede mag change name or email or password

- or upload picture
*/


function Me() {
    useEffect(() => {
        document.title = "Profile | BulSU Computer Science Society"
    }, []);

    // load the picture


    return (
        <div className='flex flex-col scroll-smooth'>    
            <div className="min-h-screen bg-gradient-to-b from-[#18230F] via-[#2b5016] to-[#324d22]">
                
                <MotionDiv className="mt-25 lg:mt-35 mx-auto my-auto bg-white/40 rounded-xl gap-3">
                    
                    <div className="font-bold text-5xl text-center">Profile</div>
                    
                    <div className="m-3 flex justify-center">
                        
                    </div>

                </MotionDiv>
            </div>


            <Footer />
        </div>
    );  
}

export default Me;