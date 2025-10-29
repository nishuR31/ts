import { execSync } from "child_process";
import { fileURLToPath } from "url";
import path from "path";
let root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export default async function pkg(mod, path = root) {
  try {
    return mod ? await import(mod) : execSync(`cd "${root}" && npm install ${mod}`,{cwd:path});
  } catch (e) {
    console.log(`Error installing ${mod}: ${e}`);
  }
}
