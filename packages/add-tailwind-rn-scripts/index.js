#!/usr/bin/env node
import jsonFile from "json-file-plus";

const addScriptToPackage = async () => {
  const packageJson = await jsonFile("package.json");

  packageJson.set({
    scripts: {
      "build:tailwind":
        "tailwindcss --input input.css --output tailwind.css --no-autoprefixer && tailwind-rn",
      "dev:tailwind":
        'concurrently "tailwindcss --input input.css --output tailwind.css --no-autoprefixer --watch" "tailwind-rn --watch"',
    },
  });

  await packageJson.save();
};

addScriptToPackage();
