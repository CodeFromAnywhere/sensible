"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectType = exports.hasDependency = exports.getAllPackageJsonDependencies = void 0;
const getAllPackageJsonDependencies = (p) => {
    const dependencies = p.dependencies ? Object.keys(p.dependencies) : [];
    const devDependencies = p.devDependencies
        ? Object.keys(p.devDependencies)
        : [];
    const peerDependencies = p.peerDependencies
        ? Object.keys(p.peerDependencies)
        : [];
    return [...dependencies, ...devDependencies, ...peerDependencies];
};
exports.getAllPackageJsonDependencies = getAllPackageJsonDependencies;
const hasDependency = (packageJson, dependency) => {
    return (0, exports.getAllPackageJsonDependencies)(packageJson).includes(dependency);
};
exports.hasDependency = hasDependency;
const getProjectType = (packageJson) => {
    const hasNext = (0, exports.hasDependency)(packageJson, "next");
    const hasExpo = (0, exports.hasDependency)(packageJson, "expo");
    const hasReactNative = (0, exports.hasDependency)(packageJson, "react-native");
    const hasReact = (0, exports.hasDependency)(packageJson, "react");
    const hasExpress = (0, exports.hasDependency)(packageJson, "express");
    const hasServer = (0, exports.hasDependency)(packageJson, "server");
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
exports.getProjectType = getProjectType;
//# sourceMappingURL=getProjectType.js.map