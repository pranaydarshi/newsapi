const API_KEY = "d67492185285430da513fa5ea9d21cb9";
const API_URL = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load',()=>fetchNews("India"));


function reload(){
    window.location.reload();
}
async function fetchNews(query){
    const res = await fetch(`${API_URL}${query}&apikey=${API_KEY}`)
    const data = await res.json();
    console.log(data)
    bindData(data.articles);
}
function bindData(articles){
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');
    cardsContainer.innerHTML = '';

    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillData(cardClone,article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillData(cardClone,article){
    const newsImg =  cardClone.querySelector('#news-img');
    const newsTitle =  cardClone.querySelector('#news-title');
    const newsSource =  cardClone.querySelector('#news-source');
    const newsDesc =  cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;
    newsSource.innerHTML =`${article.source.name}`

    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank");
    })

}

function onNavItemClick(query){
    fetchNews(query);
}

const searchButton = document.getElementById('search-button');
const searchInp = document.getElementById('news-input')
searchButton.addEventListener('click',()=>{
    const query = searchInp.value;
    if(!query) return;
    fetchNews(query);
})