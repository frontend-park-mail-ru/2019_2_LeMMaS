const recursiveReaddir = require("recursive-readdir");
const fs = require("fs");

const EXCLUDED_FILES = [".DS_Store", "index.html"];

async function generateUrlsToCache() {
    try {
        let files = await recursiveReaddir("./public", EXCLUDED_FILES);
        files.push("/");
        fs.writeFileSync(
            "./src/sw-urls-to-cache.json",
            JSON.stringify({ cache: files.map(filename => filename.replace("public", "")) })
        );
    } catch (error) {
        console.error(error);
    }
}

generateUrlsToCache();
