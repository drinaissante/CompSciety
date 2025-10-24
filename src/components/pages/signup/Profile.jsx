/*
profile: {
    name:
    middle_ini:
    last_name:
}
*/
import { useEffect, useState } from "react";

import imageCompression from "browser-image-compression";

import { MotionDivExit } from "../../MotionDiv.jsx";
import useStore from "../../state/store.jsx";
import { upload } from "../../db/supabase.jsx";

import { IoPerson, IoPersonCircle } from "react-icons/io5"

const options = {
    maxSizeMB: 0.1, // 100KB
    maxWidthOrHeight: 256,
    useWebWorker: true,
}

const mainOptions = {
    maxSizeMB: 0.4, // 400KB
    maxWidthOrHeight: 1024,
    useWebWorker: true,
}

function Profile({ hasViewed, setIsValid, setErrors }) {
    const profile = useStore((state) => state.profile);

    const [name, setName] = useState(profile.name || "");
    const [middle_ini, setMiddleInitial] = useState(profile.middle_ini || "");
    const [lastName, setLastName] = useState(profile.last_name || "");

    const [image, setImage] = useState(null);
    
    const [mainUrl, setMainUrl] = useState("");
    const [uploading, setUploading] = useState(false);


    const handleUpload = async () => {
        if (!image) return;

        setUploading(true);

        try {
            const compressedMain = await imageCompression(image, maxSizeMB);

            const publicUrl = await upload(compressedMain);

            setMainUrl(publicUrl);

            console.log(`Uploaded images! ${publicUrl}`);
        } catch (error) {
            console.error(error);
        } finally {
            setUploading(false);
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

    const handleSubmit = (e) => {
        e.preventDefault();

        update("profile", {
            name: name,
            middle_ini: middle_ini,
            last_name: lastName,
            profile_link: mainUrl
        })
    }

    const handleChange = (field, e) => {
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
        }
    }

    return (
      <MotionDivExit hasViewed={hasViewed}>
        <span className="flex justify-center">Profile</span>

        <form onSubmit={handleSubmit} className="mt-2 flex flex-col lg:flex-row gap-8">
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

                <input id="upload" type="file" accept="image/png" onChange={(e) => setImage(e.target.files[0])} required className="hidden" />
                
            </div>
            
        </form>

      </MotionDivExit>  
    );
}

export default Profile;