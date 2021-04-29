const cardsContainer = document.querySelector('.cards');
const search = document.querySelector('#search')
const formSearch = document.querySelector('#form-search');
const btnRandom = document.querySelector('#random');
const title = document.querySelector('#title');
const baseUrl = 'https://quote-garden.herokuapp.com/api/v3/quotes';
let quotes = [];

document.addEventListener('DOMContentLoaded', () => {
  main();
});

btnRandom.addEventListener('click', async (e) => {
  e.preventDefault();
  await getRandomQuote();
  drawQuotes();
});

formSearch.addEventListener('submit', async (e) => {
  e.preventDefault();
  let { value } = search;
  if (value.trim().length >= 3 && value !== '') {
    title.textContent = 'Loading...';
    await getQuotesByAuthor(value);
    title.textContent = value;
    drawQuotes();
  }
})

async function main() {
  title.textContent = 'Loading...';
  await getRandomQuotes();
  title.textContent = 'Random Quotes';
  drawQuotes();
}

async function getRandomQuotes(count = 10) {
  let data = await fetch(`${baseUrl}/random?count=${count}`);
  data = await data.json();
  quotes = data.data;
}

async function getRandomQuote() {
  let data = await fetch(`${baseUrl}/random`);
  data = await data.json();
  quotes = [data.data[0], ...quotes];
}

async function getQuotesByAuthor(author = "Bill Gates") {
  let data = await fetch(`${baseUrl}?author=${author}`);
  data = await data.json();
  quotes = data.data;
}

function drawQuotes() {
  cardsContainer.innerHTML = '';
  quotes.forEach(quote => {
    let { quoteGenre, quoteText } = quote;
    let card = `
      <article class="card">
        <header class="card__header">
          <p class="card__genre">
            ${quoteGenre}
          </p>
        </header>
        <div class="card__body">
          <p class="card__quote">"${quoteText}"</p>
        </div>
      </article>
    `;
    cardsContainer.innerHTML += card;
  });
}