const inputToScramble = document.querySelector('#redact_text');
const wordsToScramble = document.querySelector('#redact_words');
const charToScrambleWith = document.querySelector('#scrambler');
const redacButton = document.querySelector('#redact_button');

const scrambleOutput = document.querySelector('#redact_output');

const numberOfWordsMatched = document.querySelector('#words_Matched');
const numberOfCharScrambled = document.querySelector('#characters_matched');
const numberOfWordsScanned = document.querySelector('#num_of_words');

const timeTaken = document.querySelector('#time')


// The Redacter Function
const redacWords = (sentence, words, charToRedacWith) => {
    var startTime = performance.now()
    let sentenceListArray = sentence.split(" ");
    let wordsListArray = words.split(" ");
    let result = '';
    let matchedWordsToBeScrambled = [];
    let noOfRedacWordsInput = 0;
    let wordsMatched = 0;
    let no_of_characters = 0;

    //Checking If a Text To Be Redacted was entered
    if (!sentence) {
        alert("ENTER A TEXT TO REDACT")
    }

    //Checking If a Word To Be Redacted in The Text Was Entered 
    else if (words.trim(" ").length === 0) {
        alert("ENTER A WORD OR WORDS IN THE TEXT TO REDACT")
    }

    for (let i = 0; i < sentenceListArray.length; i++) {
        for (let j = 0; j < wordsListArray.length; j++) {
            if (sentenceListArray[i].toLowerCase() === wordsListArray[j].toLowerCase()) {
                noOfRedacWordsInput += 1
                sentenceListArray[i] = wordsListArray[j].replace(/./g, charToRedacWith || '*');
                matchedWordsToBeScrambled.push(sentenceListArray[i])
                no_of_characters += sentenceListArray[i].length
                wordsMatched++
            }
        }
    }
    result = sentenceListArray.join(" ");
    console.log(matchedWordsToBeScrambled)

    var endTime = performance.now()
    return {
        result,
        noOfRedacWordsInput,
        noOfWordsScanned: sentenceListArray.length,
        howLongItTook: (endTime - startTime).toFixed(5),
        wordsMatched,
        no_of_characters
    };

};

redacButton.addEventListener('click', (event) => {
    const inputToScramble1 = inputToScramble.value;
    const wordsToScramble1 = wordsToScramble.value;
    const charToScrambleWith1 = charToScrambleWith.value;

    const output = redacWords(inputToScramble1, wordsToScramble1, charToScrambleWith1)
    const { result, noOfWordsScanned, howLongItTook, wordsMatched, no_of_characters }
        = output;

    //Rendering Result To The DOM
    scrambleOutput.innerText = result;
    numberOfWordsMatched.innerHTML = wordsMatched;
    numberOfCharScrambled.innerHTML = no_of_characters;
    numberOfWordsScanned.innerHTML = noOfWordsScanned;
    timeTaken.innerText = howLongItTook;

    //Clear Entered Input
    inputToScramble.value = '';
    wordsToScramble.value = '';
    charToScrambleWith.value = '';
});




