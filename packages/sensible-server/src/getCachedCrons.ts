import { Path } from "sensible-files";
import { Cron } from "sensible-core";
//just generate the schema once every server restart because there can't be any changes without the server restarting.
let cachedCrons: Cron[] = [];

export const getCachedCrons = (folderPath: Path): Cron[] => {
  if (cachedCrons.length > 0) {
    return cachedCrons;
  }

  const Crons = [];

  cachedCrons = Crons;
  return Crons;
};
