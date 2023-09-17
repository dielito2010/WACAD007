const LoremIpsum = require("lorem-ipsum").LoremIpsum;

function sendResponse(res, statusCode, contentType, content) {
  res.writeHead(statusCode, { "Content-Type": contentType });
  res.end(content);
}

function generateLoremIpsum(paragraphs) {
  const lorem = new LoremIpsum();
  let result = "";
  for (let i = 0; i < paragraphs; i++) {
    const loremText = lorem.generateParagraphs(1);
    result += loremText + "\n\n\n";
  }
  return result;
}

module.exports = { generateLoremIpsum, sendResponse };