const fs = require("fs").promises;
const path = require("path");
const { generateLoremIpsum, sendResponse } = require("./utils.js");
const dotenv = require("dotenv");
const express = require("express");
dotenv.config();

const app = express();

app.use(express.static("public"));

app.get("/", async (res) => {
  try {
    const htmlContent = await fs.readFile(path.join(__dirname, "public", "index.html"),"utf-8");
    sendResponse(res, 200, { "Content-Type": "text/html" }, htmlContent);
  } catch (error) {
    sendResponse(res, 404, { "Content-Type": "text/html" }, "Not Found");
  }
});

app.get("/lorem/:paragraphs", (req, res) => {
  const x = parseInt(req.params.paragraphs, 10);
  if (!isNaN(x) && x > 0) {
    const loremIpsum = generateLoremIpsum(x);
    sendResponse(res, 200, { "Content-Type": "text/html" }, loremIpsum);
  } else {
    sendResponse(res, 400, { "Content-Type": "text/html" }, "Invalid number");
  }
});

const port = process.env.PORT ?? 5551;
app.listen(port, () => {
  console.log(`Rodando em http://localhost:${port}`);
});
