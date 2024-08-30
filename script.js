document.addEventListener("DOMContentLoaded", function() {
    let lines = {};

    function fetchAndDisplayKeys(module) {
        const fileName = "cards/" + module + ".json";
        fetch(fileName)
        .then(response => response.text())
        .then(data => {
            lines = JSON.parse(data);
            displayRandomLine();
        })
        .catch(error => console.error('Error reading file:', error));

        function displayRandomLine() {
            const fileContentDiv = document.getElementById('fileContent');
            fileContentDiv.innerHTML = ''; 

            if (lines.length > 0) {
                const card = document.createElement('div');
                const text = document.createElement('h1');
                
                const randIndex = Math.floor(Math.random() * lines.length);
                const selectedLine = JSON.stringify(
                    lines[randIndex]).replace(/[{}",]/g, '').split(":");
                strEn = selectedLine[0];
                strSw = selectedLine[1];

                text.textContent = strEn; 
                card.appendChild(text)
                card.classList.add("card");

                const next = document.createElement('button');
                next.textContent = 'Next';
                next.id = 'next';   

                next.addEventListener('click', displayRandomLine);

                const check = document.createElement('button');
                check.textContent = "Check";

                const play = document.createElement('button');
                play.textContent = "Play";
                play.style.visibility = 'hidden';

                check.addEventListener('click', ()=>{
                    text.textContent = strSw
                    play.style.visibility = 'visible';})

                play.addEventListener('click', ()=>{
                    (new Audio("cards/audio/" + module + "/" + randIndex + ".mp3")).play();});

                fileContentDiv.appendChild(card);
                card.appendChild(document.createElement('br'));
                card.appendChild(check);
                card.appendChild(play);
                card.appendChild(next);
            } else {
                const noMoreLines = document.createElement('p');
                noMoreLines.textContent = "No more cards available.";
                fileContentDiv.appendChild(noMoreLines);
            }
        }
    }

    // Add event listeners to buttons
    document.getElementById('menu-1').addEventListener('click', () => {fetchAndDisplayKeys('1');});
    document.getElementById('menu-2').addEventListener('click', () => {fetchAndDisplayKeys('2');});
    document.getElementById('menu-3').addEventListener('click', () => {fetchAndDisplayKeys('3');});
    document.getElementById('menu-4').addEventListener('click', () => {fetchAndDisplayKeys('4');});
});

function addButton(parent, textContent, cssClass = '', isVisible = true, action) {
    // Create a new button element
    const button = document.createElement('button');
    
    // Set the button text content
    button.textContent = textContent;
    
    // If a CSS class is provided, add it to the button
    if (cssClass) {
        button.className = cssClass;
    }

    // Set the initial visibility of the button
    button.style.display = isVisible ? 'inline-block' : 'none';
    
    // Add the action (event listener) to the button
    button.addEventListener('click', action);
    
    // Append the button to the parent element
    parent.appendChild(button);
    
    // Return the reference to the created button
    return button;
}