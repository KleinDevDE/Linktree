/**
 * Insert ur github user ID, you can find it at "https://api.github.com/users/<username>" -> "id" -> <UserID>
 * @type {number}
 */
let githubUserID = 13904220;

/**
 * A simple synchronous function to get contents of an url
 * @param url The url
 * @returns {string|undefined} The content of the site. (nullable)
 */
function getContentFromURL(url) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.send();
    if (xhr.status === 200) {
        return xhr.responseText;
    } else {
        return null;
    }
}

/**
 * Load the username and the count of the repos by the userID.
 * So updating the username will also update the direct link and the info in the button.
 */
function loadGitHubData() {
    let data = getContentFromURL("https://api.github.com/user/" + githubUserID);
    if (data === null) {
        console.error("Could not load Github data!");
        return;
    }
    data = JSON.parse(data);
    document.getElementById("github_data").innerHTML = "@" + data.login + ", " + data.public_repos + " repositories";
    document.getElementById("github_link").href = "https://github.com/" + data.login;
}