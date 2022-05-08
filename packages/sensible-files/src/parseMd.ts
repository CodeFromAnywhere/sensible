import { Markdown, Path } from "./types";
import fs from "fs";
import matter from "gray-matter";

/**
 * parse a md file to all the needed info
 * @param mdFilePath path to a md file
 * @returns Md
 */
export const parseMd = (mdFilePath: Path): Markdown => {
  const fileContents = fs.readFileSync(mdFilePath, "utf8");
  const fileStats = fs.statSync(mdFilePath);

  const config: matter.GrayMatterOption<string, any> | undefined = undefined;
  const matterResult = matter(fileContents, config);

  const fileName = mdFilePath.split("/").pop()!.replace(/\.md$/, "");

  return {
    content: matterResult.content,
    createdAt: fileStats.birthtimeMs,
    fileName,
    openedAt: fileStats.atimeMs,
    params: matterResult.data,
    updatedAt: fileStats.ctimeMs,
    modifiedAt: fileStats.mtimeMs,
  };
};
