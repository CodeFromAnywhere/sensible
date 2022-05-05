import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { TwitterTweetEmbed } from "react-twitter-embed";
import { isEmail } from "sensible-core";
import { api, useStore } from "ui";

type Brand = {
  path: string;
  url: string;
  alt: string;
};

const tweets = ["1522222259326406657"];
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
    <div
      className={
        "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 background-animate"
      }
    >
      <style jsx>{`
        body {
          font-family: "Inter", sans-serif;
        }

        .background-animate {
          background-size: 400%;

          -webkit-animation: AnimationName 3s ease infinite;
          -moz-animation: AnimationName 3s ease infinite;
          animation: AnimationName 3s ease infinite;
        }

        @keyframes AnimationName {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
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
          className={
            "flex flex-col min-h-screen py-20 justify-center items-center"
          }
        >
          <div className="backdrop-blur-xl bg-white/80 min-h-[80vh] rounded-xl mx-4 py-4 lg:mx-10 flex-col flex items-center justify-center px-4 lg:px-16">
            <div className="relative w-full">
              <div className="absolute top-0 -left-4 w-32 lg:w-96 h-32 lg:h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute top-0 -right-4 w-32 lg:w-96 h-32 lg:h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-8 left-20 w-32 lg:w-96 h-32 lg:h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

              <div className="lg:m-8 relative space-y-4">
                <div className="flex-col p-5 rounded-lg flex items-center justify-between lg:space-x-8">
                  <div className="flex-1 mb-6">
                    <h1 className={"text-3xl lg:text-4xl text-center"}>
                      The{" "}
                      <b className="font-extrabold hover:opacity-20 opacity-100 transition-opacity ease-out cursor-pointer duration-[2000]">
                        Typescript
                      </b>{" "}
                      Framework For <b className="font-extrabold">Effective</b>{" "}
                      Teams
                    </h1>
                  </div>

                  <div className="flex flex-1 w-full max-w-sm lg:max-w-xl">
                    <iframe
                      width="100%"
                      src="https://www.youtube.com/embed/tL1tcWEgQNo?autoplay=1&mute=1&showinfo=0&rel=0&loop=1"
                      title="Sensible Demo"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-lg mt-5 aspect-video"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="flex mx-4 lg:mx-12 w-full relative justify-center"
              ref={contentRef}
            >
              {brands.map((brand, index) => {
                return (
                  <a
                    key={`brand${index}`}
                    href={brand.url}
                    className="relative w-10 h-10 lg:w-10 lg:h-10"
                  >
                    <Image
                      src={brand.path}
                      layout="fill"
                      alt={brand.alt}
                      className="aspect-square rounded-full hover:animate-spin"
                    />
                  </a>
                );
              })}
            </div>

            {isLoading ? (
              <button type="button" className="bg-indigo-500" disabled>
                <svg
                  className="animate-spin h-5 w-5 mr-3"
                  viewBox="0 0 24 24"
                ></svg>
                Processing...
              </button>
            ) : (
              <div className="flex flex-col m-4 px-2 lg:px-6 pt-6 justify-center">
                <p className="pb-4">Request access:</p>
                <input
                  type="text"
                  className="w-52 lg:w-96 border-gray-500 p-4 opacity-50 border-4 border-double cursor-pointer rounded-full text-black hover:text-blue-600 lg:text-3xl transition-all duration-1200"
                  value={email}
                  placeholder="Your email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            )}

            <button
              onClick={() => {
                if (isLoading) return;
                setIsLoading(true);
                api("requestAccess", "POST", { email }).then((res) => {
                  setIsLoading(false);
                  alert(res.response);
                });
              }}
              disabled={!isEmail(email) || isLoading}
              className={`disabled:hidden transition-all duration-600 w-40 lg:w-96 bg-blue-500 hover:bg-blue-400 border-black border rounded-xl p-4`}
            >
              {isLoading ? "Please wait..." : "Get it!"}
            </button>
          </div>
        </div>

        <div className="my-10 flex flex-row flex-wrap items-center justify-center">
          {tweets.map((id) => {
            return (
              <div key={`tweet${id}`}>
                <TwitterTweetEmbed
                  onLoad={function noRefCheck() {}}
                  tweetId={id}
                />
              </div>
            );
          })}
        </div>
      </main>

      <footer
        className={
          "flex justify-center items-center border-t p-2 lg:p-6 mt-20 border-gray-200 bg-white/30"
        }
      >
        <div className="relative w-6 h-6 lg:w-16 lg:h-16">
          <Image src={"/icon.png"} layout="fill" alt="Sensible Logo" />
        </div>
        <p className="pl-5 text-sm lg:text-base">
          Sensible is Powered by{" "}
          <a
            href="https://codefromanywhere.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-500 font-bold"
          >
            Code From Anywhere
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Home;
