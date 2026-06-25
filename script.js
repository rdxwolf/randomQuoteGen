const quoteText = document.querySelector(".quote"),
  quoteBtn = document.querySelector("button"),
  authorName = document.querySelector(".name"),
  speechBtn = document.querySelector(".sound"),
  copyBtn = document.querySelector(".copy"),
  twitterBtn = document.querySelector(".twitter"),
  synth = speechSynthesis;

function randomQuote() {
  quoteBtn.classList.add("loading");
  quoteBtn.innerText = "Loading Quote...";
  
  fetch("https://dummyjson.com/quotes/random")
    .then(response => response.json())
    .then(result => {
      quoteText.innerText = result.quote; 
      authorName.innerText = result.author;
      quoteBtn.classList.remove("loading");
      quoteBtn.innerText = "New Quote";
    })
    .catch(error => {
      quoteText.innerText = "Oops! Could not fetch a quote right now.";
      authorName.innerText = "";
      quoteBtn.classList.remove("loading");
      quoteBtn.innerText = "Try Again";
      console.error("Error fetching quote:", error);
    });
}

speechBtn.addEventListener("click", () => {
  if (!quoteBtn.classList.contains("loading")) {
    let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
    
    utterance.onstart = () => speechBtn.classList.add("active");
    utterance.onend = () => speechBtn.classList.remove("active");
    
    synth.speak(utterance);
  }
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(quoteText.innerText);
  
  let icon = copyBtn.querySelector("i");
  
  icon.classList.remove("fa-copy");
  icon.classList.add("fa-check");
  
  setTimeout(() => {
    icon.classList.remove("fa-check");
    icon.classList.add("fa-copy");
  }, 2000);
});

twitterBtn.addEventListener("click", () => {
  let tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quoteText.innerText)}`;
  window.open(tweetUrl, "_blank");
});

quoteBtn.addEventListener("click", randomQuote);ogl