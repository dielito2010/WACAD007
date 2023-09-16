const http = require("http");
const fs = require("fs");
const createLink  = require("./link_helper.js");
require("dotenv").config();

const server = http.createServer((req, res) => {
  const dir = process.argv[2]
  if (dir !== "dir"){
    res.writeHead(401, { "Content-Type": "text/html;charset=utf-8" });
    res.end("Folder not found")
  }
  res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
  fs.readdir(dir, (err, files) => {
    if (err) throw new Error(err);
    files.forEach((file) => res.write(`${createLink(file)}<br>`));
    res.end();
  });
});

const PORT = process.env.PORT ?? 3333;
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
