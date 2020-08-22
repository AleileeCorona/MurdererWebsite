'use strict';

const apiKey = 'AIzaSyCYdH7Yo2czVIJecSn_9CV2ooOuJjv2N3s'; 
const searchYoutubeURL = 'https://www.googleapis.com/youtube/v3/search';


function formatYoutubeQueryParams(youtubeParams) {
  const youtubeQueryItems = Object.keys(youtubeParams)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(youtubeParams[key])}`)
  return youtubeQueryItems.join('&');
}

function displayYoutubeResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#youtube-results-list').empty();
  // iterate through the items array
  for (let i = 0; i < responseJson.items.length; i++){
    // for each video object in the items 
    //array, add a list item to the results 
    //list with the video title, description,
    //and thumbnail
    $('#youtube-results-list').append(
      `<div class="content">
          <div class="boxshadow">
                <h5 class="boxtitle youtubetitle">${responseJson.items[i].snippet.title}</h5>
                  <span class="title style">            
                <iframe id="ytplayer" type="text/html" width="200" height="200"
                src="https://www.youtube.com/embed/${responseJson.items[i].id.videoId}?autoplay=0"
                frameborder="1">
                </iframe>
                <p>${responseJson.items[i].snippet.description}</p>
                </div>`

    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getYouTubeVideos(query, maxResults=5) {
  const youtubeParams = {
   part: 'snippet', 
   maxResults,
// id: 'string',
   key: apiKey,
   q: query,
  // items: 'list'
  };
  const youtubeQueryString = formatYoutubeQueryParams(youtubeParams)
  const url = `${searchYoutubeURL}?${youtubeQueryString}`;

  console.log(url);

  fetch(url)
    .then(response => {
        console.log(response)
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayYoutubeResults(responseJson))
    .catch(err => {
      $('#err').text(`Something went wrong: ${err.message}`);
    });
}

//display the wikipedia results
 function displayWikiResults(responseJson) {
  const pageid= Object.keys(responseJson.query.pages)[0]
  const { extract } = responseJson.query.pages[pageid]
  $('#wiki-results').html(extract)
  $('#results').removeClass('hidden');
};
//make a call to wikipedia
function getWikiInfo(query){
  const cors = `https://cors-anywhere.herokuapp.com/`
  const wiki = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&redirects=1&titles=${query}`
  const wikiUrl = `${cors}${wiki}`
  fetch(wikiUrl)
    .then(response => {
        console.log(response)
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayWikiResults(responseJson))
    .catch(err => {
      $('#err').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#murderer').val();
    const maxResults = $('#js-max-results').val();
    getYouTubeVideos(searchTerm, maxResults);
    getWikiInfo(searchTerm)
  });
}
$(watchForm);

