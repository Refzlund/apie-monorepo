<h1 align="center">
	<img width="200" src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExejJqNHBzcGtzdDVwcGRqNnh3amtiemo1ZTNzcjR1ZDM1NXRxcWcybyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/MkPxngsLd9yAZgQEWk/giphy.gif">
	<br>
	Giraffe🦒
	<br>
</h1>
<h4 align="center">A template to quickly<span title="build & deploy"> 📦 </span>any typescript library/project using high industry standards!</h4>

<p align="center">
  <a href="#get-started">Get Started</a>  • 
<a href="./SEMANTICS.md">Semantic Versioning</a>  • 
  <a href="./DEVELOPMENT.md">Development</a>
</p>

<div align="center">
<table>
	<tr>
		<th colspan="2"><h4 align="center">Toolchain</h4></th>
	</tr>
	<tr>
		<td align="right"><b>pnpm</b></td>
		<td align="left">package manager</td>
	</tr>
	<tr>
		<td align="right"><b>TypeScript</b></td>
		<td align="left">language</td>
	</tr>
	<tr>
		<td align="right"><b>ESLint</b></td>
		<td align="left">linter</td>
	</tr>
	<tr>
		<td align="right"><b>Vite</b></td>
		<td align="left">build tool</td>
	</tr>
	<tr>
		<td align="right"><b>Vitest</b></td>
		<td align="left">unit testing</td>
	</tr>
	<tr>
		<td align="right"><b>Changesets</b></td>
		<td align="left">changelog</td>
	</tr>
	<tr>
		<td align="right"><b>Renovate</b></td>
		<td align="left">package upgrading</td>
	</tr>
</table>
</div>

<br>

#### Who is this for?
<section>
	Those who are planning to
	<ul>
		<li>create a scalable project using <a href="https://github.com/vitejs/vite/tree/main/packages/create-vite">Vite</a></li>
		<li>build any library using typescript</li>
	</ul>
</section>

<br>

#### Standardizations

