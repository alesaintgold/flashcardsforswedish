document.addEventListener("DOMContentLoaded", function() {
    const numberOfModules = 4;
    for (let index = 1; index <= numberOfModules; index++) {
        document.getElementById("menu-"+index).addEventListener('click', () => {fetchAndDisplayKeys(""+index);});    
    }
    
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

            if(lines.length <= 0)
                return;

            const card = document.createElement('div');
            const text = document.createElement('h1');
            
            const randIndex = Math.floor(Math.random() * lines.length);

            const selectedLine = JSON.stringify(lines[randIndex]).replace(/[{}",]/g, '').split(":");
            strEn = selectedLine[0];
            strSw = selectedLine[1];

            text.textContent = strEn; 

            card.appendChild(text)
            card.classList.add("card");
            card.appendChild(document.createElement('br'));

            fileContentDiv.appendChild(card);
            
            let firsTimePressed = true;

            //declaring buttons 
            const next = addButton(card, 'Next', 'next', displayRandomLine);
            
            const audio = new Audio("cards/audio/" + module + "/" + randIndex + ".mp3");
            
            let back = null;
            
            const check = addButton(card, 'Check', null, ()=>{
                text.textContent = strSw
                if(firsTimePressed)
                    audio.play();
                firsTimePressed = false;
                play.style.display = 'inline-block';
                check.style.display = 'none';
                back.style.display = 'inline-block'});

            back = addButton(card, 'Back ',null, ()=>{
                text.textContent = strEn;
                check.style.display = 'inline-block';
                back.style.display = 'none';},false);

            const play = addButton(card, 'Play', null, ()=>{audio.play();},false);
        }
        function addButton(parent, textContent, cssClass = '', action, isVisible = true) {
            const button = document.createElement('button');
            button.textContent = textContent;
            button.classList.add(cssClass);
            button.style.display = isVisible ? 'inline-block' : 'none';
            button.addEventListener('click', action);
            if(parent)  parent.appendChild(button);
            return button;
        }
    }
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