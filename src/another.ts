
//https://hn.algolia.com/api/v1/search?

// do a list of news 30 news from hacker news api 

const numberOfNews = 30;

interface News {
    title: string;
    url: string;
};

async function getNews(numberOfNews: number): Promise<News[]> {

    const news = Promise.all
    ([
        fetch('https://hn.algolia.com/api/v1/search?page=0&hitsPerPage=20')
            .then(response => response.json())
            .then(json => json.hits),
        fetch('https://hn.algolia.com/api/v1/search?page=1&hitsPerPage=20')
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
            }
        })).then((articles) => articles.slice(0, numberOfNews));
    return news
};


/*
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
*/
// do a list of news 30 news from hacker news api

export async function doListOfNews(): Promise<void> {

    const news: any = await getNews(numberOfNews);
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
}


/*
  
  const news : any = await getNews();
  const list = document.getElementById('list');
  if (list) {
      for(let i = 0; i < 30; i++) {
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.href = news.url;
          a.innerText = news.title;
          li.appendChild(a);
          list.appendChild(li);
      }
      console.log(news)
  }
  */




