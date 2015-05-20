//Search GitHub for user's profile info

var searchURL = "https://api.github.com/search/users?";

$('form').submit(function (evt) {
  evt.preventDefault();
  var searchButton = $('#searchButton');
  var searchUser = $('#searchField').val();
  var searchData = {
    q: searchUser,
    format: "json"
  };
  
  var searchFxn = function (data) {
    var users = '<ul>';
    $.each(data.items, function (i, info) {
      users += '<li>' + info.login + '</li>';
      users += '<img src="' + info.avatar_url + '">';
    }); //end of each
    users += '</ul>';
    $('#results').html(users);
    console.log(users);
  };

$.getJSON(searchURL, searchData, searchFxn);
}); //end of form submit function


// var searchGitHub = {
//   searchInput: $('#searchField').val(),
//   searchButton: $('#searchButton').click(this.searchFxn),
//   searchURL: "https://api.github.com/search/users?q=andela-fadebayo",
//   searchData: {
//     login: this.searchInput,
//     format: "json"
//   },
//   searchFxn: function() {

//     console.log(searchGitHub.searchInput)
//   }

// };

// // $.getJSON(url, data, callback);
// // console.log(searchGitHub.searchInput);
// $('form').submit