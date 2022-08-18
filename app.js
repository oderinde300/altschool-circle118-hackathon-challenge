function Redactre(text_to_redact, word_to_redact, scrambler) {

    var startTime = performance.now()
    //Set a default value for scrambler
    if ((scrambler == "") || (scrambler == "")) {
        scrambler = "*";
    } else if (word_to_redact == null) {
        alert("ENTER A VALID WORD TO REDACT FORM YOUR POST")
        return;
    }

    //convert all inputs to lower case
    text_to_redact = text_to_redact.toLowerCase();
    word_to_redact = word_to_redact.toLowerCase();
    scrambler = scrambler.toLowerCase();

    //convert sentence and words to redacts into arrays
    let myArrayOfText = text_to_redact.split(' ');
    let myArrayOfWords = word_to_redact.split(' ');
    let words_Matched = 0;
    let no_of_characters = 0;

    myArrayOfText.forEach(word => {
        if (myArrayOfText.includes(word) && myArrayOfWords.includes(word)) {
            let indexOfWord = myArrayOfText.indexOf(word);
            myArrayOfText.splice(indexOfWord, 1, `${scrambler.repeat(word.length)}`);
            no_of_characters += word.length;
            words_Matched++;
        }
    });
    var endTime = performance.now()

    //get number of words searched and convert array to full sentence
    let no_Of_Words = myArrayOfText.length;
    let full_Text = myArrayOfText.join(' ');
    let performanceTime = endTime - startTime;

    console.log(text_to_redact)

    //push data to front-end
    document.getElementById("redact_output").value = full_Text;
    document.getElementById("num_of_words").innerText = no_Of_Words;
    document.getElementById("words_Matched").innerText = words_Matched;
    document.getElementById("characters_matched").innerText = no_of_characters;
    document.getElementById("time").innerText = performanceTime;


    //console.log(full_Text);
    //console.log(no_Of_Words)
    //console.log(`${} words scanned`)
}


let redact_text = ''
let redact_words = ''

window.onload = function () {
    let redact_button = document.getElementById("redact_button");
    let redact_text = document.getElementById("redact_text");
    //let redact_output = document.getElementById("redact_output");
    let redact_words = document.getElementById("redact_words");
    let scrambler = document.getElementById("scrambler");
    //let num_of_words = document.getElementById("num_of_words");
    let scrambler_value = ''
    let redact_text_value = '';
    let redact_words_value = '';

    addEventListener('input', (Event) => {
        scrambler_value = scrambler.value;
        redact_text_value = redact_text.value;
        redact_words_value = redact_words.value;
    });

    redact_button.addEventListener('click', function () {
        Redactre(redact_text_value, redact_words_value, scrambler_value);
    });
};
