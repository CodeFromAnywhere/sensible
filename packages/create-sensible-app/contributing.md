When developing the CLI, make sure you run `yarn dev` in the package folder.
Besides, it can also be handy to add something like this to your `~/.zshrc`:

```
sense () { node ~/path/to/sensible/packages/create-sensible-app/build/index.js $@ }
```

This will make it easy to test the cli from anywhere while making changes.