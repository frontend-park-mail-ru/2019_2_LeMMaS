const express = require("express");

const indexRouter = require("./routes/index.js");

const server = express();

server.use(express.static("./public"));

server.use("*", indexRouter);

server.listen(3000);
