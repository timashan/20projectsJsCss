const form = document.querySelector('.form');
const search = form.querySelector('input');
const mealsContainer = document.querySelector('.meals');
const resultsHeading = document.querySelector('.results-heading');
const singleMeal = document.querySelector('.single-meal');
const btnSearch = document.querySelector('.btn--search');
const btnRandom = document.querySelector('.btn--random');

const API__SEARCH = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const API__ID = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const API__RANDOM = 'https://www.themealdb.com/api/json/v1/1/random.php';

const showResultsHeading = function (msg) {
  resultsHeading.innerHTML = msg;
  setTimeout(() => (resultsHeading.innerHTML = ''), 3000);
};

const fetchFoodSearch = function (query) {
  resultsHeading.innerText = `Search results for '${query}':`;

  fetch(API__SEARCH + query)
    .then(res => res.json())
    .then(data => {
      const { meals } = data;
      if (!meals) {
        showResultsHeading('There are no search results. Try again!');
        return;
      }
      mealsContainer.innerHTML = `
      ${meals
        .map(
          meal =>
            `
        <div class="meal" data-id="${meal.idMeal}">
        <img
          src="${meal.strMealThumb}"
          alt="${meal.strMeal}"
        />
        <div class="meal__info"><h3>${meal.strMeal}</h3></div>
      </div>
        `
        )
        .join('')}
        `;
    })
    .catch(err => console.error(err));
};

const updateSingleMeal = function (data) {
  const [meal] = data.meals;
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (!meal['strIngredient' + i]) break;
    ingredients.push(
      `${meal['strIngredient' + i]} - ${meal['strMeasure' + i]}`
    );
  }

  singleMeal.innerHTML = `
      <h1>${meal.strMeal}</h1>
      <img
        src="${meal.strMealThumb}"
        alt="${meal.strMeal}"
      />
      <div class="single-meal__info">
        <p>${meal.strCategory}</p>
        <p>${meal.strArea}</p>
      </div>
      <p>${meal.strInstructions}</p>
      <div class="ingredients">
        <h2>Ingredients</h2>
        <ul class="ingredients__list">
        ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
        </ul>
      </div>
      `;
};

const fetchId = function (id) {
  fetch(API__ID + id)
    .then(res => res.json())
    .then(data => {
      updateSingleMeal(data);
    })
    .catch(err => console.error(err));
};

const fetchRandom = function () {
  fetch(API__RANDOM)
    .then(res => res.json())
    .then(data => updateSingleMeal(data));
};

const validateInput = function () {
  const val = search.value.toLocaleLowerCase();
  if (!val) {
    showResultsHeading('Enter something...');
    return;
  }
  return val;
};

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const val = validateInput();
  if (!val) return;
  fetchFoodSearch(val);
});

btnSearch.addEventListener('click', function () {
  const val = validateInput();
  if (!val) return;
  fetchFoodSearch(val);
});

mealsContainer.addEventListener('click', function (e) {
  const meal = e.target.closest('.meal');
  if (!meal) return;
  fetchId(meal.dataset.id);
});

btnRandom.addEventListener('click', function (e) {
  e.preventDefault();
  fetchRandom();
});
