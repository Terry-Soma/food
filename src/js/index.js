import Search from './model/Search';
import {elements} from './view/base';
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
    await state.search.doSearch();


    if(state.search.result ===undefined) alert("Жор олдсонгүй ....");
    else SearchView.renderRecipes(state.search.result);
  }

}
elements.searchform.addEventListener("submit",e=>{
  e.preventDefault();
  controlSearch();
});