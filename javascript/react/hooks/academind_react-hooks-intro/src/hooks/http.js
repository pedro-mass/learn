import { useState, useEffect } from "react";

export const useHttp = (url, dependencies) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    console.log("Sending http request: ", url);
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch.");
        }
        return response.json();
      })
      .then(response => {
        setData(response);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }, dependencies);

  return [isLoading, data];
};
