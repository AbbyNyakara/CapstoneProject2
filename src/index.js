/* eslint-disable no-unused-vars */

import './index.css';

// Define the constants
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('.recipe-close-btn');
const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=egg';
const modalDetail = document.querySelector('.meal-details');

// Add event listeners
let foodData = [];
let likesData = [];
const data2 = [];
const orderedLikesData = [];

const getFood = async () => {
  mealList.innerHTML = '';
  const response = await fetch(url);
  const dataContent = await response.json();
  foodData = dataContent.meals;

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
              <small class=${meal.idMeal}> 0 Likes</small>
              <a href="#" class="recipe-btn">Comment on Recipe</a>
            </div>
          </div>
    `;
  });
};

getFood();

const mealCount = async () => {
  const response = await getFood();
  const Count = document.getElementById('meal-count');
  const meals = document.getElementsByClassName('meal-item');
  const data = meals.length / 2;
  Count.innerHTML = ` (${data}) Meals `;
};
window.addEventListener('load', mealCount);

// Add event Listener to the comments popup detail
// Because the content is created dynamically, add an event listener to the entire list of cards

const getRecipe = async (e) => {
  if (e.target.classList.contains('recipe-btn')) {
    const mealItem = e.target.parentElement.parentElement;
    // console.log(mealItem);
    const foodID = mealItem.getAttribute('meal-id');
    // console.log(foodID);

    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodID}`,
    );
    const dataFile = await res.json();
    const mealInfo = dataFile.meals[0];
    const html = `
        <button class="btn recipe-close-btn" id="recipe-close-btn">
          <i class="fa-solid fa-xmark"></i>
        </button>
        <div class="recipe-meal-img">
            <img src="${mealInfo.strMealThumb}" alt="">
        </div>

        <div class="meal-details-contents">
          <h2 class="recipe-title">${mealInfo.strMeal}</h2>
          <div class="recipe-instruct">
            <h3>Instructions</h3>
            <p>${mealInfo.strInstructions}</p>
          </div>
        </div>

        <h3 class="comments-header">Comments</h3>
        <ul id="user-comments">
        <li></li>
        </ul>
        <h4 class="add-comment-header">Leave a comment</h4>
        <form action="" class="comments-form">
          <input type="text" placeholder="Enter your Name" class="name-input">
          <textarea name="" id="" cols="30" rows="6" placeholder="Your Insights" class="enter-comment"></textarea>
          <button type="submit" id="btn" class="submit-comment">Comment</button>
        </form>
    `;
    modalDetail.innerHTML = html;
    modalDetail.classList.remove('hide');
    modalDetail.classList.add('show');

    // Add the comments
    const commentsSection = document.getElementById('user-comments');
    const userName = document.querySelector('form .name-input');
    const userComment = document.querySelector('form .enter-comment');
    const form = document.querySelector('.comments-form');
    const commentsHeader = document.querySelector('.comments-header');

    // Create new entry when user submits a new comment

    const listComment = async () => {
      let scoreArray = [];
      const addToList = async () => {
        const result = await fetch(
          `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/bbDC3TOidzHVfwfLZkFs/comments?item_id=${foodID}`,
        ).then((res) => res.json());
        return result;
      };
      addToList().then((res) => {
        commentsSection.innerHTML = '';
        if (res) {
          scoreArray = res;
          for (let i = 0; i < scoreArray.length; i += 1) {
            commentsSection.innerHTML += `
                  <li> ${scoreArray[i].creation_date}: ${scoreArray[i].username}-${scoreArray[i].comment}</li>
                    `;
          }
        }
      });
      const wait = await addToList();
      const data = scoreArray.length;
      commentsHeader.innerHTML = ` (${data}) Comments `;
    };
    listComment();

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      postComment(foodID, userName.value, userComment.value); // via fetch api
      form.reset();
    });
  }
};

// p/s: The display should not be ties to the submit event listener.

mealList.addEventListener('click', getRecipe);

// Add event listener to the close button
modalDetail.addEventListener('click', (e) => {
  if (e.target.classList.contains('fa-xmark')) {
    const modal = e.target.parentElement.parentElement;
    modal.classList.remove('show');
    modal.classList.add('hide');
  }
});

// Involvement API to track the likes
// bbDC3TOidzHVfwfLZkFs

// Create the add like functionality
mealList.addEventListener('click', async (e) => {
  if (e.target.classList.contains('fa-heart')) {
    const mainList = e.target.parentElement.parentElement.parentElement.parentElement
        .parentElement;
    const id = mainList.getAttribute('meal-id');
    postLike(id);
    const updateLikes = mainList.lastElementChild.children[1];
    likesData = await renderLike();

    likesData.forEach((entry) => {
      if (entry.item_id === id) {
        updateLikes.innerHTML = `${entry.likes} Likes`;
      }
    });
  }
});

const postLike = async (mealId) => {
  const like = {
    item_id: mealId,
  };

  const response = await fetch(
    'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/bbDC3TOidzHVfwfLZkFs/likes',
    {
      method: 'post',
      body: JSON.stringify(like),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const res = await response.text();
};

const renderLike = async () => {
  const response = await fetch(
    'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/bbDC3TOidzHVfwfLZkFs/likes',
  );
  const data = await response.json();
  return data;
};

// *******************************COMMENTS INVOLVEMENT API*****************************/
// Post the comments
const postComment = async (mealCode, user, insights) => {
  const comment = {
    item_id: mealCode,
    username: user,
    comment: insights,
  };
  const response = await fetch(
    'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/bbDC3TOidzHVfwfLZkFs/comments',
    {
      method: 'post',
      body: JSON.stringify(comment),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const res = await response.text();
};

// Retrieve the comment from the API
const retrieveComments = async (itemId) => {
  const url = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/bbDC3TOidzHVfwfLZkFs/comments?item_id=${itemId}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const renderLike2 = async () => {
  const response = await fetch(
    'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/bbDC3TOidzHVfwfLZkFs/likes',
  );
  const data2 = await response.json();

  const response2 = await fetch(url);
  const dataContent = await response2.json();
  foodData = dataContent.meals;

  const data3 = Promise.allSettled([foodData, data2]).then((values) => {
    values[0].value.forEach((elem0) => {
      values[1].value.forEach((elem1) => {
        if (elem0.idMeal === elem1.item_id) {
          orderedLikesData.push(elem1);
        }
      });
    });

    mealList.innerHTML = '';

    foodData.forEach((meal, index) => {
      mealList.innerHTML += `
          <div class="meal-item" meal-id = ${meal.idMeal}>
            <div class="meal">
              <div class="meal-img">
                <img src="${meal.strMealThumb}" alt="Food-image">
              </div>
            </div>

            <div class="meal-name">
              <h3>${
                meal.strMeal
              } <span><button class="like-button"><i class="fa-solid fa-heart"></i></button></span></h3>
              <small> ${orderedLikesData[index].likes || 0} Likes</small>
              <a href="#" class="recipe-btn">Comment on Recipe</a>
            </div>
          </div>
    `;
    });
  });

  return data3;
};

renderLike2();