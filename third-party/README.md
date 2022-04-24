In this folder you can add any repositories with packages that are actively being developed (by you) and are being used as dependencies in your apps and/or packages.

For example, if you want to add all react-with-native packages, just do the following:

1. clone react-with-native in the `third-party` folder, like so: `git clone https://github.com/Code-From-Anywhere/react-with-native.git`
2. add the correct folder to your workspaces in the root `package.json`. In this case, this would be the new `workspaces`:

```
  "workspaces": [
    "apps/*",
    "packages/*",
    "third-party/react-with-native/packages/*"
  ],
```

The advantage of using this folder is that:

- the repositories in here will be ignored and not added to your repo.
- the sensible command `npx sensible-cli pull` will pull all repo's in this folder as well as your own repository using `git pull`
