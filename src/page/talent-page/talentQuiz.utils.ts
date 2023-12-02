import { TalentComparisonResult } from "@/src/modules/talent/lib/types";

const useLocalStorage = () => {
    const CURRENT_GUESSES = "TALENT_CURRENT_GUESSES";
    const STATUS = "TALENT_STATUS";
    const DATE = "TALENT_DATE";

    const saveCurrentGuessesToStorage = (data: TalentComparisonResult[]) => {
        localStorage.setItem(CURRENT_GUESSES, JSON.stringify(data));
    }

    const getCurrentGuessesFromStorage = (): TalentComparisonResult[] => {
        const data =  localStorage.getItem(CURRENT_GUESSES);
        if (data === null) {
            return []
        }
        else {
            const out: TalentComparisonResult[] = JSON.parse(data);
            return out;
        }
    }

    const removeCurrentGuessesFromStorage = () => {
        localStorage.removeItem(CURRENT_GUESSES);
    }

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
        saveCurrentGuessesToStorage, getCurrentGuessesFromStorage,
        saveStatusToStorage, getStatusFromStorage,
        saveDateToStorage, getDateFromStorage,
        isDataOutdated,
        removeCurrentGuessesFromStorage, removeStatusFromStorage,  removeDateFromStorage
    }
}

export default useLocalStorage;