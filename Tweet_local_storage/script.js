// Variables
    // Form Submission variable
const formVar = document.getElementById("form");
    // tweetList
const tweetList = document.getElementById("tweetList");



// Event Listeners
    // form submission event
eventListeners();

function eventListeners() {
    formVar.addEventListener("submit", saveTweetInTweetList);
    // Remove tweet from tweet list event
    tweetList.addEventListener("click", removeTweet);
    
    // Document/Page Event 
    document.addEventListener("DOMContentLoaded", loadContent);
}

// Functions

    // function for saving and showing tweets
function saveTweetInTweetList(event) {
    // prevent form submission redirection
    event.preventDefault();
    
    // Reading/getting textarea data
    const tweetData = document.getElementById("tweet").value;
    if(tweetData.length === 0 || tweetData === " ") {
        alert("Please input data!");
    } else {
        // Creating element to be displayed in the tweet List
        const tweetValue = document.createElement("li");
        tweetValue.classList = "tweet-text";
        tweetValue.appendChild(document.createTextNode(tweetData));
    
        // Creating the Remove button for the tweets
        const removeTweet = document.createElement("a");
        removeTweet.classList = "remove-tweet";
        removeTweet.innerHTML = "x";
    
        // Adding the remove button to tweets
        tweetValue.appendChild(removeTweet);
    
        // Adding the created element in the tweet List
        tweetList.appendChild(tweetValue);
        
        // Reset form after tweet submission 
        this.reset();
        
        // Add tweetData to local Storage
        addTweetToLocalStorage(tweetData);
    };
};

    // function for removing tweet
function removeTweet(event) {
    if(event.target.classList.contains("remove-tweet")) {
        event.target.parentElement.remove();
    }
    // remove tweet from local storage
    const tweetValue = event.target.parentElement.textContent;
    removeTweetInLocalStorage(tweetValue);
};

    // function for adding tweetData to local strage
function addTweetToLocalStorage(tweetData) {
    const tweetArray = readTweetKeyInLocalStorage();
    // Preventing the local storage from duplicating values on refresh
    if(tweetArray.indexOf(tweetData) == -1) {
        tweetArray.push(tweetData);
        localStorage.setItem("tweets", JSON.stringify(tweetArray));
    }   
};

    // function to read local storage key 
function readTweetKeyInLocalStorage() {
    const tweetKey = localStorage.getItem("tweets");
    
    let tweetArray;
    
    if(tweetKey === null) {
        tweetArray = [];
    } else {
        tweetArray = JSON.parse(tweetKey);
    };
    return tweetArray;
};

// Loading to session on DOM load
function loadContent() {
    const tweets = readTweetKeyInLocalStorage();
    
    tweets.forEach(
        function(tweetData) {
        // Creating element to be displayed in the tweet List
        const tweetValue = document.createElement("li");
        tweetValue.classList = "tweet-text";
        tweetValue.appendChild(document.createTextNode(tweetData));
    
        // Creating the Remove button for the tweets
        const removeTweet = document.createElement("a");
        removeTweet.classList = "remove-tweet";
        removeTweet.innerHTML = "x";
    
        // Adding the remove button to tweets
        tweetValue.appendChild(removeTweet);
    
        // Adding the created element in the tweet List
        tweetList.appendChild(tweetValue);
        
        // Add tweetData to local Storage
        addTweetToLocalStorage(tweetData);
        }
    )
}

// removing tweet from local storage 
function removeTweetInLocalStorage(tweetValue) {

    // getting/reading the local storage array
    let tweetArray = readTweetKeyInLocalStorage();

    // removing the CANCEL SIGN (X) from my tweetValue
    const newTweetValue = tweetValue.substring(0, tweetValue.length - 1);

    // looping my tweetArray so as to compare its looped values to my new tweetValue
    tweetArray.forEach(
        function(tweets, index) {
            // stating the condition function for the tweetArray to loop out my values!
            if(newTweetValue === tweets) {
                // removing the cancelled array index from the tweetArray
                tweetArray.splice(index, 1);
            }
        }
    );
    // update the local storage 
    localStorage.setItem("tweets", JSON.stringify(tweetArray));
};