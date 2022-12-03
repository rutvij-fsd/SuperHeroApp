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
                    </li>
               `
          }
          count++;
     }
}