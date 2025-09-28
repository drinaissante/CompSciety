import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createSelectors } from "./create-selectors.jsx"

/*
- continue btn
- add loading animation = redirect to home

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

const useStore = create(
    persist((set) => ({
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
        })
    ),
    {
        name: "comp-storage"
    }
    
);

// MAKE SURE TO USE FIRESTORE TO STORE INFORMATION AFTER USING ZUSTAND


// SELECTORS
export const useStoreSelectors = createSelectors(useStore);

export default useStore;