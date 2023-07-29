# Semantic Versioning
Read the full documentation at [SemVer](https://semver.org/)

<br><br>
<br><br>

# Semantic Changes
[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) is a good source for semantic changes.

`<tag>(<scope>): <subject>`

```
feat: add hat wobble
┌───  ┌─────────────
│     │
│     └─► Summary in present tense.
│
└───────► Type: See table below
```

|         Type | What                                                                                     | Examples                                                                                                                     |
| ------------:| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
|     **feat** | New feature for the user                                                                 | - feat: sending confirmation email on signup<br>- feat(lang): added support for Danish                                                                                                                     |
|      **fix** | Bug fix for the user                                                                     | - fix:                                                                                                                       |
|     **docs** | Changes to the documentation                                                             | - docs: documented missing API                                                                                               |
|     **perf** | Performance optimization/enhancemnet                                                     | - perf:                                                                                                                      |
| **security** | Security enhancements                                                                    | - security: roll back to `package@1.2.3` because of vulnerability in `@^1.2.5` <br> - security: Fix to vulnerability in code |
| **refactor** | Change in production code                                                                | - refactor:                                                                                                                  |
|     **test** | Adding/refactoring tests                                                                 | - test:                                                                                                                      |
|    **chore** | - Package upgrade<br>- CI change<br>- Github Workflows<br>- etc... Management in general | - chore:<br>- chore(deps): updated `package@x.y.z` -> `package@x.y.z`                                                                                                                     |
| **BREAKING** | Anything that might break existing users code                                            | - BREAKING:                                                                                                                  |

