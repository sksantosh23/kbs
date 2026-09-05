const form = document.querySelector('#product-search');
const input = document.querySelector('#category-query');
const cards = Array.from(document.querySelectorAll('[data-category]'));
const resultStatus = document.querySelector('#search-status');
const empty = document.querySelector('#no-results');
if (form && input && resultStatus && empty) {
  const filter = () => {
    const words = input.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    let count = 0;
    for (const card of cards) { const match = words.every(word => card.dataset.category?.includes(word)); card.hidden = !match; if (match) count++; }
    resultStatus.textContent = `${count} ${count === 1 ? 'category' : 'categories'}${words.length ? ' matching your search' : ''}`;
    empty.hidden = count !== 0;
  };
  input.addEventListener('input', filter);
  form.addEventListener('submit', event => { event.preventDefault(); filter(); });
  form.addEventListener('reset', () => { input.value = ''; filter(); input.focus(); });
}
