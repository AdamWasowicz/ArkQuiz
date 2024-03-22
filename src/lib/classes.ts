export class QuizLocalStorageAgent {
    GUESSES: string;
    STATUS: string;
    DATE: string;
    HINTS: string;

    constructor(serviceId: string) {
        this.GUESSES = `${serviceId}_GUESSES`;
        this.STATUS = `${serviceId}_STATUS`;
        this.DATE = `${serviceId}_DATE`;
        this.HINTS = `${serviceId}_HINTS`;
    }

    // PRIVATE
    private save = (id: string, data: unknown | unknown[]) => {
        localStorage.setItem(id, JSON.stringify(data));
    }

    private get = (id: string): unknown | unknown[] => {
        const data =  localStorage.getItem(id);
        if (data === null) { return undefined }
        else { 
            try { return JSON.parse(data); }
            catch (e) { return data }
        }
    }

    private remove = (id: string) => {
        localStorage.removeItem(id);
    }

    
    // PUBLIC
    //// GUESSES
    public saveCurrentGuessesToStorage = (data: object[]) => {
        this.save(this.GUESSES, data);
    }

    public getCurrentGuessesFromStorage = (): object[] => {
        const data = this.get(this.GUESSES);
        return data === undefined ? [] : data as object[];
    }

    public removeCurrentGuessesFromStorage = () => {
        this.remove(this.GUESSES);
    }

    //// STATUS
    public saveStatusToStorage = (data: boolean) => {
        this.save(this.STATUS, data);
    }

    public getStatusFromStorage = (): boolean => {
        const data = this.get(this.STATUS);
        return data === undefined ? false : data as boolean;
    }

    public removeStatusFromStorage = () => {
        this.remove(this.STATUS);
    }

    //// DATE
    public saveDateToStorage = () => {
        const date = new Date()
        this.save(this.DATE, date.toString());
    }

    public getDateFromStorage = (): Date | null => {
        const data = this.get(this.DATE);
        return data === undefined ? null : new Date(data as string);
    }

    public removeDateFromStorage = () => {
        this.remove(this.DATE);
    }

    //// HINTS
    public saveHintsToStorage = (data: object) => {
        this.save(this.HINTS, data);
    }

    public getHintsFromStorage = (): object | undefined => {
        const data = this.get(this.HINTS);
        return data === undefined ? undefined : data as object;
    }

    public removeHintsFromStorage = () => {
        this.remove(this.HINTS);
    }

    //// OTHER
    public isDataOutdated = (): boolean => {
        const dateFromStorage = this.getDateFromStorage();
        if (dateFromStorage == null) { return true; }

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

    public clearLocalStorage = () => {
        this.removeCurrentGuessesFromStorage();
        this.removeHintsFromStorage();
        this.removeDateFromStorage();
        this.removeStatusFromStorage();
    }
}