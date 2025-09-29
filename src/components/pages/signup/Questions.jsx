import { useEffect, useState } from "react";
import { MotionDivExit } from "../../MotionDiv.jsx";
import useStore from "../../state/store.jsx";

/*
questions: {
    question_1: <response>
    question_2: <response>
    question_3: <response>
}
*/

function Questions({ hasViewed, setIsValid, setErrors }) {
    const questions = useStore((state) => state.questions);

    const [firstQuestion, setFirstQuestion] = useState(questions.question_1 || "");
    const [secondQuestion, setSecondQuestion] = useState(questions.question_2 || "");
    const [thirdQuestion, setThirdQuestion] = useState(questions.question_3 || "");
    
    const update = useStore((state) => state.update);

    useEffect(() => {
        const isValid = firstQuestion.trim() !== ""  && secondQuestion.trim() !== ""  && thirdQuestion.trim() !== "" ;

        if (!isValid) {
            setErrors((prev) => ({...prev, auth: "Please fill all required fields."}))
        } else {
            setErrors("");
        }

        setIsValid(isValid); // report validity to parent
    }, [firstQuestion, secondQuestion, thirdQuestion, setIsValid]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // TODO store to zustand
        update("questions", {
            question_1: firstQuestion,
            question_2: secondQuestion,
            question_3: thirdQuestion
        })
    }

     const handleChange = (field, e) => {
        const value = e.target.value;
        
        if (field === "question_1") {
            setFirstQuestion(value);

            update("questions", "question_1", value);
        } else if (field === "question_2") {
            setSecondQuestion(value);

            update("questions", "question_2", value);
        } else if (field === "question_3") {
            setThirdQuestion(value);

            update("questions", "question_3", value);
        }
    }

    return (
      <MotionDivExit hasViewed={hasViewed}>
        <span className="flex justify-center">Questions</span>

        <form onSubmit={handleSubmit} className="mt-2 flex flex-col gap-8 lg:flex-row lg:gap-20">
            <div className="flex flex-col text-center">
                <h1>Question 1 <span className="text-red-500">*</span> </h1>
                <textarea placeholder="Enter your response" required value={firstQuestion} onChange={(e) => handleChange("question_1", e)}  className="p-3 bg-white text-black rounded-md overflow-auto resize-none
                lg:w-[250px] lg:h-[100px]" />
            </div>

            <div className="flex flex-col text-center">
                <h1>Question 2 <span className="text-red-500">*</span> </h1>
                <textarea placeholder="Enter your response" required value={secondQuestion} onChange={(e) => handleChange("question_2", e)}  className="p-3 bg-white text-black rounded-md overflow-auto resize-none
                lg:w-[250px] lg:h-[100px]" />
            </div>
            
            <div className="flex flex-col text-center">
                <h1>Question 3 <span className="text-red-500">*</span>  </h1>
                <textarea placeholder="Enter your response" required value={thirdQuestion} onChange={(e) => handleChange("question_3", e)}  className="p-3 bg-white text-black rounded-md overflow-auto resize-none
                lg:w-[250px] lg:h-[100px]" />
            </div>
        </form>

      </MotionDivExit>  
    );
}

export default Questions;