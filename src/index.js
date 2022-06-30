import './index.css';

// Define the constants 
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('.recipe-close-btn');
const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=egg';
const modalDetail = document.querySelector('.meal-details');

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
    `;
  })
}

window.addEventListener('load', getFood);

// Add event Listener to the comments popup detail
// Because the content is created dynamically, add an event listener to the entire list of cards

const getRecipe =  async (e) => {
  if(e.target.classList.contains('recipe-btn')) {
    let mealItem = e.target.parentElement.parentElement;
    // console.log(mealItem);
    let foodID = mealItem.getAttribute('meal-id');
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
    const commentsSection = document.getElementById('user-comments');
    const userName = document.querySelector('form .name-input');
    const userComment = document.querySelector('form .enter-comment');
    const form = document.querySelector('.comments-form');
    const commentsHeader = document.querySelector('.comments-header');

    // Create new entry when user submits a new comment
    
    form.addEventListener('submit', async(e) => {
      e.preventDefault();
      postComment(foodID, userName.value, userComment.value);  // via fetch api
      form.reset();
      const data = await retrieveComments(foodID);
      console.log(data);
      data.forEach((entry) => {
        commentsSection.innerHTML += `
          <li> ${entry.creation_date}: ${entry.username} - ${entry.comment}
        `;
      });
    });

  }
}

// p/s: The display should not be ties to the submit event listener. 

mealList.addEventListener('click', getRecipe);

//Add event listener to the close button 
modalDetail.addEventListener('click', (e) => {
  if (e.target.classList.contains('fa-xmark')) {
    const modal = e.target.parentElement.parentElement;
    modal.classList.remove('show');
    modal.classList.add('hide');
  }
})

// Involvement API to track the likes 
// bbDC3TOidzHVfwfLZkFs

// Create the add like functionality
mealList.addEventListener('click', async (e) => {
  // console.log(e.target);
  if(e.target.classList.contains('fa-heart')){
      const mainList = e.target.parentElement.parentElement.parentElement.parentElement.parentElement;
      const id = mainList.getAttribute('meal-id');
      postLike(id);
      const updateLikes = mainList.lastElementChild.children[1];
      const likesData = await renderLike();

      likesData.forEach((entry) => {
        if (entry.item_id == id) {
          updateLikes.innerHTML = `${entry.likes} Likes`
        }
      })
  }
})

const postLike = async (mealId) => {
  const like = {
    item_id: mealId
  }

  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/bbDC3TOidzHVfwfLZkFs/likes', {
    method: 'post',
    body: JSON.stringify(like),
    headers: {
      'Content-Type': 'application/json',
    }
  })
  const res = await response.text()
  // console.log(res);
}

const renderLike = async() => {
  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/bbDC3TOidzHVfwfLZkFs/likes');
  const data = await response.json();
  return data;
}


//*******************************COMMENTS INVOLVEMENT API*****************************/
// Post the comments 
const postComment = async (mealCode, user, insights) => {
  const comment = {
      "item_id": mealCode,
      "username": user,
      "comment": insights,
  }
  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/bbDC3TOidzHVfwfLZkFs/comments', {
    method: 'post',
    body: JSON.stringify(comment),
    headers: {
      'Content-Type': 'application/json',
    }
  })
  const res = await response.text()
  console.log(res);
}

// Retrieve the comment from the API
const retrieveComments = async(itemId) => {
  const url = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/bbDC3TOidzHVfwfLZkFs/comments?item_id=${itemId}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
  // console.log(data)
}
