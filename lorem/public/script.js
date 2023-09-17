document.addEventListener("DOMContentLoaded", () => {
  const loremForm = document.getElementById("loremForm");
  const resultDiv = document.getElementById("result");

  loremForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const numberOfParagraphs = parseInt(
      document.getElementById("numberOfParagraphs").value,
      10
    );
    if (!isNaN(numberOfParagraphs) && numberOfParagraphs > 0) {
      const response = await fetch(`/lorem/${numberOfParagraphs}`);
      const loremText = await response.text();
      const formattedText = loremText.replace(/\n/g, "<br>");
      resultDiv.innerHTML = formattedText;
    }
  });
});
