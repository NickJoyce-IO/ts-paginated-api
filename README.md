# paginated-api

Version 0.1.0. Work through the Steps below in order: each one is a small set of failing tests you make pass.

## Getting started

You need Node 24 and npm (see `.nvmrc`). If your local setup gives you trouble, open this repository in its devcontainer instead.

```sh
npm install
npm test
```

`npm test` runs the Steps in order and stops at the first one that fails: your Current Step. Steps after it are locked until it passes, but you can read their instructions and tests whenever you like.

## Steps

- [Step 0: Protect main](steps/00-protect-main/README.md)
- [Step 1: Fetch a page of repositories](steps/01-fetch-a-page/README.md)
- [Step 2: Parse a repository](steps/02-parse-a-repository/README.md)
- [Step 3: Find the next page](steps/03-find-the-next-page/README.md)
- [Step 4: Read every page](steps/04-read-every-page/README.md)
- [Step 5: Run it from the terminal](steps/05-run-it/README.md)

## Where things live

- `src/`: your code. This is the only place you edit.
- `steps/<step>/`: each Step's instructions, Hints and tests.
- `fieldwork.json`: this Project's version and its list of Steps.
- `.fieldwork/`: the commands behind `npm test`.

## Workflow: one Step, by hand

Once Step 0 has protected `main`, every change reaches it the way it would on a team: on a branch, through a pull request, once the Fieldwork check has passed. Do it by hand, one command at a time, for every Step until it feels routine.

### 1. Start a branch

Start from an up-to-date `main`, then make a branch named after the Step you're starting, here Step 1:

```sh
git switch main
git pull
git switch -c step-1
```

`git switch -c` creates the branch and moves you onto it. `git status` shows which branch you are on.

### 2. Make the Step pass

Edit the files in `src/` and run `npm test` until the Step passes. Commit as you go, whenever you reach a point worth keeping:

```sh
git status
git add src/
git commit -m "Describe what this commit does"
```

`git status` shows what you changed, `git add` chooses what goes into the next commit, and `git commit` records it with a message saying what it does. `git log --oneline` lists your commits.

### 3. Push the branch

```sh
git push -u origin step-1
```

This sends your branch to GitHub. `-u` remembers where it goes, so next time on this branch a plain `git push` is enough.

### 4. Open a pull request

Open your repository on GitHub. A banner offers your newly pushed branch: choose **Compare & pull request**. Check that **base** is `main` and **compare** is your branch, give the pull request a title saying what it does, and choose **Create pull request**. If the banner has gone, choose **Pull requests**, then **New pull request**, and pick your branch.

The **Fieldwork Steps** check runs on it. Its summary (open **Details** beside the check) shows which Steps the pull request passes. The check passes even while your Current Step is unfinished: it fails only when the Steps could not run at all.

### 5. Merge

When the check has passed, choose **Merge pull request**, then **Confirm merge**. GitHub offers to delete the branch afterwards: you can, as everything on it is now in `main`. Every Step that passes on `main` is now a Completed Step, and the pinned Progress issue shows it.

### 6. Bring main up to date

The merge happened on GitHub, so your own `main` doesn't have it yet:

```sh
git switch main
git pull
git branch -d step-1
```

`git pull` brings in the merge, and `git branch -d` deletes your local copy of the merged branch. You're ready to start the next Step at 1.

One pull request can cover several Steps. Once the workflow feels familiar, do two or three Steps on one branch before opening it.

## Updates

This Project gets fixes and new Steps over time. To check for a newer version (this needs the GitHub CLI, logged in with `gh auth login`):

```sh
npm run update
```

If there is one, it opens a pull request in this repository that brings it in, listing the Steps it adds, changes and removes. Review it and merge it like any other. It never changes your code in `src/`, and Steps you have completed still pass afterwards.

A major update may change Steps you have completed, so it is only made when you ask for it: `npm run update` tells you what it contains, and `npm run update -- --major` takes it.
