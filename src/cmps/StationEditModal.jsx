import { useState } from "react";
import { stationService } from "../services/station.service";
import { uploadService } from "../services/upload.service";

export function StationEditModal({ station, closeModal, onSetStation }) {
  const [stationToEdit, setStationToEdit] = useState(station);
  const [isLoading, setIsLoading] = useState(false);

  async function handleChange(ev) {
    let { value, name: field, type } = ev.target;
    if (type === "file") return addImgUrlToStation(ev);

    setStationToEdit((prev) => ({ ...prev, [field]: value }));
  }

  async function addImgUrlToStation(ev) {
    setIsLoading(true);
    try {
      let imgUrl = await uploadService.uploadImg(ev);
      imgUrl = imgUrl.url;
      setStationToEdit((prev) => ({ ...prev, img: imgUrl }));
    } finally {
      setIsLoading(false);
    }
  }

  async function onSubmit(ev) {
    ev.preventDefault();
    try {
      await stationService.editStationInfo(stationToEdit);
      onSetStation({
        name: stationToEdit.name,
        img: stationToEdit.img,
        description: stationToEdit.description,
      });
      closeModal();
    } catch (err) {
      // Add user error message
    }
  }

  return (
    <div className="station-edit-modal">
      <button className="close-btn" onClick={() => closeModal()}>
        &times;
      </button>
      <h1>Edit details</h1>
      <div className="img-uploader">
        <label>
          {isLoading ? (
            <div className="loading-indicator">Loading...</div>
          ) : (
            <img src={stationToEdit.img || "default-image-url"} alt="Station" />
          )}
          <input
            accept="image/.jpg, image/.jpeg, image/.png"
            type="file"
            name="img"
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="form-fields">
        <label htmlFor="name">Station Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Station Name"
          value={stationToEdit.name}
          onChange={handleChange}
        />
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          placeholder="Description"
          value={stationToEdit.description}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="actions">
        <button type="submit" onClick={onSubmit}>
          Save
        </button>
      </div>
      <div className="disclaimer">
        By proceeding, you agree to give Spotify access to the image you choose
        to upload. Please make sure you have the right to upload the image.
      </div>
    </div>
  );
}
