const recursiveReaddir = require("recursive-readdir");
const fs = require("fs");

const EXCLUDED_DATA = [".DS_Store", "index.html", "urlsToCache.json"];

const addAbsolutePath = fileName => "./" + fileName;

async function generate() {
    try {
        const files_public = await recursiveReaddir("./public", EXCLUDED_DATA);
        const files_src = await recursiveReaddir("./src", EXCLUDED_DATA);
        const files = files_public.concat(files_src);
        fs.writeFileSync(
            "./src/urlsToCache.json",
            JSON.stringify({ cache: files.map(addAbsolutePath) })
        );
    } catch (error) {
        console.error(error);
    }
}

generate();
