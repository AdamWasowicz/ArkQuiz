import { OperatorTalents, TalentHeader} from './types';
import { PATH_TO_TALENT_DATA } from '@/src/lib/paths';
import { getAllFileNamesInDirectory, readJson, doesFileExist } from "@/src/lib/filesystem";
import path from 'path';


const dataFormat = '.json';
const dataLocation = path.join(process.cwd(), ...PATH_TO_TALENT_DATA)


export const getOperatorTalentsData = (operatorId: string): OperatorTalents | undefined => {
    const fileExists = doesFileExist(path.join(dataLocation, operatorId + dataFormat))
    if (fileExists == false) {
        return undefined;
    }

    const json = readJson(path.join(dataLocation, operatorId + dataFormat)) as OperatorTalents | undefined;
    return json;
}

export const getAllOperatorTalentsData = (): OperatorTalents[] => {
    const fileNames: string[] = getAllFileNames();

    const talentsData: OperatorTalents[] = [];
    fileNames.forEach(file => {
        const json = readJson(path.join(dataLocation, file)) as OperatorTalents | undefined;
        if (json !== undefined) {
            talentsData.push(json)
        }
    })

    return talentsData
}

export const getAllFileNames = (): string[] => {
    const fileNames: string[] = getAllFileNamesInDirectory(dataLocation);
    return fileNames;
}

export const getAllTalentHeaders = (): TalentHeader[] => {
    const talents: TalentHeader[] = [];
    const data: OperatorTalents[] = getAllOperatorTalentsData();
    data.forEach(otd => {
        const otd_s: TalentHeader[] = otd.Talents.map(t => (
            {
                OperatorId: otd.OperatorId,
                Name: t.Name,
                Description: t.Description
            } satisfies TalentHeader)

        )

        talents.push(...otd_s);
    });

    return talents;
}

export const getTalentByDate = (date: Date): TalentHeader => {
    const seed: number = date.getMonth() * date.getDate() + date.getDate()

    const talents: TalentHeader[] = getAllTalentHeaders();
    const amount = talents.length;
    const index = seed % amount;
    const selecetedTalent = talents[index];

    return selecetedTalent;
}