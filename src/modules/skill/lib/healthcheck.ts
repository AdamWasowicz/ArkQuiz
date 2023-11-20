import { doesFileExist } from "@/src/lib/filesystem";
import { OperatorSkills, SkillHealthCheckResult } from "./types";
import { getAllOperatorSkillsData, getAllSkillHeaders } from "./utils";
import path from "path";
import { EXTERNAL_PATH_TO_SKILL_ICONS } from "@/src/lib/paths";

// Healthchecks
/**
 * Root function for skill healtchecks
 * @returns object contaning arrays of diffrent error types
 */
export const doHealthCheck = (): SkillHealthCheckResult => {
    const output: SkillHealthCheckResult = {
        ErrorsSkill: __doHealthCheck_Skill(),
        ErrorsIcon: __doHealthCheck_SkillIcon()
    }

    return output;
}

// Skill
/**
 * Checks if skills data is correct, calls other functions
 * @returns array of errors
 */
const __doHealthCheck_Skill = (): string[] => {
    const skillData: OperatorSkills[] = getAllOperatorSkillsData();

    const skillErrors: string[] = [];
    skillData.forEach((item) => 
       skillErrors.push(..._checkSkills(item))
    )

    return skillErrors;
}

/**
 * 
 * @param item takes object of type {@link OperatorSkillData} and checks for errors
 * @returns array of errors
 */
const _checkSkills = (item: OperatorSkills): string[] => {
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
/**
 * Checks if all skills have icons, and there if there is icon without skill
 * @returns array of errors
 */
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