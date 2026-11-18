// EDIT THIS FILE. The instructions are in README.md, in this folder.

import { useState } from "react";
import type { Annotation } from "./given";

export default function AnnotationForm({ onAdd }: { onAdd: (a: Annotation) => void }) {
  // TODO: name, latitude and longitude fields, validation, then call onAdd with numbers
  const [name, setName] = useState<string>("");
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false)


  const latitudeCheck = Number(latitude) > -90 && Number(latitude) < 90;
  const longitudeCheck = Number(longitude) > -180 && Number(longitude) < 180;
  const nameCheck = name.length > 0;
  const hasErrors = !latitudeCheck || !longitudeCheck || !nameCheck;

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasSubmitted(true)
    if (hasErrors) return;
    onAdd({ name, lat: Number(latitude), lng: Number(longitude) });
    setLatitude("");
    setLongitude("");
    setName("");
    setHasSubmitted(false);
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        {hasSubmitted && !nameCheck && <p>Name is required</p>}
      </div>
      <div>
        <label htmlFor="latitude">Latitude</label>
        <input
          type="text"
          name="latitude"
          value={latitude}
          onChange={e => setLatitude(e.target.value)}
        />
        {hasSubmitted && !latitudeCheck && <p>Latitude should be greater than -90 and less than 90</p>}
      </div>
      <div>
        <label htmlFor="longitude">Longitude</label>
        <input
          type="text"
          name="longitude"
          value={longitude}
          onChange={e => setLongitude(e.target.value)}
        />
        {hasSubmitted && !longitudeCheck && <p>Longitude should be greater than -180 and less than 180</p>}
      </div>
      <button type="submit">Add Annotation</button>
    </form>

  )
}
