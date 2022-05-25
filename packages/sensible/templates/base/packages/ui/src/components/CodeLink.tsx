import ALink from "./ALink";

const CodeLink = ({ pageKey }: { pageKey: string }) => {
  const href = getCodeLocation(pageKey);
  return (
    <ALink
      href={href}
      target="_blank"
      rel="nofollow"
      className="bg-black flex items-center justify-center rounded-md w-40 p-2 hover:bg-gray-600 cursor-pointer"
      textClassName="text-white"
    >
      Check the code
    </ALink>
  );
};

export const getCodeLocation = (pageKey: string) => {
  return `https://github.com/Code-From-Anywhere/react-with-native/blob/main/packages/ui/src/pages/${pageKey}.tsx`;
};

export default CodeLink;
