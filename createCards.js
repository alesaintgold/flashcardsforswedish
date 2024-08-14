// Function to fetch lines from a text file
async function fetchLines(url) {
    const response = await fetch(url);
    const data = await response.text();
    return data.split('\n').filter(Boolean); // Split into lines and remove empty lines
}

// Function to shuffle an array (Fisher-Yates shuffle)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to display the shuffled list in the DOM
function displayList(list) {
    const ul = document.getElementById('shuffled-list');
    ul.innerHTML = ''; // Clear any existing list items
    list.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        ul.appendChild(li);
    });
}

// Main function to fetch, shuffle, and display lines
async function main() {
    try {
        const lines = await fetchLines('modules/1/cards.txt');
        const shuffledLines = shuffleArray(lines);
        displayList(shuffledLines);
    } catch (err) {
        console.error('Error:', err);
    }
}

// Run the main function when the page loads
window.onload = main;