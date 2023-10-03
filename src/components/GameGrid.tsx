import { Text, Spinner } from "@chakra-ui/react";
import useGames from "../hooks/useGames";

const GameGrid = () => {
  const { games, error, isLoading } = useGames();
  return (
    <>
      {!isLoading ? (
        <>
          {error && <Text>{error}</Text>}
          <ul>
            {games.map((game) => (
              <li key={game.id}>{game.name}</li>
            ))}
          </ul>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default GameGrid;
