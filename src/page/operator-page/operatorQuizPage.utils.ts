import { QuizLocalStorageAgent } from "@/src/lib/classes";

// Helper for localStorage
/** Hook for saving quiz data to localstorage */
const useLocalStorage = () => new QuizLocalStorageAgent('OPERATOR');
export default useLocalStorage;