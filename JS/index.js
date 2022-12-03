// Public key
// e95944c510a01d437b5749535fdbe983

// Private Key
// b14fafb1b97a7bfc3342f539a4dc3e2a03fc2977

let searchBar = document.getElementById("search-bar");
let searchResults = document.getElementById("search-results");

searchBar.addEventListener("input", () => searchHeros(searchBar.value));

async function searchHeros(textSearched) {
     let PUBLIC_KEY = "e95944c510a01d437b5749535fdbe983";
     let PRIVATE_KEY = "b14fafb1b97a7bfc3342f539a4dc3e2a03fc2977";
     
     let ts = new Date().getTime();
     let hash = CryptoJS.MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();
    
     if (textSearched.length == 0) {
          searchResults.innerHTML=``;
          return;
     }

     await fetch(`http://gateway.marvel.com/v1/public/characters?nameStartsWith=${textSearched}&ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`)
          .then(res => res.json())
          .then(data => showSearchedResults(data.data.results))
}

function showSearchedResults(searchedHero) {
     
     searchResults.innerHTML = ``;
     let count = 1;
     for (const key in searchedHero) {
          // console.log(searchedHero[key].name);
          if(count <= 4){
               // console.log(searchedHero[key])
               // console.log(searchedHero[key].thumbnail.path+'/portrait_medium.' + searchedHero[key].thumbnail.extension)
               let hero = searchedHero[key];
               // console.log(hero)
               searchResults.innerHTML += 
               `
                    <li class="flex-row single-search-result">
                         <div class="flex-row img-info">
                              <img src="${hero.thumbnail.path+'/portrait_medium.' + hero.thumbnail.extension}" alt="">
                              <div class="hero-info">
                                   <a class="character-info" href="./more-info.html">
                                        <span class="hero-name">${hero.name}</span>
                                   </a>
                              </div>
                         </div>
                         <div class="flex-col buttons">
                              <button class="btn add-to-fav-btn"><i class="fa-solid fa-heart fav-icon"></i> &nbsp; Add to Favourites</button>
                         </div>
                         <div style="display:none;">
                         <span>${hero.name}</span>
                         <span>${hero.description}</span>
                         <span>${hero.comics.available}</span>
                         <span>${hero.series.available}</span>
                         <span>${hero.stories.available}</span>
                         <span>${hero.thumbnail.path+'/portrait_uncanny.' + hero.thumbnail.extension}</span>
                         <span>${hero.id}</span>
                         <span>${hero.thumbnail.path+'/landscape_incredible.' + hero.thumbnail.extension}</span>
                         </div>
                    </li>
               `
          }
          count++;
     }
     events();
}

function events() {
     
     let characterInfo = document.querySelectorAll(".character-info");
     characterInfo.forEach((character) => character.addEventListener("click", addInfoInLocalStorage))
}

function addInfoInLocalStorage() {
     
     
     let heroInfo = {
          name: this.parentElement.parentElement.parentElement.children[2].children[0].innerHTML,
          description: this.parentElement.parentElement.parentElement.children[2].children[1].innerHTML,
          comics: this.parentElement.parentElement.parentElement.children[2].children[2].innerHTML,
          series: this.parentElement.parentElement.parentElement.children[2].children[3].innerHTML,
          stories: this.parentElement.parentElement.parentElement.children[2].children[4].innerHTML,
          portraitImage: this.parentElement.parentElement.parentElement.children[2].children[5].innerHTML,
          id: this.parentElement.parentElement.parentElement.children[2].children[6].innerHTML,
          landscapeImage: this.parentElement.parentElement.parentElement.children[2].children[7].innerHTML
     }

     localStorage.setItem("heroInfo", JSON.stringify(heroInfo));
}