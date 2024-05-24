import { useState } from "react";
import { stationService } from "../services/station.service";
import { uploadService } from "../services/upload.service";


export function StationEditModal({ station, closeModal, onSetStation }) {

  const [stationToEdit, setStationToEdit] = useState(station)

  async function handleChange(ev) {

    let { value, name: field, type } = ev.target
    if (type === 'file')
      return addImgUrlToStation(ev)

    console.log(value);

    setStationToEdit(prev => ({ ...prev, [field]: value }))
  }

  async function addImgUrlToStation(ev) {

    let imgUrl = await uploadService.uploadImg(ev)
    imgUrl = imgUrl.url
    setStationToEdit(prev => ({ ...prev, img: imgUrl }))

  }

  async function onSubmit(ev) {
    ev.preventDefault()
    try {
      await stationService.editStationInfo(stationToEdit)
      onSetStation({ name: stationToEdit.name, img: stationToEdit.img, description: stationToEdit.description })
      closeModal()
      //add user success msg 
    } catch (err) {
      //add user error msg 
    }


  }

  return (
    <div className="station-edit-modal">
      <h1>Edit Station</h1>
      <form onSubmit={(ev) => onSubmit(ev)}>

        <label className="img-uploder" > hello
          <input hidden accept="image/.jpg, image/.jpeg, image/.png" type="file" name='img' onChange={handleChange} />
        </label>
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
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
