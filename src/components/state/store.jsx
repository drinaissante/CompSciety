import { create } from "zustand";

// NEEDED
/*
- continue btn
- add loading animation = redirect to home

profile: {
    email:
    first_name:
    last_name:
    middle_ini:
}

student: {
    college:
    year_level:
    section:
}

questions: {
    question_1: <response>
    question_2: <response>
    question_3: <response>
}

USAGE: 
  const {
    profile,
    student,
    questions,
    updateProfile,
    updateStudent,
    updateQuestion,
    clearAll,
  } = useStore();
*/

const useStore = create((set) => ({
    profile: {
        email: "",
        first_name: "",
        last_name: "",
        middle_ini: "",
    },
    student: {
        college: "",
        year_level: "",
        section: "",
    },
    questions: {
        question_1: "",
        question_2: "",
        question_3: "", // MAKE SURE TO ADD MORE OR REMOVE ENTIRELY IF NOT NEEDED
    },

    updateProfile: (field, value) =>
        set((state) => ({
            profile: { ...state.profile, [field]: value },
        })),

    updateStudent: (field, value) =>
        set((state) => ({
            student: { ...state.student, [field]: value },
        })),

    updateQuestion: (field, value) =>
        set((state) => ({
            questions: { ...state.questions, [field]: value },
        })),

    clearResponses: () => 
        set({
            profile: {
                email: "",
                first_name: "",
                last_name: "",
                middle_ini: "",
            },
            student: {
                college: "",
                year_level: "",
                section: "",

            },
            questions: {
                question_1: "",
                question_2: "",
                question_3: "",
            }
        }),
}));


export default useStore;