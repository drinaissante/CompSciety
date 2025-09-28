/*
profile: {
    first_name:
    last_name:
    middle_ini:
}
*/
import MotionDiv from "../../MotionDiv.jsx";

function Profile({ hasViewed }) {
    return (
      <MotionDiv hasViewed={hasViewed}>
        <span className="flex justify-center">Profile</span>

        <form className="mt-2 flex flex-col lg:flex-row gap-8">
            <div className="flex flex-col text-center">
                <h1>First Name</h1>
                <input type="text" name="text" placeholder="Enter your first name" required className="p-3 bg-white text-black rounded-md" />
            </div>

            <div className="flex flex-col text-center">
                <h1>Last Name</h1>
                <input type="text" name="text" placeholder="Enter your last name" required className="p-3 bg-white text-black rounded-md" />
            </div>
            
            <div className="flex flex-col text-center">
                <h1>Middle Initial</h1>
                <input type="text" name="text" placeholder="Enter your middle Initial" required className="p-3 bg-white text-black rounded-md" />
            </div>
        </form>

      </MotionDiv>  
    );
}

export default Profile;