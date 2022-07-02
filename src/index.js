/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */

import './index.css';

// Define the constants
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('.recipe-close-btn');
const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=egg';
const modalDetail = document.querySelector('.meal-details');

// Add event listeners

// To fetch data from food API and the involvement API
const getFood = async () => {
  mealList.innerHTML = '';
  const response = await fetch(url);
  const dataContent = await response.json();
  const foodData = dataContent.meals;
  console.log(dataContent);

  foodData.forEach( async(meal) => {
    mealList.innerHTML += `
          <div class="meal-item" meal-id = ${meal.idMeal}>
            <div class="meal">
              <div class="meal-img">
                <img src="${meal.strMealThumb}" alt="Food-image">
              </div>
            </div>
  
            <div class="meal-name">
              <h3>${meal.strMeal} <span><button class="like-button" id="like-${meal.idMeal}"><i class="fa-solid fa-heart"></i></button></span></h3>
              <small> 0 Likes</small>
              <a href="#" class="recipe-btn">Comment on Recipe</a>
            </div>
          </div>
    `;
    const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/bbDC3TOidzHVfwfLZkFs/likes');
    const data = await response.json();
    console.log(data[0]);
    data.forEach((entry) => {
      // if (entry.item_id === meal.idMeal) {
      //   const updateLikes = mealList.lastElementChild.children[1];
      //   updateLikes.innerHTML = `${entry.likes} Likes`;
      // }
      console.log(entry);
    })
  });
 
};

window.addEventListener('load', getFood);

// Add event Listener to the comments popup detail
// Because the content is created dynamically, add an event listener to the entire list of cards

const getRecipe = async (e) => {
  if (e.target.classList.contains('recipe-btn')) {
    const mealItem = e.target.parentElement.parentElement;
    // console.log(mealItem);
    const foodID = mealItem.getAttribute('meal-id');
    // console.log(foodID);

    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodID}`);
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
    // const commentsSection = document.getElementById('user-comments');
    // let commentsArray = [];
    // const data = await retrieveComments(foodID);
    // if (data){
    // data.forEach((entry) => {
    //   // commentsSection.innerHTML += `
    //   //   <li> ${entry.creation_date}: ${entry.username} - ${entry.comment}
    //   // `;
    // });
    // }
    // End of edit
    listComment();
  }
};

// p/s: The display should not be ties to the submit event listener.

mealList.addEventListener('click', getRecipe);

// Add event listener to the close button
modalDetail.addEventListener('click', (e) => {
  if (e.target.classList.contains('fa-xmark')) {
    const modal = e.target.parentElement.parentElement;
    // console.log(modal)
    modal.classList.remove('show');
    modal.classList.add('hide');
  } else if (e.target.classList.contains('submit-comment')) {
    // Do sth
    const mealItem = e.target.parentElement.parentElement.parentElement;
    const foodID = mealItem.getAttribute('meal-id');
    const userName = document.querySelector('form .name-input');
    const userComment = document.querySelector('form .enter-comment');
    const form = document.querySelector('form');
    postComment(foodID, userName.value, userComment.value);
    form.reset();
  }
});

// Involvement API to track the likes
// bbDC3TOidzHVfwfLZkFs

// Create the add like functionality
mealList.addEventListener('click', async (e) => {
  // console.log(e.target);
  if (e.target.classList.contains('fa-heart')) {
    const mainList = e.target.parentElement.parentElement.parentElement
      .parentElement.parentElement;
    const id = mainList.getAttribute('meal-id');
    postLike(id);
    const updateLikes = mainList.lastElementChild.children[1];
    const likesData = await renderLike();

    likesData.forEach((entry) => {
      if (entry.item_id === id) {
        updateLikes.innerHTML = `${entry.likes} Likes`;
      }
    });
  }
});

// Display likes on load 

const showOnLoad = async(id) => {

}



// Likes to render once the window loads
mealList.addEventListener('load', async (e) => {
  // console.log(e.target);
  if (e.target.classList.contains('fa-heart')) {
    const mainList = e.target.parentElement.parentElement.parentElement
      .parentElement.parentElement;
    const id = mainList.getAttribute('meal-id');
    postLike(id);
    const updateLikes = mainList.lastElementChild.children[1];
    const likesData = await renderLike();

    likesData.forEach((entry) => {
      if (entry.item_id === id) {
        updateLikes.innerHTML = `${entry.likes} Likes`;
      }
    });
  }
});


// Involvement API 

const postLike = async (mealId) => {
  const like = {
    item_id: mealId,
  };

  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/bbDC3TOidzHVfwfLZkFs/likes', {
    method: 'post',
    body: JSON.stringify(like),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const res = await response.text();
  // console.log(res);
};

const renderLike = async () => {
  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/bbDC3TOidzHVfwfLZkFs/likes');
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
  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/bbDC3TOidzHVfwfLZkFs/comments', {
    method: 'post',
    body: JSON.stringify(comment),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const res = await response.text();
  // console.log(res);
};

// Retrieve the comment from the API
const retrieveComments = async (itemId) => {
  const url = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/bbDC3TOidzHVfwfLZkFs/comments?item_id=${itemId}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
  // console.log(data)
};