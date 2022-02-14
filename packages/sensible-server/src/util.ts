import { Op } from "sequelize";

export const isBetweenSequelize = (lower: number, higher: number) => {
  return { [Op.and]: [{ [Op.gte]: lower }, { [Op.lte]: higher }] };
};
