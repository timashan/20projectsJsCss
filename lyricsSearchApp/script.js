const form = document.querySelector('.form');
const search = document.querySelector('.form input');
const resultsEl = document.querySelector('.results');
const more = document.querySelector('.more');

const API = 'https://api.lyrics.ovh/';
const CORS = 'https://cors-anywhere.herokuapp.com/';

const fetchSongs = async function (url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) throw new Error('API ERROR');
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
};

const navigate = async function (url) {
  updateDOM(await fetchSongs(url));
};

const updateDOM = function (raw) {
  const { data, next, prev } = raw;
  resultsEl.innerHTML = `
  <ul class="songs">
  ${data
    .map(
      song => `
    <li>
    <span><strong>${song.artist.name}</strong> - ${song.title}</span>
    <button class="btn btn--lyrics" data-title="${song.title}" data-artist="${song.artist.name}">Get lyrics</button>
   </li>
    `
    )
    .join('')}
  </ul>
  `;
  more.innerHTML = `
  ${
    prev
      ? `<button class="btn btn--nav" onClick="navigate('${
          CORS + prev
        }')">Prev</button>`
      : ''
  }
  ${
    next
      ? `<button class="btn btn--nav" onClick="navigate('${
          CORS + next
        }')">Next</button>`
      : ''
  }
  `;
};

form.addEventListener('submit', async function (e) {
  e.preventDefault();
  if (!search.value.trim()) return;
  updateDOM(await fetchSongs(API + 'suggest/' + search.value));
});

resultsEl.addEventListener('click', async function (e) {
  const btn = e.target.closest('.btn');
  if (!btn) return;
  const { lyrics } = await fetchSongs(
    API + `v1/${btn.dataset.artist}/${btn.dataset.title}`
  );
  more.innerHTML = '';
  resultsEl.innerHTML = `
  <h2><strong>${btn.dataset.artist}</strong> - <span>${
    btn.dataset.title
  }</span></h2>
  ${lyrics.replace(/(\r\n|\n|\r)/g, '<br>')}`;
});
