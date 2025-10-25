import { Link } from "react-router-dom";
import Footer from "../home/sections/Footer.jsx";
import MotionDiv from "../../MotionDiv.jsx";

import { useEffect, useState } from "react";

import { authFetchAvatarURL, fetchProfileDetails } from "../../db/database.jsx";

import Loading from "../../../extras/Loading.jsx";
import ProfileImage from "../../state/ProfileImage.jsx";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../auth/firebase.jsx";

import { IoCheckmarkCircle } from "react-icons/io5";
import { FaClipboardList } from "react-icons/fa";

/*
- get profile picture, profile details

- discord (dito na rin discord verifcation)

- dito rin pwede mag change name or email or password

- or upload picture
*/


function Me() {
    const [ details, setDetails ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    const [ avatarUrl, setAvatarUrl ] = useState(null);

    const [ src, setSrc ] = useState(null);

    useEffect(() => {
        document.title = "Profile | BulSU Computer Science Society";

        async function fetchProfile() {
            setLoading(true);

            try {
                const array = await fetchProfileDetails();
                const avatarURL = await authFetchAvatarURL(array?.discord);

                setDetails(array);
                setSrc(<ProfileImage imageUrl={array?.profile_link} />);
                setAvatarUrl(avatarURL);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        const unsub = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                fetchProfile();
            } else {
                setDetails(null);
            }
        });

        fetchProfile();

        return unsub;
    }, []);


    return (
        <div className='flex flex-col scroll-smooth'>    
            <div className="min-h-screen bg-gradient-to-b from-[#18230F] via-[#2b5016] to-[#324d22]">
                
                <MotionDiv className="mt-25 lg:mt-35 mx-auto my-auto bg-white/40 rounded-xl gap-3">
                    
                    <div className="font-bold text-5xl text-center">Profile</div>

                    {loading && <Loading />}
                    
                    {src && (
                        <>
                            {details ? (
                                <div className="m-3 flex flex-col text-center items-center">
                                    {src}

                                    <h1>UID: {details.uid} <FaClipboardList /></h1>  
                                    <h1>Name: {details.name} {details.middle_initial} {details.last_name}</h1>

                                    <h1 className="flex items-center justify-center gap-2">
                                        Discord: 
                                        <span className="flex items-center gap-2 bg-[#5865F2]/20 text-[#5865F2] px-3 py-1 rounded-full font-semibold">
                                            <img src={avatarUrl} className="h-10 rounded-full" draggable={false}/>

                                            {details.discord || "Unknown"}
                                            {details.discord_verified && (
                                                <div className="relative group inline-block">
                                                    <IoCheckmarkCircle className="text-green-500 w-5 h-5 cursor-pointer" />
                                                    
                                                    <span
                                                        className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap
                                                                bg-gray-800 text-white text-xs rounded py-1 px-2
                                                                opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100
                                                                transition-all duration-200 ease-out pointer-events-none shadow-lg">
                                                        Verified Discord account
                                                    </span>
                                             </div>
                                            )}
                                            
                                        </span>
                                    </h1>

                                    <h1>College: {details.college} | {details.program}</h1>
                                    <h1>Year Level: {details.year_level} </h1>
                                    <h1>Section: {details.section}</h1>
                                </div>
                            ) : (
                                <Loading />
                            )}
                        </>
                    )}

                </MotionDiv>
            </div>


            <Footer />
        </div>
    );  
}

export default Me;