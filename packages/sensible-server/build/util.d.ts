import { Op } from "sequelize/types/operators";
declare type IsBetween = {
    [Op.and]: [
        {
            [Op.gte]: number;
        },
        {
            [Op.lte]: number;
        }
    ];
};
export declare const isBetweenSequelize: (lower: number, higher: number) => IsBetween;
export {};
//# sourceMappingURL=util.d.ts.map