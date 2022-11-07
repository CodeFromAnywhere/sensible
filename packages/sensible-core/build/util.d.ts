import { API } from "./types";
export declare function onlyUnique<T extends unknown>(value: T, index: number, self: T[]): boolean;
/** general purpose function that maps over an array and only returns it as part of the mapped array if the result is truthy */
export declare const mapOrRemove: <T extends unknown, U extends unknown>(array: T[], mapFn: (item: T) => U | null) => U[];
export declare function objectMap<T extends {
    [key: string]: T[string];
}, U extends unknown>(object: T, mapFn: (value: T[string], key: string) => U): {
    [key: string]: U;
};
/**
 * Removes empty values (null or undefined) from your arrays in a type-safe way
 */
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
/**
 * returns the distance between two places (not very precise but it's very efficient)
 */
export declare function earthDistance(lat1: number, long1: number, lat2: number, long2: number, response?: "m" | "km"): number;
export declare function slugify(string: string): string;
export declare const mergeObjectsArray: (objectsArray: object[]) => {
    [key: string]: any;
};
export declare function isEmail(email: string): boolean;
export declare const makeArrayString: (array: string[]) => string;
export declare function generatePassword(passwordLength: number): string;
export declare function shuffleArray(array: any[]): any[];
export declare const bodyFromQueryString: (query?: string | undefined) => {
    [key: string]: string;
} | undefined;
export declare const toQueryString: (query?: any) => string;
declare type Config = {
    apiUrl: string;
};
export declare const makeApi: <TAllEndpoints extends unknown>(config: Config) => API<TAllEndpoints>;
export {};
//# sourceMappingURL=util.d.ts.map