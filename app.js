const mealContainer = document.getElementById("meal-container");
const errorText = document.getElementById("error-text");
const showDetails = document.getElementById("show-details");

const showSearchMeal = () => {
  const input = document.getElementById("input-field");
  const inputFieldText = input.value;
  input.value = "";
  showDetails.innerHTML = "";
  mealContainer.textContent = "";
  if (inputFieldText === "") {
    errorText.innerText = "Please write a meal name";
  } else {
    fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputFieldText}`
    )
      .then((res) => res.json())
      .then((data) => displayMeals(data.meals));
  }
};

const displayMeals = (meals) => {
  if (!meals) {
    errorText.innerText = "No meals found";
    return;
  }
  errorText.innerText = "";
  
  meals.forEach((meal) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
      <div class="card pb-4" style="width: 15rem;" onclick="showMealDetails('${meal.idMeal}')">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="${
      meal.strMeal
    }" />
        <div class="card-body">
          <h5 class="card-title">${meal.strMeal}</h5>
          <p class="card-text mb-1"> ${
            meal.strInstructions.slice(0, 80) + "..."
          }</p>
        </div>
      </div>
    `;
    mealContainer.appendChild(div);
  });
};

const showMealDetails = (mealId) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      let ingredientsList = [];
      for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
          ingredientsList.push(ingredient);
        }
      }
      const div = document.createElement("div");
      div.innerHTML = `
        <div class="mx-auto card pb-4 m-4" style="width: 22rem;">
        <div class="card-body">
        <img src="${meal.strMealThumb}" class="card-img-top"/>
            <h5 class="card-title pt-2">${meal.strMeal}</h5>
            <p class="card-text mb-1">Ingredients:</p>
            <ul>
              ${ingredientsList.map((item) => `<li>${item}</li>`).join("")}
            </ul>
          </div>
        </div>
      `;

      showDetails.innerHTML = "";
      showDetails.appendChild(div);
    });
};
