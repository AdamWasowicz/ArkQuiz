import { OperatorSkillsData, SkillHeader } from "./types";
import { 
    EXTERNAL_PATH_TO_SKILL_ICONS, 
    PATH_TO_SKILL_DATA
} from "@/src/lib/paths";
import { getAllFileNamesInDirectory, readJson, doesFileExist } from "@/src/lib/filesystem";
import path from 'path';

const imageFormat = '.webp';
const skillDataFormat = '.json';
const pathToSkillIcon = path.join(...EXTERNAL_PATH_TO_SKILL_ICONS);
const pathToSkillData = path.join(process.cwd(), ...PATH_TO_SKILL_DATA)

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

export const getAllFileNames = (): string[] => {
    const fileNames: string[] = getAllFileNamesInDirectory(pathToSkillData);
    return fileNames;
}

export const getDaySkill  = (date: Date): SkillHeader => {
    const seed: number = date.getMonth() * date.getDate() + date.getDate()

    // Skill data
    const data: OperatorSkillsData[] = getAllOperatorSkillData();
    const skills: SkillHeader[] = [];
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

    const amountOfSkills = skills.length;
    const index = seed % amountOfSkills;
    const selectedSkill = skills[index];

    return selectedSkill;
}