import { OperatorComparisonResultV2 } from "@/src/modules/operator/lib/types";
import { RecapData } from "@/src/modules/recap/lib/types";
import { SkillComparisonResult } from "@/src/modules/skill/lib/types";
import { TalentComparisonResult } from "@/src/modules/talent/lib/types";

const useRecapLocalStorage = () => {
    const RECAP_OPERATOR = "RECAP_OPERATOR";
    const RECAP_SKILL = "RECAP_SKILL";
    const RECAP_TALENT = "RECAP_TALENT";
    const TIME_TO_LIVE_DAYS = 14;

    const get = (id: string): RecapData[] => {
        //if (typeof window !== 'undefined') { return [] }

        const data = localStorage.getItem(id);
        if (data === null) { return [] }
        else { 
            const raw: RecapData[] = JSON.parse(data) 
            let correct: RecapData[] = raw.map((item: RecapData) => {
                const dateObj = new Date(item.date);
                return {
                    date: new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate()), 
                    numberOfTries: item.numberOfTries }
            })

            // Remove outdated records
            correct = correct.filter((item) => {
            const dateObj = new Date(item.date);
            const d = new Date()
            d.setDate(new Date().getDate() - TIME_TO_LIVE_DAYS)

            if (dateObj <= d) { return false; }
            else { return true; }
        })

            return correct;
        }
    }

    const update = (id: string, data: []): void => {
        //if (typeof window !== 'undefined') { return; }

        const date = new Date();
        const numberOfGuesses: number = data.length;
        const newEntry: RecapData = {
            // Get only year, month, date
            date: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
            numberOfTries: numberOfGuesses
        }

        let currentState: RecapData[] = get(id);
        currentState = [...currentState, newEntry];

        // Remove outdated records
        currentState = currentState.filter((item) => {
            const dateObj = new Date(item.date);
            const d = new Date()
            d.setDate(new Date().getDate() - TIME_TO_LIVE_DAYS)

            if (dateObj <= d) { return false; }
            else { return true; }
        })

        localStorage.setItem(id, JSON.stringify(currentState))
    }

    const getOperator = (): RecapData[] => get(RECAP_OPERATOR);
    const updateOperator = (data: OperatorComparisonResultV2[]): void => update(RECAP_OPERATOR, data as []);

    const getSkill = (): RecapData[] => get(RECAP_SKILL);
    const updateSkill = (data: SkillComparisonResult[]): void => update(RECAP_SKILL, data as []);

    const getTalent = (): RecapData[] => get(RECAP_TALENT);
    const updateTalent = (data: TalentComparisonResult[]): void => update(RECAP_TALENT, data as []);
    
    return {
        getOperator, updateOperator,
        getSkill, updateSkill,
        getTalent, updateTalent
    }
}

export default useRecapLocalStorage;