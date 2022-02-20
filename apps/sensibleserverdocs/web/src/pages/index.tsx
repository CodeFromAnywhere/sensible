import type { NextPage } from "next";
import { useRouter } from "next/router";
import useStore from "../store";
import BiWorldIcon from "../../public/BiWorld.svg";
import { Svg } from "react-with-native";
import { Layout } from "../components/Layout";
import { useTheme } from "next-themes";

const Home: NextPage = () => {
  const router = useRouter();
  const [recentSites, setRecentSites] = useStore("recentSites");
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  console.log(`isDark:${isDark}`);
  const sites = recentSites.find((x) => x.apiUrl === "http://localhost:4000")
    ? recentSites
    : recentSites.concat([
        {
          apiUrl: "http://localhost:4000",
          appName: "Localhost 4000",
          domain: "http://localhost:3000",
        },
      ]);
  return (
    <Layout>
      <div className="w-full">
        {sites.map((site, index) => {
          return (
            <div
              onClick={() => router.push(`/${encodeURIComponent(site.apiUrl)}`)}
              key={`site${index}`}
              className={`flex flex-row items-center justify-between w-full p-4 border rounded-sm hover:bg-gray-100`}
            >
              <p>
                {site.appName
                  ? `${site.appName} (${site.apiUrl})`
                  : site.apiUrl}
              </p>

              {site.domain ? (
                <p
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(site.domain, "_blank")?.focus();
                  }}
                  className="hover:bg-blueish rounded-full p-2"
                >
                  <Svg src={BiWorldIcon} className="w-8 h-8" />
                </p>
              ) : null}
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default Home;
