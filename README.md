# TypeScript Auto-Setup Script

[![TypeScript](https://img.shields.io/badge/TypeScript%20ESNext-blue?logo=typescript&style=flat&logoColor=black)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-green?logo=node.js&style=flat&logoColor=black)](https://nodejs.org/)
[![npm](https://img.shields.io/badge/npm-red?logo=npm&style=flat&logoColor=black)](https://www.npmjs.com/)

This repository contains a **TypeScript project auto-setup script**. It creates a ready-to-use TypeScript environment with pre-configured `tsconfig.json`, `package.json` scripts, and a starter file — and self-destructs after use.

---

## Features

- Initializes a `package.json` if missing.
- Installs TypeScript, `tsx`, and Node types as dev dependencies.
- Generates a `tsconfig.json` with customizable options:
  - `target` (default: `esnext`)
  - `module` (default: `NodeNext`)
  - `moduleResolution` (default: `NodeNext`)
  - `rootDir` (default: `src`)
  - `outDir` (default: `dist`)
  - `strict` mode toggle
- Sets up starter `index.ts` file to check for functionality.
- Adds useful npm scripts:
  - `npm run dev` → Runs `.ts` files directly in watch mode.
  - `npm run run` → Compiles `.ts` files and executes output.
  - `npm run build` → Builds project for production.
- **self-destruct**: automatically deletes the setup folder after a few seconds.

---

## Usage

1. Clone or copy the setup script into your project folder:

```bash
git clone https://github.com/nishuR31/ts
cd ts
```

2. Run the script with Node 18+:

```bash
npm start
```

3. Answer the prompts for your TypeScript configuration:

```
Target (default: esnext):
Module system (default: NodeNext):
Module Resolution (default: NodeNext):
Root directory (default: src):
Output directory (default: dist):
Enable strict mode? (y/n, default: y):
```

> \*next means the current latest supported means the type in package.json should be module

4. After setup, the script prints your next steps and **self-destructs** the folder automatically.

---

## Folder Structure Created

```
project-root/
├─ package.json
├─ tsconfig.json
├─ index.ts
├─ dist/
│  └─ (future JavaScript files)
├─ src/
│  └─ (future TypeScript files)
```

---

## NPM Scripts Added

| Script  | Description                                        |
| ------- | -------------------------------------------------- |
| `dev`   | Runs `.ts` files directly with `tsx` in watch mode |
| `run`   | Compiles with `tsc` and executes `dist/index.js`   |
| `build` | Builds TypeScript project to `outDir` (`dist`)     |



## Notes

- The script will **self-destruct the setup folder** (`ts`) after completion by default. Cancel by pressing `CTRL+C` before it finishes.
- All configurations are editable via the generated `tsconfig.json`.
- Ideal for **quick TypeScript project bootstrap** and experiments.
