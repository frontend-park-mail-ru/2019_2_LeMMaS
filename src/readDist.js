const fs = require("fs");
const path = require("path");
const scriptName = path.basename(__filename);
const swName = "sw.js";
const folder = "./public";
const swFilename = path.join(folder, swName);
const replacementKey = "['replaceMe']";

const walkSync = function(dir, filelist) {
    const files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function(file) {
        if (fs.statSync(dir + "/" + file).isDirectory()) {
            filelist = walkSync(dir + "/" + file, filelist);
        } else {
            filelist.push(file);
        }
    });
    return filelist;
};

let cacheUrls = walkSync(folder);
cacheUrls = cacheUrls.filter(
    filename => filename !== swName && filename !== scriptName
);
cacheUrls = JSON.stringify(cacheUrls);

let sw = fs.readFileSync(swFilename, "utf8");
sw = sw.replace(replacementKey, cacheUrls);

console.log("CacheUrl ", cacheUrls);
fs.writeFileSync(swFilename, sw);
