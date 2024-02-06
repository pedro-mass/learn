import React from "react";

import { useHttp } from "../hooks/http";
import Summary from "./Summary";

const Character = props => {
  console.log("rendering...");
  // const [loadedCharacter, setLoadedCharacter] = useState({});
  // const [isLoading, setIsLoading] = useState(false);

  const [isLoading, fetchedData] = useHttp(
    "https://swapi.co/api/people/" + props.selectedChar,
    [props.selectedChar]
  );

  const loadedCharacter = fetchedData
    ? {
        id: props.selectedChar,
        name: fetchedData.name,
        height: fetchedData.height,
        colors: {
          hair: fetchedData.hair_color,
          skin: fetchedData.skin_color
        },
        gender: fetchedData.gender,
        movieCount: fetchedData.films.length
      }
    : {};

  let content = <p>Loading Character...</p>;

  if (!isLoading && loadedCharacter.id) {
    content = (
      <Summary
        name={loadedCharacter.name}
        gender={loadedCharacter.gender}
        height={loadedCharacter.height}
        hairColor={loadedCharacter.colors.hair}
        skinColor={loadedCharacter.colors.skin}
        movieCount={loadedCharacter.movieCount}
      />
    );
  } else if (!isLoading && !loadedCharacter.id) {
    content = <p>Failed to fetch character.</p>;
  }
  return content;
};

export default React.memo(Character);
