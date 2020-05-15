let $passwordText;
let $boardImg;
let $alphabet;

let $wrongLetterCount;
let $visiblePassword;
let $hiddenPassword;


const main = () => {
    prepareDOMElements();

    newGame();

}

const prepareDOMElements = () => {
    $passwordText = document.querySelector('.password__text--js');
    $boardImg = document.querySelector('.board__img--js');
    $alphabet = document.querySelector('.alphabet--js');
}

const newGame = () => {
    reset();
    dashedPassword($hiddenPassword);
    writePassword();
}

const reset = () => {
    $wrongLetterCount = 0;
    $visiblePassword = '';
    
    //todo: losowanie hasła
    $hiddenPassword = 'Bez pracy nie ma kołaczy';
    $hiddenPassword = $hiddenPassword.toUpperCase();
}

const dashedPassword = $hiddenPassword => {
    for (i=0; i<$hiddenPassword.length; i++)
    {
        if ($hiddenPassword.charAt(i) === ' ') $visiblePassword = $visiblePassword + ' ';
        else $visiblePassword = $visiblePassword + '-';
    }
}

const writePassword = () => {
    $passwordText.innerHTML = $visiblePassword;
}



document.addEventListener('DOMContentLoaded', main);