let travelData = {}; //A global container to hold data securely

// Fetching the data from the json file 
fetch('travel_recommendation_api.json')
.then(response => response.json())
.then(data => {
    travelData = data;
    console.log("Data loaded successfuly");
})
.catch(error => console.error('Error fetching data', error)
);

// Grabbing HTML elements by their IDs
const searchInput = document.getElementById('search_bar')
const searchBtn = document.getElementById('search')
const resetBtn = document.getElementById('reset')

// Adding eventlistener for the button click
searchBtn.addEventListener('click', () => {
    //Extracting the text the user typed and converting to lowercase
    const keyword = searchInput.value.toLowerCase().trim();
    
    if (keyword === 'beach' || keyword === "beaches"){
        // console.log("Showing beaches:", travelData.beaches);
        displayRecommendations(travelData.beaches);
    }
    else if(keyword === 'temple' || keyword === 'temples'){
        // console.log("Showing temples:", travelData.temples);
        displayRecommendations(travelData.temples);
    } //Check for any country name or the keyword "countries"
    else {
        //Look inside travelData.countries to find a country whose name matches what was typed
        const foundCountry = travelData.countries.find(
            country => country.name.toLowerCase() === keyword
        );

        if (foundCountry){
            //If a specific country was found (like Australia or Brazil), log it's cities
            // console.log("Found Country Cities:", foundCountry.cities);
            displayRecommendations(foundCountry.cities);
        } else if (keyword === 'country' || keyword === 'countries'){
            displayRecommendations(travelData.countries);
        } else {
            // console.log("No match found for:", keyword)
            document.getElementById('results_card').innerHTML = '<p class="none">No results found.</p>';
        }
        
    }
});

// A reusable function designed to display destination cards on the page
function displayRecommendations(results){
    // Grab the target layout element from the HTML page
    const resultsContainer = document.getElementById('results_card');
    // Clear any old results from previous searches before drawing new ones.
    resultsContainer.innerHTML = "";
    // Running a loop through the array of items i.e travelData
    results.forEach( item => {
        // Create a wrapper card container div in memory
        const card = document.createElement('div')
        card.classList.add('result-card'); //Gives it a class name for styling

        //Constructing the inner card content layout safely using template literals
        card.innerHTML = `
        <img src="${item.imageUrl}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        `;

        // Anchor this completed card directly inside the results grid container
        resultsContainer.appendChild(card);
    }
    );
}

// Setting up the clear button, 
// Grabbing the HTML elements with their exact IDs
const clearBtn = document.getElementById('reset');
const clearInput = document.getElementById('search_bar');
const clearResultsContainer = document.getElementById('results_card');

//Attaching a click event listener to the clear button
clearBtn.addEventListener('click', () => {

    //Reset the search bar text back to blank
    clearInput.value = '';

    // Wipe all generated HTML cards from the page layout
    clearResultsContainer.innerHTML = '';

    // Logging a message to confirm the successful clearing
    console.log("Search results and text field cleared");
}
)





