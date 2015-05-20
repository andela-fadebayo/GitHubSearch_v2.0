//GitHub Users and Repos Search implemented using OLP - Object Literal Pattern
//Fiyin Simeon Adebayo | Andela 2014
//3rd December, 2014

var searchGitHub = {
  searchURL: "https://api.github.com/search/users?",
  repoURL: "https://api.github.com/search/repositories?",
  searchInput: $('#searchField'),
  searchUsersButton: $('#searchUsersButton'),
  searchReposButton: $('#searchReposButton'),
  
  status: function(display) {
            $("#status").html(display);
          },

  initialize: function () {
                $('form').submit(function (evt) {
                  evt.preventDefault();

                  if (searchGitHub.searchInput.val() === "") {
                    searchGitHub.status("Please enter a username to search!!!")
                  }

                  else {
                  searchGitHub.searchInput.prop("disabled", true);
                  searchGitHub.searchUsersButton.attr("disabled", true).val("Searching...");
                  var searchData = {
                    q: searchGitHub.searchInput.val(),
                    per_page: 200,
                    // sort: "joined",
                    format: "json"
                  };
                  
                  var searchFxn = function (data) {
                    if (data.total_count === 0) {
                      searchGitHub.status("Sorry, there's no user with the username <strong>'" + searchGitHub.searchInput.val() + "'</strong>.");
                    }
                    else {
                      searchGitHub.status("Your search returned <strong>" + data.total_count + "</strong> users.");
                      var users = '<ul>';
                      $.each(data.items, function (i, info) {
                        users += '<li class="lists">';
                        users += '<img src="' + info.avatar_url + '" alt="' + info.login + '" width="200" height="200"><br /><br />';
                        users += 'Login: <label>' + info.login + '</label><br />';
                        users += 'id: <label>' + info.id + '</label><br />';
                        users += 'Score: <label>' + info.score + '</label><br />';
                        users += 'Type: <label>' + info.type + '</label><br />';
                        users += '<a href="' + info.html_url + '">Open Profile</a><br />';
                        users += '</li>';
                  }); //end of .each loop
                  users += '</ul>';
                  $('#results').html(users);
                } //end of searchFxn data.total_count if-else
                  searchGitHub.searchInput.prop("disabled", false);
                  searchGitHub.searchUsersButton.attr("disabled", false).val("Search Users");
                  searchGitHub.searchInput.val("");
                }; //end of searchFxn
                $.getJSON(searchGitHub.searchURL, searchData, searchFxn);
                }//end of validation if-else
                }); //end of form submit function
              },

  reposClick: function() {
                if (searchGitHub.searchInput.val() === "") {
                    searchGitHub.status("Please enter a repository name to search!!!")
                  } //end of if

                  else {
                    searchGitHub.searchInput.prop("disabled", true);
                    searchGitHub.searchReposButton.attr("disabled", true).val("Searching...");
                    
                    var reposData = {
                    q: searchGitHub.searchInput.val(),
                    per_page: 200,
                    format: "json"
                  };

                  var repoFxn = function (data) {                    
                    if (data.total_count === 0) {
                      searchGitHub.status("Sorry, there is no <strong>" + searchGitHub.searchInput.val() + "</strong> repository on GitHub");
                    }
                    else {
                      searchGitHub.status("Your search returned <strong>" + data.total_count + "</strong> repositories.");
                      var repos = '<ul>';
                      $.each(data.items, function (i, repo) {
                        repos += '<li class=lists>';
                        repos += '<a href="' + repo.owner.avatar_url + '"><img src="' + repo.owner.avatar_url + '" alt="' + repo.owner.login + '" width="100" height="100"></a><br /><br />';
                        repos += 'Repo Name: <label><div class="desc">' + repo.name + '</div></label><br />';
                        repos += 'Repo Owner: <label>' + repo.owner.login + '</label><br />';
                        repos += 'Repo id: <label>' + repo.id + '</label><br />';
                        repos += 'Description: <label><div class="desc">' + repo.description + '</div></label><br />';
                        repos += 'Size: <label>' + repo.size + '</label><br />';
                        repos += 'Watchers: <label>' + repo.watchers + '</label><br />';
                        repos += 'Language: <label>' + repo.language + '</label><br />';
                        repos += '<a href="' + repo.html_url + '">View/Clone Repo</a><br />';
                        repos += '</li>';
                      }); //end of .each loop
                      repos += '</ul>';
                      $('#results').html(repos);
                    } //end of data.total_count if-else
                    searchGitHub.searchInput.prop("disabled", false);
                    searchGitHub.searchReposButton.attr("disabled", false).val("Search Repos");
                    searchGitHub.searchInput.val("");
                    // searchGitHub.status("");
                  }; //end of repoFxn
                  $.getJSON(searchGitHub.repoURL, reposData, repoFxn);
                  } //end of if-else
              }
};
searchGitHub.initialize();
$('#searchReposButton').click(searchGitHub.reposClick);