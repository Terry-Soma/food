import Search from './model/Search';
import {elements,renderLoader,clearLoader} from './view/base';
import * as SearchView from './view/SearchView';
import Recipe from './model/Recipe';
import {renderRecipe, clearRecipe, highlight} from './view/RecipeView';
import List from './model/List';
import Like from './model/Like';
import * as listView from './view/listView';
import * as likesView from './view/likesView';

const state = {};


/* MVC 
    controller indexjs 
    MODEL ===> ? CONTROLLER ? << VIEW
*/
const controlSearch = async ()=>{
  const query= SearchView.getInput();
  if(query){
    state.search = new Search(query);
    /* input iig clean hiih */SearchView.Clearsearch();
    /* li -g tseverleh */SearchView.ClearResultList();
    renderLoader(elements.searchResultDiv);
    await state.search.doSearch();

    clearLoader();
    if(state.search.result ===undefined) alert("Жор олдсонгүй ....");
    else SearchView.renderRecipes(state.search.result);
  }

}
elements.searchform.addEventListener("submit",e=>{
  e.preventDefault();
  controlSearch();
});
elements.pageButton.addEventListener("click", e=>{
  const btn = e.target.closest(".btn-inline");
  if(btn){
    const num = parseInt(btn.dataset.goto,10);  
    /* li -g tseverleh  buttong */
    SearchView.ClearResultList();
    SearchView.renderRecipes(state.search.result,num);
  }
});

// const r = new Recipe(47746);
// r.getRecipe();
 const controlRecipe = async ()=>{
  const id = window.location.hash.replace('#','');
  
  if(id){
    state.recipe = new Recipe(id);
    clearRecipe();/* ui tseverleh */
    renderLoader(elements.recipeDiv);
    highlight(id);
    await state.recipe.getRecipe();
    clearLoader();
    state.recipe.calcTime();
    state.recipe.calcPorts();
    renderRecipe(state.recipe,state.like.isLiked(id));
  }
};
window.addEventListener("hashchange",controlRecipe);
window.addEventListener("load",controlRecipe);
window.addEventListener("load",e=>{
  if(!state.like) state.like = new Like();

  likesView.toggleLikeMenu(state.like.getNumberOfLikes());
  state.like.likes.forEach(like=> likesView.renderLike(like));


});
// ["hashchange","load"].forEach(el=> window.addEventListener(e,controlRecipe));
const controlList = ()=>{
  state.list = new List();
  listView.clearList();
  state.recipe.ingredients.forEach(e => {
    const item = state.list.addItem(e);
    listView.renderItem(item);
  
  });

};
const controlLike = ()=>{
  
  /* bug */
  if(!state.like) state.like = new Like();
  const currentRecipeId = state.recipe.id;
  if(state.like.isLiked(currentRecipeId)){
    /* rem   like */
    
    state.like.deleteLike(currentRecipeId);
    console.log(state.like);
    likesView.deleteLike(currentRecipeId)
    likesView.toggleLikeBtn(false);

  }else{
    const newLike = state.like.addLike(currentRecipeId,state.recipe.title,state.recipe.publisher,state.recipe.image_url);
    console.log(state.like);
    likesView.toggleLikeBtn(true);
    
/* add  */
likesView.renderLike(newLike);
  }
  likesView.toggleLikeMenu(state.like.getNumberOfLikes());

};




elements.recipeDiv.addEventListener("click",e=>{
    if(e.target.matches(".recipe__btn, .recipe__btn *")){
      controlList();
    }else if(e.target.matches(".recipe__love, .recipe__love *")){
      controlLike();
    }
});

elements.shopList.addEventListener("click",e=>{
    const id = e.target.closest(".shopping__item").dataset.itemid;

    if(id) {
      state.list.deleteItem(id);
      listView.deleteList(id);    }
    });
