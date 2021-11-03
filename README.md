# git-flow-silent-release #

> Performs a `git flow release finish` without any prompts


# Installation #

```
npm install --save-dev @j-ulrich/git-flow-silent-release
```

# Usage #

```
npx git-flow-silent-release [--dry-run] [--help|-h] [--release-message|-m <release-message>]
                         <version>

Performs a `git flow release finish` without any prompts.

Positionals:
  version  The version number of the release.

Options:
      --dry-run          Just log what would happen but don't do it.                 [boolean]
  -m, --release-message  The message to be used for the release. Can contain the
                         placeholder {{version}} which is replaced with the version.
                                                           [default: "Release of {{version}}"]
  -h, --help             Show help                                                   [boolean]
```

# License #

Copyright (c) 2021 Jochen Ulrich

Licensed under [MIT license](LICENSE).