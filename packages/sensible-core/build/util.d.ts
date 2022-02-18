export declare function onlyUnique<T extends unknown>(value: T, index: number, self: T[]): boolean;
export declare function objectMap<T extends {
    [key: string]: T[string];
}, U extends unknown>(object: T, mapFn: (value: T[string], key?: string) => U): {
    [key: string]: U;
};
export declare function notEmpty<TValue>(value: TValue | null | undefined): value is TValue;
export declare function uuid(): string;
/**
 * creates an enum object from a readonly const array so you don't have to
 * ------
 * const taskNames = ["a","b","c"] as const;
 * type TaskNames = typeof taskNames[number];
 * const enummm = createEnum(taskNames);
 * (value of enummm: { a: "a", b: "b", c: "c" })
 */
export declare const createEnum: <T extends readonly string[]>(array: T) => { [K in T[number]]: K; };
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