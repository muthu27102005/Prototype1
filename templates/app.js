let language = "en";
const translations = {
  en: {
    header: "AgriConnect",
    langLabel: "Select Language:",
    botGreeting: "Welcome! Tap Buy or Sell. Listen to instructions.",
    sellResponse: "Please tap the crop and quantity you want to sell.",
    buyResponse: "Please tap the crop and quantity you want to buy.",
    audioInstruction: "Welcome to Farmer Direct Connect. Tap Buy to purchase crops, or Sell to sell your crops. You can change language above.",
    defaultResponse: "I can help you buy or sell crops. Please tap an option.",
    gps: "Getting your location...",
    gpsSuccess: "Location found! Nearby farmers will be notified.",
    gpsError: "Could not get location. Please enable GPS.",
    voiceStart: "Speak now...",
    voiceEnd: "Voice input ended.",
    alert: "Fresh crops available near you!"
  },
  ta: {
    header: " விவசாய நேரடி இணைப்பு",
    langLabel: "மொழியை தேர்ந்தெடுக்கவும்:",
    botGreeting: "வரவேற்கிறோம்! வாங்க அல்லது விற்க என்பதைத் தேர்ந்தெடுக்கவும். வழிகாட்டுதலை கேளுங்கள்.",
    sellResponse: "விற்க விரும்பும் பயிர் மற்றும் அளவை தேர்ந்தெடுக்கவும்.",
    buyResponse: "வாங்க விரும்பும் பயிர் மற்றும் அளவை தேர்ந்தெடுக்கவும்.",
    audioInstruction: "விவசாய நேரடி இணைப்புக்கு வரவேற்கிறோம். வாங்க விரும்பினால் 'வாங்க' ஐ, விற்க விரும்பினால் 'விற்க' ஐ அழுத்தவும். மேலே மொழியை மாற்றலாம்.",
    defaultResponse: "நான் உங்களுக்கு பயிர்களை வாங்க அல்லது விற்க உதவலாம். தயவு செய்து விருப்பத்தைத் தேர்ந்தெடுக்கவும்.",
    gps: "உங்கள் இடத்தை பெறுகிறோம்...",
    gpsSuccess: "இடம் கிடைத்தது! அருகிலுள்ள விவசாயிகள் அறிவிக்கப்படுவார்கள்.",
    gpsError: "இடத்தை பெற முடியவில்லை. GPS ஐ இயக்கவும்.",
    voiceStart: "பேசவும்...",
    voiceEnd: "குரல் உள்ளீடு முடிந்தது.",
    alert: "உங்கள் அருகில் புதிய பயிர்கள் கிடைக்கின்றன!"
  }
};

function setLanguage() {
  language = document.getElementById("languageSelect").value;
  document.getElementById("headerText").innerText = translations[language].header;
  document.getElementById("langLabel").innerText = translations[language].langLabel;
  document.getElementById("chat").innerHTML = `<div class="msg bot">${translations[language].botGreeting}</div>`;
  document.getElementById("alertBox").innerText = translations[language].alert;
}

function playAudioInstruction() {
  let msg = new SpeechSynthesisUtterance(translations[language].audioInstruction);
  if (language === "ta") {
    let voices = window.speechSynthesis.getVoices();
    let taVoice = voices.find(v => v.lang.startsWith("ta"));
    if (taVoice) {
      msg.voice = taVoice;
      msg.lang = taVoice.lang;
    } else {
      msg.lang = "ta-IN";
    }
  } else {
    msg.lang = "en-US";
  }
  window.speechSynthesis.speak(msg);
}

function action(type) {
  let chatBox = document.getElementById("chat");
  let response = type === "buy" ? translations[language].buyResponse : translations[language].sellResponse;
  chatBox.innerHTML += `<div class="msg bot">${response}</div>`;
  let msg = new SpeechSynthesisUtterance(response);
  if (language === "ta") {
    let voices = window.speechSynthesis.getVoices();
    let taVoice = voices.find(v => v.lang.startsWith("ta"));
    if (taVoice) {
      msg.voice = taVoice;
      msg.lang = taVoice.lang;
    } else {
      msg.lang = "ta-IN";
    }
  } else {
    msg.lang = "en-US";
  }
  window.speechSynthesis.speak(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function getLocation() {
  let chatBox = document.getElementById("chat");
  chatBox.innerHTML += `<div class='msg bot'>${translations[language].gps}</div>`;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        chatBox.innerHTML += `<div class='msg bot'>${translations[language].gpsSuccess}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
      },
      function() {
        chatBox.innerHTML += `<div class='msg bot'>${translations[language].gpsError}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
      }
    );
  } else {
    chatBox.innerHTML += `<div class='msg bot'>${translations[language].gpsError}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}

function startVoiceInput() {
  let chatBox = document.getElementById("chat");
  chatBox.innerHTML += `<div class='msg bot'>${translations[language].voiceStart}</div>`;
  let recognition;
  try {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = language === "ta" ? "ta-IN" : "en-US";
    recognition.onresult = function(event) {
      let transcript = event.results[0][0].transcript;
      chatBox.innerHTML += `<div class='msg user'>${transcript}</div>`;
      action(transcript.toLowerCase().includes("sell") || transcript.includes("விற்க") ? "sell" : "buy");
    };
    recognition.onend = function() {
      chatBox.innerHTML += `<div class='msg bot'>${translations[language].voiceEnd}</div>`;
    };
    recognition.start();
  } catch (e) {
    chatBox.innerHTML += `<div class='msg bot'>Voice input not supported on this browser.</div>`;
  }
}

document.addEventListener("DOMContentLoaded", function() {
  setLanguage();
});
