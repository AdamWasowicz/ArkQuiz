import { OperatorComparisonResultV2, OperatorHints } from "@/src/modules/operator/lib/types";

// Helper for localStorage
/** Hook for saving quiz data to localstorage */
const useLocalStorage = () => {
    const CURRENT_GUESSES = "OPERATOR_CURRENT_GUESSES";
    const STATUS = "OPERATOR_STATUS";
    const DATE = "OPERATOR_DATE";
    const HINTS = "OPERATOR_HINTS";

    // CurrentGuesses
    const saveCurrentGuessesToStorage = (data: OperatorComparisonResultV2[]) => {
        localStorage.setItem(CURRENT_GUESSES, JSON.stringify(data));
    }

    const getCurrentGuessesFromStorage = (): OperatorComparisonResultV2[] => {
        const data =  localStorage.getItem(CURRENT_GUESSES);
        if (data === null) {
            return []
        }
        else {
            const out: OperatorComparisonResultV2[] = JSON.parse(data);
            return out;
        }
    }

    const removeCurrentGuessesFromStorage = () => {
        localStorage.removeItem(CURRENT_GUESSES);
    }

    // Status
    const saveStatusToStorage = (status: boolean) => {
        localStorage.setItem(STATUS, status.toString());
    }

    const getStatusFromStorage = (): boolean => {
        const data = localStorage.getItem(STATUS);
        if (data === null) {
            return false
        }
        else {
            return data === 'true' ? true : false;
        }
    }

    const removeStatusFromStorage = () => {
        localStorage.removeItem(STATUS);
    }

    // Date
    const saveDateToStorage = () => {
        const date = new Date()
        localStorage.setItem(DATE, date.toString());
    }

    const getDateFromStorage = (): Date | null => {
        const data = localStorage.getItem(DATE)
        if (data === null) {
            return data;
        }
        else {
            const date = new Date(data);
            return date;
        }
    }

    const removeDateFromStorage = () => {
        localStorage.removeItem(DATE);
    }

    // Hints
    const saveHintsToStorage = (data: OperatorHints) => {
        localStorage.setItem(HINTS, JSON.stringify(data));
    }

    const getHintsFromStorage = (): OperatorHints | undefined => {
        const data =  localStorage.getItem(HINTS);
        if (data === null) {
            return undefined;
        }
        else {
            const out: OperatorHints = JSON.parse(data);
            return out;
        }
    }

    const removeHintsFromStorage = () => {
        localStorage.removeItem(HINTS);
    }




    // Utils
    const isDataOutdated = (): boolean => {
        const dateFromStorage = getDateFromStorage();
        if (dateFromStorage == null) {
            return true;
        }

        // Date from storage
        let month = dateFromStorage.getUTCMonth() + 1; //months from 1-12
        let day = dateFromStorage.getUTCDate();
        let year = dateFromStorage.getUTCFullYear();
        const dateFS = year + "/" + month + "/" + day;

        // Date now
        const dateNow = new Date()
        month = dateNow.getUTCMonth() + 1; //months from 1-12
        day = dateNow.getUTCDate();
        year = dateNow.getUTCFullYear();
        const dateN = year + "/" + month + "/" + day;

        const dateFsC = new Date(dateFS);
        const dateNC = new Date(dateN);

        return dateNC > dateFsC ? true : false;
    }
 
    return {
        // Guesses
        saveCurrentGuessesToStorage, getCurrentGuessesFromStorage, removeCurrentGuessesFromStorage,
        // Status
        getStatusFromStorage, removeStatusFromStorage, saveStatusToStorage,
        // Date
        saveDateToStorage, getDateFromStorage, removeDateFromStorage,
        // Other
        isDataOutdated,
        // Hints
        saveHintsToStorage, getHintsFromStorage, removeHintsFromStorage
    }
}

export default useLocalStorage;