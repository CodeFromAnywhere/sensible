import type { Arguments, CommandBuilder } from "yargs";
declare type Options = {
    name: string;
    upper: boolean | undefined;
};
export declare const command: string;
export declare const desc: string;
export declare const builder: CommandBuilder<Options, Options>;
export declare const handler: (argv: Arguments<Options>) => void;
export {};
