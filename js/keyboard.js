function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

const displayKeyboard = () =>{
    // 65 - 90
    if(isMobileDevice()){
      const keyBoardElement = document.querySelector(".keyboard");
      const firstLetterCode = 65;
      const lastLetterCode = 90;
      for(let letterCode = firstLetterCode; letterCode <= lastLetterCode; letterCode++ ){
        let letter = String.fromCharCode(letterCode).toLowerCase();
        let letterButton = document.createElement("btn");
        letterButton.innerHTML = letter;
        letterButton.classList.add("letter-button");
        keyBoardElement.appendChild(letterButton);
      }
    }
}
window.addEventListener("load", displayKeyboard);
