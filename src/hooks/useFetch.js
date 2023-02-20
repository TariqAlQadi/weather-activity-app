import { useEffect, useState } from "react";

export default function useFetch(timer) {
  const [isGoodWeather, setIsGoodWeather] = useState();
  const [emoji, setEmoji] = useState();
  const [temperature, setTemperature] = useState();

  useEffect(() => {
    async function fetchWeather() {
      try {
        const response = await fetch(
          "https://example-apis.vercel.app/api/weather/europe"
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setIsGoodWeather(data.isGoodWeather);
          setEmoji(data.condition);
          setTemperature(data.temperature);
        } else {
          console.error("something went wrong");
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchWeather();
  }, [timer]);

  return { isGoodWeather, emoji, temperature };
}
