import { Operator, OperatorComparisonDiffrenceV2, OperatorComparisonResultV2 } from "./types";

export const specifyUndiscoveredOperatorTraits = (currentGuesses: OperatorComparisonDiffrenceV2[]): OperatorComparisonDiffrenceV2 => {
    const currentState: OperatorComparisonDiffrenceV2 = {
        Rarity: -1,
        Class: -1,
        Branch: -1,
        Attack_Range: -1,
        Position: -1,
        Gender: -1,
        Race: -1,
        Faction: -1
    }
    const cs_dict = new Map(Object.entries(currentState));
    const keys: string[] = Object.keys(currentState);

    keys.forEach((key) => {
        currentGuesses.forEach((result) => {
            const dif = new Map(Object.entries(result));

            if ( dif.get(key)! > cs_dict.get(key)! ) {
                cs_dict.set(key, dif.get(key)!)
            }
        })
    })

    const output = Object.fromEntries(cs_dict.entries()) as OperatorComparisonDiffrenceV2;
    return output;
}

export const getUndiscoveredOperatorTrait = (operator: Operator, currentState: OperatorComparisonDiffrenceV2): string => {

    const cs_map = new Map(Object.entries(currentState));
    const keys = Object.keys(currentState);
    const operator_map = new Map(Object.entries(operator));
    let output: string = ""

    keys.forEach((key) => {
        if (output !== "")
            return;

        if (cs_map.get(key)! < 1) {
            output =  `${key.replace('_', '')} is ${operator_map.get(key)?.toString().replace('[', '').replace(']', '')}`
        }
    })

    return output !== "" ? output : "All traits discovered";
}