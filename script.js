document.addEventListener('DOMContentLoaded', function () {
    const repoList = document.getElementById('repoList');
    const usernameInput = document.getElementById('usernameInput');

    // Function to fetch user details from GitHub API
    function fetchUser(username) {
        const userUrl = `https://api.github.com/users/${username}`;

        fetch(userUrl)
            .then(response => response.json())
            .then(user => {
                displayUser(user);
                fetchRepositories(username);
            })
            .catch(error => console.error('Error fetching user:', error));
    }

    // Function to fetch repositories from GitHub API
    function fetchRepositories(username) {
        const repoUrl = `https://api.github.com/users/${username}/repos`;

        fetch(repoUrl)
            .then(response => response.json())
            .then(repositories => displayRepositories(repositories))
            .catch(error => console.error('Error fetching repositories:', error));
    }

    // Function to display user details in the UI
    function displayUser(user) {
        const userHeader = document.querySelector('.profile-header .user-info');
        userHeader.innerHTML = ''; // Clear existing user info

        const usernameElem = document.createElement('h1');
        usernameElem.textContent = user.login;

        const bioElem = document.createElement('p');
        bioElem.textContent = user.bio || '';

        userHeader.appendChild(usernameElem);
        userHeader.appendChild(bioElem);
    }

    // Function to display repositories in the UI
    function displayRepositories(repositories) {
        repoList.innerHTML = ''; // Clear existing repository list

        repositories.forEach(repo => {
            const repoItem = document.createElement('li');
            const repoLink = document.createElement('a');
            repoLink.href = repo.html_url;
            repoLink.textContent = repo.name;

            repoItem.appendChild(repoLink);
            repoList.appendChild(repoItem);
        });
    }

    // Function to handle the search button click
    window.searchRepositories = function () {
        const username = usernameInput.value.trim();

        if (username) {
            fetchUser(username);
        } else {
            alert('Please enter a GitHub username.');
        }
    };
});
