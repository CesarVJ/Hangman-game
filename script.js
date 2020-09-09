let selectedWord ="";
let attempts = 0;
const wrongLetters = [];
const wrongLettersBox = document.getElementById("wrong-letters");

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
function getWord(showDefinition){
    fetch("https://api.datamuse.com/words?rel_trg=software")
    .then(response => response.json())
    .then(words =>{
        let totalWords = words.length;
        selectedWord = words[Math.floor(Math.random() * totalWords)].word;
        drawWord(selectedWord);
        showDefinition(selectedWord)
    }).catch(err => console.error(err));
}
function showBodyPart(){
    let bodyPart = document.getElementById(attempts);
    bodyPart.style.opacity = 1;
}
const evaluateLetter = (letterEntered, targetWord) =>{
    let indexOfLetter = targetWord.indexOf(letterEntered);
    if( indexOfLetter == -1){
        if(!wrongLetters.includes(letterEntered)){
            wrongLetters.push(letterEntered);
            wrongLettersBox.textContent += letterEntered+", ";
            attempts++;
            showBodyPart();
        }
    }else{
        let matchedLetter = document.getElementById(`letter-${indexOfLetter}`);
        matchedLetter.style.opacity = 1;
    }
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
getWord(getDefinition);

window.addEventListener('keypress',event => evaluateLetter(String.fromCharCode(event.charCode), selectedWord));
