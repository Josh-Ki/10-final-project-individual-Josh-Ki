const API_ENDPOINT = 'https://kitsu.io/api/edge/anime';

// Function to make API request and display the anime image on the screen
async function searchAnime() {
  // Get the anime title entered by the user
  const animeTitle = document.getElementById('search-input').value;

  // Make the API request to search for the anime
  const response = await fetch(`${API_ENDPOINT}?filter[text]=${animeTitle}`);
  const data = await response.json();

  // Clear any existing search results
  const searchResults = document.getElementById('search-results');
  searchResults.innerHTML = '';

  // Check if the search returned any results
  if (data.data.length > 0) {
    // Create an unordered list element for the search results
    const list = document.createElement('ul');

    // Loop through the results
    data.data.forEach(anime => {
      // Create a list item element
      const listItem = document.createElement('li');

      // Create a `h2` element to display the anime title
      const title = document.createElement('h2');
      title.innerHTML = anime.attributes.titles.en_jp;

      // Add an event listener to the title to handle selection
      title.addEventListener('click', () => {
        // Clear the selected anime
        searchResults.innerHTML = '';
        const selectedAnime = document.getElementById('selected-anime');
        selectedAnime.innerHTML = '';

        // Create an image element to display the anime image
        const img = document.createElement('img');
        img.src = anime.attributes.posterImage.small;
        img.alt = anime.attributes.titles.en_jp;

        // Convert the rating to be out of 5 stars
        const rating = anime.attributes.averageRating / 2;

        // Create a `p` element to display the anime's average rating
        const ratingElement = document.createElement('p');
        ratingElement.innerHTML = `Average Rating: ${rating/20}/5`;

        // Add the image, title, and rating to the selected anime element
        selectedAnime.appendChild(title);
        selectedAnime.appendChild(img);
        selectedAnime.appendChild(ratingElement);
      });

      // Add the title to the list item
      listItem.appendChild(title);

      // Add the list item to the list
      list.appendChild(listItem);
    });

    // Add the list to the search results element
    searchResults.appendChild(list);
  } else {
    // If the search returned no results, display an error message
    const p = document.createElement('p');
    p.innerHTML = 'No anime found.';
    searchResults.appendChild(p);
  }
}



// Listen for clicks on the search button
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', searchAnime);
