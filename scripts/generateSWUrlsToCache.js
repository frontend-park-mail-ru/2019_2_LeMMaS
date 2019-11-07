const recursiveReaddir = require("recursive-readdir");
const fs = require("fs");

const EXCLUDED_DATA = [".DS_Store", "index.html", "urlsToCache.json"];

const addAbsolutePath = fileName => fileName.replace("public/", "");

async function generate() {
    try {
        const files = await recursiveReaddir("./public", EXCLUDED_DATA);
        fs.writeFileSync(
            "./public/urlsToCache.json",
            JSON.stringify({ cache: files.map(addAbsolutePath) })
        );
    } catch (error) {
        console.error(error);
    }
}

generate();
