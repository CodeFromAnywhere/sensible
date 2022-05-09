import path from "path";
import { spawn } from "child_process";
import fs from "fs";
import { log } from "./util.log";
import { askOk } from "./util.userinput";
import { executeCommand } from "./util.commands";

const getVersionParts = (versionString: string) => {
  const [major, minor, patch] = versionString.split(".").map(Number);
  return { major, minor, patch };
};

const getPackageVersions = async (
  name: string
): Promise<{ latest: string; current: string } | undefined> => {
  const latest = spawn(`npm show ${name} version`, {
    // stdio: "inherit",
    shell: true,
    cwd: process.cwd(),
  });

  const packageDir = path.resolve(__dirname, "..");

  const current: string = JSON.parse(
    fs.readFileSync(path.resolve(packageDir, "package.json"), "utf8")
  ).version;

  return new Promise((resolve, reject) => {
    // You can also use a variable to save the output
    // for when the script closes later
    let latestVersion = "";

    latest.stdout.setEncoding("utf8");
    latest.stdout.on("data", function (data) {
      latestVersion += data;
    });
    latest.on("close", function (code) {
      //Here you can get the exit code of the script
      if (code === 0) {
        resolve({ latest: latestVersion, current });
      } else {
        reject();
      }
    });
  });
};

const getUpdateSeverity = async ({
  latest,
  current,
}: {
  latest: string;
  current: string;
}) => {
  const latestParts = getVersionParts(latest);
  const currentParts = getVersionParts(current);

  if (latestParts.major > currentParts.major) return "major";
  if (latestParts.minor > currentParts.minor) return "minor";
  if (latestParts.patch > currentParts.patch) return "patch";
  return false;
};

export const handleVersionUpdates = async (
  name: string,
  targetDir: string,
  isDebug?: boolean
) => {
  const versions = await getPackageVersions(name);
  if (!versions) {
    return log("Couldn't check your version, be warned", "FgRed");
  }

  const updateSeverity = await getUpdateSeverity(versions);

  if (!updateSeverity) return;

  if (updateSeverity === "patch") {
    return log(
      `There's a new version of sensible with version ${versions.latest}. You are now on version ${versions.current}.`,
      "FgYellow"
    );
  }

  const shouldUpdate = await askOk(
    `Theres a new ${updateSeverity} version available for ${name} (${versions.latest}). You're now on version ${versions.current}. Shall we update? yes/no`
  );

  if (shouldUpdate) {
    await executeCommand(
      {
        description: `Updating ${name}`,
        command: `npm install --global ${name}@latest`,
      },
      targetDir,
      isDebug
    );

    return process.exit(0);
  }

  return log(
    `Continuing on an older ${updateSeverity} version. Probably mostly harmless.`,
    "FgGreen"
  );
};
