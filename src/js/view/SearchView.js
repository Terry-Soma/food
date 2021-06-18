import { elements } from "./base";
// private
const renderRecipe = recipe => {
    const markup = ` 
     <li>
       <a class="results__link" href="#${recipe.recipe_id}">
           <figure class="results__fig">
               <img src="${recipe.image_url}" alt="Test">
           </figure>
           <div class="results__data">
               <h4 class="results__name">${recipe.title}</h4>
               <p class="results__author">${recipe.publisher}</p>
           </div>
        </a>
     </li>`;
     elements.searchResultList.insertAdjacentHTML("beforeend",markup);
    }

export const renderRecipes = (recipes,page=1,resPerpage = 10) => {
    const start = (page-1)*resPerpage;
    const end = page*resPerpage;

    recipes.slice(start,end).forEach( renderRecipe);    
    const totalPages = Math.ceil(recipes.length /resPerpage);
    renderButtons(page,totalPages);
};

 export const Clearsearch = ()=>{
        elements.searchInput.value="";
    }
    export const ClearResultList = ()=>{
        elements.searchResultList.innerHTML ="";
        elements.pageButton.innerHTML="";
    }
const createButton = (page,type,direction)=>`<button class="btn-inline results__btn--${type}" data-goto=${page}>
                                                    <span>Хуудас ${page}</span>
                                                <svg class="search__icon">
                                                     <use href="img/icons.svg#icon-triangle-${direction}"></use>
                                                </svg>
                                            </button>`;
const renderButtons= (currentPage,totalPages)=>{
    let buttons;
    if(currentPage === 1 && totalPages >1){
        buttons = createButton(2,"next","right")/* next prev type */
    }else if(currentPage <totalPages){
        buttons = createButton(currentPage-1,"prev","left");
        buttons += createButton(currentPage+1,"next","right");

        
    }
    else if(currentPage === totalPages){
        buttons=createButton(currentPage-1,"prev","left"); 
    }
    elements.pageButton.insertAdjacentHTML("afterbegin",buttons);
};
export const getInput= () => elements.searchInput.value;
