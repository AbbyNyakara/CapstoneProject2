import './index.css';

// Define the constants 
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('.recipe-close-btn');
const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=egg';

// Add event listeners 

const getFood = async () => {
  mealList.innerHTML = '';
  const response = await fetch(url);
  const dataContent = await response.json();
  const foodData = dataContent.meals;

  foodData.forEach((meal) => {
    mealList.innerHTML += `
          <div class="meal-item" meal-id = ${meal.idMeal}>
            <div class="meal">
              <div class="meal-img">
                <img src="${meal.strMealThumb}" alt="Food-image">
              </div>
            </div>
  
            <div class="meal-name">
              <h3>${meal.strMeal} <span><button class="like-button"><i class="fa-solid fa-heart"></i></button></span></h3>
              <small> 0 Likes</small>
              <a href="#" class="recipe-btn">Comment on Recipe</a>
            </div>
          </div>
    `
  })
}

window.addEventListener('load', getFood());

// Add event Listener to the comments popup detail
// Because the content is created dynamically, add an event listener to the entire list of cards

const getRecipe =  (e) => {

  if(e.target.classList.contains('recipe-btn')) {
    let mealItem = e.target.parentElement.parentElement;
    let foodID = mealItem.getAttribute('meal-id');
    // console.log(foodID);
    
    fetch(`www.themealdb.com/api/json/v1/1/lookup.php?i=${foodID}`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })
  }
}

mealList.addEventListener('click', getRecipe);