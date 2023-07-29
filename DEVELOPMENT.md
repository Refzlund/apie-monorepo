## Development
1. Test the library by running the tests:
	- `pnpm test`
1. Before committing run: linting, checking and testing suites;
	- `pnpm precommit`
1. Pull request titles should format to [Semantic Changes](./SEMANTICS.md).
1. Pull requests that changes the built product should include changeset.

#### Need to test the build in a different project?
In this monorepo, you can of course just do `"package": "workspace:*"`, but what about an existing project?

Build your project (`pnpm build`) and test it in another project by linking it to this one using [pnpm `overrides`](https://pnpm.io/package_json#pnpmoverrides):

```json
// package.json
{
	...
	"pnpm": {
		"overrides": {
			"<repo>": "link: .../local/path/to/repo"
		}
	}
}
```

<br>

### [Semantic Versioning](./SEMANTICS.md)
Using a standardized versioning will help communicate changes.

As stated in the standardization of semantic versioning (SemVer):
> Major version zero (0.y.z) is for initial development. Anything MAY change at any time. The public API SHOULD NOT be considered stable.

The pre-release of your library therefore starts at `0.1.0`.

<br>

### Branching strategy
When developing, rather than working on the main/master branch, 
work on an individual branch describing what you're implmenting.

Use dash (`-`) chained [Semantic Changes](./SEMANTICS.md) for
naming. For instance:  `feat-new-table-design`

Using the upcoming merge-strategy, by branching we can have less accurate individual commit messages.

#### Branch commits
*For a branch that will be squased:*<br>
The commit messages themselves **does not** *need* to follow the [Semantic Changes](./SEMANTICS.md).<br>
When squashing a pull request, it will use the pull requests title as a single commit message for all commits in that branch.

*For a branch will be rebased:*<br>
The commit messages **need** to follow the [Semantic Changes](./SEMANTICS.md).<br>
When rebasing, all commits of the branch will be preserved and show as if they were commited to the main branch directly.

#### Branch merge with main
When the implementation is done, use changesets to add a changelog message.

This should fit with the [Semantic Changes](./SEMANTICS.md).

Ex: 
1. `pnpm changeset add`
2. `feat: new table design`

#### When don't you need to branch/pull-request?
Changes that does not need a review process.<br>
Like documentation changes such as in `README.md`; *chore(readme): typo*.

<br>

### Pull-request
Pull requests not only de-clutters our commit tree (by squashing) — 
it gives a topdown perspective on the development using seperation of concerns.

The title should be the same as the changeset description.
The title of the pull-request should be formatted to fit [Semantic Changes](./SEMANTICS.md).

#### Before merging
Ask the creator of the pull request to [add a changeset](https://github.com/changesets/changesets/blob/main/docs/adding-a-changeset.md)
that follows [Semantic Changes](./SEMANTICS.md) with all changes for the pull request (often just 1; the pull request title).

#### When to Rebase instead of Squash
If you have a branch that lives in parallel with the master branch, and too
squashes pull requests, you can rebase to keep the git commit history.

<br>

### Releasing
When all changes for the next publication is made merge the `Version Packages`.
Changesets will auto-publish the project for you.

<br><br>
<br><br>
<br><br>