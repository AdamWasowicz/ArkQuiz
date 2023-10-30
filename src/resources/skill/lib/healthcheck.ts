import { doesFileExist } from "@/src/lib/filesystem";
import { OperatorSkillsData, SkillHealthCheckResult } from "./types";
import { getAllOperatorSkillData, getAllSkillHeaders } from "./utils";
import path from "path";
import { EXTERNAL_PATH_TO_SKILL_ICONS } from "@/src/lib/paths";

// Healthchecks
export const doHealthCheck = (): SkillHealthCheckResult => {
    const output: SkillHealthCheckResult = {
        errorsSkill: __doHealthCheck_Skill(),
        errorSkillIcon: __doHealthCheck_SkillIcon()
    }

    return output;
}

// Skill
const __doHealthCheck_Skill = (): string[] => {
    const skillData: OperatorSkillsData[] = getAllOperatorSkillData();

    const skillErrors: string[] = [];
    skillData.forEach((item) => 
       skillErrors.push(..._checkSkills(item))
    )

    return skillErrors;
}

const _checkSkills = (item: OperatorSkillsData): string[] => {
    const errors: string[] = [];

    const skillNumbers: number[] = item.Skills.map((skill) => {
        return skill.Number
    })

    const unique = skillNumbers.filter((value, index, array) => array.indexOf(value) === index);
    if (skillNumbers.length > unique.length) {
        errors.push(`Skill data with Id ${item.Id} has duplicate skill numbers`)
    }

    if (item.Id === undefined || item.Id.length === 0) {
        errors.push(`Skill data has empty Id, it has skill named ${item.Skills[0].Name}`)
    }

    if (item.Skills === undefined || item.Skills.length === 0) {
        errors.push(`Skill data with Id ${item.Id} has no skills`)
    }

    item.Skills.forEach((skill) => {
        if (skill.Name === undefined || skill.Name.length === 0) {
            errors.push(`Skill data with Id ${item.Id} has skill nr.${skill.Number} with no name`)
        }
    })
    
    return errors;
}

// Icon
const __doHealthCheck_SkillIcon = (): string[] => {
    const errors: string[] = []

    const skillHeaders = getAllSkillHeaders();
    skillHeaders.forEach((item) => {
        const pathToIcon = path.join(process.cwd(), ...EXTERNAL_PATH_TO_SKILL_ICONS, `${item.Id}_${item.Number}.webp`)
        if (doesFileExist(pathToIcon) === false) {
            errors.push(`There is no icon for Id ${item.Id} skill nr.${item.Number}`)
        }

        const pathToUnnumeredIconn = path.join(process.cwd(), ...EXTERNAL_PATH_TO_SKILL_ICONS, `${item.Id}.webp`)
        if (doesFileExist(pathToUnnumeredIconn) === true) {
            errors.push(`There is unumered icon for Id ${item.Id}`)
        }
    })

    return errors;
}