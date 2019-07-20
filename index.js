'use strict'

const apiKey = '3514eoumgoMaMiQb6fIcueEmdwUJAzdqeWDflvGt'

const searchURL = 'https://developer.nps.gov/api/v1/parks?'

function formatQueryParams(params) {
    const queryItems = Object.keys(params).map(key =>`${encodeURIComponent(key)}=${encodeURIComponent(params[key])} `)
    console.log(queryItems)
    return queryItems.join('&')
}

function displayResults(responseJson) {
    console.log(responseJson);
    $('#results-list').empty()
    for (let i = 0; i <responseJson.data.length; i++){
        $('#results-list').append(
            `<li><h3>${responseJson.data[i].fullName}</h3>
            <p>${responseJson.data[i].description}</p>
            <p><a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a></p>
            </li>`
          )};
          
          $('#results').removeClass('hidden');
      
}

function getParks(query, limit=10) {
    const params = {
        stateCode: query, 
        limit,
        api_key: apiKey,
    };
    const queryString = formatQueryParams(params);
    const url = searchURL + queryString;
    console.log(url)

    fetch(url)
        .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
};

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        let states = $('.text').val();
        const limit = $('.max-results').val();
        getParks(states, limit);
        
    })
}

watchForm();