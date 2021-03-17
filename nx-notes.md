Workshop from isaac@nrwl.io and jason@nrwl.io 

Questions? [Join nrwl community](https://nx.dev/nx-community)

# General Tips

## Architecture Diagram
`nx dep-graph`
- can be a sanity check to make sure app is architected properly

## Vscode & IntelliJ(?) Plugin
[nx-console](https://nx.dev/latest/angular/getting-started/console)
- helpful to see options for generate, run, build, serve, test, etc.

## Easing in to New Framework
- don't need to know details of nest (or any other frmework) config, can create stuff with nx plugin and then get straight to playing with it without setting up configs

## Java & Javascript Together

See [this github repo](https://github.com/FrozenPandaz/nx-examples/commit/cc91f5f89a1b89c0ac33c9ba3984ba7dc5046fd5) for a preliminary example

## Undoing nx generate
- use `--dryRun` or `-d` flag for dry runs first
- have a clean git working en before doing any nx generate commands so you can just wipe changed files

## Test Coverage
- change in one library in a monorepo could easily break others 
  - tests within the monorepo will catch that if dependencies are properly laid out
  - if there are no tests, nx can't help here
  - nx is most useful when there is decent test coverage


# Day One

- monorepo: git repo with mlutiple apps in the same repo


## Benefits: 

1. Atomic changes
    - changing some repo when another depends on it can cause problems
    - nx UI library example, feedback loops gets way less if the person updating a UI library sees failed tests as they are updating their library

2. Shared code
    - library code, easier to use in monorepo, just import

3. Single set of dependencies
    - main applications vs. stale-er applications
    - less maintained ones won't get their dependencies updated
    - all applications versions can upgrade angular version at same time for example


## Drawbacks / Costs (without ):

Code co-location = term for monorepo without tooling like nx

1. Running unnecessary tests
    - if tooling doesn't know about library dependencies, all tests will have to run all tests when unnecessary

2. No code boundaries
    - anybody in org can use any code, or else you will break other teams app

3. Inconsistent tooling
    - many flags being added, different apps with different ways of running, testing, run vs serve, etc.

## How does nx help?
- faster, using builders
- nx affected
- local and distributed caching

- controlled code sharing
- feature typed libraries (UI vs data libraries)
- publishable libraries

- consistent coding practices
- linting, schematics (ex. run this generator, and it will make all code changes necessary when making a new app)

- workspace.json === angular.json
  - nx.json: tags, manual dependencies

- global tsconfig & project level tsconfig
  - project level ones extend the global tsconfig (same for jest)


- `npx create-nx-workspace [workspace-name]`
- workspace name sets three things:
  - something...?
  - directory
  - npm path alias `@my-org`


## Plugins
- provided by nrwl or 3rd party community members
- `nx list` shows all available plugins
- `yarn add [plugin]`
  - ex. `yarn add @nrwl/nest`

## Schematics & Workspace Generators
- organizations usually have standards for how to create a new app, how to lay out files, etc.
- steps like these in a Readme can instead be encoded in a workspace generator

- `nx generate [plugin]:[schematic] [options]`
  - ex. `nx g @nrwl/angular:app my-app`

## Builders & Executors
- executors are builders built with the angular cli
- defined in workspace.json (angular.json)
- builders run commands on our code (things that do not get committed)
  - ex. build, serve, lint, test (different than generators)

- to run, `nx run [project]:[target] [options]`
  - ex. `nx run my-app:serve`

- common targets (ie. can't use custom executors without run):
  - `nx serve my-app`


## Libraries

- libraries are the main unit of work in nx repos
  - granularity / code boundaries are at library level

### Recommended Tagging Distinctions / Naming

- `scope:[app-name]`
  - per app
  
- `type:[type-name]`
  - each category can only depend on one from the same level or below
  - recommended to use linting rules to enforce this:

```
        "@nrwl/nx/enforce-module-boundaries": [
          "error",
          {
            "enforceBuildableLibDependency": true,
            "allow": [],
            "depConstraints": [
              {
                "sourceTag": "scope:app-name",
                "onlyDependOnLibsWithTags": [
                  "scope:app-name",
                  "scope:shared"
                ]
              },
              {
                "sourceTag": "type:feature",
                "onlyDependOnLibsWithTags": [
                  "type:feature",
                  "type:ui",
                  "type:util"
                ]
              },
              {
                "sourceTag": "type:ui",
                "onlyDependOnLibsWithTags": [
                  "type:ui",
                  "type:util"
                ]
              },
              {
                "sourceTag": "type:util",
                "onlyDependOnLibsWithTags": [
                  "type:util"
                ]
              }
            ]
          }
        ]
```
  
  ### Suggested `type:[type-name]` tags

1. feature
    - ex. `feat-home`
    - can depend on other feature, ui, data, util libs

2. ui
    - ex. `ui-input-forms`
    - buttons, text field, layouts, reusable, no network calls / interaction
    - can depend on ui, data, util libs

3. data
    - ex. `data-access-authentication`
    - can depend on data, util libs

4. util
    - ex. `util-validation-fns`
    - pure functions, types, can only depend on other util libs
  
- directory structure
  - folder for each application in libs/ folder (ie. libs/store/...)

```
bg-hoard
│
└───apps
│   │
│   └───store
│   |   │   ...
│   │
│   └───api
│       │   ...
│   
└───libs
    │
    └───store
    |   │   
    |   └───feature-game-detail
    |   |   │   ...
    |   |
    |   └───ui-shared
    |   |   │   ...
    |   |
    |   └───util-formatters
    |       │   ...
    │
    └───api
    |   │   
    |   └───util-notifications
    |       │   ...
    │
    └───util-interface
        │   ...
```


### When to split code in to libraries?
- if you have one giant library, nx caching / speed-ups will not be used to their full capability
- if one library is doing too many things
- if different library wants to use part of your code, but not all of it


- nx recommendation is to put as much code in to libraries as reasonably possible (libraries are the unit in nx)
  - at some point in future we could re-use code in a different application

- ex. in typical nx app:
  - each route will be own feature library
  - `/home`
  - `/games`

# Day 2

- implicit dependencies: "workspace.json": "*" = all projects are affected if this file changes

- tags can be any strings (scope:app and type:type are two main ones that are common)


## Workspace Generators

- can import other generators, then can apply different options to them

- each organization has their own best practices, best way to maintain them is to automate them


## `nx affected`

- great for CI to only run relevant changes (test, build, lint, e2e, etc)


## nx cloud

- distributed caching can give massive speedup
