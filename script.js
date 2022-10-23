const apiUrl = "https://api.quotable.io/random";
const quote = document.getElementById("quote");
const author = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const quoteContainer = document.getElementById("quote-container");
const loader = document.getElementById("loader");

function loadingInProgress() {
    quoteContainer.hidden = true;
    loader.hidden = false;
}

function loadingFinished() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

async function newQuote() {
    loadingInProgress();
    let q = await fetch(apiUrl)
        .then(response => response.json())
        .then(data => data)
        .catch(error => {
            newQuote();
            alert(error);
        });
    
    if (q.content.length > 100) {
        quote.classList.add('long-quote');
    } else {
        quote.classList.remove('long-quote');
    }

    quote.textContent = q.content;
    author.textContent = q.author;

    loadingFinished();
};

newQuoteBtn.addEventListener('click', () => {
    newQuote();
});

twitterBtn.addEventListener('click', () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.textContent} - ${author.textContent}`;
    window.open(twitterUrl, '_blank');
});

// onload
newQuote();