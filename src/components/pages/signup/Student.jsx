import { useEffect, useState } from "react";
import { MotionDivExit } from "../../MotionDiv.jsx";
import useStore from "../../state/store.jsx";

/*
student: {
    college:
    year_level:
    section:
}
*/


function Student({ hasViewed, setIsValid, setErrors }) {
    const student = useStore((state) => state.student);

    const [college, setCollege] = useState(student.college || "");
    const [yearLevel, setYearLevel] = useState(student.year_level || "");
    const [section, setSection] = useState(student.section || "");
    
    const update = useStore((state) => state.update);

    useEffect(() => {
        const isValid = college.trim() !== ""  && yearLevel.trim() !== ""  && section.trim() !== "" ;

        if (!isValid) {
            setErrors((prev) => ({...prev, auth: "Please fill all required fields."}))
        } else {
            setErrors("");
        }

        setIsValid(isValid); // report validity to parent
    }, [college, yearLevel, section, setIsValid]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // TODO store to zustand
        update("student", {
            college: college,
            year_level: yearLevel,
            section: section
        })
    }

    const handleChange = (field, e) => {
        const value = e.target.value;
        
        if (field === "college") {
            setCollege(value);

            update("student", "college", value);
        } else if (field === "year_level") {
            setYearLevel(value);

            update("student", "year_level", value);
        } else if (field === "section") {
            setSection(value);

            update("student", "section", value);
        }
    }

    return (
      <MotionDivExit hasViewed={hasViewed}>
        <span className="flex justify-center">Student Information</span>

        <form onSubmit={handleSubmit} className="mt-2 flex flex-col lg:flex-row gap-8">
            <div className="flex flex-col text-center">
                <h1>College <span className="text-red-500">*</span> </h1>
                <input type="text" name="text" placeholder="Ex. College of Science" required value={college} onChange={(e) => handleChange("college", e)} 
                className="p-3 bg-white text-black rounded-md" />
            </div>

            <div className="flex flex-col text-center">
                <h1>Year Level <span className="text-red-500">*</span> </h1>
                <input type="text" name="text" placeholder="Ex. 2nd Year" required value={yearLevel} onChange={(e) => handleChange("year_level", e)}
                 className="p-3 bg-white text-black rounded-md" />
            </div>
            
            <div className="flex flex-col text-center">
                <h1>Section <span className="text-red-500">*</span> </h1>
                <input type="text" name="text" placeholder="Ex. 2B" required value={section} onChange={(e) => handleChange("section", e)}
                className="p-3 bg-white text-black rounded-md" />
            </div>
        </form>

      </MotionDivExit>  
    );
}

export default Student;