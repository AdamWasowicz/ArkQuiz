import * as su from '../../../../src/modules/operator/lib/server-utils';
import { doesFileExist } from '@/src/lib/filesystem';

// Client

// Server
describe('getOperatorById', () => {
    it('should return underined if operator Id does not exist in app', () => {
        const result = su.getOperatorById('unknown');
        expect(result).toBeUndefined();
    })

    it('should return Operator object when Id exists in app', () => {
        const validId = su.getAllOperatorHeaders()[0].Id;
        const result = su.getOperatorById(validId);

        expect(result).not.toBeUndefined();
        expect(result).not.toBeNull();
        expect(result!.Id).toEqual(validId);
    })
})

describe('getAllOperatorHeaders', () => {
    it('should not return empty array', () => {
        const result = su.getAllOperatorHeaders();

        expect(result).not.toHaveLength(0)
    }),

    it ('should return array with length same as number of data files', () => {
        const result = su.getAllOperatorHeaders();
        const expectedLength = su.getAllOperatorFileNames().length;

        expect(result).toHaveLength(expectedLength);
    })
})

describe('getAbsolutePathToIcon', () => {
    it('should return underined if operator Id does not exist in app', () => {
        const result = su.getAbsolutePathToIcon('unknown');

        expect(result).toBeUndefined();
    }),

    it('should return path to icon when Id exists in app', () => {
        const validId = su.getAllOperatorHeaders()[0].Id;
        const result = su.getAbsolutePathToIcon(validId);

        expect(result).not.toHaveLength(0);
    })

    it('should return path to file that exists', () => {
        const validId = su.getAllOperatorHeaders()[0].Id;

        const result = su.getAbsolutePathToIcon(validId);
        const fileExists = doesFileExist(result!);
        
        expect(fileExists).toBeTruthy();
    })
})

describe('routeToOperatorIcon', () => {
    it("shouldn't return empty string", () => {
        const result = su.routeToOperatorIcon('any');

        expect(result).not.toHaveLength(0);
    })
})

describe('getAllOperatorFileNames', () => {
    it("shouldn't return empty array", () => {
        const result = su.getAllOperatorFileNames();

        expect(result).not.toHaveLength(0);
    })
})