- Continous Integration
- [Semantic Versioning](https://github.com/Refzlund/giraffe-template/blob/main/SEMANTICS.md#semantic-versioning)
- [Conventional Messages](https://github.com/Refzlund/giraffe-template/blob/main/SEMANTICS.md#semantic-changes)
- [Pull Request -> Squash & Merge](https://github.com/Refzlund/giraffe-template/blob/main/DEVELOPMENT.md#pull-request)
- Changesets: [Changelogs](https://github.com/Refzlund/giraffe-template/blob/main/DEVELOPMENT.md#before-merging) and [auto-publishing](https://github.com/Refzlund/giraffe-template/blob/main/.github/workflows/publish.yml)
- Linting, testing, typechecking




<br>

#### FAQ

<blockquote>
<details><summary><b>Q: Why a Monorepo?</b></summary>
	<p>
		This template seperates concerns. We can have a demo and/or documentation website live in `apps/*` — but we also seperate the toolchain. The package will only contain dependencies that's relevant to the package.
	</p>
	<p>
		The template can both be used for a small library, or a large project making it versatile. So, as long you are working in node.js, this template will suit you perfectly.
	</p>
</details>
</blockquote>

<blockquote>
<details><summary><b>Q: Giraffe?</b></summary>
	<p>
		Giraffes are a symbol of adaptation. With their long necks,
		they reach new heights, see things from a different perspective,
		and look for solutions in places you otherwise wouldn't.
		Their height makes them alert, allowing them to see trouble from far away.
	</p>
	<p>
		Let us aspire to be like giraffes in a demanding market,
		creating robust, scalable and maintainable solutions.
	</p>
</details>
</blockquote>

<br><br>

## Get Started

<div align="center">
	Clone project to the current folder 
	<h4><code>npx degit refzlund/giraffe</code></h4>
</div>


### Create your repository
- Initialize a new git repository
- Commit & push to your new repository

<br>

### Configure repository
- Auto-publishing:
	- Provide a repository secret:  `NPM_TOKEN`,  for auto-publishing via github workflows<br>
	`https://github.com/<owner/repo>/settings/secrets/actions`
	- Uncomment action at `.github/workflows/publish.yml`
- Activate [renovate](https://github.com/settings/installations/39337889) and [changesets](https://github.com/settings/installations/39340984) for your repository
- Change Pull Requests to **only allow** `Squash: Default to pull request title`<br>
`https://github.com/<owner/repo>/settings#merge-button-settings`
- Create branch protection at<br> `https://github.com/<owner/repo>/settings/branch_protection_rules/new`<br>and enable:
	- Require a pull request before merging
		- Untick 'Require approvals'
	- Require status checks to pass before merging
		- Add [`test`](https://github.com/Refzlund/giraffe/blob/main/.github/workflows/main.yml#L9) to the list of required status checks
	- Allow force pushes
		- Specify who can force push <sup>*will allow administrators automatically</sup>
- Allow workflow **Read and write permissions**<br>`https://github.com/<owner/repo>/settings/actions`
	- Below ^, tick on '**Allow GitHub Actions to create and approve pull requests**'

<br>

### Create branch
Let's set a good first example, and create a branch for configurating our project.

We will push changes one by one into our new branch.

Create a branch following [Semantic Changes](./SEMANTICS.md):  `chore-configurating-initial-project`

<br>

### Configure your library
- Find & Replace `<repo>` with your repository
	- Example: `<repo>` -> `x-classes`
- Find & Replace `<repo/owner>` with your owner/repository
	- Example: `<owner/repo>` -> `refzlund/x-classes`
- Rename `packages/template` to `<repo>`, ex. -> `packages/x-classes`
- Configure your `packages/<repo>/package.json`
- Define your **monorepo** *README*
- Define your **library package** *README*

<br>

### Changelog!
Great! We've configured our project. Let's create our first patch release using changeset.

- Create changeset: 
	1. `npx changeset`
	1. Select your package using <kbd>space</kbd>, <kbd>enter</kbd> to continue
	1. No major changes
	1. No minor changes
	1. Patch — `chore: configurating initial project`
- Push your changes
- Create pull request on the main branch for `chore-configurating-initial-project`
	- Title: `chore: configurating initial project`
- ***Squash & Merge changes***

When you're ready to publish a new release, merge the incoming "Version Packages"-pull request by changesets.

<br>

Congratsulations! You're a natural🚀🎉


<br><br>

## Development
See [Development](./DEVELOPMENT.md)

<br>

### Community tips & tricks
> **Note** Pull requests and issues to this repository are more than welcome🦒

- [Shield.io](https://shields.io/): Spice up your README.md using badges
	- [GitHub Release badge](https://shields.io/badges/git-hub-release-with-filter)
- Paths in `tsconfig.json` allows you to [import aliases](https://www.npmjs.com/package/vite-tsconfig-paths)
- Complex projects can use Docker containers to make setting up a project take 5 minutes instead of 5 hours
- Cache your project using [Turbo Monorepo](https://turbo.build/repo/docs/getting-started/existing-monorepo) and [Caching it via GitHub Actions](https://github.com/dtinth/setup-github-actions-caching-for-turbo)

#### VSCode Extensions
- [Toggle Excluded Files](https://marketplace.visualstudio.com/items?itemName=amodio.toggle-excluded-files): Hide unnecessary config files
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint): Integrates ESLint into VS Code
- [Vitest Runner](https://marketplace.visualstudio.com/items?itemName=kingwl.vscode-vitest-runner): Run your Vitests with a single click
	- It launches the terminal. <br>
	After — press arrow up — replace `vitest run ...` with `vitest watch ...`, and it will run the tests when the files change.
- [Console Ninja](https://marketplace.visualstudio.com/items?itemName=WallabyJs.console-ninja): Outputs console logs in your IDE — immensly helpful debugging tool 

<br>

### Get Inspired
Here are some repositories that follow similar structure:

- [sveltejs/kit](https://github.com/sveltejs/kit)



<br><br>
<br><br>
<br><br>
<br><br>
<br><br>
