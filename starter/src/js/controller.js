import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { MODAL_CLOSE_SEC } from './config.js';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import BookmarksView from './views/bookmarksView.js';
import bookmarksView from './views/bookmarksView.js';
import AddRecipeView from './views/addRecipeView.js';
import addRecipeView from './views/addRecipeView.js';

document.addEventListener('DOMContentLoaded', function () {
  // if (module.hot) {
  //   module.hot.accept();
  // }

  const recipeContainer = document.querySelector('.recipe');

  const controlRecipe = async function () {
    try {
      const id = window.location.hash.slice(1);

      if (!id) return;
      recipeView.renderSpinner();

      // 0) Results view to mark selected search results
      resultsView.update(model.getSearchResultsPage());

      // 1) Load recipe
      await model.loadRecipe(id);
      // 2) Render recipe
      recipeView.render(model.state.recipe);
      // 3) Updating book marks view
      bookmarksView.update(model.state.bookMarks);
      // console.log(model.state.recipe);
    } catch (err) {
      recipeView.renderError();
    }
  };
  const controlSearchResults = async function () {
    try {
      resultsView.renderSpinner();
      //1)get search query
      const query = searchView.getQuery();
      if (!query) return;

      //2) load search query
      await model.loadSearchResults(query);
      // console.log(model.loadSearchResults(query));

      //3) render serch results
      // resultsView.render(model.state.search.results);
      resultsView.render(model.getSearchResultsPage());

      // 4) render pagination buttons
      paginationView.render(model.state.search);
    } catch (err) {
      resultsView.renderError();
    }
  };

  const pagenationController = function (gotoPage) {
    // 1) render NEW serch results
    resultsView.render(model.getSearchResultsPage(gotoPage));
    // 2) render NEW pagination buttons
    paginationView.render(model.state.search);
  };

  const controlServings = function (newServings) {
    // update the recepie servigs in the state
    model.updateServings(newServings);
    // update the recipe view
    recipeView.update(model.state.recipe);
  };

  const controlAddBookmark = function () {
    // 1) add or delete the bookmarks
    if (!model.state.recipe.bookmarked) model.addBookMarks(model.state.recipe);
    else if (model.state.recipe.bookmarked)
      model.deleteBookMark(model.state.recipe.id);
    // 2)Update recipe view
    recipeView.update(model.state.recipe);

    //3)render bookmarks
    bookmarksView.render(model.state.bookMarks);
  };

  const controlBookmarks = function () {
    bookmarksView.render(model.state.bookMarks);
  };

  const controlAddRecipe = async function (newRecipe) {
    // Upload the new recipe data
    try {
      // render spinner
      addRecipeView.renderSpinner();

      await model.uploadRecipe(newRecipe);

      //render recipe view
      recipeView.render(model.state.recipe);

      //render bookmark view
      bookmarksView.render(model.state.bookMarks);

      //change ID url
      window.history.pushState(null, '', `#${model.state.recipe.id}`);

      //close form window
      setTimeout(function () {
        addRecipeView.toggleWindow();
      }, MODAL_CLOSE_SEC * 1000);
    } catch (err) {
      addRecipeView.renderError(err.message);
    }
  };

  const init = function () {
    bookmarksView.addHandlerRender(controlBookmarks);
    recipeView.addHandlerRender(controlRecipe);
    searchView.addHandlerSearch(controlSearchResults);
    recipeView.addHandlerUpdateServings(controlServings);
    recipeView.addHandlerAddBookmark(controlAddBookmark);
    paginationView.addHandlerClick(pagenationController);
    AddRecipeView.addhandlerUpload(controlAddRecipe);
  };
  init();
});
