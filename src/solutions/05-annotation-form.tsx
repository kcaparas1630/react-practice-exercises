// Reference solution for exercise 05. Open it only after your own attempt.

import { useState, type FormEvent } from "react";

type Values = { name: string; lat: string; lng: string };
type Errors = Partial<Record<keyof Values, string>>;
type Annotation = { name: string; lat: number; lng: number };

const EMPTY: Values = { name: "", lat: "", lng: "" };

function validate(v: Values): Errors {
  const errors: Errors = {};
  if (v.name.trim() === "") errors.name = "Name is required.";

  // Number("") is 0, so check for empty before converting.
  const lat = Number(v.lat);
  if (v.lat.trim() === "" || Number.isNaN(lat) || lat < -90 || lat > 90) {
    errors.lat = "Latitude must be between -90 and 90.";
  }
  const lng = Number(v.lng);
  if (v.lng.trim() === "" || Number.isNaN(lng) || lng < -180 || lng > 180) {
    errors.lng = "Longitude must be between -180 and 180.";
  }
  return errors;
}

export function AnnotationForm({ onAdd }: { onAdd: (a: Annotation) => void }) {
  const [values, setValues] = useState<Values>(EMPTY);
  const [submitted, setSubmitted] = useState(false);

  const errors = validate(values); // derived on every render
  const isValid = Object.keys(errors).length === 0;

  function update(field: keyof Values, value: string) {
    setValues(prev => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    if (!isValid) return;
    onAdd({ name: values.name.trim(), lat: Number(values.lat), lng: Number(values.lng) });
    setValues(EMPTY);
    setSubmitted(false);
  }

  const fields: { key: keyof Values; label: string }[] = [
    { key: "name", label: "Name" },
    { key: "lat", label: "Latitude" },
    { key: "lng", label: "Longitude" },
  ];

  return (
    <form onSubmit={handleSubmit} noValidate>
      {fields.map(({ key, label }) => (
        <div key={key}>
          <label>
            {label}
            <input value={values[key]} onChange={e => update(key, e.target.value)} />
          </label>
          {submitted && errors[key] && <p role="alert">{errors[key]}</p>}
        </div>
      ))}
      <button type="submit">Add annotation</button>
    </form>
  );
}

export default AnnotationForm;
