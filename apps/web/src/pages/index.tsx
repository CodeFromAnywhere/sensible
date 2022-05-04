import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import TextInput from "react-with-native-text-input";
import { isEmail } from "sensible-core";
import { api, useStore } from "ui";

type Brand = {
  path: string;
  url: string;
  alt: string;
};

const brands: Brand[] = [
  {
    path: "/icon.png",
    url: "https://github.com/Code-From-Anywhere/sensible",
    alt: "Sensible",
  },

  {
    path: "/pasfoto.png",
    url: "https://karsens.com",
    alt: "My site",
  },

  {
    path: "/cfa.png",
    url: "https://codefromanywhere.com",
    alt: "Go to GitHub",
  },

  {
    path: "/github.png",
    url: "https://codefromanywhere.com",
    alt: "Go to GitHub",
  },
];

const Home: NextPage = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useStore("email");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    // setTimeout(() => {
    //   // window.scrollTo({ behavior: "smooth", top: 1000 });
    //   contentRef.current?.scrollIntoView({
    //     behavior: "smooth",
    //     block: "start",
    //     inline: "end",
    //   });
    // }, 5000);
  }, []);

  return (
    <div className={"bg-slate-100"}>
      <Head>
        <title>Sensible - The Full Stack Typescript Framework</title>
        <meta
          name="description"
          content="Sensible - The Full Stack Typescript Framework"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div
          className={"flex flex-col min-h-screen justify-center items-center"}
        >
          <div className="backdrop-blur-xl bg-black/30 h-full rounded-xl mx-10 flex-col flex items-center justify-center px-4 lg:px-16">
            <div className="relative w-full">
              <div className="absolute top-0 -left-4 w-32 lg:w-96 h-32 lg:h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute top-0 -right-4 w-32 lg:w-96 h-32 lg:h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-8 left-20 w-32 lg:w-96 h-32 lg:h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
              <div className="m-8 relative space-y-4">
                <div className="flex-col p-5 rounded-lg flex items-center justify-between space-x-8">
                  <div className="flex-1">
                    <h1 className={"text-xl lg:text-8xl text-center"}>
                      The{" "}
                      <b className="font-extrabold hover:opacity-20 opacity-100 transition-opacity ease-out cursor-pointer duration-[2000]">
                        Typescript
                      </b>{" "}
                      Framework For <b className="font-extrabold">Effective</b>{" "}
                      Teams
                    </h1>
                  </div>
                  <div>
                    <p className={"font-thin "}>yarn create sensible-app</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex mx-4 lg:mx-12" ref={contentRef}>
              {brands.map((brand, index) => {
                return (
                  <a key={`brand${index}`} href={brand.url}>
                    <Image
                      src={brand.path}
                      width={150}
                      height={150}
                      alt={brand.alt}
                      className="rounded-full hover:animate-spin"
                    />
                  </a>
                );
              })}
            </div>

            <div className="m-4 h-52 p-6 flex items-center justify-center">
              <input
                type="text"
                className=" border-gray-500 p-4 opacity-50 border-4 border-double cursor-pointer rounded-full text-black hover:text-blue-600 hover:p-6 lg:text-3xl transition-all duration-1200"
                value={email}
                placeholder="Your email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              onClick={() => {
                if (isLoading) return;
                setIsLoading(true);
                api("requestAccess", "POST", { email }).then((res) => {
                  setIsLoading(false);
                  alert(res.response);
                });
              }}
              disabled={isLoading}
              className={`disabled:bg-gray-400 mb-12 transition-all duration-600 w-40 lg:w-96 bg-blue-500 hover:bg-blue-400 border-black border-double border-4 hover:border-8 rounded-xl p-4 ${
                isEmail(email) ? "opacity-100" : "opacity-0"
              }`}
            >
              {isLoading ? "Please wait..." : "Get it!"}
            </button>
          </div>
        </div>

        <div className="text-center">
          {Array(100)
            .fill(0)
            .map((x, i) => {
              return (
                <p key={`k${i}`}>
                  {i % 2 === 0
                    ? "we're developing an elegant framework"
                    : "we're making amazing apps ourselves"}
                </p>
              );
            })}
        </div>
      </main>

      <footer
        className={
          "flex  justify-center items-center border-t py-6 mt-20 border-black"
        }
      >
        <Image src={"/icon.png"} width={50} height={50} alt="Sensible Logo" />
        <p style={{ marginLeft: 20 }}>
          Sensible is Powered by{" "}
          <a
            href="https://codefromanywhere.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Code From Anywhere
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Home;
