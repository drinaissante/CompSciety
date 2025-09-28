import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
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
  persist(
    (set) => ({
      profile: {
        name: "",
        middle_ini: "",
        last_name: "",
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
      },

      update: (slice, fieldOrUpdates, value) =>
        set((state) => {
          if (typeof fieldOrUpdates === "string") {
            // single field
            return {
              [slice]: {
                ...state[slice],
                [fieldOrUpdates]: value,
              },
            };
          } else {
            // batch update
            return {
              [slice]: {
                ...state[slice],
                ...fieldOrUpdates,
              },
            };
          }
        }),

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
          },
        }),
    }),
    {
      name: "comp-storage",
    }
  )
);


// MAKE SURE TO USE FIRESTORE TO STORE INFORMATION AFTER USING ZUSTAND


// SELECTORS
export const useStoreSelectors = createSelectors(useStore);

export default useStore;