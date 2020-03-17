document.addEventListener("DOMContentLoaded", function(){
    userList = document.getElementById("user-list")
    form = document.getElementById('github-form')
    
    // addFormSubmissionListener()
    addProfileClickListener()
    addNewSearchButton()
})

function addFormSubmissionListener(){
    
    form.addEventListener("click", function(event){
        event.preventDefault()
        let keyword = event.target.search.value
        fetch(`https://api.github.com/search/users?q=${keyword}`, {
            headers: {Accept: "application/vnd.github.v3+json"}
        })
        .then(resp => resp.json())
        .then(json => json.items.forEach(item => renderUserSearchResults(item)))
        
        form.reset()
    })
}

function renderUserSearchResults(user){
    let li = document.createElement('li')
    li.className = "proflie-container"
    li.innerHTML = `
    <h2>${user.login}</h2>
    <img class="profile-pic" src=${user.avatar_url}>
    <p><a href=${user.url}>Profile Link</a></p>
    `

    userList.append(li)
}

function addProfileClickListener(){
    document.addEventListener("click", function(event){
        switch (event.target.className) {
            case "profile-pic":
                let parentNode = event.target.parentNode
                let username = parentNode.getElementsByTagName('h2')[0].innerText
                let repoList = document.createElement('div')
                repoList.className = "repo-list"
                parentNode.append(repoList)
                removeAllExcept(parentNode)
                searchForRepos(username)
                break;
            case "user-search":
                event.preventDefault()
                let keyword = event.target.parentNode.search.value
                fetch(`https://api.github.com/search/users?q=${keyword}`, {
                    headers: {Accept: "application/vnd.github.v3+json"}
                })
                .then(resp => resp.json())
                .then(json => json.items.forEach(item => renderUserSearchResults(item)))
        
                form.reset()
                break;
            case "repo-search":
                // let repoList = document.createElement('div')
                // repoList.className = "repo-list"
                event.preventDefault()
                fetch(`https://api.github.com/search/repositories?q=${event.target.parentNode.search.value}`, {
                headers: {Accept: "application/vnd.github.v3+json"}
                })
                .then(resp => resp.json())
                .then(json => json.items.forEach(repo => renderRepo(repo)))
                // .then(json => console.log(json))
                form.reset()
                break;
        }
    })
}

function searchForRepos(username){
    fetch(`https://api.github.com/users/${username}/repos`, {
        headers: {Accept: "application/vnd.github.v3+json"}
    })
    .then(resp => resp.json())
    .then(json => json.forEach(repo => renderRepo(repo)))
}

function renderRepo(json){
    console.log(json)
    let appendingElement = document.getElementsByClassName("repo-list")[0]
    let div = document.createElement('div')
    div.innerHTML = `
    <a href="${json.url}">${json.name}</a>
    <p>${json.description}</p>
    `
    appendingElement.append(div)
}

function removeAllExcept(userNode){
    userList.innerHTML = ""
    userList.append(userNode)
}

// BONUS:
    // Toggle between search types: one for user and one for repo

function addNewSearchButton(){
    let newButton = document.createElement('button')
    newButton.innerText = "Search by Repo"
    newButton.className = "repo-search"
    form.append(newButton)
}