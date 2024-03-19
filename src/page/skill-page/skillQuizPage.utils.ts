import { SkillComparisonResult, SkillHints } from "@/src/modules/skill/lib/types";


// Helper for localStorage
/** Hook for saving quiz data to localstorage */
const useLocalstorage = () => {
    const SKILL_CURRENT_GUESSES = "SKILL_CURRENT_GUESSES";
    const SKILL_STATUS = "SKILL_STATUS";
    const SKILL_DATE = "SKILL_DATE";
    const HINTS = "SKILL_HINTS";

    // SKILL_CURRENT_GUESSES
    const saveCurrentGuessesToStorage = (data: SkillComparisonResult[]) => {
        localStorage.setItem(SKILL_CURRENT_GUESSES, JSON.stringify(data));
    }

    const getCurrentGuessesFromStorage = (): SkillComparisonResult[] => {
        const data =  localStorage.getItem(SKILL_CURRENT_GUESSES);
        if (data === null) {
            return []
        }
        else {
            const out: SkillComparisonResult[] = JSON.parse(data);
            return out;
        }
    }

    const removeCurrentGuessesFromStorage = () => {
        localStorage.removeItem(SKILL_CURRENT_GUESSES);
    }

    // SKILL_STATUS
    const saveStatusToStorage = (status: boolean) => {
        localStorage.setItem(SKILL_STATUS, status.toString());
    }

    const getStatusFromStorage = (): boolean => {
        const data = localStorage.getItem(SKILL_STATUS);
        if (data === null) {
            return false
        }
        else {
            return data === 'true' ? true : false;
        }
    }

    const removeStatusFromStorage = () => {
        localStorage.removeItem(SKILL_STATUS);
    }

    // SKILL_DATE
    const saveSkillDateToStorage = () => {
        const date = new Date()
        localStorage.setItem(SKILL_DATE, date.toString());
    }

    const getSkillDateFromStorage = (): Date | null => {
        const data = localStorage.getItem(SKILL_DATE)
        if (data === null) {
            return data;
        }
        else {
            const date = new Date(data);
            return date;
        }
    }

    const removeSkillDateFromStorage = () => {
        localStorage.removeItem(SKILL_DATE);
    }

    const isDataOutdated = (): boolean => {
        const dateFromStorage = getSkillDateFromStorage();
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

    // Hints
    const saveHintsToStorage = (data: SkillHints) => {
        localStorage.setItem(HINTS, JSON.stringify(data));
    }

    const getHintsFromStorage = (): SkillHints | undefined => {
        const data =  localStorage.getItem(HINTS);
        if (data === null) {
            return undefined;
        }
        else {
            const out: SkillHints = JSON.parse(data);
            return out;
        }
    }

    const removeHintsFromStorage = () => {
        localStorage.removeItem(HINTS);
    }

    const clearLocalStorage = () => {
        removeCurrentGuessesFromStorage();
        removeHintsFromStorage();
        removeSkillDateFromStorage();
        removeStatusFromStorage();
    }

    return {
        saveCurrentGuessesToStorage, getCurrentGuessesFromStorage,
        saveStatusToStorage, getStatusFromStorage,
        saveSkillDateToStorage, getSkillDateFromStorage,
        isDataOutdated,
        getHintsFromStorage, saveHintsToStorage, removeHintsFromStorage,
        clearLocalStorage
    }
}

export default useLocalstorage;