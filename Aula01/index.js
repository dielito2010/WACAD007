const http = require("http");
const fs = require("fs");
const createLink = require("./link_helper")
require("dotenv").config();

const server = http.createServer(function (req, res) {
  const diretorio = process.argv[2];
  fs.readdir(diretorio, (err, arquivos) => {
    if (err) {
      console.error("Erro ao ler a pasta:", err);
      res.writeHead(404, { "Content-Type": "text/html;charset=utf-8" });
      res.end("Not found");
    }
    const listaArquivos = arquivos
      .map((arquivo) => createLink(arquivo))
      .join("");
    res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    res.end(listaArquivos);
  });

  fs.readFile(req.url+, (err, conteudo) => {
    if (err) throw new Error(err)

  })
});

const PORT = process.env.PORT ?? 3333;
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
