import { useEffect, useState } from "react";

import imageCompression from "browser-image-compression";

import { MotionDivExit } from "../../MotionDiv.jsx";
import useStore from "../../state/store.jsx";
import { uploadCanva, uploadVia } from "../../db/supabase.jsx";

import { IoPersonCircle } from "react-icons/io5"

const options = {
    maxSizeMB: 0.1, // 100KB
    maxWidthOrHeight: 256,
    useWebWorker: true,
}

function Profile({ hasViewed, setIsValid, setErrors }) {
    const profile = useStore((state) => state.profile);

    const [name, setName] = useState(profile.name || "");
    const [middle_ini, setMiddleInitial] = useState(profile.middle_ini || "");
    const [lastName, setLastName] = useState(profile.last_name || "");

    const [image, setImage] = useState(null);

    async function handleUpload(image) {
        if (!image) return "N/A";
        

        try {
            const compressedMain = await imageCompression(image, options);
            const publicUrl = await uploadVia(compressedMain);

            return publicUrl;
        } catch (error) {
            console.error("Something went wrong:", error);
            return "N/A";
        }
    }
    
    const update = useStore((state) => state.update);

    useEffect(() => {
        const isValid = name.trim() !== "" && middle_ini.trim() !== "" && lastName.trim() !== "";

        if (!isValid) {
            setErrors((prev) => ({...prev, auth: "Please fill all required fields."}))
        } else {
            setErrors("");
        }
        
        setIsValid(isValid); // report validity to parent
    }, [name, middle_ini, lastName, setIsValid]);

    const handleChange = async (field, e) => {
        const value = e.target.value;
        
        if (field === "name") {
            setName(value);

            update("profile", "name", value);
        } else if (field === "middle_ini") {
            setMiddleInitial(value);

            update("profile", "middle_ini", value);
        } else if (field === "last_name") {
            setLastName(value);

            update("profile", "last_name", value);
        } else if (field === "image") {
            const image = e.target.files[0];
            setImage(image);

            const url = await handleUpload(image);  
            
            update("profile", "profile_link", url);
        }
    }

    return (
      <MotionDivExit hasViewed={hasViewed}>
        <span className="flex justify-center">Profile</span>

        <form className="mt-2 flex flex-col lg:flex-row gap-8">
            <div className="flex flex-col text-center">
                <h1>Given Name <span className="text-red-500">*</span> </h1>
                <input type="text" name="text" value={name} onChange={(e) => handleChange("name", e)} placeholder="Enter your name" required className="p-3 bg-white text-black rounded-md" />
            </div>
            
            <div className="flex flex-col text-center">
                <h1>Middle Initial <span className="text-red-500">*</span> </h1>
                <input type="text" name="text" value={middle_ini} onChange={(e) => handleChange("middle_ini", e)} placeholder="Enter your middle Initial" required className="p-3 bg-white text-black rounded-md" />
            </div>

            <div className="flex flex-col text-center">
                <h1>Last Name <span className="text-red-500">*</span> </h1>
                <input type="text" name="text" value={lastName} onChange={(e) => handleChange("last_name", e)} placeholder="Enter your last name" required className="p-3 bg-white text-black rounded-md" />
            </div>
            
            <div className="flex flex-col text-center">
                <h1>Profile Picture <span className="text-red-500">*</span> </h1>

                <div className="m-3 flex justify-center">
                    {image ? (
                        <img src={URL.createObjectURL(image)} alt="Image" className="w-30 h-30 object-contain rounded-full border" draggable={false} />
                    ) : (
                        <IoPersonCircle size={120}/>
                    )}
                </div>

                <label htmlFor="upload" className="cursor-pointer bg-green-600 hover:bg-green-700 text-white rounded-md text-center transition w-35 py-2 self-center">Upload Image</label>

                <input id="upload" type="file" accept="image/png" onChange={(e) => handleChange("image", e)} required className="hidden" />
            </div>
            
        </form>

      </MotionDivExit>  
    );
}

export default Profile;