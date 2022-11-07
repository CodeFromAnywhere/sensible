import Layout from "@theme/Layout";
import React, { useRef, useState } from "react";
import { TwitterTweetEmbed } from "react-twitter-embed";
import { isEmail } from "sensible-core";
import { api } from "ui";
const CTA = () => {
  return (
    <div className="flex flex-row">
      <a href="/docs/about" rel="noreferrer" className="mr-4 my-10">
        <button
          className={`cursor-pointer text-white disabled:hidden transition-all duration-600 w-40 lg:w-96 bg-blue-500 hover:bg-blue-400 border-t-blue-300 border-b-blue-700 border rounded-xl p-4`}
        >
          {"Documentation"}
        </button>
      </a>

      <a
        href="https://demo.sensiblestack.com"
        target="_blank"
        rel="noreferrer"
        className="ml-4 my-10"
      >
        <button
          className={`cursor-pointer text-white disabled:hidden transition-all duration-600 w-40 lg:w-96 bg-blue-500 hover:bg-blue-400 border-t-blue-300 border-b-blue-700 border rounded-xl p-4`}
        >
          {"Demo"}
        </button>
      </a>
    </div>
  );
};

const EmailForm = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex flex-col items-center">
      {isLoading ? (
        <button type="button" className="bg-indigo-500" disabled>
          <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24"></svg>
          Processing...
        </button>
      ) : (
        <div className="flex flex-col m-4 px-2 lg:px-6 pt-6 justify-center">
          <p className="pb-4">Request a demo:</p>
          <input
            type="text"
            className="w-52 lg:w-96 border-gray-500 p-4 opacity-50 border-4 cursor-pointer rounded-lg text-black hover:text-blue-600 lg:text-3xl transition-all duration-1200"
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
  );
};
type Link = {
  path: string;
  url: string;
  alt: string;
  isSmall?: boolean;
  noFollow?: boolean;
  target?: string;
  subtitle?: string;
};

const tweets: string[] = []; //"1522222259326406657"

const renderLink = (link: Link, index: number) => {
  return (
    <a
      key={`icon${index}`}
      href={link.url}
      rel={link.noFollow ? "nofollow" : undefined}
      className={`m-2 flex flex-col items-center`}
      target={link.target}
    >
      <div
        className={`relative ${
          !link.isSmall ? "w-10 h-10 lg:w-20 lg:h-20" : "w-4 h-4 lg:w-6 lg:h-6"
        }`}
      >
        <img
          src={link.path}
          alt={link.alt}
          className="object-cover aspect-square rounded-full hover:animate-pulse"
        />
      </div>
      {link.subtitle && (
        <p className={link.isSmall ? "italic text-[0.5rem]" : "font-bold"}>
          {link.subtitle}
        </p>
      )}
    </a>
  );
};

const links: Link[] = [
  // {
  //   path: "/pasfoto.png",
  //   url: "https://twitter.com/wkarsens",
  //   alt: "Follow me",
  //   subtitle: "Twitter",
  //   isSmall: true,
  //   target: "_blank",
  // },
  // {
  //   path: "/cfa.png",
  //   url: "https://codefromanywhere.com",
  //   alt: "About us",
  //   subtitle: "About us",
  //   isSmall: true,
  //   target: "_blank",
  // },
];
const brands: Link[] = [
  // {
  //   path: "/emesa.jpeg",
  //   url: "https://emesa.nl",
  //   noFollow: true,
  //   alt: "Emesa",
  //   target: "_blank",
  // },
  // {
  //   path: "/stoic.jpeg",
  //   url: "https://stoicstrats.com",
  //   noFollow: true,
  //   alt: "Stoic Strategies",
  //   target: "_blank",
  // },
  {
    path: "/king.webp",
    url: "https://getking.co",
    alt: "King",
    target: "_blank",
  },
  {
    path: "/coworksurf.png",
    url: "https://coworksurf.com",
    alt: "Coworksurf",
    target: "_blank",
  },
  {
    path: "/reactwithnative.png",
    url: "https://reactwithnative.com",
    alt: "React with Native",
    target: "_blank",
  },
];

const Home = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <Layout noFooter>
      <div
        className={
          "bg-gradient-to-r from-blue-700 via-blue-600 to-blue-900 background-animate"
        }
      >
        <style>{`
          body {
            font-family: "Inter", sans-serif;
          }

          .background-animate {
            background-size: 400%;

            -webkit-animation: AnimationName 3s ease infinite;
            -moz-animation: AnimationName 3s ease infinite;
            animation: AnimationName 7s ease infinite;
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

        <main>
          <div
            className={
              "flex flex-col min-h-screen py-20 justify-center items-center"
            }
          >
            <div className="backdrop-blur-xl bg-white/80 min-h-[80vh] rounded-xl mx-4 py-4 lg:mx-10 flex-col flex items-center justify-center px-4 lg:px-16">
              <div className="relative w-full">
                {/* <div className="absolute top-0 -left-4 w-32 lg:w-96 h-32 lg:h-96 bg-purple-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-32 lg:w-96 h-32 lg:h-96 bg-yellow-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-32 lg:w-96 h-32 lg:h-96 bg-blue-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div> */}

                <div className="lg:m-8 relative flex flex-col">
                  <div
                    className="flex mx-4 lg:mx-12 w-full relative flex-wrap justify-end"
                    ref={contentRef}
                  >
                    {links.map(renderLink)}
                  </div>
                  <div className="flex-col lg:p-5 rounded-lg flex items-center justify-between lg:space-x-8">
                    <div className="flex-1 mb-6">
                      <h1
                        className={
                          "text-xl md:text-3xl lg:text-4xl text-center"
                        }
                      >
                        The{" "}
                        <b className="font-extrabold hover:opacity-20 opacity-100 transition-opacity ease-out cursor-pointer duration-[2000]">
                          Typescript
                        </b>{" "}
                        Framework For{" "}
                        <b className="font-extrabold">Effective</b> Teams
                      </h1>
                    </div>

                    <p className="text-center">
                      Sensible is a collection of tools, conventions and a large
                      SDK that brings together the well-known frameworks such as
                      Node.js, Expo.dev and Next.js under 1 bigger whole. By
                      clever use of Typescript and bundle techniques, we have
                      managed to share a lot of code between different frontends
                      (app, web, extensions, electron) and also the front and
                      backend. Besides this, our framework features automatic
                      documentation, a CLI to get started in no-time, a VSCode
                      extension, and much more!
                    </p>
                    <p color="red">
                      Sensible has been superseded by{" "}
                      <a href="https://typerepo.com">Typerepo</a>!
                    </p>
                  </div>
                </div>
              </div>

              <p className="py-5 text-gray-800 italic">
                Who&apos;s (using) Sensible?
              </p>

              <div
                className="flex mx-4 lg:mx-12 w-full relative flex-wrap justify-center"
                ref={contentRef}
              >
                {brands.map(renderLink)}
              </div>

              {/* <EmailForm /> */}

              <CTA />
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
            <img
              className="object-fill"
              src={"/icon.png"}
              alt="Sensible Logo"
            />
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
    </Layout>
  );
};

export default Home;
