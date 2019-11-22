const recursiveReaddir = require("recursive-readdir");
const fs = require("fs");

const EXCLUDED_FILES = [".DS_Store", "sw.js", "UrlsToCache.json", "bundle.js"];

async function generateUrlsToCache() {
    try {
        let files = await recursiveReaddir("./public", EXCLUDED_FILES);
        files.push("/");
        fs.writeFileSync(
            "./src/UrlsToCache.json",
            JSON.stringify({
                //cache: files.map(filename => filename.replace("public", "")),
                cache: files,
            })
        );
    } catch (error) {
        console.error(error);
    }
}

generateUrlsToCache();
