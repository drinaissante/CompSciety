/*
<div className="m-3 flex flex-col text-center items-center">
                                        {src}

                                        {/* TODO: add a checkmark for verified email }
                                        {/* Make sure to only be able to upload to canva if verified }

                                        <h1>UID: {details.uid} | {auth.currentUser && auth.currentUser.emailVerified ? "a" : "NOT VERIFIED"} <FaClipboardList /></h1>   
                                        <h1>Name: {details.name} {details.middle_initial} {details.last_name} </h1>

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

                                        <div className="relative group inline-block">
                                            <button 
                                                onClick={requestCanvaExportURL} disabled={src}
                                                className="cursor-pointer p-3 bg-green-950 rounded-full m-5"
                                            >
                                                Request Membership ID
                                                {/* ADD THE LOADING BAR HERE }
                                            </button>
                                            
                                            {!src && (
                                                <span
                                                    className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap
                                                            bg-gray-800 text-red text-xs rounded py-1 px-2
                                                            opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100
                                                            transition-all duration-200 ease-out pointer-events-none shadow-lg">
                                                    Please upload a valid profile picture.
                                                </span>
                                            )}

                                        </div>
                                    </div>
*/

import { getBlob, getProfileImageBlob, uploadCanva } from "@/components/db/supabase.jsx";
import Loading from "@/extras/Loading.jsx";
import { useState } from "react";
import { IoPersonCircle } from "react-icons/io5";

export default function ProfileDetails({ profile, details, avatarUrl }) {
    const [ prog, setProgress ] = useState(0);
    const [ cardImage, setCardImage] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ loadingMsg, setLoadingMsg ] = useState("");

    async function requestCanvaExportURL(e) {
        e.preventDefault();

        // check first if there is a profile picture
        if (profile.type === IoPersonCircle)
            return null; // no profile picture

        try {
            setLoading(true);
            setLoadingMsg("Canva");

            // todo
            const imageUrl = profile.props.imageUrl;
            const blob = await getProfileImageBlob(imageUrl, (progress) => setProgress(progress));

            console.log("Uploading to canva..", imageUrl);

            const formData = new FormData();
            formData.append('image', blob);
            formData.append("name", details.name.toUpperCase());
            formData.append("middle_initial", details.middle_initial.toUpperCase());
            formData.append("last_name", details.last_name.toUpperCase());
            formData.append("position", "MEMBER");
            formData.append("student_number", details.student_number); // TODO

            setProgress(0);
            setLoadingMsg("Export");


            // add progress here
            // handle canva
            const response = await fetch('https://backend-compsciety.vercel.app/api/process-canva', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            setLoadingMsg("Retrieving url.");

            const data = await response.json();

            const signedUrl = await uploadCanva(data.exportUrls[0], (progress) => setProgress(progress));

            setLoadingMsg("Setting up canva..");
            const canvaBlob = await getBlob(signedUrl, (progress) => setProgress(progress));

            const blobImage = URL.createObjectURL(canvaBlob);
            
            const a = document.createElement("a");
            a.href = blobImage;
            a.download = signedUrl.split("/").pop().split(".png")[0] + ".png";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            setCardImage(blobImage);
            
            console.log("Successfully uploaded to canva.");
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            setProgress(0);
            setLoadingMsg("");
        }
    }

    return (
    <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md rounded-2xl shadow-2xl overflow-hidden bg-linear-to-t from-[#18230F] via-[#2b5016] to-[#324d22]">
                        
            {/* TODO: anong banner */}
            <div className="relative h-28 bg-linear-to-r from-green-500 to-indigo-600">
                <div className="font-bold text-2xl text-center">Profile</div>

                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-20 h-22 rounded-full object-cover border-2 border-black">
                    {profile}
                </div>
            </div>

            {/* Content */}
            <div className="pt-16 pb-8 px-6 text-center">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                    {details.name} {details.middle_initial} {details.last_name}
                </h2>

                {/* Discord */}
                {details.discord && avatarUrl && (
                    <div className="flex items-center justify-center gap-2 mt-1 text-gray-500 dark:text-gray-400">
                        <img
                            src={avatarUrl}
                            alt="Discord Avatar"
                            className="w-5 h-5 rounded-full"
                        />
                        <span>{details.discord}</span>
                    </div>
                )}

                {/* Email */}
                <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm">
                    {details.email}
                </p>

                <div className="mt-6 grid grid-cols-2 gap-y-3.5 text-sm text-gray-600 dark:text-gray-300 mr-13 [div]:text-left">
                    <div className="font-medium text-gray-800 dark:text-white">UID</div>
                    <div>{details.uid}</div>

                    <div className="font-medium text-gray-800 dark:text-white">Student Number</div>
                    <div>{details.student_number || "N/A"}</div>

                    <div className="font-medium text-gray-800 dark:text-white">College</div>
                    <div>{details.college}</div>

                    <div className="font-medium text-gray-800 dark:text-white">Program</div>
                    <div>{details.program}</div>

                    <div className="font-medium text-gray-800 dark:text-white">Year Level</div>
                    <div>{details.year_level}</div>

                    <div className="font-medium text-gray-800 dark:text-white">Section</div>
                    <div>{details.section}</div>
                </div>

                {/* Button */}
                <button
                    className="mt-8 w-[60%] py-2.5 rounded-xl bg-green-900 hover:bg-blue-700 text-white font-medium transition-colors duration-200 cursor-pointer"
                    onClick={requestCanvaExportURL}
                >
                    Request Membership ID
                </button>

                {/* FIX THE LAYOUT / DESIGN */}
                <div className="flex justify-center gap-y-5 mt-10">
                    {loading && (
                        <div className="flex flex-col text-center justify-center align-middle">
                            <Loading />
                            <h1>{loadingMsg}</h1>
                            <progress value={prog} max="100" className="w-full h-3  rounded-full overflow-hidden [&::-webkit-progress-bar]:bg-gray-200 [&::-webkit-progress-value]:bg-green-500 [&::-moz-progress-bar]:bg-green-500"/>
                        </div>
                        )}

                    {cardImage && (
                        <img src={cardImage} alt="Preview"  />
                    )}
                </div>
            </div>
        </div>
    </div>
    );
}