
const drawWord = word =>{
    word = Array.from(word);
    const wordContainer = document.querySelector(".word");
    for(let letter of word){
        let letterContainer = document.createElement("div");
        letterContainer.innerHTML = `<p class="letter">${letter}</p>`
        wordContainer.appendChild(letterContainer);
    }
}
function getWord(){
    fetch("https://api.datamuse.com/words?rel_trg=software")
    .then(response => response.json())
    .then(words =>{
        let totalWords = words.length;
        let selectedWord = words[Math.floor(Math.random() * totalWords)].word;
        drawWord(selectedWord);
    });
}

const evaluateLetter = letterEntered =>{
    console.log(letterEntered);
}

getWord();
window.addEventListener('keypress',event => evaluateLetter(String.fromCharCode(event.charCode)));
