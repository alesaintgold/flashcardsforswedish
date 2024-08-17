
document.addEventListener("DOMContentLoaded", function() {
    let lines = [];

    function fetchAndDisplayKeys(fileName) {
        fetch(fileName)
        .then(response => response.text())
        .then(data => {
            //lines = data.split('\n').filter(line => line.trim() !== '');
            lines = Object.entries(data);
            displayRandomLine();
        })
        .catch(error => console.error('Error reading file:', error));

    function displayRandomLine() {
        const fileContentDiv = document.getElementById('fileContent');
        fileContentDiv.innerHTML = ''; 

        if (lines.length > 0) {
            const randomIndex = Math.floor(Math.random() * lines.length);
            const selectedLine = lines[randomIndex];

            const card = document.createElement('div');

            const text = document.createElement('h1')
            text.textContent = selectedLine;
            card.appendChild(text)
            card.classList.add("card");

            const next = document.createElement('button');
            next.textContent = 'Next';
            next.id = 'next';   

            // Add event listener to display a new random line on button click
            next.addEventListener('click', displayRandomLine);

            const check = document.createElement('button');
            check.textContent = "Check";
            check.id = 'check';
            
            check.addEventListener('click', flip)

            fileContentDiv.appendChild(card);
            card.appendChild(document.createElement('br'));
            card.appendChild(check);
            card.appendChild(next);
            card.appendChild(document.createElement('br'));
            card.appendChild(document.createElement('br'));
        } else {
            const noMoreLines = document.createElement('p');
            noMoreLines.textContent = "No more lines available.";
            fileContentDiv.appendChild(noMoreLines);
        }
    }

    function flip(){

    }
    }

    // Add event listeners to buttons
    document.getElementById('menu-1').addEventListener('click', () => {
        fetchAndDisplayKeys('cards/1.json');
    });

    document.getElementById('menu-2').addEventListener('click', () => {
        fetchAndDisplayKeys('cards/2.json');
    });
    
    document.getElementById('menu-3').addEventListener('click', () => {
        fetchAndDisplayKeys('cards/3.json');
    });
    
    document.getElementById('menu-4').addEventListener('click', () => {
        fetchAndDisplayKeys('cards/4.json');
    });
    
    
});
