const $data = ["Bez pracy nie ma kołaczy",
    "Fortuna kołem się toczy",
    "Nie chwal dnia przed zachodem słońca",
    "Lepszy wróbel w garści niż gołąb na dachu",
    "Apetyt rośnie w miarę jedzenia",
    "Nie od razu Kraków zbudowano",
    "Nie taki diabeł straszny, jak go malują",
    "Głupim szczęście sprzyja",
    "Co nagle, to po diable",
    "Polak, Węgier dwa bratanki, i do szabli i do szklanki",
    "Polak, gdy głodny, to zły",
    "Gdzie diabeł nie może, tam babę pośle",
    "Wszystkie drogi prowadzą do Rzymu",
    "Jak Kuba Bogu, tak Bóg Kubie"
];



let $passwordText;
let $boardImg;
let $alphabet;
let $info;
let $infoWin;
let $infoLose;
let $newGame;

let $wrongLetterCount;
let $visiblePassword;
let $hiddenPassword;
const $alphabetLetters = 'AĄBCĆDEĘFGHIJKLŁMNŃOÓPQRSŚTUVWXYZŹŻ'.split('');
const $maxWrongLetters = 9;


const main = () => {
    prepareDOMElements();
    newGame();
}

const prepareDOMElements = () => {
    $passwordText = document.querySelector('.password__text--js');
    $boardImg = document.querySelector('.board__img--js');
    $alphabet = document.querySelector('.alphabet--js');
    $info = document.querySelector('.info--js');
    $infoWin = document.querySelector('.info__win--js');
    $infoLose = document.querySelector('.info__lose--js');
    $newGame = document.querySelector('.new-game--js');
    $newGame.addEventListener('click', newGame);
}

const newGame = () => {
    generateAlphabet();
    reset();
    getNewPassword();
    dashedPassword();
    writePassword();
}

const generateAlphabet = () => {
    $alphabet.innerHTML = '';
    for (const letter of $alphabetLetters) {
        const letterButton = document.createElement('button');
        letterButton.innerText = letter;
        letterButton.classList.add('alphabet__letter');
        letterButton.setAttribute('onclick', 'checkLetter(this)')

        $alphabet.appendChild(letterButton)
    }
}

const reset = () => {
    $wrongLetterCount = 0;
    $visiblePassword = '';
    $alphabet.classList.remove('hide');
    $info.classList.add('hide');
    $infoWin.classList.remove('hide');
    $infoLose.classList.remove('hide');
    $boardImg.setAttribute('src', './images/s0.jpg');
}

const getNewPassword = () => {
    $hiddenPassword = $data[Math.floor(Math.random() * $data.length)];
    $hiddenPassword = $hiddenPassword.toUpperCase();
}

const dashedPassword = () => {
    for (i = 0; i < $hiddenPassword.length; i++) {
        if ($alphabetLetters.includes($hiddenPassword.charAt(i))) $visiblePassword = $visiblePassword + '-';
        else $visiblePassword = $visiblePassword + $hiddenPassword.charAt(i);
    }
}

const writePassword = () => {
    $passwordText.innerHTML = $visiblePassword;
}

const checkLetter = button => {
    const letter = button.innerText;
    if ($hiddenPassword.includes(letter)) {
        showLetter(letter);
        button.classList.add('alphabet__letter--correct');
    } else {
        $wrongLetterCount++;
        button.classList.add('alphabet__letter--incorrect');
        button.removeAttribute('onclick');
        $boardImg.setAttribute('src', `/images/s${$wrongLetterCount}.jpg`);
    }

    if ($hiddenPassword === $visiblePassword) {
        $alphabet.classList.add('hide');
        $info.classList.remove('hide');
        $infoLose.classList.add('hide');
    }

    if ($wrongLetterCount === $maxWrongLetters) {
        $alphabet.classList.add('hide');
        $info.classList.remove('hide');
        $infoWin.classList.add('hide');
    }
}

const showLetter = letter => {
    for (i = 0; i < $hiddenPassword.length; i++) {
        if ($hiddenPassword.charAt(i) === letter) {
            $visiblePassword = $visiblePassword.substr(0, i) + letter + $visiblePassword.substr(i + 1)
        }
    }

    writePassword();
}

document.addEventListener('DOMContentLoaded', main);