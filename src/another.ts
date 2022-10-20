
import { Hit, Item, News, hitsInterface } from "./types";

const link = "http://hn.algolia.com/api/v1/search";
const numberOfNews: number = 40;
const displayNewsNumber: number = 30;



async function fetchArticles() {
    const response = await fetch(link);
    const json = await response.json() as hitsInterface;
    return json.hits;
};

async function fetchComments(id: string) {
    const response = await fetch(`http://hn.algolia.com/api/v1/items/${id}`);
    const json = (await response.json()) as Item;

    return json.children.filter((child) => child.type === "comment" && child.text != null || " ");
};


async function fectNews(numberOfNews: number): Promise<News[]> {

    const response = await fetch(`https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=${numberOfNews}`);
    const data = await response.json();
    const news = data.hits;
    return news;
};



async function filterNews(displaynews: number): Promise<News[]> {
    const news = await fectNews(numberOfNews)
        .then((articles) => articles.filter((article) => article.title && article.url != ""))
    const filteredNews = news.slice(0, displaynews);
    return filteredNews;
};

export async function doListNewsWithComments(): Promise<void> {

    try {

        const news: any = await filterNews(displayNewsNumber);
        const newsList: any = document.getElementById('news-list');
        newsList.innerHTML = '';
        news.forEach((news: any) => {
            const li = document.createElement('li');
            const a = document.createElement('a');

            a.href = news.url;
            a.target = "_blank";
            a.innerText = news.title;
            li.appendChild(a);
            newsList.appendChild(li);

            const button = document.createElement('button');
            button.innerText = " open Comments";

            
       
            button.addEventListener('click', async () => {
                
                openComments(button);
                const comments = await fetchComments(news.objectID);
                const commentsList = document.createElement('ul');
                comments.forEach((comment: any) => {
                    const li = document.createElement('li');
                    li.innerText = comment.text;
                    commentsList.appendChild(li);
                });
                once: commentsList.id = "comments";
                li.appendChild(commentsList);
            });
            li.appendChild(button);
        });

    } catch (error) {
        console.log(error);
    }
};


//TODO resolve the issue with the comments & the button
//TODO  add a button to open and close comments
//TODO Regex the comments
//TODO add background dynamic wallpaper
//TODO try to implement toggle https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp



function openCommentsButton(button: any) {
    const comments = document.getElementById('comments');
    if (comments) {
        comments.remove();
    }
    button.innerText = "open Comments";
};

function openComments(button: any) {
    const comments = document.getElementById('comments');
    if (comments) {
        comments.remove();
        button.innerText = "open Comments";
    } else {
        button.innerText = "close Comments";
    }
};



/** older function version of the code
async function getNews() {
     try {
       const response = await fetch('https://hn.algolia.com/api/v1/search');
       const data = await response.json();
       const news: News[] = data.hits
           .filter((item: any) => item.title && item.url && item.title !== '')
           .map((news: any) => (
           {
           title: news.title,
           url: news.url
       }));
       console.log(news);
       return news;
   }
   catch(error) {
       console.log(error);
   }
 };

 async function getNews(numberOfNews: number): Promise<News[]> {

    const news = Promise.all
    ([
        fetch('https://hn.algolia.com/api/v1/search?page=0&hitsPerPage=40')
            .then(response => response.json())
            .then(json => json.hits),
    ])
        .then((articles) => articles)
        .then((articles) => articles.flat())
        .then((articles) => articles.filter((article) => article.title && article.url != ""))
        .then((articles) => articles.map((article) => {
            return {
                title: article.title,
                url: article.url,
            }istOfNews);
    return news
};



export async function doListOfNews(): Promise<void> {
  
    try{
    const news: any = await filterNews(displayNewsNumber);
    const newsList: any = document.getElementById('news-list');
    newsList.innerHTML = '';
    news.forEach((news: any) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = news.url;
        a.target = "_blank";
        a.innerText = news.title;
        li.appendChild(a);
        newsList.appendChild(li);
    });

    }catch(error){
        console.log(error);
    }
};

*/



/** correction of the exercise 
 * 
 async function fectNews() {
    const response = await fetch('https://hn.algolia.com/api/v1/search?page=0&hitsPerPage=30');
    const data = await response.json();
    return json.hits;

function renderNews(news) {

    const main = document.getElementsByTagName('main')[0];
    const ol = document.createElement('ol');

    for (const article of news) {
        const li = document.createElement('li');
        const anchor = document.createElement('a');
        
        anchor.setAttribute('href', article.url);
        anchor.setAttribute('target', '_blank');
        anchor.innerText = article.title;

        li.appendChild(anchor);
        ol.appendChild(li);
    }
    main.appendChild(ol);
}

fectNews().then (renderNews)
  
 */