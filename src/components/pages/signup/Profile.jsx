/*
profile: {
    name:
    middle_ini:
    last_name:
}
*/
import { useState } from "react";
import MotionDiv from "../../MotionDiv.jsx";
import useStore from "../../state/store.jsx";

function Profile({ hasViewed }) {
    const profile = useStore((state) => state.profile);

    const [name, setName] = useState(profile.name || "");
    const [middle_ini, setMiddleInitial] = useState(profile.middle_ini || "");
    const [lastName, setLastName] = useState(profile.last_name || "");
    
    const update = useStore((state) => state.update);

    const handleSubmit = (e) => {
        e.preventDefault();

        update("profile", {
            name: name,
            middle_ini: middle_ini,
            last_name: lastName
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
      <MotionDiv hasViewed={hasViewed}>
        <span className="flex justify-center">Profile</span>

        <form onSubmit={handleSubmit} className="mt-2 flex flex-col lg:flex-row gap-8">
            <div className="flex flex-col text-center">
                <h1>Given Name</h1>
                <input type="text" name="text" value={profile.name} onChange={(e) => handleChange("name", e)} placeholder="Enter your name" required className="p-3 bg-white text-black rounded-md" />
            </div>
            
            <div className="flex flex-col text-center">
                <h1>Middle Initial</h1>
                <input type="text" name="text" value={middle_ini} onChange={(e) => handleChange("middle_ini", e)} placeholder="Enter your middle Initial" required className="p-3 bg-white text-black rounded-md" />
            </div>

            <div className="flex flex-col text-center">
                <h1>Last Name</h1>
                <input type="text" name="text" value={lastName} onChange={(e) => handleChange("last_name", e)} placeholder="Enter your last name" required className="p-3 bg-white text-black rounded-md" />
            </div>
        </form>

      </MotionDiv>  
    );
}

export default Profile;