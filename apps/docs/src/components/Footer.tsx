export const Footer = () => {
  return (
    <footer className={"flex h-full items-center"}>
      <a
        href="https://codefromanywhere.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by Code From Anywhere
      </a>
      <span className="animate-spin-slow cursor-pointer hover:animate-spin text-3xl ml-4">
        🌍
      </span>
    </footer>
  );
};
