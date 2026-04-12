let recognizedText = "";
let translatedTextGlobal = "";

// 🎤 Voice Input
function startListening() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-IN";

    recognition.start();

    recognition.onresult = function(event) {
        recognizedText = event.results[0][0].transcript;

        document.getElementById("inputText").innerText = recognizedText;

        // Auto translate voice input
        translateText(recognizedText);
    };

    recognition.onerror = function() {
        alert("Voice recognition error. Try again.");
    };
}

// ⌨️ Text Input Handler
function handleTextInput() {
    let text = document.getElementById("textInput").value;

    if (text.trim() === "") {
        alert("Please enter some text bro");
        return;
    }

    // Show entered text
    document.getElementById("inputText").innerText = text;

    // Send to translation
    translateText(text);
}

// 🌐 Translation Function (common for both)
function translateText(inputText) {
    let targetLang = document.getElementById("language").value;

    let url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(inputText)}&langpair=en|${targetLang}`;

    fetch(url)
    .then(res => res.json())
    .then(data => {
        translatedTextGlobal = data.responseData.translatedText;

        document.getElementById("translatedText").innerText = translatedTextGlobal;
    })
    .catch(err => {
        console.log(err);
        alert("Translation failed. Check internet.");
    });
}

// 🔊 Speak Output
function speak() {
    if (!translatedTextGlobal) {
        alert("Nothing to speak");
        return;
    }

    let speech = new SpeechSynthesisUtterance(translatedTextGlobal);
    speech.lang = document.getElementById("language").value;

    window.speechSynthesis.speak(speech);
}
