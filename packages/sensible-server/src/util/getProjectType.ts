import { PackageInfo, ProjectType } from "sensible-core";

export const getAllPackageJsonDependencies = (p: PackageInfo): string[] => {
  const dependencies = p.dependencies ? Object.keys(p.dependencies) : [];
  const devDependencies = p.devDependencies
    ? Object.keys(p.devDependencies)
    : [];
  const peerDependencies = p.peerDependencies
    ? Object.keys(p.peerDependencies)
    : [];

  return [...dependencies, ...devDependencies, ...peerDependencies];
};

export const hasDependency = (packageJson: PackageInfo, dependency: string) => {
  return getAllPackageJsonDependencies(packageJson).includes(dependency);
};

export const getProjectType = (packageJson: any): ProjectType => {
  const hasNext = hasDependency(packageJson, "next");
  const hasExpo = hasDependency(packageJson, "expo");
  const hasReactNative = hasDependency(packageJson, "react-native");
  const hasReact = hasDependency(packageJson, "react");
  const hasExpress = hasDependency(packageJson, "express");
  const hasServer = hasDependency(packageJson, "server");

  return hasNext
    ? "next"
    : hasExpo || hasReactNative
    ? "react-native"
    : hasReact
    ? "react"
    : hasExpress
    ? "express"
    : hasServer
    ? "server"
    : "unknown";
};
