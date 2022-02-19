import Head from "next/head";
import DarkModeToggle from "./DarkModeToggle";

const Header = ({
  constants,
}: {
  constants: { [key: string]: any } | undefined;
}) => {
  const title = `${
    constants?.appName ? `${constants.appName} - ` : ""
  }Sensible Docs`;

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={title} />
        <link rel="icon" href="/favicon.ico" />
        <meta name="referrer" content="no-referrer-when-downgrade" />
      </Head>

      <h1 className={"text-5xl mb-4"}>{title}</h1>
      <div className="flex flex-row justify-between">
        {constants?.domain ? (
          <a
            className="p-2 mr-4 bg-gray-300 rounded-full"
            href={constants.domain}
            rel="noreferrer"
            target="_blank"
          >
            visit website
          </a>
        ) : null}

        {constants?.email ? (
          <a
            className="p-2 mr-4 bg-gray-300 rounded-full"
            href={`mailto:${constants.email}`}
            rel="noreferrer"
            target="_blank"
          >
            email
          </a>
        ) : null}

        <DarkModeToggle />
      </div>
    </div>
  );
};

export default Header;
