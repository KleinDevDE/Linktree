function insertCurrentAge() {
    let birthday = new Date(1999, 3, 30);
    let ageDifMs = Date.now() - birthday.getTime();
    let ageDate = new Date(ageDifMs);

    document.getElementById("age").innerHTML = Math.abs(ageDate.getUTCFullYear() - 1970);
}

/**
 * Load all quotes stored in the quotes.json file and insert a random quote on the page.
 * @see insertQuote
 */
function loadQuote(){
    let quotes= getContentFromURL(document.getElementById("quote").dataset.src);
    quotes.then((value) => {
        quotes = value;
        if (quotes === null){
            console.error("Could not load Quotes!");
            return;
        }
        quotes = JSON.parse(quotes);
        insertQuote(quotes, getRandomOfArray(quotes));
    });
}

/**
 * Check if the quote is enabled, if not, re-select an random quote and call the function again.
 * @param array The array of quotes
 * @param pickedData The quote u want to shown on the site
 */
function insertQuote(array, pickedData){
    if (pickedData.enabled === false){
        insertQuote(array, getRandomOfArray(array));
        return;
    }
    document.getElementById("quoteText").classList = "italic";
    document.getElementById("quoteText").innerHTML = pickedData.quote.toString().replace("\n", "<br>").replace(".", ".<br>");
    document.getElementById("quoteFooter").innerHTML = "~ " + pickedData.author;
}

/**
 * A simple synchronous function to get contents of an url
 * @param url The url
 * @returns {Promise} The content of the site. (nullable)
 */
async function getContentFromURL(url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                resolve(xhr.responseText);
            }
        };
        xhr.send();
    });
}

/**
 * A simple function to get an random entry of an array
 * @param array The array where u want a random entry from
 * @returns {*}
 */
function getRandomOfArray(array){
    return array[Math.floor(Math.random() * array.length)];
}

document.addEventListener("DOMContentLoaded", function () {
    insertCurrentAge();
    loadQuote();
    document.getElementById('reload_quote').onclick = function() {loadQuote();};
});