document.addEventListener('DOMContentLoaded', () => {
	document.addEventListener('submit', event => {
		event.preventDefault()
		deleteUsers()
		deleteRepos()
		getUserData(event.target.search.value)
	})
	document.addEventListener('click', event => {
		if (event.target.textContent === 'Show Repos') {
			console.log('display repos click')
			deleteRepos()
			getRepoData(event.target.parentNode.querySelector('h3').textContent)
		}
	})
})

const getObject = {
	method: 'GET',
	headers: {
		'content-type': 'application/json',
		Accept: 'application/vnd.github.v3+json'
	}
}

function getUserData(input) {
	fetch(`https://api.github.com/search/users?q=${input}`, getObject)
		.then(response => {
			console.log(response)
			return response.json()
		})
		.then(result => {
			console.log(result)
			if (result.items.length > 0) {
				result.items.forEach(element => {
					displayUserData(element)
				})
			} else {
				const userList = document.querySelector('#user-list')
				const userLI = document.createElement('li')
				userLI.className = 'user-list-item'
				userLI.textContent = 'Sorry, no results to display.'
				userList.append(userLI)
			}
		})
}

function displayUserData(userObject) {
	const userList = document.querySelector('#user-list')
	const userLI = document.createElement('li')
	userLI.className = 'user-list-item'
	userLI.innerHTML = `
    <img src="${userObject.avatar_url}" style="width:100px;height:100px">
    <h3><a href="${userObject.html_url}">${userObject.login}</a></h3>
    `
	userList.append(userLI)
	const displayReposButton = document.createElement('button')
	displayReposButton.class = 'display-repos'
	displayReposButton.textContent = 'Show Repos'
	userLI.append(displayReposButton)
}

function getRepoData(input) {
	fetch(`https://api.github.com/users/${input}/repos`)
		.then(response => {
			return response.json()
		})
		.then(result => {
			console.log(result)
			result.forEach(repo => {
				displayRepoData(repo)
			})
		})
}

function displayRepoData(repoObject) {
	const repoList = document.querySelector('#repos-list')
	const repoLI = document.createElement('li')
	repoLI.className = 'repo-list-item'
	repoLI.innerHTML = `
    <h3>Name: <a href="${repoObject.html_url}">${repoObject.name}</a></h3><br>
    <h3>Description: ${repoObject.description}</h3>
    `
	repoList.append(repoLI)
}

function deleteRepos() {
	document.querySelectorAll('.repo-list-item').forEach(element => {
		element.remove()
	})
}

function deleteUsers() {
	document.querySelectorAll('.user-list-item').forEach(element => {
		element.remove()
	})
}
