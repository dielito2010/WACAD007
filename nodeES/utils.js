import fs from "fs";

export function createLink(file) {
  return `<a href="dir/${file}">${file}</a>`;
}

export function sendResponse(res, statusCode, contentType, content) {
  res.writeHead(statusCode, { "Content-Type": contentType });
  res.end(content);
}

export function handleHomePage(dir, res) {
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.error("Erro ao ler o diretório:", err);
      sendResponse(
        res,
        500,
        "text/html;charset=utf-8",
        "Internal Server Error"
      );
      return;
    }

    const links = files.map((file) => createLink(file)).join("<br>");
    const pageContent = `${links}`;
    sendResponse(res, 200, "text/html;charset=utf-8", pageContent);
  });
}

export function handleFileRequest(filePath, res) {
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.error("Erro ao ler o arquivo:", err);
      sendResponse(res, 404, "text/html;charset=utf-8", "File not found");
      return;
    }

    const pageContent = `<a href="/">Voltar</a><br><br>${data}`;
    sendResponse(res, 200, "text/html;charset=utf-8", pageContent);
  });
}
