'use strict';

const apiKey = 'AIzaSyDJsiWIrL8I583xvsI2OYHSNr13TQza-Go'; 
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
    url = 'https://en.wikipedia.org/w/api.php?action=query&list=search$format=json&origin=*&srsearch='+s);*/

const searchWikiURL = 'https://en.wikipedia.org/w/api.php';


/*function formatWikiParams(wikiParams) {
      const wikiQueryItems = Object.keys(wikiParams)*/
 
    
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

      const wikiParams = {
          action: 'query',
          prop: 'revisions',
          rvprop: 'content',
          rvsection: "0",
          format: 'json'
        };

     // const wikiQueryString = formatWikiQueryParams(wikiParams)
      const wikiUrl = `${searchWikiURL}?${wikiParams}`;
    
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




function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#murderer').val();
    const maxResults = $('#js-max-results').val();
    getYouTubeVideos(searchTerm, maxResults);
    getWikiInfo(searchTerm);
  });
}


$(watchForm);




























/*(function () {

    'use strict';
    
    const apiKey = '378700-AleileeC-8647F6MV'; 
    
    const searchURL = 'https://tastedive.com/api/similar';
    
    
    
    $("form").on('submit', function (e) {
         e.preventDefault();
         $('.loading').removeClass('hide');
         $('#err').addClass('hide');

        const murderer = $('#murderer').val();
            if (!murderer) {
                return errCreator('You must choose a murderer!');
            }

        const result = $('#maxresult').val();
        const murdererTransformed = murderer;
            $.ajax(`${searchURL}?q=${murdererTransformed}&k=${apiKey}&info=1&limit=${result}`, {
                dataType: "jsonp" 
            })
                .then(resp => {
                    if (!resp.Similar) {
                        throw new Error(resp.status);
                    }
                    return resp;
                })
                .then(resp => {
                    const { Similar: data } = resp;

                    const urls = data.Info.reduce((acc, curr) => {
                        return acc += `
                        <div class='card mt-4'>
                            <h4 class='card-title'>${curr.Name}</h4>
                            <div class='card-body'>
                                <blockquote>${curr.wTeaser}</blockquote>
                                <p><b>Wikipedia: </b><a href='${curr.wUrl}' target='_blank'  >${curr.Name}</a></p>
                                <p><b>YouTube: </b><a href='${curr.yUrl}' target='_blank'  >${curr.Name}</a></p>
                            </div>
                        </div>
                        `;
                    }, '');

                    let html = data.Results.reduce((acc, curr) => {
    
                        return acc += `
                        <div class="card mt-2">
                            <div class="card-body">
                                <p><b>Full Name: </b>${curr.Name}</p>
                                <p><b>Type: </b>${curr.Type}</p>
                                
                            </div>
                        </div>
                        `
                    }, '');
                    html += urls;
                    $('#results').html(html);
                })
                .catch(err => {
                    errCreator(err.message);
                })
                $('.loading').addClass('hide');
      });
    
      function errCreator(message) {
            $('#err').removeClass('hide').html(`Error: [${message}]`);
        }
    
    })()
*/