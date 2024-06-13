import { spotifyService } from "../services/spotify.service";
import { addSongsToStation } from "../store/station.actions";
export function AIModal({ station, setShowAIModal }) {
  async function getRecommendations() {
    const userPrompt = document.getElementById("userPrompt").value;
    document.getElementById("loading").style.display = "block";
    const recommendations = await spotifyService.getRecommendedSongs(
      userPrompt
    );
    document.getElementById("loading").style.display = "none";
    updateStationWithRecommendations(recommendations, userPrompt);
  }

  function startSpeechRecognition() {
    const message = new SpeechSynthesisUtterance(
      "What type of music would you like to generate?"
    );
    window.speechSynthesis.speak(message);

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
      console.log("User speech:", speechResult);
      const message = new SpeechSynthesisUtterance(
        `Generating AI recommendations for ${speechResult}`
      );
      window.speechSynthesis.speak(message);
      document.getElementById("userPrompt").value = speechResult;
      document.getElementById("loading").style.display = "block";
      const recommendations = await spotifyService.getRecommendedSongs(
        speechResult
      );
      document.getElementById("loading").style.display = "none";
      updateStationWithRecommendations(recommendations, speechResult);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.start();
  }
  async function updateStationWithRecommendations(recommendations, userPrompt) {
    try {
      const stationToUpdate = {
        ...station,
        name: `${userPrompt}`,
        description: `AI generated station based on :\n${userPrompt}`,
      };
      await addSongsToStation(recommendations, stationToUpdate);
      setShowAIModal(false);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="ai-modal">
      <div className="ai-modal-content">
        <span className="close" onClick={() => setShowAIModal(false)}>
          &times;
        </span>
        <h2>AI Recommendations</h2>
        <p>
          Get AI recommendations for songs similar to the ones in this station.
        </p>
        <label htmlFor="userPrompt">User Prompt:</label>
        <input type="text" id="userPrompt" />
        <button onClick={() => getRecommendations()}>Generate</button>
        <button onClick={() => startSpeechRecognition()}>
          Generate with Voice
        </button>
      </div>
      <div id="loading" style={{ display: "none" }}>
        Loading...
      </div>
    </div>
  );
}
