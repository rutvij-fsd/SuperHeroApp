// Public key
// e95944c510a01d437b5749535fdbe983

// Private Key
// b14fafb1b97a7bfc3342f539a4dc3e2a03fc2977

let PUBLIC_KEY = "e95944c510a01d437b5749535fdbe983";
let PRIVATE_KEY = "b14fafb1b97a7bfc3342f539a4dc3e2a03fc2977";

let ts = new Date().getTime();
let hash = CryptoJS.MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();
console.log(hash);

// console.log(fetch(`http://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`
// ));

fetch(`http://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`)
.then(res => res.json())
.then(res => console.log(res.data.results))


console.log(`http://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`);
function run(){

     window.open(`http://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`
     ,'_blank');
}
// document.addEventListener("DOMContentLoaded",function(){
// })