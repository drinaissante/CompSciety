import { useNavigate } from "react-router-dom";
import Footer from "../home/sections/Footer.jsx";
import MotionDiv from "../../MotionDiv.jsx";

import { useEffect, useState } from "react";

import { authFetchAvatarURL, fetchProfileDetails } from "../../db/database.jsx";

import Loading from "../../../extras/Loading.jsx";
import ProfileImage from "../../state/ProfileImage.jsx";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../auth/firebase.jsx";

import { IoCheckmarkCircle, IoPersonCircle } from "react-icons/io5";
import { FaClipboardList } from "react-icons/fa";
import ProfileDetails from "./ProfileDetails.jsx";

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

    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Profile | BulSU Computer Science Society";

        const unsub = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                await fetchProfile();
            } else {
                setDetails(null);
                setLoading(false);
                
                navigate("/");
            }
        });

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

        return unsub;
    }, []);


    // TODO upload profile picture

    return (
        <div className='flex flex-col scroll-smooth'>    
            <div className="min-h-screen bg-linear-to-b from-[#18230F] via-[#2b5016] to-[#324d22]">

                {loading ? (
                    <div className="flex justify-center items-center h-screen">
                        <Loading />
                    </div>
                ) : (
                    <MotionDiv className="mt-25 lg:mt-35 mx-auto my-auto bg-white/40 rounded-xl gap-3">
                        
                        {src && (
                            <>
                                {details ? (
                                    <ProfileDetails profile={src} details={details} avatarUrl={avatarUrl} />
                                ) : (
                                    <Loading />
                                )}
                            </>
                        )}

                    </MotionDiv>
                )}
                
            </div>


            <Footer />
        </div>
    );  
}

export default Me;