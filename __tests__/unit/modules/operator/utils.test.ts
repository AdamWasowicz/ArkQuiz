import { OperatorComparisonDiffrenceV2, OperatorHeader } from '@/src/modules/operator/lib/types';
import * as su from '../../../../src/modules/operator/lib/server-utils';
import * as cu from '../../../../src/modules/operator/lib/client-utils';
import { doesFileExist } from '@/src/lib/filesystem';

// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⣬⠷⣶⡖⠲⡄⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⣠⠶⠋⠁⠀⠸⣿⡀⠀⡁⠈⠙⠢⠤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⢠⠞⠁⠀⠀⠀⠀⠀⠉⠣⠬⢧⠀⠀⠀⠀⠈⠻⣤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⢀⡴⠃⠀⠀⢠⣴⣿⡿⠀⠀⠀⠐⠋⠀⠀⠀⠀⠀⠀⠘⠿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⢀⡴⠋⠀⠀⠀⠀⠈⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠒⠒⠓⠛⠓⠶⠶⢄⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⢠⠎⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠦⣀⠀⠀⠀⠀⠀⠀⠀⠀
// ⡞⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⢷⡄⠀⠀⠀⠀⠀⠀
// ⢻⣇⣹⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢦⡀⠀⠀⠀⠀
// ⠀⠻⣟⠋⠀⠀⠀⠀⠀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⣄⠀⠀⠀
// ⠀⠀⠀⠉⠓⠒⠊⠉⠉⢸⡙⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠘⣆⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣱⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣿⠀⠀⠀⠀⠀⢻⡄⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠟⣧⡀⠀⠀⢀⡄⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡿⠇⠀⠀⠀⠀⠀⠀⢣⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⡧⢿⡀⠚⠿⢻⡆⠀⠀⠀⠀⠀⢠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⡇⠀⠀⠀⠀⠀⠀⠀⠘⡆
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⠀⠀⠈⢹⡀⠀⠀⠀⠀⣾⡆⠀⠀⠀⠀⠀⠀⠀⠀⠾⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠨⢷⣾⠀⠸⡷⠀⠀⠀⠘⡿⠂⠀⠀⠀⢀⡴⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡇
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡄⠳⢼⣧⡀⠀⠀⢶⡼⠦⠀⠀⠀⡞⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠃
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡇⠀⡎⣽⠿⣦⣽⣷⠿⠒⠀⠀⠀⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⠁⣴⠃⡿⠀⠀⢠⠆⠢⡀⠀⠀⠀⠈⢧⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠇⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣠⣠⠏⠀⣸⢰⡇⠀⢠⠏⠀⠀⠘⢦⣀⣀⠀⢀⠙⢧⡀⠀⠀⠀⠀⠀⠀⠀⠀⡰⠁⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠾⠿⢯⣤⣆⣤⣯⠼⠀⠀⢸⠀⠀⠀⠀⠀⣉⠭⠿⠛⠛⠚⠟⡇⠀⠀⣀⠀⢀⡤⠊⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠀⢸⣷⣶⣤⣦⡼⠀⠀⠀⣴⣯⠇⡀⣀⣀⠤⠤⠖⠁⠐⠚⠛⠉⠁⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣛⠁⢋⡀⠀⠀⠀⠀⣛⣛⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
//                              G O R T


// Client
describe(cu.specifyUndiscoveredOperatorTraits, () => {
    it("should return valid output", () => {
        const ocr1: OperatorComparisonDiffrenceV2 = {
            Rarity: -1,
            Class: -1,
            Branch: -1,
            Attack_Range: -1,
            Position: -1,
            Gender: -1,
            Race: -1,
            Faction: -1
        }

        const ocr2: OperatorComparisonDiffrenceV2 = {
            Rarity: 1,
            Class: -1,
            Branch: -1,
            Attack_Range: -1,
            Position: -1,
            Gender: -1,
            Race: -1,
            Faction: 1
        }

        const array = [ocr1, ocr2];

        const result = cu.specifyUndiscoveredOperatorTraits(array);

        expect(result.Rarity).toEqual(ocr2.Rarity);
        expect(result.Faction).toEqual(ocr2.Faction);
    })
})

describe(cu.getUndiscoveredOperatorTrait, () => {
    it("should return undiscovered trait if there is undisovered trait", () => {
        const ocr1: OperatorComparisonDiffrenceV2 = {
            Rarity: -1,
            Class: -1,
            Branch: -1,
            Attack_Range: -1,
            Position: -1,
            Gender: -1,
            Race: -1,
            Faction: -1
        }

        const operator = su.getAllOperators()[0];

        const result = cu.getUndiscoveredOperatorTrait(operator, ocr1);

        expect(result).not.toEqual("All traits discovered");
        expect(result).not.toHaveLength(0);
    }),

    it("should return 'All traits discovered' when all traits are discovered", () => {
        const ocr1: OperatorComparisonDiffrenceV2 = {
            Rarity: 1,
            Class: 1,
            Branch: 1,
            Attack_Range: 1,
            Position: 1,
            Gender: 1,
            Race: 1,
            Faction: 1
        }

        const operator = su.getAllOperators()[0];
        const result = cu.getUndiscoveredOperatorTrait(operator, ocr1);

        expect(result).toEqual("All traits discovered");
        expect(result).not.toHaveLength(0);
    })
})


