document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener('submit', (e) => {
      e.preventDefault();

      const input = document.querySelector("input#search").value;

      fetch(`https://api.github.com/search/users?q=${input}`)
          .then(res => res.json())
          .then(data => {
              displayUsers(data.items);
          })
          .catch(error => {
              console.error('Error fetching users:', error);
          });

      form.reset();
  });

  function displayUsers(users) {
      const userList = document.querySelector("#user-list");
      userList.innerHTML = '';

      users.forEach(user => {
          const userElement = createUserElement(user);
          userList.appendChild(userElement);
      });
  }

  function createUserElement(user) {
      const userElement = document.createElement("div");
      userElement.classList.add("user");

      const avatar = document.createElement("img");
      avatar.src = user.avatar_url;
      userElement.appendChild(avatar);

      const username = document.createElement("h1");
      username.textContent = user.login;
      userElement.appendChild(username);

      const profileLink = document.createElement("a");
      profileLink.href = user.html_url;
      profileLink.textContent = "My Profile";
      userElement.appendChild(profileLink);

      avatar.addEventListener("click", () => {
          fetch(`https://api.github.com/users/${user.login}/repos`)
              .then(res => res.json())
              .then(repos => {
                  displayRepositories(user.login, repos);
              })
              .catch(error => {
                  console.error('Error fetching repositories:', error);
              });
      });

      return userElement;
  }

  function displayRepositories(username, repositories) {
      const reposList = document.querySelector("#repos-list");
      reposList.innerHTML = '';

      const header = document.createElement("h1");
      header.textContent = `${username}'s Repositories`;
      reposList.appendChild(header);

      repositories.forEach(repo => {
          const repoElement = document.createElement("li");
          repoElement.textContent = repo.name;
          reposList.appendChild(repoElement);
      });
  }
}); 