const http = require("http");
const fs = require("fs");
const createLink  = require("./utils.js");
require("dotenv").config();

const server = http.createServer((req, res) => {
  const dir = process.argv[2];
  if (dir !== "dir") {
    res.writeHead(401, { "Content-Type": "text/html;charset=utf-8" });
    res.end("Folder not found");
  }
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    fs.readdir(dir, (err, files) => {
      if (err) throw new Error(err);
      files.forEach((file) => res.write(`${createLink(file)}<br>`));
      res.end();
    });
  } else {
    if (req.url === "/favicon.ico") {
      res.writeHead(404);
      res.end();
      return;
    }
    const path = "." + req.url
    fs.readFile(path, (err, data) => {
      if (err) throw new Error(err);
      res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
      res.write(`<a href="/">Voltar</a><br><br>`);
      res.write(data);
      res.end();
    });
  }
});

const PORT = process.env.PORT ?? 5551;
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
