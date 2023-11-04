import { OperatorComparisonResultV2 } from "@/src/resources/operator/lib/types";

// Helper for localStorage
const useLocalStorage = () => {
    const OPERATOR_CURRENT_GUESSES = "OPERATOR_CURRENT_GUESSES";
    const OPERATOR_STATUS = "OPERATOR_STATUS";
    const OPERATOR_DATE = "OPERATOR_DATE";

    const saveCurrentGuessesToStorage = (data: OperatorComparisonResultV2[]) => {
        localStorage.setItem(OPERATOR_CURRENT_GUESSES, JSON.stringify(data));
    }

    const getCurrentGuessesFromStorage = (): OperatorComparisonResultV2[] => {
        const data =  localStorage.getItem(OPERATOR_CURRENT_GUESSES);
        if (data === null) {
            return []
        }
        else {
            const out: OperatorComparisonResultV2[] = JSON.parse(data);
            return out;
        }
    }

    const removeCurrentGuessesFromStorage = () => {
        localStorage.removeItem(OPERATOR_CURRENT_GUESSES);
    }

    const saveStatusToStorage = (status: boolean) => {
        localStorage.setItem(OPERATOR_STATUS, status.toString());
    }

    const getStatusFromStorage = (): boolean => {
        const data = localStorage.getItem(OPERATOR_STATUS);
        if (data === null) {
            return false
        }
        else {
            return data === 'true' ? true : false;
        }
    }

    const removeStatusFromStorage = () => {
        localStorage.removeItem(OPERATOR_STATUS);
    }

    const saveOperatorDateToStorage = () => {
        const date = new Date()
        localStorage.setItem(OPERATOR_DATE, date.toString());
    }

    const getOperatorDateFromStorage = (): Date | null => {
        const data = localStorage.getItem(OPERATOR_DATE)
        if (data === null) {
            return data;
        }
        else {
            const date = new Date(data);
            return date;
        }
    }

    const removeOeratorDateFromStorage = () => {
        localStorage.removeItem(OPERATOR_DATE);
    }

    const isDataOutdated = (): boolean => {
        const dateFromStorage = getOperatorDateFromStorage();
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
        saveCurrentGuessesToStorage, getCurrentGuessesFromStorage,
        saveStatusToStorage, getStatusFromStorage,
        saveOperatorDateToStorage, getOperatorDateFromStorage,
        isDataOutdated,
        removeCurrentGuessesFromStorage, removeStatusFromStorage, removeOeratorDateFromStorage
    }
}

export default useLocalStorage;