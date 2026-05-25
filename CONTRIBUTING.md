# Contributing to Homework Scheduler

Thank you for your interest in contributing to Homework Scheduler.

This document explains how to set up the project locally, follow the current code style, validate your changes, and open a clean pull request.

## Development Environment Setup

### Prerequisites
Make sure you have the following installed:

- Node.js
- npm
- MongoDB

### Local setup
1. Clone the repository:
   ```bash
   git clone https://github.com/OpenLake/Homework-Scheduler.git
   cd Homework-Scheduler


2. Install dependencies:

   ```bash
   npm install
   ```

3. Start MongoDB in a separate terminal:

   ```bash
   mongod
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the app in your browser:

   ```text
   http://localhost:3000
   ```

## Code Style and Linting

This project uses:

* ESLint with `next/core-web-vitals`
* Prettier for formatting

### Formatting conventions

Follow the existing Prettier configuration in the repository:

* use tabs
* use single quotes
* avoid parentheses for single-argument arrow functions when possible
* keep trailing commas where allowed

### Linting

Before opening a pull request, run:

```bash
npm run lint
```

## Git Workflow

### Branch naming

Use short and descriptive branch names. Preferred examples:

* `docs/add-contributing-guide`
* `fix/course-validation`
* `feat/import-deadlines`

### Commit messages

Use clear commit messages with a small and focused scope. Examples:

* `docs: add contributing guide`
* `fix: validate course form input`
* `feat: add deadline import button`

Try to avoid mixing unrelated changes in the same commit.

## Pull Request Guidelines

Please keep pull requests focused and easy to review.

### Before opening a PR

* make sure the branch is up to date with the latest main branch
* run `npm run lint`
* manually test the affected flow
* avoid unrelated refactors
* update documentation if your change affects developer workflow or usage

### PR checklist

* [ ] my change is focused on a single issue or concern
* [ ] I ran `npm run lint`
* [ ] I tested the affected feature locally
* [ ] I updated documentation if needed
* [ ] I linked the related issue in the PR description

## How to Run Tests Locally

This repository currently exposes linting through:

```bash
npm run lint
```

At the moment, there is no dedicated automated test script in `package.json`.

Because of that, contributors should also perform a short manual validation of the affected flow, such as:

* signing up or logging in
* creating or editing a course
* creating assignments
* checking the deadline-related UI

## How to Report Bugs

When opening a bug report, please include:

* a short summary of the problem
* steps to reproduce
* expected behavior
* actual behavior
* screenshots or logs if available
* browser / OS information when relevant

A well-written issue makes it much easier to reproduce and fix the problem.

## Code of Conduct

This repository does not currently appear to include a dedicated project-specific Code of Conduct file.

Until one is added, please keep all discussions respectful, constructive, and professional in issues, pull requests, and review comments, and follow GitHub’s community expectations.

## Need Help?

If anything is unclear, feel free to open an issue and ask for clarification before starting a larger change.
