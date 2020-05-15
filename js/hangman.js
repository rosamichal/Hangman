let $passwordText;
let $boardImg;
let $alphabet;

let $wrongLetterCount;
let $visiblePassword;
let $hiddenPassword;
const $alphabetLetters = 'AĄBCĆDEĘFGHIJKLŁMNŃOÓPQRSŚTUVWXYZŹŻ'.split('');


const main = () => {
    prepareDOMElements();
    
    generateAlphabet();

    newGame();
}

const prepareDOMElements = () => {
    $passwordText = document.querySelector('.password__text--js');
    $boardImg = document.querySelector('.board__img--js');
    $alphabet = document.querySelector('.alphabet--js');
}

const generateAlphabet = () => {
    for (const letter of $alphabetLetters) {
        const letterButton = document.createElement('button');
        letterButton.innerText = letter;
        letterButton.classList.add('alphabet__letter');
        letterButton.setAttribute('onclick', 'checkLetter(this)')

        $alphabet.appendChild(letterButton)
    }
}

const checkLetter = button => {
    const letter = button.innerText;
    if ($hiddenPassword.includes(letter)){
        showLetter(letter);
        button.classList.add('alphabet__letter--correct');
    }
    else {
        $wrongLetterCount++;
        button.classList.add('alphabet__letter--incorrect');
    }
    
}

const showLetter = letter => {
    for (i=0; i<$hiddenPassword.length; i++)
    {
        if ($hiddenPassword.charAt(i) === letter) {
            $visiblePassword = $visiblePassword.substr(0, i) + letter + $visiblePassword.substr(i+1)
        }
    }

    writePassword();
}

const newGame = () => {
    reset();
    getNewPassword();
    dashedPassword($hiddenPassword);
    writePassword();
}

const reset = () => {
    $wrongLetterCount = 0;
    $visiblePassword = '';
}

const getNewPassword = () => {
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