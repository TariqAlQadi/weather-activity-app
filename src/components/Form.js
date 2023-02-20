export default function Form({ onAddActivity }) {
  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const isForGoodWeather = event.target.elements.isForGoodWeather.checked;
    onAddActivity({ name: data.name, isForGoodWeather });

    event.target.reset();
    event.target.elements.name.focus();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add new Activity</h1>
      <label htmlFor="input-name">Name</label>
      <input id="input-name" type="text" name="name" />

      <label htmlFor="input-checkBox">Good-weather activity</label>
      <input id="input-checkBox" type="checkbox" name="isForGoodWeather" />

      <button type="submit">Submit</button>
    </form>
  );
}
