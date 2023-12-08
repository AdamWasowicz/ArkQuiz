import { OperatorComparisonDiffrenceV2, OperatorComparisonResultV2 } from "./types";

export const specifyUndiscoveredOperatorTraits = (currentGuesses: OperatorComparisonResultV2[]): OperatorComparisonDiffrenceV2 => {
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
            const dif = new Map(Object.entries(result.diffrences));

            if ( dif.get(key)! > cs_dict.get(key)! ) {
                cs_dict.set(key, dif.get(key)!)
            }
        })
    })

    const output = Object.fromEntries(cs_dict.entries()) as OperatorComparisonDiffrenceV2;
    console.log(output)
    return output;
}
