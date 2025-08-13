let language = "en";
const translations = {
  en: {
    header: "🌾 Farmer Direct Connect",
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
    alert: "Fresh crops available near you!",
    modules: {
      marketplace: "MarketPlace",
      aiimage: "AI Image Detecting",
      community: "Community for Farmers",
      aiTitle: "AI Image Detecting (Prototype)",
      aiDesc: "Upload a crop or disease image to identify (feature coming soon).",
      aiDetect: "Detect (Coming Soon)",
      aiBack: "Back to Home",
      communityTitle: "Community for Farmers",
      communityPlaceholder: "Ask a question or chat...",
      communitySend: "Send",
      communityBack: "Back to Home"
    }
  },
  ta: {
    header: "🌾 விவசாய நேரடி இணைப்பு",
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
    alert: "உங்கள் அருகில் புதிய பயிர்கள் கிடைக்கின்றன!",
    modules: {
      marketplace: "சந்தை",
      aiimage: "ஏ.ஐ. படம் கண்டறிதல்",
      community: "விவசாயிகள் சமூக உரையாடல்",
      aiTitle: "ஏ.ஐ. படம் கண்டறிதல் (முன்னோட்டம்)",
      aiDesc: "பயிர் அல்லது நோய் படத்தை பதிவேற்றவும் (விரைவில் அமையும்).",
      aiDetect: "கண்டறி (விரைவில்)",
      aiBack: "முகப்புக்கு திரும்பவும்",
      communityTitle: "விவசாயிகள் சமூக உரையாடல்",
      communityPlaceholder: "கேள்வி கேளுங்கள் அல்லது உரையாடுங்கள்...",
      communitySend: "அனுப்பு",
      communityBack: "முகப்புக்கு திரும்பவும்"
    }
  }
};

function setLanguage() {
  language = document.getElementById("languageSelect").value;
  document.getElementById("headerText").innerText = translations[language].header;
  document.getElementById("langLabel").innerText = translations[language].langLabel;
  document.getElementById("chat").innerHTML = `<div class="msg bot">${translations[language].botGreeting}</div>`;
  document.getElementById("alertBox").innerText = translations[language].alert;
  // Module titles
  document.getElementById("marketplaceTitle").innerText = translations[language].modules.marketplace;
  document.getElementById("aiImageTitle").innerText = translations[language].modules.aiimage;
  document.getElementById("communityTitle").innerText = translations[language].modules.community;
  // AI Image section
  document.getElementById("aiImageSectionTitle").innerText = translations[language].modules.aiTitle;
  document.getElementById("aiImageSectionDesc").innerText = translations[language].modules.aiDesc;
  document.getElementById("detectBtn").innerText = translations[language].modules.aiDetect;
  document.getElementById("aiBackBtn").innerText = translations[language].modules.aiBack;
  // Community section
  document.getElementById("communitySectionTitle").innerText = translations[language].modules.communityTitle;
  document.getElementById("communityInput").placeholder = translations[language].modules.communityPlaceholder;
  document.getElementById("communitySendBtn").innerText = translations[language].modules.communitySend;
  document.getElementById("communityBackBtn").innerText = translations[language].modules.communityBack;
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

function showBuyBox() {
  document.getElementById("buyBox").style.display = "block";
  document.getElementById("offerBox").style.display = "none";
  action('buy');
}

function submitBuyRequest() {
  const crop = document.getElementById("cropSelect").value;
  const qty = document.getElementById("qtyInput").value;
  let chatBox = document.getElementById("chat");
  chatBox.innerHTML += `<div class='msg user'>I want ${qty} kg ${crop}.</div>`;
  // Simulate farmer response
  setTimeout(() => {
    const offerText = `Farmer offers ${qty} kg ${crop} for ₹${qty * 20} (₹20/kg)`;
    chatBox.innerHTML += `<div class='msg bot'>${offerText}</div>`;
    document.getElementById("offerText").innerText = offerText;
    document.getElementById("offerBox").style.display = "block";
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 1000);
  document.getElementById("buyBox").style.display = "none";
}

function acceptOffer() {
  let chatBox = document.getElementById("chat");
  chatBox.innerHTML += `<div class='msg user'>Accept offer</div>`;
  chatBox.innerHTML += `<div class='msg bot'>Deal confirmed! Arrange pickup or delivery.</div>`;
  document.getElementById("offerBox").style.display = "none";
  chatBox.scrollTop = chatBox.scrollHeight;
}

function negotiateOffer() {
  let chatBox = document.getElementById("chat");
  chatBox.innerHTML += `<div class='msg user'>Negotiate offer</div>`;
  chatBox.innerHTML += `<div class='msg bot'>Negotiation started. Please chat with the farmer.</div>`;
  document.getElementById("offerBox").style.display = "none";
  chatBox.scrollTop = chatBox.scrollHeight;
}

document.addEventListener("DOMContentLoaded", function() {
  setLanguage();
});
