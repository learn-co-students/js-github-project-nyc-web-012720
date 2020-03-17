let searchUser = true;

document.addEventListener("DOMContentLoaded", () => {
    // VARIABLES
    const searchForm = document.querySelector('#github-form');
    const userList = document.querySelector('#user-list');
    const repoList = document.querySelector('#repos-list');
    const toggleBtn = document.querySelector('#toggle');
    const h3 = document.querySelector('h3');
    const header = {
        headers: {
            Accept: 'application/vnd.github.v3+json'
        }
    };


    // FUNCTIONS
    const renderUser = (user) => {
        //HTML TO RENDER FOR USER
        const div = document.createElement('div');
        const h2 = document.createElement('h2');
        h2.innerHTML = user.login;
        const img = document.createElement('img');
        img.setAttribute('src', user.avatar_url);
        const a = document.createElement('a');
        a.setAttribute('href', user.html_url);
        a.innerHTML = "Go To Profile";
        userList.appendChild(div);
        div.appendChild(h2);
        div.appendChild(img);
        div.appendChild(a);

        //EVENT LISTENER ADDED FOR GETTING REPOS
        h2.onclick = () => {getRepos(user.login)};
    };

    const renderRepo = (repo) => {
        const div = document.createElement('div');
        const a = document.createElement('a');
        a.setAttribute('href', repo.html_url);
        a.innerHTML = repo.name;
        repoList.appendChild(div);
        div.appendChild(a);
    };

    const getUser = (username) => {
        const url = `https://api.github.com/search/users?q=${username}`;
        fetch(url, header)
            .then(res => res.json())
            .then(json => {
                json.items.forEach(user => {
                    renderUser(user);
                });
            })
            .catch(err => console.log(err));
    };
    
    const getRepos = (username) => {
        const url = `https://api.github.com/users/${username}/repos`;
        fetch(url, header)
            .then(res => res.json())
            .then(json => {
                json.forEach(repo => {
                    renderRepo(repo);
                });
            })
            .catch(err => console.log(err));
    };

    const searchByRepo = (repo) => {
        const url = `https://api.github.com/search/repositories?q=${repo}`;
        fetch(url, header)
            .then(res => res.json())
            .then(json => {
                json.items.forEach(repo => {
                    renderRepo(repo);
                });
            })
            .catch(err => console.log(err.message));
    }


    // EVENT LISTENERS
    searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const searchValue = document.querySelector('#search').value;
        userList.innerHTML = ""
        repoList.innerHTML = ""
        if (searchUser === true){
            getUser(searchValue);
        } else {
            searchByRepo(searchValue);
        };
    });

    toggleBtn.onclick = () => {
        if (searchUser === true) {
            h3.innerText = "Search Repo";
            toggleBtn.innerText = "Search User";
            searchUser = false;
        } else {
            h3.innerText = "Search User";
            toggleBtn.innerText = "Search Repo";
            searchUser = true;
        }
    }
});