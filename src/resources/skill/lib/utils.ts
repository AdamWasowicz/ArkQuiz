import { OperatorSkills, SkillHeader, SkillHeaderComposite } from "./types";
import { PATH_TO_SKILL_DATA } from "@/src/lib/paths";
import { getAllFileNamesInDirectory, readJson, doesFileExist, saveJson } from "@/src/lib/filesystem";
import path from 'path';
import packageDotJson from '@/package.json'; 

const skillDataFormat = '.json';
const pathToSkillData = path.join(process.cwd(), ...PATH_TO_SKILL_DATA)
const skillHeadersLocation = path.join(process.cwd(), ...['src' ,'resources', 'skill', 'lib', 'SkillHeaders.json']);

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
    // Composite headers
    let skills: SkillHeader[] = [];
    const compositeHeaders = getSkillHeaderComposite();
    if (compositeHeaders !== undefined) {
        skills = compositeHeaders;
    }
    else {
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
    }

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

    // Composite headers
    const skills: SkillHeader[] = getAllSkillHeaders();

    const amountOfSkills = skills.length;
    const index = seed % amountOfSkills;
    const selectedSkill = skills[index];

    return selectedSkill;
}

// Composite files
/** Create composite file of all skill headers */
export const generateSkillHeaderCompositeFile = () => {
    const fullPath = skillHeadersLocation;

    // Check if file already exists
    let fileExists: boolean = true;
    try {
        fileExists = doesFileExist(fullPath);
    }
    catch {
        fileExists = false;
    }

    if (fileExists) {
        const data = readJson(fullPath) as SkillHeaderComposite;
        // File exists and is current
        if (data.Version === packageDotJson.version) {
            return;
        }
    }

    // Read all headers
    const data: OperatorSkills[] = getAllOperatorSkillsData();

    const skillArray: SkillHeader[] = [];
    data.forEach((item) => {
        item.Skills.forEach((skill) => {
            const sh: SkillHeader = {
                Id: item.Id,
                Name: skill.Name,
                Number: skill.Number
            }

            skillArray.push(sh);
        })
    })

    const output: SkillHeaderComposite = {
        Version: packageDotJson.version,
        WhenCreated: new Date(),
        Data: skillArray
    }

    // Save it
    saveJson(
        output,
        fullPath
    );
}

/** Create skill composite file */
export const getSkillHeaderComposite = (): SkillHeader[] | undefined => {
    const fullPath = skillHeadersLocation;

    // Check if file already exists
    let fileExists: boolean = true;
    try {
        fileExists = doesFileExist(fullPath);
    }
    catch {
        fileExists = false;
    }

    if (fileExists) {
        const data = readJson(fullPath) as SkillHeaderComposite;
        // File exists and is current
        if (data.Version === packageDotJson.version) {
            return data.Data;
        }
    }

    return undefined;
}