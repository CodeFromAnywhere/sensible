import Layout from "@theme/Layout";
import React, { useRef, useState } from "react";
import { TwitterTweetEmbed } from "react-twitter-embed";
const CTA = () => {
  return (
    <a href="/docs/about" rel="noreferrer" className="my-10">
      <button
        className={`cursor-pointer text-white disabled:hidden transition-all duration-600 w-40 lg:w-96 bg-blue-500 hover:bg-blue-400 border-t-blue-300 border-b-blue-700 border rounded-xl p-4`}
      >
        {"Read the docs"}
      </button>
    </a>
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

const links: Link[] = [];

const Home = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <Layout noFooter>
      <div
        className={
          "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 background-animate"
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

        <main>Hello world</main>

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
            These Docs are powered by{" "}
            <a
              href="https://sensiblestack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-500 font-bold"
            >
              Sensible
            </a>{" "}
            and{" "}
            <a
              href="https://docusaurus.io"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-500 font-bold"
            >
              Docusaurus
            </a>
          </p>
        </footer>
      </div>
    </Layout>
  );
};

export default Home;
