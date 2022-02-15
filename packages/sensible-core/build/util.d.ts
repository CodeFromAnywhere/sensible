export declare function notEmpty<TValue>(value: TValue | null | undefined): value is TValue;
export declare function uuid(): string;
export declare function earthDistance(lat1: number, long1: number, lat2: number, long2: number, response?: string): number;
export declare function slugify(string: string): string;
export declare const mergeObjectsArray: (objectsArray: object[]) => {
    [key: string]: any;
};
export declare function isEmail(email: string): boolean;
export declare const makeArrayString: (array: string[]) => string;
export declare function generatePassword(passwordLength: number): string;
export declare function shuffleArray(array: any[]): any[];
//# sourceMappingURL=util.d.ts.map