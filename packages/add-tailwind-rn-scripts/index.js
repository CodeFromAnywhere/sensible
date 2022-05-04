#!/usr/bin/env node
import jsonFile from "json-file-plus";

const addScriptToPackage = async () => {
  const packageJson = await jsonFile("package.json");

  packageJson.set({
    scripts: {
      "build:tailwind":
        "tailwindcss --input input.css --output tailwind.css --no-autoprefixer && tailwind-rn",
      "dev:tailwindcss":
        "tailwindcss --input input.css --output tailwind.css --no-autoprefixer --watch",
      "dev:tailwindrn": "tailwind-rn --watch",
      "dev:expo": "expo start",
      dev: "npm-run-all dev:*",
    },
  });

  await packageJson.save();
};

addScriptToPackage();
