import { Op } from "sequelize";
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
//# sourceMappingURL=sequelize.d.ts.map