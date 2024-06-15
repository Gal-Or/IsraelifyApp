function startSpeechRecognition() {
  const message = new SpeechSynthesisUtterance(
    "What type of music would you like to generate?"
  );
  message.onend = () => {
    getSpeechRecognition();
  };
  window.speechSynthesis.speak(message);
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

  recognition.onstart = () => {
    showSpeaking(true);
  };

  recognition.onresult = async (event) => {
    const speechResult = event.results[0][0].transcript;
    const message = new SpeechSynthesisUtterance(
      `Generating AI recommendations for ${speechResult}`
    );
    window.speechSynthesis.speak(message);
    const recommendations = await spotifyService.getRecommendedSongs(
      speechResult
    );
    updateStationWithRecommendations(recommendations, speechResult);
  };

  recognition.onend = () => {
    console.log("Speech recognition ended.");
  };

  recognition.start();
}
