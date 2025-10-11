import { execSync } from "child_process";
import { fileURLToPath } from "url";
import path from "path";
let root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export default async function pkg(mod, path = `${root}`) {
  try {
    return await import(mod);
  } catch (e) {
    console.log(`${mod} not found. Installing...`);
    execSync(`cd ${path} && npm i ${mod}`, { stdio: "inherit" });
    return await import(mod);
  }
}
