import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";
import useFetch from "./hooks/useFetch";
import Form from "./components/Form";
import List from "./components/List";
import { useEffect, useState } from "react";

function App() {
  const [activities, setActivities] = useLocalStorageState("activities", {
    defaultValue: [],
  });
  const [timer, setTimer] = useState(0);
  const { isGoodWeather, emoji, temperature } = useFetch(timer);

  //Interval
  useEffect(() => {
    const intervalId = setInterval(
      () =>
        setTimer((currentTimer) => {
          return currentTimer + 1;
        }),
      5000
    );
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Delete Activity
  function handleDeleteActivity(id) {
    setActivities(
      activities.filter((activity) => {
        return activity.id !== id;
      })
    );
  }

  // Filter activities
  const filteredActivities = activities.filter((activity) => {
    return isGoodWeather === activity.isForGoodWeather;
  });

  // Adding new Activity
  function handleAddActivity(newActivity) {
    setActivities([{ id: uid(), ...newActivity }, ...activities]);
  }

  return (
    <>
      <section>
        <p>{emoji}</p>
        <p>{temperature} °C</p>
      </section>
      <List
        activities={filteredActivities}
        isForGoodWeather={isGoodWeather}
        onDeleteActivity={handleDeleteActivity}
      />
      <Form onAddActivity={handleAddActivity} />
    </>
  );
}

export default App;
