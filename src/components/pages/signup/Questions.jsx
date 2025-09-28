import MotionDiv from "../../MotionDiv.jsx";

/*
questions: {
    question_1: <response>
    question_2: <response>
    question_3: <response>
}
*/

function Questions({ hasViewed }) {
    return (
      <MotionDiv hasViewed={hasViewed}>
        <span className="flex justify-center">Questions</span>

        <form className="mt-2 flex flex-col gap-8 lg:flex-row lg:gap-20">
            <div className="flex flex-col text-center">
                <h1>Question 1</h1>
                <textarea placeholder="Enter your response" required className="p-3 bg-white text-black rounded-md overflow-auto resize-none
                lg:w-[250px] lg:h-[100px]" />
            </div>

            <div className="flex flex-col text-center">
                <h1>Question 2</h1>
                <textarea placeholder="Enter your response" required className="p-3 bg-white text-black rounded-md overflow-auto resize-none
                lg:w-[250px] lg:h-[100px]" />
            </div>
            
            <div className="flex flex-col text-center">
                <h1>Question 3</h1>
                <textarea placeholder="Enter your response" required className="p-3 bg-white text-black rounded-md overflow-auto resize-none
                lg:w-[250px] lg:h-[100px]" />
            </div>
        </form>

      </MotionDiv>  
    );
}

export default Questions;