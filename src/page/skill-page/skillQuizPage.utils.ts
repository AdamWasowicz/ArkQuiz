import { QuizLocalStorageAgent } from "@/src/lib/classes";

// Helper for localStorage
/** Hook for saving quiz data to localstorage */
const useLocalstorage = () => new QuizLocalStorageAgent("SKILL");
export default useLocalstorage;