import { OperatorSkills, SkillHeader } from "./types";
import { PATH_TO_SKILL_DATA } from "@/src/lib/paths";
import { getAllFileNamesInDirectory, readJson, doesFileExist } from "@/src/lib/filesystem";
import path from 'path';

const skillDataFormat = '.json';
const pathToSkillData = path.join(process.cwd(), ...PATH_TO_SKILL_DATA)

/**
 * Get skill data for operator with selected Id
 * @param id of operator
 * @returns object of type {@link OperatorSkills} or undefined
 */
export const getOperatorSkillsData = (id: string): OperatorSkills | undefined => {
    const fileExist = doesFileExist(path.join(pathToSkillData, id + skillDataFormat))
    if (fileExist == false) {
        return undefined;
    }

    const json = readJson(path.join(pathToSkillData, id + skillDataFormat)) as OperatorSkills | undefined;
    return json;
}

/**
 * Get all operator skills data
 * @returns array of all {@link OperatorSkillData} in app
 */
export const getAllOperatorSkillsData = (): OperatorSkills[] => {
    const fileNames: string[] = getAllFileNames();

    const skillsData: OperatorSkills[] = [];
    fileNames.forEach(file => {
        const json = readJson(path.join(pathToSkillData, file)) as OperatorSkills | undefined;
        if (json !== undefined) {
            skillsData.push(json);
        }  
    })

    return skillsData;
}

/**
 * Get all operator skills data headers
 * @returns array of all {@link SkillHeader}
 */
export const getAllSkillHeaders = (): SkillHeader[] => {
    let skills: SkillHeader[] = [];
    
    const data: OperatorSkills[] = getAllOperatorSkillsData();
    skills = [];
    data.forEach(osd => {
        const osd_s: SkillHeader[] = osd.Skills.map(s => (
            {
                Id: osd.Id, 
                Number: s.Number,
                Name: s.Name

            } satisfies SkillHeader)
        );
        skills.push(...osd_s);
    }) 
    

    return skills;
}

/**
 * Get all names of files containing skill data
 * @returns array of all files names
 */
export const getAllFileNames = (): string[] => {
    const fileNames: string[] = getAllFileNamesInDirectory(pathToSkillData);
    return fileNames;
}

/**
 * Get skill of selected day
 * @param date for selecting skill
 * @returns object of type {@link SkillHeader}
 */
export const getSkillByDate  = (date: Date): SkillHeader => {
    const seed: number = date.getMonth() * date.getDate() + date.getDate()
    const skills: SkillHeader[] = getAllSkillHeaders();

    const amountOfSkills = skills.length;
    const index = seed % amountOfSkills;
    const selectedSkill = skills[index];

    return selectedSkill;
}