import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createExampleSlice, ExampleStore } from "./ExampleSlice";

/**
 * Combines all slices and gives a useStore hook, to access them
 */
export const useStore = create<ExampleStore>()(
  devtools((...state) => ({ ...createExampleSlice(...state) }), {
    name: "example-store",
  }),
);
