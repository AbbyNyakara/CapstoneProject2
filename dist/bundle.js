/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n\nmodule.exports = function (cssWithMappingToString) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n\n      content += cssWithMappingToString(item);\n\n      if (needLayer) {\n        content += \"}\";\n      }\n\n      if (item[2]) {\n        content += \"}\";\n      }\n\n      if (item[4]) {\n        content += \"}\";\n      }\n\n      return content;\n    }).join(\"\");\n  }; // import a list of modules into the list\n\n\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\n//# sourceURL=webpack://capstoneproject2/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://capstoneproject2/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.css */ \"./src/index.css\");\n/* eslint-disable no-unused-vars */\n\n/* eslint-disable no-use-before-define */\n // Define the constants\n\nconst mealList = document.getElementById('meal');\nconst mealDetailsContent = document.querySelector('.meal-details-content');\nconst recipeCloseBtn = document.getElementById('.recipe-close-btn');\nconst url = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=egg';\nconst modalDetail = document.querySelector('.meal-details'); // Add event listeners\n\nconst getFood = async () => {\n  mealList.innerHTML = '';\n  const response = await fetch(url);\n  const dataContent = await response.json();\n  const foodData = dataContent.meals;\n  foodData.forEach(meal => {\n    mealList.innerHTML += `\n          <div class=\"meal-item\" meal-id = ${meal.idMeal}>\n            <div class=\"meal\">\n              <div class=\"meal-img\">\n                <img src=\"${meal.strMealThumb}\" alt=\"Food-image\">\n              </div>\n            </div>\n  \n            <div class=\"meal-name\">\n              <h3>${meal.strMeal} <span><button class=\"like-button\"><i class=\"fa-solid fa-heart\"></i></button></span></h3>\n              <small> 0 Likes</small>\n              <a href=\"#\" class=\"recipe-btn\">Comment on Recipe</a>\n            </div>\n          </div>\n    `;\n  });\n};\n\nwindow.addEventListener('load', getFood); // Add event Listener to the comments popup detail\n// Because the content is created dynamically, add an event listener to the entire list of cards\n\nconst getRecipe = async e => {\n  if (e.target.classList.contains('recipe-btn')) {\n    const mealItem = e.target.parentElement.parentElement; // console.log(mealItem);\n\n    const foodID = mealItem.getAttribute('meal-id'); // console.log(foodID);\n\n    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodID}`);\n    const dataFile = await res.json();\n    const mealInfo = dataFile.meals[0];\n    const html = `\n        <button class=\"btn recipe-close-btn\" id=\"recipe-close-btn\">\n          <i class=\"fa-solid fa-xmark\"></i>\n        </button>\n        <div class=\"recipe-meal-img\">\n            <img src=\"${mealInfo.strMealThumb}\" alt=\"\">\n        </div>\n\n        <div class=\"meal-details-contents\">\n          <h2 class=\"recipe-title\">${mealInfo.strMeal}</h2>\n          <div class=\"recipe-instruct\">\n            <h3>Instructions</h3>\n            <p>${mealInfo.strInstructions}</p>\n          </div>\n        </div>\n\n        <h3 class=\"comments-header\">Comments</h3>\n        <ul id=\"user-comments\">\n        <li></li>\n        </ul>\n        <h4 class=\"add-comment-header\">Leave a comment</h4>\n        <form action=\"\" class=\"comments-form\">\n          <input type=\"text\" placeholder=\"Enter your Name\" class=\"name-input\">\n          <textarea name=\"\" id=\"\" cols=\"30\" rows=\"6\" placeholder=\"Your Insights\" class=\"enter-comment\"></textarea>\n          <button type=\"submit\" id=\"btn\" class=\"submit-comment\">Comment</button>\n        </form>\n    `;\n    modalDetail.innerHTML = html;\n    modalDetail.classList.remove('hide');\n    modalDetail.classList.add('show'); // Add the comments\n    // const commentsSection = document.getElementById('user-comments');\n    // let commentsArray = [];\n    // const data = await retrieveComments(foodID);\n    // if (data){\n    // data.forEach((entry) => {\n    //   // commentsSection.innerHTML += `\n    //   //   <li> ${entry.creation_date}: ${entry.username} - ${entry.comment}\n    //   // `;\n    // });\n    // }\n    // End of edit\n\n    const listComment = () => {\n      const commentsSection = document.getElementById('user-comments');\n      let scoreArray = [];\n\n      const addToList = async () => {\n        const result = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/bbDC3TOidzHVfwfLZkFs/comments?item_id=${foodID}`).then(res => res.json());\n        return result;\n      };\n\n      addToList().then(res => {\n        commentsSection.innerHTML = '';\n\n        if (res) {\n          scoreArray = res;\n\n          for (let i = 0; i < scoreArray.length; i += 1) {\n            commentsSection.innerHTML += `\n                  <li> ${scoreArray[i].creation_date}: ${scoreArray[i].username}-${scoreArray[i].comment}</li>\n                    `;\n          }\n        }\n      });\n    };\n\n    listComment();\n  }\n}; // p/s: The display should not be ties to the submit event listener.\n\n\nmealList.addEventListener('click', getRecipe); // Add event listener to the close button\n\nmodalDetail.addEventListener('click', e => {\n  if (e.target.classList.contains('fa-xmark')) {\n    const modal = e.target.parentElement.parentElement; // console.log(modal)\n\n    modal.classList.remove('show');\n    modal.classList.add('hide');\n  } else if (e.target.classList.contains('submit-comment')) {\n    // Do sth\n    const mealItem = e.target.parentElement.parentElement.parentElement;\n    const foodID = mealItem.getAttribute('meal-id');\n    const userName = document.querySelector('form .name-input');\n    const userComment = document.querySelector('form .enter-comment');\n    const form = document.querySelector('form');\n    postComment(foodID, userName.value, userComment.value);\n    form.reset();\n  }\n}); // Involvement API to track the likes\n// bbDC3TOidzHVfwfLZkFs\n// Create the add like functionality\n\nmealList.addEventListener('click', async e => {\n  // console.log(e.target);\n  if (e.target.classList.contains('fa-heart')) {\n    const mainList = e.target.parentElement.parentElement.parentElement.parentElement.parentElement;\n    const id = mainList.getAttribute('meal-id');\n    postLike(id);\n    const updateLikes = mainList.lastElementChild.children[1];\n    const likesData = await renderLike();\n    likesData.forEach(entry => {\n      if (entry.item_id === id) {\n        updateLikes.innerHTML = `${entry.likes} Likes`;\n      }\n    });\n  }\n});\n\nconst postLike = async mealId => {\n  const like = {\n    item_id: mealId\n  };\n  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/bbDC3TOidzHVfwfLZkFs/likes', {\n    method: 'post',\n    body: JSON.stringify(like),\n    headers: {\n      'Content-Type': 'application/json'\n    }\n  });\n  const res = await response.text(); // console.log(res);\n};\n\nconst renderLike = async () => {\n  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/bbDC3TOidzHVfwfLZkFs/likes');\n  const data = await response.json();\n  return data;\n}; // *******************************COMMENTS INVOLVEMENT API*****************************/\n// Post the comments\n\n\nconst postComment = async (mealCode, user, insights) => {\n  const comment = {\n    item_id: mealCode,\n    username: user,\n    comment: insights\n  };\n  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/bbDC3TOidzHVfwfLZkFs/comments', {\n    method: 'post',\n    body: JSON.stringify(comment),\n    headers: {\n      'Content-Type': 'application/json'\n    }\n  });\n  const res = await response.text(); // console.log(res);\n}; // Retrieve the comment from the API\n\n\nconst retrieveComments = async itemId => {\n  const url = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/bbDC3TOidzHVfwfLZkFs/comments?item_id=${itemId}`;\n  const response = await fetch(url);\n  const data = await response.json();\n  return data; // console.log(data)\n};\n\n//# sourceURL=webpack://capstoneproject2/./src/index.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/index.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/index.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"* {\\r\\n  padding: 0;\\r\\n  margin: 0;\\r\\n  box-sizing: border-box;\\r\\n}\\r\\n\\r\\n::-webkit-scrollbar {\\r\\n  width: 10px;\\r\\n}\\r\\n\\r\\n::-webkit-scrollbar-track {\\r\\n  background: white;\\r\\n  border-radius: 20px;\\r\\n}\\r\\n\\r\\n::-webkit-scrollbar-thumb {\\r\\n  background: var(--dark-orange);\\r\\n  border-radius: 15px;\\r\\n}\\r\\n\\r\\n:root {\\r\\n  --light-orange: #d65108;\\r\\n  --dark-orange: #b54507;\\r\\n}\\r\\n\\r\\n::-webkit-scrollbar-thumb:hover {\\r\\n  background: #4e1d03;\\r\\n}\\r\\n\\r\\nbody {\\r\\n  font-family: 'Montserrat', sans-serif;\\r\\n  font-size: 1.1rem;\\r\\n  font-weight: 300;\\r\\n}\\r\\n\\r\\n.btn {\\r\\n  font-family: inherit;\\r\\n  cursor: pointer;\\r\\n}\\r\\n\\r\\n.title {\\r\\n  font-size: 2em;\\r\\n  margin-bottom: 2em;\\r\\n}\\r\\n\\r\\n.container {\\r\\n  min-height: 100vh;\\r\\n}\\r\\n\\r\\n.meal-wrapper {\\r\\n  max-width: 1280px;\\r\\n  margin: 0 auto;\\r\\n  text-align: center;\\r\\n  padding: 2rem;\\r\\n}\\r\\n\\r\\n.meal-search {\\r\\n  margin: 2rem 0;\\r\\n  margin-top: 0;\\r\\n}\\r\\n\\r\\n.meal-search-box {\\r\\n  margin: 1.2rem 0;\\r\\n  display: flex;\\r\\n  align-items: stretch;\\r\\n  text-align: right;\\r\\n}\\r\\n\\r\\n.search-btn,\\r\\n.seach-control {\\r\\n  width: 100%;\\r\\n}\\r\\n\\r\\n.search-control {\\r\\n  padding: 0 1rem;\\r\\n  color: var(--light-orange);\\r\\n  border: 1px solid var(--light-orange);\\r\\n  border-top-left-radius: 10px;\\r\\n  border-bottom-left-radius: 10px;\\r\\n  outline: 0;\\r\\n}\\r\\n\\r\\n.search-control::placeholder {\\r\\n  color: var(--dark-orange);\\r\\n  font-family: 'Montserrat', sans-serif;\\r\\n}\\r\\n\\r\\n.search-btn {\\r\\n  width: 50px;\\r\\n  height: 50px;\\r\\n  background-color: #b54507;\\r\\n  color: #fff;\\r\\n  border: none;\\r\\n  font-size: 1.5rem;\\r\\n  border-top-right-radius: 10px;\\r\\n  border-bottom-right-radius: 10px;\\r\\n}\\r\\n\\r\\n.meal-result {\\r\\n  margin-top: 2rem;\\r\\n}\\r\\n\\r\\n#meal {\\r\\n  margin: 2rem 0;\\r\\n}\\r\\n\\r\\n.meal-item {\\r\\n  border-radius: 10px;\\r\\n  overflow: hidden;\\r\\n  box-shadow: 0 4px 21px -12px rgba(0, 0, 0, 0.8);\\r\\n  margin: 1.5rem;\\r\\n}\\r\\n\\r\\n.meal-img img {\\r\\n  width: 100%;\\r\\n  display: block;\\r\\n}\\r\\n\\r\\n.meal-name {\\r\\n  padding: 1.5rem 0.5rem;\\r\\n}\\r\\n\\r\\n.meal-name h3 {\\r\\n  font-size: 1rem;\\r\\n  margin-bottom: 1rem;\\r\\n}\\r\\n\\r\\n.meal-name a {\\r\\n  text-decoration: none;\\r\\n  color: #fff;\\r\\n  background-color: var(--dark-orange);\\r\\n  font-weight: 400;\\r\\n  font-size: 1.2rem;\\r\\n  padding: 0.7rem 0.5rem;\\r\\n  border: none;\\r\\n  border-radius: 15px;\\r\\n}\\r\\n\\r\\n/* Meal details  */\\r\\n.meal-details {\\r\\n  position: fixed;\\r\\n  top: 50%;\\r\\n  left: 50%;\\r\\n  transform: translate(-50%, -50%);\\r\\n  color: #fff;\\r\\n  background: var(--light-orange);\\r\\n  padding: 20px;\\r\\n  border-radius: 20px;\\r\\n  height: 70%;\\r\\n  width: 60%;\\r\\n  overflow-y: scroll;\\r\\n}\\r\\n\\r\\n.recipe-close-btn {\\r\\n  position: absolute;\\r\\n  top: 10px;\\r\\n  right: 15px;\\r\\n  color: var(--light-orange);\\r\\n  background: #fff;\\r\\n  outline: none;\\r\\n  border: none;\\r\\n  font-size: 1.5rem;\\r\\n  height: 30px;\\r\\n  width: 30px;\\r\\n  border-radius: 50%;\\r\\n  display: flex;\\r\\n  justify-content: center;\\r\\n  align-items: center;\\r\\n}\\r\\n\\r\\n.recipe-title {\\r\\n  padding: 10px 0;\\r\\n  letter-spacing: 0.1rem;\\r\\n}\\r\\n\\r\\n.recipe-category {\\r\\n  background: #fff;\\r\\n  color: var(--dark-orange);\\r\\n  display: inline-block;\\r\\n  padding: 10px;\\r\\n  border-radius: 25px;\\r\\n  font-weight: 400;\\r\\n  margin-bottom: 1.2rem;\\r\\n}\\r\\n\\r\\n.recipe-instruct {\\r\\n  padding: 1rem 0;\\r\\n}\\r\\n\\r\\n.recipe-instruct p {\\r\\n  font-size: 12px;\\r\\n}\\r\\n\\r\\n.recipe-meal-img img {\\r\\n  width: 200px;\\r\\n  height: 200px;\\r\\n  border-radius: 20px;\\r\\n}\\r\\n\\r\\n.like-button {\\r\\n  background: var(--dark-orange);\\r\\n  color: #fff;\\r\\n  font-size: 1.5rem;\\r\\n  border: none;\\r\\n  outline: 0;\\r\\n  padding: 9px;\\r\\n  border-radius: 10px;\\r\\n  cursor: pointer;\\r\\n  margin-left: 8px;\\r\\n}\\r\\n\\r\\nsmall {\\r\\n  display: block;\\r\\n  font-weight: 400;\\r\\n  font-size: 1rem;\\r\\n  margin-bottom: 1rem;\\r\\n  color: var(--dark-orange);\\r\\n}\\r\\n\\r\\n.footer {\\r\\n  margin-top: 1.2rem;\\r\\n  color: #fff;\\r\\n  font-size: 0.8em;\\r\\n  font-weight: 500;\\r\\n  position: fixed;\\r\\n  bottom: 0;\\r\\n  padding: 1.2rem 0;\\r\\n  background-color: var(--light-orange);\\r\\n  width: 100%;\\r\\n}\\r\\n\\r\\n.footer p {\\r\\n  text-align: center;\\r\\n}\\r\\n\\r\\n.footer p a {\\r\\n  text-decoration: none;\\r\\n  color: rgb(179, 165, 165);\\r\\n}\\r\\n\\r\\n/* Media queries */\\r\\n@media screen and (min-width: 850px) {\\r\\n  #meal {\\r\\n    display: grid;\\r\\n    grid-template-columns: repeat(3, 1fr);\\r\\n    gap: 20px;\\r\\n  }\\r\\n\\r\\n  .meal-item {\\r\\n    margin: 0;\\r\\n  }\\r\\n}\\r\\n\\r\\n@media screen and (min-width: 600px) and (max-width: 849px) {\\r\\n  #meal {\\r\\n    display: grid;\\r\\n    grid-template-columns: repeat(2, 1fr);\\r\\n    gap: 20px;\\r\\n  }\\r\\n\\r\\n  .meal-item {\\r\\n    margin: 0;\\r\\n  }\\r\\n}\\r\\n\\r\\n/* Javascript related styles  */\\r\\n.show {\\r\\n  visibility: visible;\\r\\n}\\r\\n\\r\\n.blur {\\r\\n  filter: blur(8px);\\r\\n}\\r\\n\\r\\n.hide {\\r\\n  visibility: hidden;\\r\\n}\\r\\n\\r\\n#user-comments > li {\\r\\n  font-size: 13px;\\r\\n  text-align: center;\\r\\n  list-style: none;\\r\\n  padding-top: 2px;\\r\\n}\\r\\n\\r\\n.add-comment-header {\\r\\n  margin-top: 10px;\\r\\n}\\r\\n\\r\\nform {\\r\\n  padding-top: 20px;\\r\\n  display: grid;\\r\\n  width: 50%;\\r\\n  margin: auto;\\r\\n}\\r\\n\\r\\nform input,\\r\\nform textarea {\\r\\n  padding: 5px;\\r\\n  margin-bottom: 8px;\\r\\n  outline: none;\\r\\n  border: none;\\r\\n  border-radius: 5px;\\r\\n  font-family: 'Montserrat', sans-serif;\\r\\n}\\r\\n\\r\\nform button {\\r\\n  padding: 5px;\\r\\n  outline: none;\\r\\n  border: none;\\r\\n  border-radius: 5px;\\r\\n  font-family: inherit;\\r\\n  font-weight: 400;\\r\\n  color: var(--light-orange);\\r\\n  width: 30%;\\r\\n}\\r\\n\\r\\nform input::placeholder,\\r\\nform textarea::placeholder {\\r\\n  font-family: 'Montserrat', sans-serif;\\r\\n  color: var(--dark-orange);\\r\\n}\\r\\n\\r\\nform button:hover {\\r\\n  background-color: #b54507;\\r\\n  color: #fff;\\r\\n}\\r\\n\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://capstoneproject2/./src/index.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./src/index.css":
/*!***********************!*\
  !*** ./src/index.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./index.css */ \"./node_modules/css-loader/dist/cjs.js!./src/index.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://capstoneproject2/./src/index.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

eval("\n\nvar stylesInDOM = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n\n  return updater;\n}\n\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://capstoneproject2/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("\n\nvar memo = {};\n/* istanbul ignore next  */\n\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n\n    memo[target] = styleTarget;\n  }\n\n  return memo[target];\n}\n/* istanbul ignore next  */\n\n\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n\n  target.appendChild(style);\n}\n\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://capstoneproject2/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\n\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://capstoneproject2/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\n\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://capstoneproject2/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n\n  var needLayer = typeof obj.layer !== \"undefined\";\n\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n\n  css += obj.css;\n\n  if (needLayer) {\n    css += \"}\";\n  }\n\n  if (obj.media) {\n    css += \"}\";\n  }\n\n  if (obj.supports) {\n    css += \"}\";\n  }\n\n  var sourceMap = obj.sourceMap;\n\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  options.styleTagTransform(css, styleElement, options.options);\n}\n\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n\n  styleElement.parentNode.removeChild(styleElement);\n}\n/* istanbul ignore next  */\n\n\nfunction domAPI(options) {\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\n\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://capstoneproject2/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\n\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://capstoneproject2/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;