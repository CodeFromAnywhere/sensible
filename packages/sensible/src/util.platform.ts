export const getPlatformId = (platformVariable: string) => {
  switch (platformVariable) {
    case "darwin":
      //its macos
      return platformIds.macOS;
    case "linux":
      return platformIds.linux;
    case "win32":
      return platformIds.windows;
    default:
      //default is mac
      return platformIds.macOS;
  }
};
//Platforms
export const platformIds = {
  macOS: 0,
  windows: 1,
  linux: 2,
};

export const platformNames = {
  [platformIds.macOS]: "MacOS",
  [platformIds.windows]: "Windows",
  [platformIds.linux]: "Linux",
};
