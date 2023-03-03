const article = document.querySelector("article");

const wordsPerMinute = 200;


// `document.querySelector` may return null if the selector doesn't match anything.
if (article) {
  // ---- Figure out Reading Time
  const text = article.textContent;
  const wordMatchRegExp = /[^\s]+/g; // Regular expression
  const words = text.matchAll(wordMatchRegExp);
  // matchAll returns an iterator, convert to array to get word count
  const wordCount = [...words].length;
  const readingTime = Math.round(wordCount / wordsPerMinute);


  // ---- Build element
  const badge = document.createElement("p");
  // Use the same styling as the publish information in an article's header
  badge.classList.add("color-secondary-text", "type--caption", "bold");
  badge.textContent = `⏱️ ${readingTime} min read`;


  // ---- add to page
  // Support for API reference docs
  const heading = article.querySelector("h1");
  // Support for article docs with date
  const date = article.querySelector("time")?.parentNode;

  (date ?? heading).insertAdjacentElement("afterend", badge);
}