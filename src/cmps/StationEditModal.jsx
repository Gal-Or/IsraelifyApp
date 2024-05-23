export function StationEditModal({ station }) {
  return (
    <div className="station-edit-modal">
      <h1>Edit Station</h1>
      <form>
        <label htmlFor="station-name">Station Name:</label>
        <input
          type="text"
          id="station-name"
          name="station-name"
          placeholder="Station Name"
          value={station.name}
        />
        <label htmlFor="station-description">Description:</label>
        <textarea
          id="station-description"
          name="station-description"
          placeholder="Description"
          value={station.description}
        ></textarea>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
