import MotionDiv from "../../MotionDiv.jsx";

/*
student: {
    college:
    year_level:
    section:
}
*/


function Student({ hasViewed }) {
    return (
      <MotionDiv hasViewed={hasViewed}>
        <span className="flex justify-center">Student Information</span>

        <form className="mt-2 flex flex-col lg:flex-row gap-8">
            <div className="flex flex-col text-center">
                <h1>College</h1>
                <input type="text" name="text" placeholder="Ex. College of Science" required className="p-3 bg-white text-black rounded-md" />
            </div>

            <div className="flex flex-col text-center">
                <h1>Year Level</h1>
                <input type="text" name="text" placeholder="Ex. 2nd Year" required className="p-3 bg-white text-black rounded-md" />
            </div>
            
            <div className="flex flex-col text-center">
                <h1>Section</h1>
                <input type="text" name="text" placeholder="2B" required className="p-3 bg-white text-black rounded-md" />
            </div>
        </form>

      </MotionDiv>  
    );
}

export default Student;