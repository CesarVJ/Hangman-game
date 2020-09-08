let selectedWord ="";
const wrongLetters = [];
const wrongLettersBox = document.getElementById("wrong-letters");
const drawWord = word =>{
    word = Array.from(word);
    const wordContainer = document.querySelector(".word");
    let count = 0;
    for(let letter of word){
        let letterContainer = document.createElement("div");
        letterContainer.innerHTML = `<p id="${count}" class="letter">${letter}</p>`
        wordContainer.appendChild(letterContainer);
        count++;
    }
}
function getWord(){
    fetch("https://api.datamuse.com/words?rel_trg=software")
    .then(response => response.json())
    .then(words =>{
        let totalWords = words.length;
        selectedWord = words[Math.floor(Math.random() * totalWords)].word;
        drawWord(selectedWord);
    }).catch(err => console.error(err));
}

const evaluateLetter = (letterEntered, targetWord) =>{
    let indexOfLetter = targetWord.indexOf(letterEntered);
    if( indexOfLetter == -1){
        if(!wrongLetters.includes(letterEntered)){
            wrongLetters.push(letterEntered);
            wrongLettersBox.textContent += letterEntered+", ";
        }

    }else{
        let matchedLetter = document.getElementById(indexOfLetter);
        matchedLetter.style.opacity = 1;
    }
}

getWord();
window.addEventListener('keypress',event => evaluateLetter(String.fromCharCode(event.charCode), selectedWord));
