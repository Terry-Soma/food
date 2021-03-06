export const elements = {
    searchform : document.querySelector(".search"),
    searchInput: document.querySelector(".search__field"),
    searchResultList: document.querySelector(".results__list"),
    searchResultDiv: document.querySelector(".results"),
    pageButton: document.querySelector(".results__pages"),
    recipeDiv:document.querySelector(".recipe"),
    shopList: document.querySelector(".shopping__list"),
    likeMenu : document.querySelector(".likes__field"),
    likeList : document.querySelector(".likes__list")
};

export const renderLoader = parent=> {
    const loader = `<div class="${elementString.loader}">
                        <svg>
                             <use href="img/icons.svg#icon-cw"></use>
                        </svg>
                    </div>`;
  parent.insertAdjacentHTML("afterbegin",loader);
};
export const clearLoader= ()=>{
    const loader = document.querySelector(`.${elementString.loader}`);
    if(loader) loader.parentElement.removeChild(loader);
};

export const elementString= {
    loader:"loader"
}
