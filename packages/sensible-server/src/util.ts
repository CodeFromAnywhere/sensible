import { Op } from "sequelize";
import { Op as OpTypes } from "sequelize/types/operators"; //not exported from main place, found through looking in their code

type IsBetween = {
  [OpTypes.and]: [
    {
      [OpTypes.gte]: number;
    },
    {
      [OpTypes.lte]: number;
    }
  ];
};
//
export const isBetweenSequelize = (lower: number, higher: number) => {
  const isBetween: IsBetween = {
    [Op.and]: [{ [Op.gte]: lower }, { [Op.lte]: higher }],
  };
  return isBetween;
};
