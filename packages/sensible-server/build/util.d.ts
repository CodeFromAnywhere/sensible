import { Op as OpTypes } from "sequelize/types/operators";
declare type IsBetween = {
    [OpTypes.and]: [
        {
            [OpTypes.gte]: number;
        },
        {
            [OpTypes.lte]: number;
        }
    ];
};
export declare const isBetweenSequelize: (lower: number, higher: number) => IsBetween;
export {};
//# sourceMappingURL=util.d.ts.map