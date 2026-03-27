let recognizedText = "";
let translatedTextGlobal = "";

function startListening() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-IN";

    recognition.start();

    recognition.onresult = function(event) {
        recognizedText = event.results[0][0].transcript;
        document.getElementById("inputText").innerText = recognizedText;
    };
}

function translateText() {
    let targetLang = document.getElementById("language").value;

    let url = `https://api.mymemory.translated.net/get?q=${recognizedText}&langpair=en|${targetLang}`;

    fetch(url)
    .then(res => res.json())
    .then(data => {
        translatedTextGlobal = data.responseData.translatedText;
        document.getElementById("translatedText").innerText = translatedTextGlobal;
    });
}

function speak() {
    let speech = new SpeechSynthesisUtterance(translatedTextGlobal);
    speech.lang = document.getElementById("language").value;

    window.speechSynthesis.speak(speech);
}