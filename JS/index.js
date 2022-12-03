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
     let favouritesCharacterIDs = localStorage.getItem("favouritesCharacterIDs");
     if(favouritesCharacterIDs == null){
          favouritesCharacterIDs = new Map();
     }
     else if(favouritesCharacterIDs != null){
          favouritesCharacterIDs = new Map(JSON.parse(localStorage.getItem("favouritesCharacterIDs")));
     }
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
                         <button class="btn add-to-fav-btn">${favouritesCharacterIDs.has(`${hero.id}`) ? "<i class=\"fa-solid fa-heart-circle-minus\"></i> &nbsp; Remove from Favourites" :"<i class=\"fa-solid fa-heart fav-icon\"></i> &nbsp; Add to Favourites</button>"}
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
                         <span>${hero.thumbnail.path+'/standard_fantastic.' + hero.thumbnail.extension}</span>
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

     let favouriteButton = document.querySelectorAll(".add-to-fav-btn");
     favouriteButton.forEach((btn) => btn.addEventListener("click", addToFavourites));
}

function addToFavourites() {
     // console.log(this.parentElement.parentElement.children[2]);

     if (this.innerHTML == '<i class="fa-solid fa-heart fav-icon"></i> &nbsp; Add to Favourites') {

          let heroInfo = {
               name: this.parentElement.parentElement.children[2].children[0].innerHTML,
               description: this.parentElement.parentElement.children[2].children[1].innerHTML,
               comics: this.parentElement.parentElement.children[2].children[2].innerHTML,
               series: this.parentElement.parentElement.children[2].children[3].innerHTML,
               stories: this.parentElement.parentElement.children[2].children[4].innerHTML,
               portraitImage: this.parentElement.parentElement.children[2].children[5].innerHTML,
               id: this.parentElement.parentElement.children[2].children[6].innerHTML,
               landscapeImage: this.parentElement.parentElement.children[2].children[7].innerHTML,
               squareImage: this.parentElement.parentElement.children[2].children[8].innerHTML
          }

          let favouritesArray = localStorage.getItem("favouriteCharacters");

          if (favouritesArray == null) {
               favouritesArray = [];
          } else {
               favouritesArray = JSON.parse(localStorage.getItem("favouriteCharacters"));
          }

          let favouritesCharacterIDs = localStorage.getItem("favouritesCharacterIDs");

          if (favouritesCharacterIDs == null) {
               favouritesCharacterIDs = new Map();
          } else {
               // getting the map as object from localStorage and pasrsing it and then converting into map 
               favouritesCharacterIDs = new Map(JSON.parse(localStorage.getItem("favouritesCharacterIDs")));
               // favouritesCharacterIDs = new Map(Object.entries(favouritesCharacterIDs));
          }

          favouritesCharacterIDs.set(heroInfo.id, true);
          console.log(favouritesCharacterIDs)

          favouritesArray.push(heroInfo);


          localStorage.setItem("favouritesCharacterIDs", JSON.stringify([...favouritesCharacterIDs]));
          localStorage.setItem("favouriteCharacters", JSON.stringify(favouritesArray));

          this.innerHTML = '<i class="fa-solid fa-heart-circle-minus"></i> &nbsp; Remove from Favourites';
     }
     else{

          let idOfCharacterToBeRemoveFromFavourites = this.parentElement.parentElement.children[2].children[6].innerHTML;

          let favouritesArray = JSON.parse(localStorage.getItem("favouriteCharacters"));
          let favouritesCharacterIDs = new Map(JSON.parse(localStorage.getItem("favouritesCharacterIDs")));

          let newFavouritesArray = [];
          // let newFavouritesCharacterIDs = [];

          favouritesCharacterIDs.delete(`${idOfCharacterToBeRemoveFromFavourites}`);

          favouritesArray.forEach((favourite) => {
               if(idOfCharacterToBeRemoveFromFavourites != favourite.id){
                    newFavouritesArray.push(favourite);
               }
          });

          // console.log(newFavouritesArray)

          localStorage.setItem("favouriteCharacters",JSON.stringify(newFavouritesArray));
          localStorage.setItem("favouritesCharacterIDs", JSON.stringify([...favouritesCharacterIDs]));

          this.innerHTML = '<i class="fa-solid fa-heart fav-icon"></i> &nbsp; Add to Favourites';
          // console.log();
     }


     // console.log(heroInfo.squareImage);




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
          landscapeImage: this.parentElement.parentElement.parentElement.children[2].children[7].innerHTML,
          squareImage: this.parentElement.parentElement.parentElement.children[2].children[8].innerHTML
     }

     localStorage.setItem("heroInfo", JSON.stringify(heroInfo));
}