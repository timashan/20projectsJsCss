const postsContainer = document.querySelector('.posts');
const loader = document.querySelector('.loader');
const filter = document.querySelector('.filter');

const limit = 5;
let page = 1;

const fetchPosts = async function () {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  const data = await res.json();

  data.forEach(post => {
    const html = `
    <div class="post__id">${post.id}</div>
    <div class="post__title">${post.title}</div>
    <p class="post__body">${post.body}</p>
    `;
    const postEl = document.createElement('div');
    postEl.className = 'post';
    postEl.innerHTML = html;
    postsContainer.appendChild(postEl);
  });
};
fetchPosts();

window.addEventListener('scroll', function () {
  const { clientHeight, scrollTop, scrollHeight } = document.documentElement;
  if (clientHeight + scrollTop >= scrollHeight) {
    ++page;
    loader.classList.add('show');
    setTimeout(() => {
      loader.classList.remove('show');
      fetchPosts();
    }, 1000);
  }
});

filter.addEventListener('input', function (e) {
  const query = this.value;
  [...postsContainer.children].forEach(post => {
    if (post.innerText.includes(query)) post.classList.remove('hide');
    else post.classList.add('hide');
  });
});
