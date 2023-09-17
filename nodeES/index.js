import http from "http";
import dotenv from "dotenv";
import * as utils from "./utils.js";
dotenv.config();

const server = http.createServer((req, res) => {
  const dir = process.argv[2];
  if (dir !== "dir") {
    utils.sendResponse(res, 401, "text/html;charset=utf-8", "Folder not found");
    return;
  }

  if (req.url === "/") {
    utils.handleHomePage(dir, res);
  } else if (req.url === "/favicon.ico") {
    utils.sendResponse(res, 404, "text/html;charset=utf-8", "File not found");
  } else {
    const filePath = "." + req.url;
    utils.handleFileRequest(filePath, res);
  }
});

const PORT = process.env.PORT || 3333;
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
