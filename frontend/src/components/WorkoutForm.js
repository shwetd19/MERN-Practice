import { useState } from "react";

const WorkoutForm = () => {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);

  //   submit form to database
  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { title, load, reps };

    const response = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      console.log("New Workout is added", json);
    }
  };

  return (
    <div>
      <form className="create" onSubmit={handleSubmit}>
        <h3>Add a New Workout</h3>
        <label>Exercise Title:</label>
        <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} />

        <label>Load (in Kg):</label>
        <input type="number" onChange={(e) => setLoad(e.target.value)} value={load} />

        <label>Reps :</label>
        <input type="number" onChange={(e) => setReps(e.target.value)} value={reps} />

        <button type="submit" >Add Workout</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};
export default WorkoutForm;
