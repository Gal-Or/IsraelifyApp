import { useState, useEffect } from "react";
import { spotifyService } from "../services/spotify.service";
import { addSongsToStation } from "../store/station.actions";
import { ReactSVG } from "react-svg";
import micIcon from "../assets/icons/mic.svg";

export function AIModal({ station, setShowAIModal }) {
  const [loadingMessage, setLoadingMessage] = useState("Loading...");
  const [loadingTimeout, setLoadingTimeout] = useState(null);

  useEffect(() => {
    return () => {
      // Clean up the timeout if the component unmounts
      if (loadingTimeout) clearTimeout(loadingTimeout);
    };
  }, [loadingTimeout]);

  async function getRecommendations() {
    const userPrompt = document.getElementById("userPrompt").value;
    showLoading(true);
    const timeout = setTimeout(() => {
      setLoadingMessage("Still working on it...");
    }, 7000);
    setLoadingTimeout(timeout);

    const recommendations = await spotifyService.getRecommendedSongs(
      userPrompt
    );

    clearTimeout(timeout);
    setLoadingMessage("Creating amazing AI recommendations...");
    updateStationWithRecommendations(recommendations, userPrompt);
    showLoading(false);
  }

  function startSpeechRecognition() {
    const message = new SpeechSynthesisUtterance(
      "What type of music would you like to generate?"
    );
    message.onend = () => {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        console.error(
          "SpeechRecognition API is not supported in this browser."
        );
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
        document.getElementById("userPrompt").value = speechResult;
        showLoading(true);
        const timeout = setTimeout(() => {
          setLoadingMessage("Still generating amazing recommendations...");
        }, 4000);
        setLoadingTimeout(timeout);

        const recommendations = await spotifyService.getRecommendedSongs(
          speechResult
        );
        showLoading(false);
        clearTimeout(timeout);
        setLoadingMessage("Creating amazing AI recommendations...");
        updateStationWithRecommendations(recommendations, speechResult);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        showSpeaking(false);
      };

      recognition.onend = () => {
        console.log("Speech recognition ended.");
        showSpeaking(false);
      };

      recognition.start();
    };
    window.speechSynthesis.speak(message);
  }

  function showLoading(isLoading) {
    document.getElementById("loading").style.display = isLoading
      ? "flex"
      : "none";
  }

  function showSpeaking(isSpeaking) {
    document.getElementById("speaking-indicator").style.display = isSpeaking
      ? "flex"
      : "none";
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
          Get AI recommendations for songs based on your input. Enter a prompt
        </p>
        <label htmlFor="userPrompt">User Prompt:</label>
        <input type="text" id="userPrompt" />
        <button onClick={() => getRecommendations()}>Generate</button>
        <button onClick={() => startSpeechRecognition()}>
          Generate with Voice
        </button>
      </div>
      <div id="loading" className="loading-indicator">
        <div className="spinner"></div> {loadingMessage}
      </div>
      <div id="speaking-indicator" className="speaking-indicator">
        <ReactSVG src={micIcon} className="microphone" />
        Listening...
      </div>
    </div>
  );
}
