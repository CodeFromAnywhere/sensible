/// <reference types="node" />
declare type OSOrDefault = NodeJS.Platform | "default";
declare type CommandPerOs = {
    [key in OSOrDefault]?: string;
};
declare type CommandPerOSOrCommandString = CommandPerOs | string;
export declare type Command = {
    command?: CommandPerOSOrCommandString;
    nodeFunction?: (resolve: () => void) => void;
    description: string;
    isDisabled?: boolean;
    allowedErrors?: Array<number>;
    getAllowedErrors?: () => void;
};
export declare const isCommandPerOs: (command: CommandPerOSOrCommandString) => command is CommandPerOs;
export declare const getCommand: (command: Command) => string | false;
export declare const executeCommand: (command: Command, dir: string, debug?: boolean | undefined) => Promise<void>;
export {};
//# sourceMappingURL=util.commands.d.ts.map