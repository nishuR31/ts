// import { execSync } from "child_process";
// import readline from "readline";
// import { fileURLToPath } from "url";
// import path from "path";
// import fs from "node:fs";
// import modules from "./modules.js";
// import { spawn } from "node:child_process";
// import pkg from "./import.js";

// let root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
// let ts = path.dirname(fileURLToPath(import.meta.url));

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// function ask(question) {
//   return new Promise((resolve) =>
//     rl.question(question, (ans) => resolve(ans.trim()))
//   );
// }

// function run(cmd, message = "") {
//   console.log(`\n${message || "Execution in progress.."}`);
//   execSync(cmd, { stdio: "inherit" });
// }

// async function main() {
//   try {
//     console.log("Starting TypeScript project setup...");
//     // run(`cd ${root}`, "Changing dir.");

//     // 1. Initialize npm project
//     if (!fs.existsSync(`${root}/package.json`)) {
//       run(`cd ${root} && npm init -y`, "Initializing simple package.json");
//     } else {
//       console.log("package.json already exists, skipping init.");
//     }

//     // 2. Install required dev dependencies
//     run(`echo "Installing dependencies like json5" `);

//     let mod = pkg("json5"    );
//     let json5=mod.default ?? mod;

//     run(
//       `cd ${root} && npm i -D ${modules}`,
//       "Installing dev dependencies like TypeScript, tsx, and Node types"
//     );

//     // 3. Initialize tsconfig.json
//     if (!fs.existsSync(`${root}/tsconfig.json`)) {
//       run(` cd ${root} && npx tsc --init`, "Creating tsconfig.json");
//     } else {
//       console.log("tsconfig.json already exists, skipping init.");
//     }

//     // 4. Ask for custom compiler options
//     const tsconfig = json5.parse(
//       fs.readFileSync(`${root}\/tsconfig.json`, "utf-8")
//     );

//     console.log("\nConfigure your tsconfig.json options:");
//     const target = (await ask("Target (default: esnext): ")) || "esnext";
//     const moduleType =
//       (await ask("Module system (default: NodeNext): ")) || "NodeNext";
//     const moduleResolution =
//       (await ask("Module Resolution (default: NodeNext): ")) || "NodeNext";
//     const rootDir = (await ask("Root directory (default: src): ")) || "src";
//     const outDir = (await ask("Output directory (default: dist): ")) || "dist";
//     const strictMode =
//       (await ask("Enable strict mode? (y/n, default: y): ")) || "y";

//     Object.assign(tsconfig.compilerOptions, {
//       target,
//       module: moduleType,
//       moduleResolution,
//       rootDir,
//       allowImportingTsExtensions: true,
//       outDir,
//       esModuleInterop: true,
//       strict: strictMode.toLowerCase() === "y",
//       skipLibCheck: true,
//       emitDeclarationOnly: true,
//       noEmit: true,
//       forceConsistentCasingInFileNames: true,
//     });

//     fs.writeFileSync(
//       `${root}\/tsconfig.json`,
//       JSON.stringify(tsconfig, null, 2)
//     );
//     console.log("tsconfig.json updated.");

//     // 5. Update package.json scripts
//     const packageJson = JSON.parse(
//       fs.readFileSync(`${root}\/package.json`, "utf-8")
//     );
//     packageJson.scripts = Object.assign(packageJson.scripts, {
//       dev: "npx tsx --watch src/index.ts",
//       run: "npx tsc && node dist/index.js",
//       build: "npx tsc",
//     });
//     packageJson.type = "module";
//     fs.writeFileSync(
//       `${root}\/package.json`,
//       JSON.stringify(packageJson, null, 2)
//     );
//     console.log("package.json scripts added.");

//     // 6. Create folder structure and starter file

//     const entryFile = `${root}\/index.ts`;
//     if (!fs.existsSync(entryFile)) {
//       fs.writeFileSync(
//         entryFile,
//         `let data:string="TypeScript setup complete. Ready to build.";\nconsole.log(data);`
//       );
//     }
//     console.log(`${entryFile} created.`);

//     rl.close();

//     console.log(`
// Setup complete.
// Next steps:
//   - npm run dev   → Runs .ts files directly with tsx in watch mode
//   - npm run run   → Compiles with tsc and runs the output
//   - npm run build → Builds for production (outputs to dist/)
//   - Edit tsconfig.json anytime to adjust compiler settings
//   `);

//     // 7. Auto self-destruct after 10 seconds
//     console.log(
//       "\nSetup will self-destruct in 5 seconds. Cancel now (CTRL+C) to stop this."
//     );

//     process.on("exit", () => {
//       try {
//         process.chdir(root); // move out so cwd isn't inside the folder to delete

//         const script = `
//       const fs = require('fs');
//       const path = ${JSON.stringify(ts)};
//       setTimeout(() => {
//         try {
//           fs.rmSync(path, { recursive: true, force: true });
//           console.log('Deleted:', path);
//         } catch (e) {
//           console.error('Delete failed:', e.message);
//         }
//       }, 2000); // wait half a second so parent process fully exits
//     `;

