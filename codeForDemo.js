function speak(message, endCallback) {
  const message = new SpeechSynthesisUtterance(message);
  message.onend = () => {
    endCallback();
  };
  window.speechSynthesis.speak(message);
}
function startSpeechRecognition() {
  speak("What would you like to listen to?", getSpeechRecognition);
}

function getSpeechRecognition() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    console.error("SpeechRecognition API is not supported in this browser.");
    return;
  }
  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = async (event) => {
    const speechResult = event.results[0][0].transcript;
    speak(`Generating AI recommendations for ${speechResult}`);
    const recommendations = await getRecommendedSongs(speechResult);
    updateStationWithRecommendations(recommendations, speechResult);
  };

  recognition.start();
}
