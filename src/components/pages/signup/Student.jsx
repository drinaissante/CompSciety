import { useEffect, useState } from "react";
import { MotionDivExit } from "../../MotionDiv.jsx";

import useStore from "@/components/state/store.jsx";
import { Dropdown } from "@/components/DropDown.jsx";
import { collegeProgramsMap, colleges } from "@/lib/colleges.js";

/*
student: {
    college:
    year_level:
    section:
}
*/


// TODO: make year level and college a drop down

const digit_rgx = /^\d+$/;

function Student({ hasViewed, setIsValid, setErrors }) {
    const student = useStore((state) => state.student);

    const [college, setCollege] = useState(student.college || "");
    const [program, setProgram] = useState(student.program || "");

    const [yearLevel, setYearLevel] = useState(student.year_level || "");
    const [section, setSection] = useState(student.section || "");
    const [studentNumber, setStudentNumber] = useState(student.student_number || "");
    
    const update = useStore((state) => state.update);

    useEffect(() => {
        let isValid = college.trim() !== "" && program.trim() !== "" && yearLevel.trim() !== ""  && section.trim() !== "" && studentNumber.trim() !== "" ;

        if (!isValid) {
            setErrors((prev) => ({...prev, auth: "Please fill all required fields."}))
        } else if (!colleges.includes(college)) {
            setErrors((prev) => ({...prev, auth: "Please select a valid college from the list."}))

            isValid = false;
        } else if (!collegeProgramsMap[college]?.includes(program)) {
            setErrors((prev) => ({...prev, auth: "Please select a valid program from the list."}))

            isValid = false;
        } else if (!digit_rgx.test(studentNumber)) {
            setErrors((prev) => ({ ...prev, auth: "Student Number must be a number."}));

            isValid = false;
        } else if (studentNumber.length !== 10) {
            setErrors((prev) => ({ ...prev, auth: "Student Number should be 10 digits."}));

            isValid = false;
        }

        if (isValid){
            setErrors("");
        }

        setIsValid(isValid); // report validity to parent
    }, [college, program, yearLevel, section, studentNumber, setIsValid]);

    const handleSubmit = (e) => {
        e.preventDefault();

        update("student", {
            college: college,
            program: program,
            year_level: yearLevel,
            section: section,
            student_number: studentNumber
        })
    }

    const handleChange = (field, e) => {
        const value = e?.target?.value;
        
        if (field === "college") {
            setCollege(e);

            update("student", "college", e);

             // reset program when college changes
            setProgram("");
            update("student", "program", "");
        } else if (field === "program") {
            setProgram(e);

            update("student", "program", e);
        } else if (field === "year_level") {
            setYearLevel(value);

            update("student", "year_level", value);
        } else if (field === "section") {
            setSection(value);

            update("student", "section", value);
        } else if (field === "student_number") {
            setStudentNumber(value);

            update("student", "student_number", value);
        }
    }

    return (
      <MotionDivExit hasViewed={hasViewed}>
        <span className="flex justify-center">Student Information</span>

        <form onSubmit={handleSubmit} className="mt-2 flex flex-col lg:flex-row gap-8">
            <div className="flex flex-col text-center">
                <h1>College <span className="text-red-500">*</span> </h1>

                <Dropdown 
                    options={colleges} 
                    onChange={(e) => handleChange("college", e)} 
                    placeholder="Ex. College of Science"
                />
            </div>
            
            <div className="flex flex-col text-center">
                <h1>Program <span className="text-red-500">*</span> </h1>

                <Dropdown 
                    options={college ? collegeProgramsMap[college] || []: []}
                    value={program}
                    onChange={(e) => handleChange("program", e)} 
                    placeholder="Ex. BS Math"
                />
            </div>

            <div className="flex flex-col text-center">
                <h1>Year Level <span className="text-red-500">*</span> </h1>
                <input type="text" placeholder="Ex. 2nd Year" required value={yearLevel} onChange={(e) => handleChange("year_level", e)}
                 className="p-3 bg-white text-black rounded-md" />
            </div>
            
            <div className="flex flex-col text-center">
                <h1>Section <span className="text-red-500">*</span> </h1>
                <input type="text" placeholder="Ex. 2B" required value={section} onChange={(e) => handleChange("section", e)}
                className="p-3 bg-white text-black rounded-md" />
            </div>
            
            <div className="flex flex-col text-center">
                <h1>Student Number <span className="text-red-500">*</span> </h1>
                <input type="text" placeholder="2025XXXXXX (10 digits)" required value={studentNumber} onChange={(e) => handleChange("student_number", e)}
                className="p-3 bg-white text-black rounded-md" />
            </div>
        </form>

      </MotionDivExit>  
    );
}

export default Student;