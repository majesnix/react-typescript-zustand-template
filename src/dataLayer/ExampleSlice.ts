import { StateCreator } from "zustand";
import { getExamples } from "./ApiClient";

export interface Example {
    id: string | undefined;
    header: string | undefined;
}

export interface ExampleStore {
    examples: Example[],
    getExamples: () => Promise<void>,

}

export const createExampleSlice: StateCreator<ExampleStore, [], [], ExampleStore> = (set, get) => ({
    examples: [],
    getExamples: async () => {
        const examples = await getExamples()

        set(() => ({
            examples: examples
        }))
    }
});