// Server
describe(su.getOperatorById, () => {
    it('should return underined if operator Id does not exist in app', () => {
        const result = su.getOperatorById('unknown');
        expect(result).toBeUndefined();
    })

    it('should return Operator object when Id exists in app', () => {
        const validId = su.getAllOperatorHeaders()[0].Id;
        const result = su.getOperatorById(validId);

        expect(result).not.toBeUndefined();
        expect(result).not.toBeNull();
        expect(result!.Id).toEqual(validId);
    })
})

describe(su.getAllOperatorHeaders, () => {
    it('should not return empty array', () => {
        const result = su.getAllOperatorHeaders();

        expect(result).not.toHaveLength(0)
    }),

    it ('should return array with length same as number of data files', () => {
        const result = su.getAllOperatorHeaders();
        const expectedLength = su.getAllOperatorFileNames().length;

        expect(result).toHaveLength(expectedLength);
    })
})

describe(su.getAbsolutePathToIcon, () => {
    it('should return underined if operator Id does not exist in app', () => {
        const result = su.getAbsolutePathToIcon('unknown');

        expect(result).toBeUndefined();
    }),

    it('should return path to icon when Id exists in app', () => {
        const validId = su.getAllOperatorHeaders()[0].Id;
        const result = su.getAbsolutePathToIcon(validId);

        expect(result).not.toHaveLength(0);
    })

    it('should return path to file that exists', () => {
        const validId = su.getAllOperatorHeaders()[0].Id;

        const result = su.getAbsolutePathToIcon(validId);
        const fileExists = doesFileExist(result!);
        
        expect(fileExists).toBeTruthy();
    })
})

describe(su.routeToOperatorIcon, () => {
    it("shouldn't return empty string", () => {
        const result = su.routeToOperatorIcon('any');

        expect(result).not.toHaveLength(0);
    })
})

describe(su.getAllOperatorFileNames, () => {
    it("shouldn't return empty array", () => {
        const result = su.getAllOperatorFileNames();

        expect(result).not.toHaveLength(0);
    })
})

describe(su.getDayOperatorId, () => {
    it("should return valid operator Id", () => {
        const validIds = su.getAllOperatorHeaders().map((item) => item.Id);
        const result = su.getDayOperatorId(new Date());

        expect(validIds).toContain(result);
    })
})

describe(su.getOperatorHeaderMap, () => {
    it("should return object of type OperatorHeaderMap", () => {
        const result = su.getOperatorHeaderMap();

        expect(result).toBeInstanceOf(Map<string, OperatorHeader[]>)
    })

    it("should have number of keys equal to number of operator headers in app", () => {
        const result = su.getOperatorHeaderMap();
        let allHeaders: OperatorHeader[] = [];
        result.forEach((item) => {
            allHeaders = [...allHeaders, ...item]
        })

        const expectedNumberOfKeys = su.getAllOperatorHeaders().length;

        expect(allHeaders.length).toEqual(expectedNumberOfKeys);
    })
})

describe(su.compareTwoOperatorsV2, () => {
    it('if operators are the same then property isCorrect is set to true', () => {
        const headers = su.getAllOperatorHeaders();
        const result = su.compareTwoOperatorsV2(headers[0].Id, headers[0].Id)

        expect(result.isCorrect).toBeTruthy();
    })

    it('if operators are the same then property diffrences should be all 1', () => {
        const headers = su.getAllOperatorHeaders();
        const result = su.compareTwoOperatorsV2(headers[0].Id, headers[0].Id);

        let allOnes = true;
        const enties = Object.entries(result.diffrences)

        for (let i = 0; i < enties.length; i++) {
            if (enties[i][1] != 1) {
                allOnes = false;
                break;
            }
        }

        expect(allOnes).toBeTruthy();
    })

    it('if operators are diffrent then property isCorrect is set to false', () => {
        const headers = su.getAllOperatorHeaders();
        const result = su.compareTwoOperatorsV2(headers[0].Id, headers[1].Id)

        expect(result.isCorrect).toBeFalsy();
    })

    it('if operators are diffrent then property diffrences should not be all 1', () => {
        const headers = su.getAllOperatorHeaders();
        const result = su.compareTwoOperatorsV2(headers[0].Id, headers[1].Id);

        let allOnes = true;
        const enties = Object.entries(result.diffrences)

        for (let i = 0; i < enties.length; i++) {
            if (enties[i][1] != 1) {
                allOnes = false;
                break;
            }
        }

        expect(allOnes).toBeFalsy();
    })

    it ("it should throw Error if any Id is not present in app", () => {
        const headers = su.getAllOperatorHeaders();
        
        expect(() => {su.compareTwoOperatorsV2(headers[1].Id, 'invalid Id')})
            .toThrow(Error);

        expect(() => {su.compareTwoOperatorsV2('invalid Id', headers[1].Id)})
            .toThrow(Error);

        expect(() => {su.compareTwoOperatorsV2('invalid Id', 'invalid Id')})
            .toThrow(Error);
    })
})

