const API_ENDPOINT = 'https://kitsu.io/api/edge/anime';

async function getTrendingAnime() {
  const response = await fetch(`${API_ENDPOINT}?sort=-averageRating&page[limit]=5`);
  const data = await response.json();
  return data.data;
}

async function showTrendingAnime() {

  const trendingAnime = await getTrendingAnime();


  const container = document.getElementById('trending-anime');


  container.innerHTML = '';

  trendingAnime.forEach(anime => {
    const animeDiv = document.createElement('div');
    const title = document.createElement('h2');
    title.innerHTML = anime.attributes.titles.en_jp;
    animeDiv.appendChild(title);
    container.appendChild(animeDiv);

    title.addEventListener('click', () => {
      const selectedAnime = document.getElementById('selected-anime');

      const img = document.createElement('img');
      img.src = anime.attributes.posterImage.small;
      img.alt = anime.attributes.titles.en_jp;

      const rating = anime.attributes.averageRating / 20;

      const ratingElement = document.createElement('p');
      ratingElement.innerHTML = `Average Rating: ${rating}/5`;
      selectedAnime.innerHTML = '';
   
      selectedAnime.appendChild(img);
      selectedAnime.appendChild(ratingElement);
    });
  });
}


window.addEventListener('load', showTrendingAnime);

async function searchAnime() {
  const animeTitle = document.getElementById('search-input').value;

  const response = await fetch(`${API_ENDPOINT}?filter[text]=${animeTitle}`);
  const data = await response.json();

  const searchResults = document.getElementById('search-results');
  searchResults.innerHTML = '';

  if (data.data.length > 0) {
    const list = document.createElement('ul');

    const selectedAnime1 = document.getElementById('selected-anime-1');
    const selectedAnime2 = document.getElementById('selected-anime-2');
        data.data.forEach(anime => {
          const listItem = document.createElement('li');
          const title = document.createElement('h2');
          title.innerHTML = anime.attributes.titles.en_jp;
    
          title.addEventListener('click', () => {
            searchResults.innerHTML = '';
            selectedAnime1.innerHTML = '';
            selectedAnime2.innerHTML = '';
    
            const img = document.createElement('img');
            img.src = anime.attributes.posterImage.small;
            img.alt = anime.attributes.titles.en_jp;
    
            const rating = anime.attributes.averageRating / 20;
    
            const ratingElement = document.createElement('p');
            ratingElement.innerHTML = `Average Rating: ${rating}/5`;
        if (selectedAnime1.innerHTML === '') {
          selectedAnime1.appendChild(title);
          selectedAnime1.appendChild(img);
          selectedAnime1.appendChild(ratingElement);
        } else if (selectedAnime2.innerHTML === '') {
          selectedAnime2.appendChild(title);
          selectedAnime2.appendChild(img);
          selectedAnime2.appendChild(ratingElement);
        }
      });

      listItem.appendChild(title);

      list.appendChild(listItem);
    });

    searchResults.appendChild(list);
  } else {
    const p = document.createElement('p');
    p.innerHTML = 'No anime found.';
    searchResults.appendChild(p);
  }
}

    

//https://medium.com/@nitinpatel_20236/challenge-of-building-a-calendar-with-pure-javascript-a86f1303267d for reference
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', searchAnime);

async function showCalendar() {

  const response = await fetch(`${API_ENDPOINT}?startDate&page[limit]=20&filter[status]=upcoming`);
  const data = await response.json();
 


  const calendarBody = document.getElementById('calendar-body');


  calendarBody.innerHTML = '';


  const currentDate = new Date();

  let calendarDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);


  const firstDayOfMonth = calendarDate.getDay();


  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();


  let row = document.createElement('tr');


  for (let i = 0; i < firstDayOfMonth; i++) {
    const cell = document.createElement('td');
    row.appendChild(cell);
  }

  for (let i = 1; i < daysInMonth; i++) {

    const cell = document.createElement('td');
    cell.innerHTML = i;


    data.data.forEach(anime => {

      const startDate = new Date(anime.attributes.startDate);

      if (startDate.getFullYear() === calendarDate.getFullYear() && startDate.getDate() === calendarDate.getDate()&& startDate.getMonth() === calendarDate.getMonth() ) {
     
                const title = document.createElement('p');
                title.innerHTML = anime.attributes.titles.en_jp;
        
               
                cell.appendChild(title);
              }
            });
        
          
            row.appendChild(cell);
        
          
            if (calendarDate.getDay() === 6) {
              calendarBody.appendChild(row);
              row = document.createElement('tr');
            }
        
          
            calendarDate.setDate(calendarDate.getDate() + 1);
          }
        
     
          calendarBody.appendChild(row);
        }
        



showCalendar();