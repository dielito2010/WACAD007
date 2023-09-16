import http from "http";
import fs from "fs";
import { createLink } from "./link_helper.js";
import dotenv from "dotenv";
dotenv.config();

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
    
  }
});

const PORT = process.env.PORT ?? 3333;
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
