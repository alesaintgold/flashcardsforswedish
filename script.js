
document.addEventListener("DOMContentLoaded", function() {
    let lines = {};

    function fetchAndDisplayKeys(fileName) {
        console.log("fetching file " + fileName)
        fetch(fileName)
        .then(response => response.text())
        .then(data => {
            lines = JSON.parse(data);
            console.log(lines)
            console.log(lines[0])
            displayRandomLine();
        })
        .catch(error => console.error('Error reading file:', error));

        function displayRandomLine() {
            const fileContentDiv = document.getElementById('fileContent');
            fileContentDiv.innerHTML = ''; 

            if (lines.length > 0) {
                const card = document.createElement('div');
                const text = document.createElement('h1');
                const selectedLine = JSON.stringify(
                    lines[Math.floor(Math.random() * lines.length)])
                    .replace(/[{}",]/g, '').split(":");
                console.log(selectedLine)

                strEn = selectedLine[0];
                strSw = selectedLine[1];

                text.textContent = strEn; 
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
                
                check.addEventListener('click', ()=>{
                    text.textContent = strSw
                });

                fileContentDiv.appendChild(card);
                card.appendChild(document.createElement('br'));
                card.appendChild(check);
                card.appendChild(next);
                card.appendChild(document.createElement('br'));
                card.appendChild(document.createElement('br'));
            } else {
                const noMoreLines = document.createElement('p');
                noMoreLines.textContent = "No more cards available.";
                fileContentDiv.appendChild(noMoreLines);
            }
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
