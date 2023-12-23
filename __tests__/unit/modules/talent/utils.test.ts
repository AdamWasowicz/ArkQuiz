import * as su from '../../../../src/modules/talent/lib/utils';
import * as o_su from '../../../../src/modules/operator/lib/server-utils';
import { Talent } from '@/src/modules/talent/lib/types';
import path from 'path';
import {PATH_TO_TALENT_DATA} from '@/src/lib/paths';
import fs from 'fs';

const oneTalentId = "AA02";
const twoTalentId = "AA01";

describe(su.getOperatorTalentsData, () => {
    it("should return undefined if opearator Id is not in app", () => {
        const result = su.getOperatorTalentsData("INVALID");

        expect(result).toBeUndefined();
    })

    it("should return object of type OperatorTalents if Id isn in app", () => {
        const result = su.getOperatorTalentsData(oneTalentId);

        expect(result).not.toBeUndefined();
        expect(result?.OperatorId).toEqual(oneTalentId);
    })

    it("should return valid number of talents", () => {
        const t1 = su.getOperatorTalentsData(oneTalentId);
        const t2 = su.getOperatorTalentsData(twoTalentId);

        // T1
        expect(t1?.OperatorId).toEqual(oneTalentId);
        expect(t1?.Talents).toHaveLength(1);

        // T2
        expect(t2?.OperatorId).toEqual(twoTalentId);
        expect(t2?.Talents).toHaveLength(2);
    })
})

describe(su.getAllOperatorTalentsData, () => {
    it("should return correct number of total talents", () => {
        const result = su.getAllOperatorTalentsData();
        let allTalents: Talent[] = []
        result.forEach((item) => {
            if (item.OperatorId.length > 4) {
                console.log(item.OperatorId)
            }

            allTalents = [...allTalents, ...item.Talents]
        })

        const allOperators = o_su.getAllOperators();
        const expectedNumberOfTalents = allOperators
            .map((item) => item.Rarity)
            .reduce((accm, r) => {
                return r >= 6 
                    ? accm + 2 
                    : r > 3 
                        ? accm + 1 
                        : accm + 0
            })


        expect(allTalents.length).toBeGreaterThanOrEqual(expectedNumberOfTalents);
        expect(allTalents.length).toBeLessThanOrEqual(expectedNumberOfTalents + 4);
    })
})

describe(su.getAllFileNames, () => {
    it("shouln't return empty array", () => {
        const result = su.getAllFileNames();
        expect(result).not.toHaveLength(0);
    })

    it("should return number of files equal to actual state", () => {
        const pathToResource: string = path.join(
            process.cwd(),
            ...PATH_TO_TALENT_DATA
        )
        const actualState = fs.readdirSync(pathToResource);
        
        const result  = su.getAllFileNames();
        
        expect(result.sort()).toEqual(actualState.sort());
    })
})

describe(su.getAllTalentHeaders, () => {
    it("should return number of TalentHeaders equal to number of talents in app", () => {
        const result = su.getAllTalentHeaders();

        let expectedTalents: Talent[] = []
        su.getAllOperatorTalentsData()
            .forEach(item => {
                expectedTalents = [...expectedTalents, ...item.Talents]
            })

        expect(result.length).toEqual(expectedTalents.length);
    })
})

describe(su.getTalentByDate, () => {
    it("should return valid TalentHeader (Id in app)", () => {
        const result = su.getTalentByDate(new Date());
        const allOperatorsHeaders = o_su.getAllOperatorHeaders();

        const arrayIndex = allOperatorsHeaders.findIndex((item) => item.Id === result.OperatorId);
        
        expect(arrayIndex).not.toEqual(-1);
    })
})