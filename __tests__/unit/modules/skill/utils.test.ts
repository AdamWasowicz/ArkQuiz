import * as su from '../../../../src/modules/skill/lib/utils';
import * as o_su from '../../../../src/modules/operator/lib/server-utils';
import { Skill } from '@/src/modules/skill/lib/types';
import * as paths from '@/src/lib/paths';
import path from 'path';
import fs from 'fs';

const operatorWithoutSkillId = "A41";
const operatorWithTwoSkillsId = "PL02";

describe(su.getOperatorSkillsData, () => {
    it("should return undefined if Id is not in app", () => {
        const result = su.getOperatorSkillsData("UNKNOWN");

        expect(result).toBeUndefined();
    })

    it("should return undefined if operator has no skills", () => {
        const result = su.getOperatorSkillsData(operatorWithoutSkillId);

        expect(result).toBeUndefined();
    })

    it("should return object of type OperatorSkills if Id is in app", () => {
        const result = su.getOperatorSkillsData(operatorWithTwoSkillsId);

        expect(result).not.toBeUndefined();
        expect(typeof result).toBe("object")
    })
})

describe(su.getAllOperatorSkillsData, () => {
    it("should return number of elements equal to operators(3*+) with skills in app", () => {
        const op = o_su.getAllOperators().filter((item) => item.Rarity > 3).map(item => item.Id);
        const numberOfValidOperators = op.length;

        const result = su.getAllOperatorSkillsData();

        expect(result).toHaveLength(numberOfValidOperators);
    })
})

describe(su.getAllSkillHeaders, () => {
    it("should return number of elements ", () => {
        let expe: Skill[] = [];
        su.getAllOperatorSkillsData().forEach(item => {
            expe = [...expe, ...item.Skills]
        })

        const result = su.getAllSkillHeaders();

        expect(result).toHaveLength(expe.length);
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
            ...paths.PATH_TO_SKILL_DATA
        )
        const actualState = fs.readdirSync(pathToResource);
        
        const result  = su.getAllFileNames();
        
        expect(result.sort()).toEqual(actualState.sort());
    })
})

describe(su.getSkillByDate, () => {
    it("should return valid skill", () => {
        const allHeaders = su.getAllSkillHeaders();

        const result = su.getSkillByDate(new Date());

        const isPresent = allHeaders.find(item => item.Name === result.Name)
        
        expect(isPresent).not.toBeUndefined();
    })
})