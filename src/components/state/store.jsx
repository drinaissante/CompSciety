import { create } from "zustand";
import { persist } from "zustand/middleware";

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

export default useStore;