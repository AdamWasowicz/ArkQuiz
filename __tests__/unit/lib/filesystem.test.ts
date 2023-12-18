import * as f from "../../../src/lib/filesystem";
import fs from 'fs';
import path from 'path';

describe(f.getAllFileNamesInDirectory, () => {
    it("should return accurate list of files names", () => {
        const absolutePath = path.join(
            process.cwd(),
            "public",
            "images",
            "operator",
            "icon" 
        )
        const should = fs.readdirSync(absolutePath);
        const result = f.getAllFileNamesInDirectory(absolutePath);

        expect(result.sort()).toEqual(should.sort());
    })
})

describe(f.doesFileExist, () => {
    it("should return true if file exists", () => {
        const absolutePath = path.join(
            process.cwd(),
            "public",
            "images",
            "operator",
            "icon" 
        )

        const file = fs.readdirSync(absolutePath)[0];
        const result = f.doesFileExist(path.join(absolutePath, file));

        expect(result).toBeTruthy();
    }),

    it("should return false if file does not exist", () => {
        const absolutePath = path.join(
            process.cwd(),
            "public",
            "images",
            "operator",
            "icon" 
        )

        const result = f.doesFileExist(path.join(absolutePath, 'unknown.webp'));

        expect(result).not.toBeTruthy();
    })
})

describe(f.readJson, () => {
    it("should return undefined when file does not exist", () => {
        const absolutePath = path.join(
            process.cwd(),
            "public",
            "images",
            "operator",
            "icon" 
        )

        const result = f.readJson(path.join(absolutePath, 'unknown.webp'));

        expect(result).toBeUndefined();
    }),

    it("should return undefined if file cannot be parsed", () => {
        const absolutePath = path.join(
            process.cwd(),
            "public",
            "images",
            "operator",
            "icon" 
        )

        const file = fs.readdirSync(absolutePath)[0];
        const result = f.readJson(path.join(absolutePath, file));

        expect(result).toBeUndefined();
    }),

    it("should return valid json when valid json file is provided", () => {
        const absolutePath = path.join(
            process.cwd(),
            "src",
            "modules",
            "operator",
            "data",
            "operator" 
        )

        const file = fs.readdirSync(absolutePath)[0];
        const result = f.readJson(path.join(absolutePath, file));

        expect(result).not.toBeUndefined();
    })
})

describe(f.saveJson, () => {
    it("should save it in correct location", () => {
        const json = {
            "field1": "value1",
            "field2": "value2"
        }

        const location = path.join(
            process.cwd(),
            "__tests__",
            "test.json"
        )

        f.saveJson(json, location);
        const result = f.doesFileExist(location);

        expect(result).toBeTruthy();

        // Clean up
        fs.unlinkSync(location);
    }),

    it("should save correct data", () => {
        const json = {
            "field1": "value1",
            "field2": "value2"
        }

        const location = path.join(
            process.cwd(),
            "__tests__",
            "test.json"
        )

        f.saveJson(json, location);
        const rawData = fs.readFileSync(location, 'utf-8');
        const savedJson = JSON.parse(rawData);

        expect(json).toEqual(savedJson);

        // Clean up
        fs.unlinkSync(location);
    })
})