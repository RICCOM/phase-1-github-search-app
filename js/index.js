
  function fetchUser(name) {
    const apiUrl = `https://api.github.com/search/users?q=${name}`;
    const headers = {
      'Accept': 'application/vnd.github.v3+json',
    };
  
    fetch(apiUrl, { headers })
      .then((res) => res.json())
      .then((data) => {
        clearPreviousResults();
        renderUsers(data.items);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }
  
  function clearPreviousResults() {
    document.querySelector("#user-list").innerHTML = "";
    document.querySelector("#repos-list").innerHTML = "";
  }
  
  function renderUsers(users) {
    users.forEach((user) => {
      const userCard = createUserCard(user);
      document.querySelector("#user-list").appendChild(userCard);
    });
  }
  
  function createUserCard(user) {
    const userCard = document.createElement("li");
    userCard.className = "all-users";
    userCard.innerHTML = `
      <div class='content'>
        <h3>User: ${user.login}</h3>
        <p>URL: ${user.html_url}</p>
        <div class='repos'>
          <button class='repo-button' style='margin-bottom: 25px'>Repositories</button>
        </div>
        <img src='${user.avatar_url}' />
      </div>`;
  
    userCard.querySelector(".repo-button").addEventListener("click", () => {
      fetchUserRepos(user.repos_url);
    });
  
    return userCard;
  }
  
  function fetchUserRepos(reposUrl) {
    fetch(reposUrl)
      .then((res) => res.json())
      .then((repos) => {
        clearPreviousRepos();
        renderUserRepos(repos);
      })
      .catch((error) => {
        console.error("Error fetching repositories:", error);
      });
  }
  
  function clearPreviousRepos() {
    document.querySelector("#repos-list").innerHTML = "";
  }
  
  function renderUserRepos(repos) {
    repos.forEach((repo) => {
      const repoItem = document.createElement("li");
      repoItem.textContent = repo.name;
      document.querySelector("#repos-list").appendChild(repoItem);
    });
  }
  