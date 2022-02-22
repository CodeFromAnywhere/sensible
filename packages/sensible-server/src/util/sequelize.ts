import { Op } from "sequelize";
//not exported from main place, found through looking in their code
//we also can't get the correct type from their @types package, weirdly enough.
//so we also need to have sequelize in this package.

type IsBetween = {
  [Op.and]: [
    {
      [Op.gte]: number;
    },
    {
      [Op.lte]: number;
    }
  ];
};

export const isBetweenSequelize = (lower: number, higher: number) => {
  const isBetween: IsBetween = {
    [Op.and]: [{ [Op.gte]: lower }, { [Op.lte]: higher }],
  };
  return isBetween;
};
