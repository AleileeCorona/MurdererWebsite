(function () {

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






