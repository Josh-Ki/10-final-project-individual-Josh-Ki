// script.js

const API_ENDPOINT = 'https://kitsu.io/api/edge/anime';

// Function to make API request and display the anime image on the screen
async function searchAnime() {
  // Get the anime title entered by the user
  const animeTitle = document.getElementById('search-input').value;

  // Make the API request to search for the anime
  const response = await fetch(`${API_ENDPOINT}?filter[text]=${animeTitle}`);
  const data = await response.json();

  // Get the first result from the search (if any)
  const anime = data.data[0];

  // Check if the anime was found
  if (anime) {
    // Create an image element to display the anime image
    const img = document.createElement('img');
    img.src = anime.attributes.posterImage.small;
    img.alt = anime.attributes.titles.en_jp;

    // Create a `h2` element to display the anime title
    const title = document.createElement('h2');
    title.innerHTML = anime.attributes.titles.en_jp;

    // Clear any existing anime images on the screen
    const animeImage = document.getElementById('anime-image');
    animeImage.innerHTML = '';

    // Add the new anime image and title to the screen
    animeImage.appendChild(title);
    animeImage.appendChild(img);
  } else {
    // If the anime was not found, display an error message
    const animeImage = document.getElementById('anime-image');
    animeImage.innerHTML = 'Anime not found.';
  }
}

// Listen for clicks on the search button
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', searchAnime);
