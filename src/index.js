import './index.css';

// Define the constants
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('.recipe-close-btn');
const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=egg';
const modalDetail = document.querySelector('.meal-details');
const involve =
  'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/bbDC3TOidzHVfwfLZkFs';

// Add event listeners

const getFood = async () => {
  mealList.innerHTML = '';
  const response = await fetch(url);
  const dataContent = await response.json();
  const foodData = dataContent.meals;
  const res = await fetch(
    'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/bbDC3TOidzHVfwfLZkFs/likes',
  );
  const data = await res.json();
  console.log(data);

  foodData.forEach((meal) => {

    const res = await fetch(
    'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/bbDC3TOidzHVfwfLZkFs/likes',
  );
  const data = await res.json();
  console.log(data);
  

    mealList.innerHTML += `
          <div class="meal-item" meal-id = ${meal.idMeal}>
            <div class="meal">
              <div class="meal-img">
                <img src="${meal.strMealThumb}" alt="Food-image">
              </div>
            </div>
  
            <div class="meal-name">
              <h3>${meal.strMeal} <span><button class="like-button"><i class="fa-solid fa-heart"></i></button></span></h3>
              <small class=${meal.idMeal}  id="likes" > 0 Likes</small>
              <a href="#" class="recipe-btn">Comment on Recipe</a>
            </div>
          </div>
    `;
  });

  /*   const listLikes = () => {
    const Likes = document.getElementById('likes');
    let mealID = Likes.getAttribute('class');
    let scoreArray = [];

      const addToList = async () => {
      const result = await fetch(
        `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/bbDC3TOidzHVfwfLZkFs/likes`,
      ).then((res) => res.json());
      return result;
    };
    addToList().then((res) => {
      Likes.innerHTML = '';
      scoreArray = res;
      console.log(scoreArray);

      scoreArray.forEach((score) => {
        if (score.item_id === mealID) {
          console.log(score.item_id);
        }
      });
    });
  };
  listLikes(); */

  const renderLike = async () => {
    const reqlikeURL =
      'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/bbDC3TOidzHVfwfLZkFs/likes';
    const LikeURL = new Request(reqlikeURL);
    let response = await fetch(LikeURL);
    let data = await response.json();
    return data;
  };
  const likesData = await renderLike();
  let Likes = document.querySelectorAll('meal-id');
  console.log(Likes);
  /*
  likesData.forEach((entry) => {
    if (entry.item_id === mealID) {
      Likes.innerHTML = `${entry.likes} Likes`;
    }
  });*/
};

getFood();
/*
const listLikes = async () => {
  const wait = await getFood();
  let scoreArray = [];
  const addToList = async () => {
    const result = await fetch(
      `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/bbDC3TOidzHVfwfLZkFs/likes`,
    ).then((res) => res.json());
    return result;
  };

  addToList().then((res) => {
    scoreArray = res;
    console.log(scoreArray);

    const Likes = document.getElementById('likes');
    let mealID = Likes.forEach.getAttribute('class');
    console.log(Likes);
    Likes.innerHTML = '';
    scoreArray.forEach((score) => {
      if (score.item_id === mealID) {
        Likes.innerHTML = `${entry.likes} Likes`;
      }
    });
  });
};
listLikes(); */

const mealCount = async () => {
  const response = await getFood();
  const meals = document.getElementsByClassName('meal-item');
  console.log(meals.length);
};
window.addEventListener('load', mealCount);

// Add event Listener to the comments popup detail
// Because the content is created dynamically, add an event listener to the entire list of cards

const getRecipe = async (e) => {
  if (e.target.classList.contains('recipe-btn')) {
    let mealItem = e.target.parentElement.parentElement;
    // console.log(mealItem);
    let foodID = mealItem.getAttribute('meal-id');
    console.log('no');

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
        <div class="comment-display">
        <h2>Comments</h2>
        <ul id="comments-section">
        </ul>
        </div>
        <div class="add-comment" meal-id=${foodID} >
                <h2>Add Comments</h2>
                <ul>
                    <li><input type="text" id="name" placeholder="Your Name" required></li>
                    <li><textarea cols="30" id="insight" rows="10" placeholder="Your insights" required></textarea></li>
                    <li><button type="button" class="SUBMIT" id="submit" >Comment</button></li>
                </ul>
                </div>  
    `;
    modalDetail.innerHTML = html;
    modalDetail.classList.remove('hide');
    modalDetail.classList.add('show');

    const listComment = () => {
      const commentsSection = document.getElementById('comments-section');
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
                  <li class="comment-items"> <p>${scoreArray[i].creation_date}</p><p>${scoreArray[i].username}:</p><p>${scoreArray[i].comment}</p></li>
          
                    `;
          }
        }
      });
    };
    listComment();
  } else if (e.target.classList.contains('like-button')) {
    let mealItem =
      e.target.parentElement.parentElement.parentElement.parentElement;
    let foodID = mealItem.getAttribute('meal-id');
    console.log(foodID);
    const url =
      'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/bbDC3TOidzHVfwfLZkFs/likes';
    const response = fetch(url, {
      method: 'POST',
      body: JSON.stringify({ item_id: foodID }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Accept: 'application/json',
      },
    })
      .then((data) => data.text())
      .then((data) => console.log(data));

    const renderLike = async () => {
      const reqlikeURL =
        'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/bbDC3TOidzHVfwfLZkFs/likes';
      const wait = await getFood();
      const LikeURL = new Request(reqlikeURL);
      let response = await fetch(LikeURL);
      let data = await response.json();
      return data;
    };
    const likesData = await renderLike();
    const Likes = document.getElementById('likes');
    let mealID = Likes.getAttribute('class');
    Likes.innerHTML = ``;

    likesData.forEach((entry) => {
      if (entry.item_id === mealID) {
        Likes.innerHTML = `${entry.likes} Likes`;
      }
    });
  }
};

mealList.addEventListener('click', getRecipe);

//Add event listener to the close button

modalDetail.addEventListener('click', (e) => {
  if (e.target.classList.contains('fa-xmark')) {
    const modal = e.target.parentElement.parentElement;
    modal.classList.remove('show');
    modal.classList.add('hide');
  } else if (e.target.classList.contains('SUBMIT')) {
    let mealItem = e.target.parentElement.parentElement.parentElement;
    let foodID = mealItem.getAttribute('meal-id');
    const username = document.querySelector('#name');
    const comment = document.querySelector('#insight');
    const result = fetch(
      `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/bbDC3TOidzHVfwfLZkFs/comments`,
      {
        method: 'POST',
        body: JSON.stringify({
          item_id: foodID,
          username: `${username.value}`,
          comment: `${comment.value}`,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Accept: 'application/json',
        },
      },
    )
      .then((data) => data.text())
      .then((data) => console.log(data));
    username.value = '';
    comment.value = '';
  }
});
