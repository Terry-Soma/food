import Search from './model/Search';
// 
// let search = new Search("pasta");
// search.doSearch().then(res => console.log(res));
// 
// web app tuluv
// hamgiin amarhan 
const state = {};

const controlSearch = async ()=>{
  const query="pizza";
  if(query){
    state.search = new Search(query);
    await state.search.doSearch();
    console.log(state.search.result);
  } 

}
document.querySelector(".search").addEventListener("submit",e=>{
  e.preventDefault();
  controlSearch();
});