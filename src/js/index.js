import Search from './model/Search';
import {elements,renderLoader,clearLoader} from './view/base';
import * as SearchView from './view/SearchView';
import Recipe from './model/Recipe';
// 
// let search = new Search("pasta");
// search.doSearch().then(res => console.log(res));
// 
// web app tuluv
// hamgiin amarhan 
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
  state.recipe = new Recipe(id);

  await state.recipe.getRecipe();
  state.recipe.calcTime();
  state.recipe.calcPorts();
  console.log(state.recipe);

};
window.addEventListener("hashchange",controlRecipe)