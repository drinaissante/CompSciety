import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      profile: {
        name: "",
        middle_ini: "",
        last_name: "",
        profile_link: "",
      },
      student: {
        college: "",
        program: "",
        year_level: "",
        section: "",
      },
      questions: {
        question_1: "",
        question_2: "",
        question_3: "",
      },
      creds: {
        email: "",
        discord: "",
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
            middle_ini: "",
            last_name: "",
            profile_link: "",
          },
          student: {
            college: "",
            program: "",
            year_level: "",
            section: "",
          },
          questions: {
            question_1: "",
            question_2: "",
            question_3: "",
          },
          creds: {
            email: "",
            discord: "",
          }
        }),
    }),
    {
      name: "comp-storage",
    }
  )
);

export default useStore;