'use strict';

// put your own value below!
const apiKey = 'wLiIIaJUfSL1AbJCoq0zkP3FtSqgsDwiCDIueZiX'; 
const searchURL = 'https://api.nps.gov/api/v1/parks';

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the items array
  for (let i = 0; i < responseJson.data.length; i++){
    // for each Park object in the data 
    //array, add a list item to the results 
    $('#results-list').append(
      `<h2>${responseJson.data[i].fullName}</h2><li><h3>${responseJson.data[i].description}</h3><p>${responseJson.data[i].addresses[0].line1}<br>${responseJson.data[i].addresses[0].city},${responseJson.data[i].addresses[0].stateCode}<br>${responseJson.data[i].addresses[0].postalCode}</p><a href="url">${responseJson.data[i].url}</li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getNationalParks(query, maxResults=10) {
  const params = {
    key: apiKey,
    q: query,
    fields: 'addresses',
    maxResults,
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

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
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getNationalParks(searchTerm, maxResults);
  });
}

$(watchForm);