describe(su.__compareTwoOperatorsComparer, () => {
    // Number
    it("should return 1 if two numbers are the same", () => {
        const result = su.__compareTwoOperatorsComparer(0, 0);
        expect(result).toEqual(1);
    })

    it("should return -1 if two numbers are diffrent", () => {
        const result = su.__compareTwoOperatorsComparer(0, 1);
        expect(result).toEqual(-1);
    })

    it ("it should return 1 if two numbers are the same but one is in array", () => {
        const fn = su.__compareTwoOperatorsComparer;

        expect(fn(0, [0])).toEqual(1);
        expect(fn([0], 0)).toEqual(1);
    })

    it ("it should return 1 if two number arrays have same content", () => {
        const fn = su.__compareTwoOperatorsComparer;

        expect(fn([0], [0])).toEqual(1);
    })

    it ("it should return -1 if two number arrays have diffrent content", () => {
        const fn = su.__compareTwoOperatorsComparer;

        expect(fn([0], [1])).toEqual(-1);
    })

    it ("it should return 0 if two number arrays have slightly diffrent content", () => {
        const fn = su.__compareTwoOperatorsComparer;

        expect(fn([0], [0, 1])).toEqual(0);
        expect(fn([0, 1], [0])).toEqual(0);
    })

    // String
    it("should return 1 if two string are the same", () => {
        const fn = su.__compareTwoOperatorsComparer;

        expect(fn("A", "A")).toEqual(1);
    })

    it("should return -1 if two string are the diffrent", () => {
        const fn = su.__compareTwoOperatorsComparer;

        expect(fn("A", "B")).toEqual(-1);
    })

    it("it should return 1 if two strings are the same but one is in array", () => {
        const fn = su.__compareTwoOperatorsComparer;

        expect(fn("A", ["A"])).toEqual(1);
        expect(fn(["A"], "A")).toEqual(1);
    })

    it("it should return 1 if two string arrays have same content", () => {
        const fn = su.__compareTwoOperatorsComparer;

        expect(fn(["A"], ["A"])).toEqual(1);
    })

    it("it should return 0 if two strong arrays have slightly diffrent content", () => {
        const fn = su.__compareTwoOperatorsComparer;

        expect(fn(["A"], ["A", "B"])).toEqual(0);
        expect(fn(["A", "B"], ["A"])).toEqual(0);
    })
})

describe(su.getRaceDescription, () => {
    it("should return undefined if raceName is not in app", () => {
        const result = su.getRaceDescription('RANDOM');

        expect(result).toBeUndefined();
    }),

    it("should return RaceDescription object if raceName is in app", () => {
        const result = su.getRaceDescription('Aegir');

        expect(result).not.toBeUndefined();
        expect(result?.Race).toEqual('Aegir');
    })
})

describe(su.getOperatorHintTalent, () => {
    it("should return 'No talent' if Operator has no talent", () => {
        const operatorWithoutTalent = su.getAllOperators()
            .find(item => item.Rarity <= 3);
        
        const header: OperatorHeader = {
            Id: operatorWithoutTalent!.Id,
            Name: operatorWithoutTalent!.Name
        }

        const result = su.getOperatorHintTalent(header);

        expect(result).toEqual("No talent")
    })

    it("should return string if Operator has talent", () => {
        const operatorWithoutTalent = su.getAllOperators()
            .find(item => item.Rarity >= 4);
        
        const header: OperatorHeader = {
            Id: operatorWithoutTalent!.Id,
            Name: operatorWithoutTalent!.Name
        }

        const result = su.getOperatorHintTalent(header);

        expect(result).not.toEqual("No talent");
        expect(result).not.toHaveLength(0);
    })
})

describe(su.getOperatorHintSkill, () => {
    it("should return 'No skill' if Operator has no talent", () => {
        const operatorWithoutTalent = su.getAllOperators()
            .find(item => item.Rarity <= 2);
        
        const header: OperatorHeader = {
            Id: operatorWithoutTalent!.Id,
            Name: operatorWithoutTalent!.Name
        }

        const result = su.getOperatorHintSkill(header);

        expect(result).toEqual("No skill");
    })

    it("should return string if Operator has skill", () => {
        const operatorWithoutTalent = su.getAllOperators()
            .find(item => item.Rarity >= 3);
        
        const header: OperatorHeader = {
            Id: operatorWithoutTalent!.Id,
            Name: operatorWithoutTalent!.Name
        }

        const result = su.getOperatorHintSkill(header);

        expect(result).not.toEqual("No skill");
        expect(result).not.toHaveLength(0);
    })
})