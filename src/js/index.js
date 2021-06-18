import Search from './model/Search';
import {elements,renderLoader,clearLoader} from './view/base';
import * as SearchView from './view/SearchView';
// 
// let search = new Search("pasta");
// search.doSearch().then(res => console.log(res));
// 
// web app tuluv
// hamgiin amarhan 
const state = {};

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