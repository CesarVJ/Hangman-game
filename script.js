let selectedWord ="";
const MAX_ATTEMTS = 6;
let attempts = 0;
let wrongLetters = [];
const wrongLettersBox = document.getElementById("wrong-letters");
let playable = true;

const drawWord = word =>{
    word = Array.from(word);
    const wordContainer = document.querySelector(".word");
    let count = 0;
    for(let letter of word){
        let letterContainer = document.createElement("div");
        letterContainer.innerHTML = `<p id="letter-${count}" class="letter">${letter}</p>`
        wordContainer.appendChild(letterContainer);
        count++;
    }
}

function setRemainingAttempts(){
    let attemptsElement = document.querySelector(".errors span");
    attemptsElement.innerHTML = MAX_ATTEMTS - attempts;
}
function getWord(showDefinition){
    fetch("https://api.datamuse.com/words?rel_trg=software")
    .then(response => response.json())
    .then(words =>{
        let totalWords = words.length;
        selectedWord = words[Math.floor(Math.random() * totalWords)].word;
        drawWord(selectedWord);
        showDefinition(selectedWord)
        console.log(selectedWord);
    }).catch(err => console.error(err));
}
function getDefinition(word){
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(response => response.json())
    .then(definitions => {
        let definition = definitions[0].meanings[0].definitions[0].definition;
        let definitionBox = document.querySelector(".definition");
        definitionBox.innerHTML = `<span>Definition:</span> ${definition}`;        
    }).catch(err => console.error(err));
}

function showBodyPart(){
    let bodyPart = document.getElementById(attempts);
    bodyPart.style.opacity = 1;
}
function getIndexes(letter, wordLetters){
    let indexes = [];
    let i = -1;
    while((i = wordLetters.indexOf(letter, i+1)) != -1){
        indexes.push(i);
    }
    return indexes;
}
function hideBodyParts(){
    let bodyParts = Array.from(document.querySelectorAll(".body-parts"));
    for(let bodyPart of bodyParts){
        bodyPart.style.opacity = 0;
    }
}
function clearWord(){
    const wordContainer = document.querySelector(".word");
    wordContainer.innerHTML = "";
}
function clearWrongLetters(){
    let wrongLettersElement = document.querySelector("#wrong-letters");
    wrongLettersElement.innerHTML = "";
    wrongLetters = [];
}

function resetGame(){
    hideFinalMessage();
    hideBodyParts();
    clearWord();
    clearWrongLetters();
    getWord(getDefinition);
    attempts = 0;
    setRemainingAttempts();
    playable = true;
}

function showFinalmessage(message, won){
    let resultBox = document.querySelector(".results-container");
    let messageElement = document.querySelector(".results > p");
    let playAgainButton = document.querySelector(".results > button");

    messageElement.textContent = message;
    resultBox.style.visibility = "visible";
    playAgainButton.addEventListener('click', resetGame);
}
function hideFinalMessage(){
    let resultBox = document.querySelector(".results-container");
    resultBox.style.visibility = "hidden";
}

const checkPlayable = () =>{
    let actualWord = Array.from(document.querySelectorAll(".word > div > p")).filter(letter => letter.style.opacity==1).map(letter => letter.textContent).join('');
    console.log(actualWord);
    if(attempts >= 6){
        showFinalmessage(`You have lost! 🤷‍♂️`);
        return false;
    }else if(actualWord === selectedWord){
        showFinalmessage(`Congratulations, You Won! 🎉`);
        return false;
    }
    return true;
}
const evaluateLetter = (letterEntered, targetWord) =>{
    if(playable){
        let indexes = getIndexes(letterEntered, Array.from(targetWord));
        if( indexes.length == 0){
            if(!wrongLetters.includes(letterEntered)){
                wrongLetters.push(letterEntered);
                wrongLettersBox.textContent += letterEntered+", ";
                attempts++
                setRemainingAttempts();
                showBodyPart();
            }else{
                // Show message of Letter previous entered
            }
        }else{
            indexes.forEach(index =>{
                let matchedLetter = document.getElementById(`letter-${index}`);
                matchedLetter.style.opacity = 1;
            });
        }
        playable = checkPlayable();
    }
}



getWord(getDefinition);

window.addEventListener('keypress',event => evaluateLetter(String.fromCharCode(event.charCode), selectedWord));
