import { useState } from "react";
import MotionDiv from "../../MotionDiv.jsx";
import useStore from "../../state/store.jsx";

/*
questions: {
    question_1: <response>
    question_2: <response>
    question_3: <response>
}
*/

function Questions({ hasViewed }) {
    const questions = useStore((state) => state.questions);

    const [firstQuestion, setFirstQuestion] = useState(questions.question_1 || "");
    const [secondQuestion, setSecondQuestion] = useState(questions.question_2 || "");
    const [thirdQuestion, setThirdQuestion] = useState(questions.question_3 || "");
    
    const update = useStore((state) => state.update);

    const handleSubmit = (e) => {
        e.preventDefault();

        // TODO store to zustand
        update("questions", {
            question_1: firstQuestion,
            question_2: secondQuestion,
            question_3: thirdQuestion
        })
    }

    return (
      <MotionDiv hasViewed={hasViewed}>
        <span className="flex justify-center">Questions</span>

        <form onSubmit={handleSubmit} className="mt-2 flex flex-col gap-8 lg:flex-row lg:gap-20">
            <div className="flex flex-col text-center">
                <h1>Question 1</h1>
                <textarea placeholder="Enter your response" required value={firstQuestion} onChange={(e) => setFirstQuestion(e.target.value)}  className="p-3 bg-white text-black rounded-md overflow-auto resize-none
                lg:w-[250px] lg:h-[100px]" />
            </div>

            <div className="flex flex-col text-center">
                <h1>Question 2</h1>
                <textarea placeholder="Enter your response" required value={secondQuestion} onChange={(e) => setSecondQuestion(e.target.value)}  className="p-3 bg-white text-black rounded-md overflow-auto resize-none
                lg:w-[250px] lg:h-[100px]" />
            </div>
            
            <div className="flex flex-col text-center">
                <h1>Question 3</h1>
                <textarea placeholder="Enter your response" required value={thirdQuestion} onChange={(e) => setThirdQuestion(e.target.value)}  className="p-3 bg-white text-black rounded-md overflow-auto resize-none
                lg:w-[250px] lg:h-[100px]" />
            </div>
        </form>

      </MotionDiv>  
    );
}

export default Questions;