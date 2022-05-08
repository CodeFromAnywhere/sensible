import { GetStaticPathsResult, GetStaticPropsContext } from "next";
import { Markdown, findFilesRecursively } from "sensible-files";
import path from "path";
const DocPage = ({ markdown }: { markdown: Markdown }) => {
  return <div>test</div>;
};

export default DocPage;

export const removeBasePathFromPath = (basePath: string) => (path: string) => {
  return path.replace(basePath, "");
};

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

let allDocsPaths = [];

export const findRelativeMarkdownPaths = () => {
  const basePath = path.resolve("../..", "docs");

  return findFilesRecursively({
    match: (fileName, extension) => extension === "md",
    basePath,
  })
    .map((path) => path.path)
    .map(removeBasePathFromPath(basePath))
    .map((path) => path.substring(1))
    .map((path) => path.substring(0, path.lastIndexOf(".")));
};

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  allDocsPaths = findRelativeMarkdownPaths();

  const paths = allDocsPaths.map((path) => {
    return {
      params: { path: [path] },
    };
  });

  return { paths, fallback: false };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  // Pass data to the page via props

  const path = context.params?.path;

  console.log({ path });
  return {
    props: {},
    revalidate: 3600,
  };
}
