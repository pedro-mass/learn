import { useState, useEffect } from "react";
import axios from "axios";

function useResources(resource) {
  const [resources, setResources] = useState([]);

  const fetchResource = async () => {
    const resources = (await axios.get(
      `https://jsonplaceholder.typicode.com/${resource}`
    )).data;
    setResources(resources);
  };

  useEffect(
    () => {
      fetchResource();
    },
    [resource]
  );

  return resources;
}

export default useResources;
