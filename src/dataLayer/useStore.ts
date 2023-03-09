import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createExampleSlice, ExampleStore } from "./ExampleSlice";

export const useStore = create<ExampleStore>()(
    devtools(
        (...state) => ({ ...createExampleSlice(...state) })
        , {
            name: "example-store"
        })
)