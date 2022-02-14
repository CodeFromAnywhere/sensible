# Sensible Types ™

Extend your TypeScript types.

## Installation

### CLI

`yarn global add sensible-types-cli`

Watch your codebase for sensible types changes and generate readable metadata.
`sensible-types -w [path]`

### Node library

`yarn add sensible-types`

Generate metadata for all subdirectories of a path

```
import SensibleTypes from "sensible-types";
const metadata = await SensibleTypes.generate(dir);
```
