const mealContainer = document.getElementById("meal-container");
const errorText = document.getElementById("error-text");
const showDetails = document.getElementById("show-details");

const showSearchMeal = () => {
  const input = document.getElementById("input-field");
  const inputFieldText = input.value;
  input.value = "";
//   console.log(inputFieldText);
  fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputFieldText}`
  )
    .then((res) => res.json())
    .then((data) => displayBooks(data.meals));
};

const displayBooks = (meals) => {
  if (!meals) {
    errorText.innerText =
      'No meals found';
    return;
  }
  errorText.innerText=""
  mealContainer.textContent = "";
  meals.forEach((meal) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
      <div class="card pb-4" style="width: 15rem;" onclick="showMealDetails('${meal.strMealThumb}',
      '${meal.strMeal}'
      )">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}" />
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

const showMealDetails=(pic, title)=>{
    // console.log(meal)
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="mx-auto card pb-4 m-4" style="width: 25rem;">
        <img src="${pic}" class="card-img-top" />
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
        </div>
      </div>
    `;
    showDetails.innerHTML = "";
    showDetails.appendChild(div);
}
