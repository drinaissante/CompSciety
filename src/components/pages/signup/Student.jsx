import { useState } from "react";
import MotionDiv from "../../MotionDiv.jsx";
import useStore from "../../state/store.jsx";

/*
student: {
    college:
    year_level:
    section:
}
*/


function Student({ hasViewed }) {
    const student = useStore((state) => state.student);

    const [college, setCollege] = useState(student.college || "");
    const [yearLevel, setYearLevel] = useState(student.yearLevel || "");
    const [section, setSection] = useState(student.section || "");
    
    const update = useStore((state) => state.update);

    const handleSubmit = (e) => {
        e.preventDefault();

        // TODO store to zustand
        update("student", {
            college: college,
            year_level: yearLevel,
            section: section
        })
    }
    
    return (
      <MotionDiv hasViewed={hasViewed}>
        <span className="flex justify-center">Student Information</span>

        <form onSubmit={handleSubmit} className="mt-2 flex flex-col lg:flex-row gap-8">
            <div className="flex flex-col text-center">
                <h1>College</h1>
                <input type="text" name="text" placeholder="Ex. College of Science" required value={college} onChange={(e) => setCollege(e.target.value)} 
                className="p-3 bg-white text-black rounded-md" />
            </div>

            <div className="flex flex-col text-center">
                <h1>Year Level</h1>
                <input type="text" name="text" placeholder="Ex. 2nd Year" required value={yearLevel} onChange={(e) => setYearLevel(e.target.value)}
                 className="p-3 bg-white text-black rounded-md" />
            </div>
            
            <div className="flex flex-col text-center">
                <h1>Section</h1>
                <input type="text" name="text" placeholder="2B" required value={section} onChange={(e) => setSection(e.target.value)}
                className="p-3 bg-white text-black rounded-md" />
            </div>
        </form>

      </MotionDiv>  
    );
}

export default Student;