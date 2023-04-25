import fs from "fs";

export const readFile = (path: string): string | false => {
    try {
        return fs.readFileSync(path, { encoding: "utf-8" });
    } catch (error) {
        return false
    }
}