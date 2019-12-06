'use strict';

function pingGitHub(searchTerm) {
    fetch(`https://api.github.com/search/repositories?q=user:${searchTerm}`)
    .then(result => result.json())
    .then(resultJson => {
        if (resultJson.status === 'error') {
            displayError();
        } else {
            displayResults(resultJson);
        }
        console.log(resultJson);
      })
    .catch(error => alert('Something went wrong. Try again later.')); 
    }

function displayError() {
    $('.feedback').text("User Not Found")
}
    
function displayResults(resultJson) {
    $('.results-list').empty();
    for (let i=0; i<resultJson.items.length; i++) {
    $(".results-list").append(
        `${resultJson.items[i].name}<br>
        <a href="${resultJson.items[i].html_url}">Repo_Link</a><br>`)
    }
    $('.results').removeClass('hidden');
}
    
function addEventListener() {
    $("form").submit(e=>{
        e.preventDefault();
        $('.feedback').text('');
        let searchTerm = $("input[type=text]").val();
        pingGitHub(searchTerm);
    })
}
    
$(function() {
    addEventListener();
})
    // fetch(`https://api.github.com/search/repositories?q=${searchTerm}&sort=stars&order=desc`)
    // fetch(`https://api.github.com/search/users?q=${searchTerm}`)