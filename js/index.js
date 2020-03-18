document.addEventListener('DOMContentLoaded', function(event) {

    const form = document.getElementById('github-form')
    const searchBar = document.getElementById('search')
    const githubContainer = document.getElementById('github-container')
    let userUl = document.getElementById('user-list')
    let reposUl = document.getElementById('repos-list')

    function userSearch(query) {
        fetch(`https://api.github.com/search/users?q=${query}`)
        .then(response => response.json())
        .then(data => {
            userUl.innerText = ""
            data.items.map( user => {
                let userLi = document.createElement('li')
                let userName = document.createElement('h2')
                let userPhoto = document.createElement('img')
                let userPageLink = document.createElement('a')
                let imageWrap = document.createElement('a')
                let nameWrap = document.createElement('a')
                let p = document.createElement('p')
                
                nameWrap.appendChild(userName)
                nameWrap.href = '#'
                userName.innerText = user.login
                userName.className = 'user'
                userName.dataset.name = user.login

                imageWrap.appendChild(userPhoto)
                imageWrap.href = '#'
                userPhoto.src = user.avatar_url
                userPhoto.width = 125
                userPhoto.className = 'user'
                userPhoto.dataset.name = user.login

                userPageLink.appendChild(p)
                p.innerText = `${user.login}'s Github Page.`
                userPageLink.href = user.html_url

                userLi.append(nameWrap, imageWrap, userPageLink)
                userUl.append(userLi)
                return userUl
            })
        })
    }
    
    function repoSearch(query) {
        fetch(`https://api.github.com/users/${query}/repos`)
        .then(response => response.json())
        .then(data => {
            reposUl.innerText = ""
            let h4 = document.createElement('h4')
            h4.innerText = `${data[0].owner.login} has ${data.length} repositories associated with their name.`
            reposUl.prepend(h4)

            data.map( repo => {
                let repoLi = document.createElement('li')
                let repoName = document.createElement('p')
                let repoPageLink = document.createElement('a')
                let br = document.createElement('br')
                repoName.innerText = `${repo.name}`
                repoPageLink.href = repo.html_url
                repoPageLink.innerHTML = repo.name

                repoLi.append(repoPageLink)
                reposUl.append(repoLi, br, br)
                return reposUl
            })
        })
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault()
        userSearch(searchBar.value)
    })
    
    githubContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('user')){
            let query = event.target.dataset.name
            repoSearch(query)
        }
    })

})