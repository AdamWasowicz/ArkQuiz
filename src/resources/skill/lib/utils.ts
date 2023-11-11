import { OperatorSkillsData, SkillHeader, SkillHeaderComposite } from "./types";
import { PATH_TO_SKILL_DATA } from "@/src/lib/paths";
import { getAllFileNamesInDirectory, readJson, doesFileExist, saveJson } from "@/src/lib/filesystem";
import path from 'path';
import packageDotJson from '@/package.json'; 

const skillDataFormat = '.json';
const pathToSkillData = path.join(process.cwd(), ...PATH_TO_SKILL_DATA)
const skillHeadersLocation = path.join(process.cwd(), ...['src' ,'resources', 'skill', 'lib', 'SkillHeaders.json']);

export const getOperatorSkillData = (id: string): OperatorSkillsData => {
    const fileExist = doesFileExist(path.join(pathToSkillData, id + skillDataFormat))
    if (fileExist == false) {
        throw new Error(`File ${id + skillDataFormat} not found`)
    }

    const skillData = readJson(path.join(pathToSkillData, id + skillDataFormat)) as OperatorSkillsData;
    return skillData;
}

export const getAllOperatorSkillData = (): OperatorSkillsData[] => {
    const fileNames: string[] = getAllFileNames();

    const skillsData: OperatorSkillsData[] = [];
    fileNames.forEach(file => {
        const sd = readJson(path.join(pathToSkillData, file)) as OperatorSkillsData;
        skillsData.push(sd);
    })

    return skillsData;
}

export const getAllSkillHeaders = (): SkillHeader[] => {
    // Composite headers
    let skills: SkillHeader[] = [];
    const compositeHeaders = getSkillHeaderComposite();
    if (compositeHeaders !== undefined) {
        skills = compositeHeaders;
    }
    else {
        const data: OperatorSkillsData[] = getAllOperatorSkillData();
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

export const getAllFileNames = (): string[] => {
    const fileNames: string[] = getAllFileNamesInDirectory(pathToSkillData);
    return fileNames;
}

export const getDaySkill  = (date: Date): SkillHeader => {
    const seed: number = date.getMonth() * date.getDate() + date.getDate()

    // Composite headers
    const skills: SkillHeader[] = getAllSkillHeaders();

    const amountOfSkills = skills.length;
    const index = seed % amountOfSkills;
    const selectedSkill = skills[index];

    return selectedSkill;
}

// Composite files
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
    const data: OperatorSkillsData[] = getAllOperatorSkillData();

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