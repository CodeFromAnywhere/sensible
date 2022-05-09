import { log } from "./util.log";
import { spawn } from "child_process";

type OSOrDefault = NodeJS.Platform | "default";

type CommandPerOs = {
  [key in OSOrDefault]?: string;
};

const os = process.platform;

type CommandPerOSOrCommandString = CommandPerOs | string;

export type Command = {
  command?: CommandPerOSOrCommandString;
  nodeFunction?: (resolve: () => void) => void;
  description: string;
  isDisabled?: boolean;
};

const DEBUG_COMMANDS = false;

export const isCommandPerOs = (
  command: CommandPerOSOrCommandString
): command is CommandPerOs => {
  if (typeof command === "object") {
    return true;
  }
  return false;
};

export const getCommand = (command: Command): string | false => {
  if (!command.command) {
    return false;
  }

  if (isCommandPerOs(command.command)) {
    const cmd = command.command[os] || command.command.default!;
    return cmd;
  }
  return command.command;
};

export const executeCommand = (
  command: Command,
  dir: string,
  debug?: boolean
) => {
  // if command is disabled, immediately resolve so it is skippped.
  if (command.isDisabled) {
    return new Promise<void>((resolve) => {
      resolve();
    });
  }
  //tell the user what is happening, with a dot every second
  process.stdout.write(command.description);
  const interval = setInterval(() => process.stdout.write("."), 1000);

  return new Promise<void>((resolve) => {
    const messages: string[] = [];

    const onFinish = ({ success }: { success: boolean }) => {
      //once done, clear the console
      console.clear();
      clearInterval(interval);
      if (success) {
        resolve();
      }
    };

    if (DEBUG_COMMANDS) {
      log(`${Date.toString()}: extecuted ${command} in ${dir}`);
      resolve();
    } else if (command.command) {
      const commandString = getCommand(command);

      if (!commandString) {
        onFinish({ success: true });
        return;
      }

      spawn(commandString, {
        stdio: debug ? "inherit" : "ignore",
        shell: true,
        cwd: dir,
      })
        .on("exit", (code) => {
          const CODE_SUCCESSFUL = 0;
          const ALLOWED_ERRORS = [];
          if (
            typeof command.command === "string" &&
            command.command.includes("robocopy")
          ) {
            //with robocopy, errors 1, 2 and 4 are not really errors;
            ALLOWED_ERRORS.push(1, 2, 4);
          }
          if (
            typeof command.command === "string" &&
            command.command.includes("rmdir")
          ) {
            //rmdir outputs 2 when it doesn't find the folder to delete
            ALLOWED_ERRORS.push(2);
          }
          if (
            code === CODE_SUCCESSFUL ||
            (code && ALLOWED_ERRORS.includes(code))
          ) {
            onFinish({ success: true });
          } else {
            onFinish({ success: false });
            log(messages.join("\n"));

            log(
              `The following command failed: "${command.command} (code ${code})"`
            );
            process.exit(1);
          }
        })
        //save all output so it can be printed on an error
        .on("message", (message) => {
          messages.push(message.toString());
        })
        .on("error", (err) => {
          onFinish({ success: false });
          log(messages.join("\n"));
          log(`The following command failed: "${command.command}": "${err}"`);
          process.exit(1);
        });
    } else if (command.nodeFunction) {
      command.nodeFunction(() => {
        onFinish({ success: true });
      });
    } else {
      onFinish({ success: true });
    }
  });
};
