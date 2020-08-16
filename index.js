'use strict';

const apiKey = 'AIzaSyAMJi2nJRLH9abrPH6lfGuLn9Cv6pwN0zI'; 
const searchYoutubeURL = 'https://www.googleapis.com/youtube/v3/search';


function formatYoutubeQueryParams(youtubeParams) {
  const youtubeQueryItems = Object.keys(youtubeParams)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(youtubeParams[key])}`)
  return youtubeQueryItems.join('&');
}

function displayYoutubeResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the items array
  for (let i = 0; i < responseJson.items.length; i++){
    // for each video object in the items 
    //array, add a list item to the results 
    //list with the video title, description,
    //and thumbnail
    $('#results-list').append(
      `<div class="row">
                <li><h3>${responseJson.items[i].snippet.title}</h3>
                <p>${responseJson.items[i].snippet.description}</p>
                <iframe id="ytplayer" type="text/html" width="200" height="200"
                src="https://www.youtube.com/embed/${responseJson.items[i].id.videoId}?autoplay=0"
                frameborder="1"></iframe>
                </li>
                </div>`
/* <img src='${responseJson.items[i].snippet.thumbnails.default.url}' class="img-thumbnail">*/
         //   https://www.youtube.com/watch?v=${responseJson.items[item].id.videoId}
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
  
// call to Wikipedia API
/*function searchWiki(searchWord) {
    wikiParams.titles = searchWord;
    url = 'https://en.wikipedia.org/w/api.php?action=query&list=search$format=json&ori
gin=*&srsearch='+s);*/
const searchWikiURL = 'https://en.wikipedia.org/w/api.php';


function formatWikiParams(wikiParams) {
      const wikiQueryItems = Object.keys(wikiParams)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(wikiParams[key])}`)
      return wikiQueryItems.join('&');
}
    
    function displayWikiResults(responseJson) {
      // if there are previous results, remove them
      console.log(responseJson);
      $('#wiki-results').empty();
      // iterate through the items array
      for (let i = 0; i < responseJson.items.length; i++){
        // for each wiki object in the items 
        $('#wiki-results').append(
          `<div class="row">
                    <li><h3>${responseJson.items[i].title}</h3>
                    <p>${responseJson.items[i].description}</p>
                    </li>
                    </div>`
        )};
      //display the results section  
      $('#results').removeClass('hidden');
    };
    function getWikiInfo(query, maxResults=1){
      const wikiParams = {
          action: 'query',
          list: 'search',
          prop: 'revisions',
          rvsection: "0",
          srsearch: 'first last',
          origin: '*',
          format: 'json'
        };
      

      const wikiQueryString = formatWikiParams(wikiParams)
      const wikiUrl = `${searchWikiURL}?${wikiQueryString}`;
    
      console.log(wikiUrl);{
    
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
  }

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#murderer').val();
    const maxResults = $('#js-max-results').val();
    getYouTubeVideos(searchTerm, maxResults);
    getWikiInfo(searchTerm,maxResults)
  });
}
$(watchForm);


