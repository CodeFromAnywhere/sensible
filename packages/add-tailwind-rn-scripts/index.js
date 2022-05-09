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

  // could be replaced by this command
  // npx setjsonkey package.json srcipts.build:tailwind "tailwindcss --input input.css --output tailwind.css --no-autoprefixer && tailwind-rn" && npx setjsonkey package.json scripts.dev:tailwindcss "tailwindcss --input input.css --output tailwind.css --no-autoprefixer --watch" && npx setjsonkey package.json scripts.dev:tailwindrn "tailwind-rn --watch" && npx setjsonkey package.json scripts.dev "npm-run-all dev:*"

  await packageJson.save();
};

addScriptToPackage();
