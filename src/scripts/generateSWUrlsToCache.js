const recursiveReaddir = require("recursive-readdir");
const fs = require("fs");

const EXCLUDED_DATA = [".DS_Store", "index.html", "urlsToCache.json"];

async function generate() {
    try {
        const files_public = await recursiveReaddir("../../public", EXCLUDED_DATA);
        const files_src = await recursiveReaddir("../../src", EXCLUDED_DATA);
        fs.writeFileSync(
            "./urlsToCache.json",
            JSON.stringify({ cache: files_public.concat(files_src) })
        );
    } catch (error) {
        console.error(error);
    }
}

generate();