//         spawn(process.execPath, ["-e", script], {
//           detached: true,
//           stdio: "ignore",
//           cwd: root,
//           windowsHide: true,
//         }).unref();
//       } catch (e) {
//         console.error("Schedule delete error:", e.message);
//       }
//     });
//     setTimeout(() => {
//       console.log("\nReady to work..\n");
//     }, 3000);
//   } catch (err) {
//     console.error("Error during setup:", err);
//     rl.close();
//   }
// }

// main();


import { execSync, spawn } from "child_process";
import readline from "readline";
import { fileURLToPath } from "url";
import path from "path";
import fs from "node:fs";
import modules from "./modules.js";
import json5 from "json5"
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => rl.question(question, (ans) => resolve(ans.trim())));
}

function run(cmd, message = "") {
  console.log(`\n${message || "Executing..."}\n`);
  execSync(cmd, { stdio: "inherit", cwd: root });
}

async function main() {
  try {
    console.log("Starting TypeScript project setup...");

    // Step 1: Initialize npm
    if (!fs.existsSync(`${root}/package.json`)) {
      run(`npm init -y`, "Initializing package.json...");
    } else {
      console.log("package.json already exists, skipping init.");
    }

    run(`npm i -D ${modules}`, "Installing TypeScript + tools...");

    // Step 3: Create tsconfig
    if (!fs.existsSync(`${root}/tsconfig.json`)) {
      run(`npx tsc --init`, "Creating tsconfig.json...");
    } else {
      console.log("tsconfig.json already exists, skipping init.");
    }

    // Step 4: Customize tsconfig
    const tsconfig = json5.parse(fs.readFileSync(`${root}/tsconfig.json`, "utf-8"));
    console.log("\n⚙ Configure your TypeScript options:");
    const target = (await ask("Target (default: esnext): ")) || "esnext";
    const moduleType = (await ask("Module system (default: NodeNext): ")) || "NodeNext";
    const moduleResolution = (await ask("Module Resolution (default: NodeNext): ")) || "NodeNext";
    const rootDir = (await ask("Root directory (default: src): ")) || "src";
    const outDir = (await ask("Output directory (default: dist): ")) || "dist";
    const strictMode = (await ask("Enable strict mode? (y/n, default: y): ")) || "y";

    Object.assign(tsconfig.compilerOptions, {
      target,
      verbatimModuleSyntax: true,
      module: moduleType,
      moduleResolution,
      rootDir,
      allowImportingTsExtensions: true,
      outDir,
      esModuleInterop: true,
      strict: strictMode.toLowerCase() === "y",
      skipLibCheck: true,
      emitDeclarationOnly: true,
      noEmit: true,
      forceConsistentCasingInFileNames: true,
    });

    fs.writeFileSync(`${root}/tsconfig.json`, JSON.stringify(tsconfig, null, 2));
    console.log("tsconfig.json updated.");

    // Step 5: Update package.json scripts
    const pkgJsonPath = `${root}/package.json`;
    const packageJson = JSON.parse(fs.readFileSync(pkgJsonPath, "utf-8"));
    packageJson.scripts = Object.assign(packageJson.scripts, {
      dev: "npx tsx --watch src/index.ts",
      run: "npx tsc && node dist/index.js",
      build: "npx tsc",
    });
    packageJson.type = "module";

    fs.writeFileSync(pkgJsonPath, JSON.stringify(packageJson, null, 2));
    console.log("✔ package.json scripts updated.");

    // Step 6: Create starter files
    const entryFile = `${root}/src/index.ts`;
    if (!fs.existsSync(path.dirname(entryFile))) fs.mkdirSync(path.dirname(entryFile));
    if (!fs.existsSync(entryFile)) {
      fs.writeFileSync(
        entryFile,
        `let message: string = "TypeScript setup complete. Ready to build!";\nconsole.log(message);`
      );
      console.log("Created src/index.ts");
    }

    rl.close();

    console.log(`
Setup complete!
Next steps:
  - npm run dev   → Runs .ts files directly in watch mode
  - npm run run   → Compiles and runs from dist/
  - npm run build → Builds production version
`);

    // Step 7: Cleanup
    console.log("\nScript will self-destruct in 5 seconds. Cancel (CTRL+C) to keep it.");

    // macro task scheduling
    setTimeout(() => {
      process.nextTick(() => {
        const cleanupScript = `
          import fs from 'fs';
          const path = ${JSON.stringify(__dirname)};
          setTimeout(() => {
            if (fs.existsSync(path)) {
              fs.rmSync(path, { recursive: true, force: true });
              console.log("🧹 Cleaned up setup folder:", path);
            }
          }, 1000);
        `;
        spawn(process.execPath, ["-e", cleanupScript], {
          detached: true,
          stdio: "ignore",
          cwd: root,
          windowsHide: true,
        }).unref();
      });
    }, 5000); // macrotask delay to allow I/O and user exit

  } catch (err) {
    console.error("Setup error:", err);
    rl.close();
  }
}

main();
