import { useEffect, useState } from "react";
import FilterList from "./FilterList";

function CardList() {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const apiKey = import.meta.env.VITE_SECRET_API_KEY;

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games?key=${apiKey}&platforms=187&page_size=39`
        );
        if (!response.ok) {
          throw new Error("Response did not work");
        }
        const data = await response.json();
        console.log(data);

        setGames(data.results);
        setFilteredGames(data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchGames();
  }, []);

  const handleFilterChange = (genre, releaseYear, rating) => {
    console.log("Filter values:", { genre, releaseYear, rating });

    let filtered = games;

    if (genre) {
      filtered = filtered.filter((game) =>
        game.genres.some((g) => g.name === genre)
      );
    }

    if (releaseYear) {
      filtered = filtered.filter(
        (game) => game.released.slice(0, 4) === releaseYear
      );
    }

    if (rating) {
      filtered = filtered.filter((game) => game.metacritic >= rating);
    }

    setFilteredGames(filtered);
  };

  const handleClick = (gameId) => {
    fetch(`https://api.rawg.io/api/games/${gameId}?key=${apiKey}`)
      .then((response) => response.json())
      .then((data) => setSelectedGame(data));
  };

  return (
    <div className="bg-[#fefefe] min-h-screen">
      <div className="flex items-center justify-between py-4">
        <h1 className="text-left font-bold py-4">
          Playstation 5 Game Explorer
        </h1>
        <FilterList onFilterChange={handleFilterChange} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredGames.map((game) => (
          <div
            className="bg-[#f5f7fa] w-72 rounded-lg hover:shadow-custom-blue transition-shadow max-w-xs mx-auto overflow-hidden box-border"
            key={game.id}
            onClick={() => handleClick(game.id)}
          >
            <div className="w-full h-48 overflow-hidden">
              <img
                src={game.background_image}
                alt={`${game.name} image`}
                className="block w-full h-full object-cover rounded-t-lg"
              />
            </div>
            <div className="text-left p-3 w-full overflow-hidden">
              <h3 className="text-lg font-semibold mt-2 break-words w-full">
                {game.name}
              </h3>
              <p className="text-sm break-words w-full">{game.metacritic}</p>
              <p className="text-sm w-full break-words">
                {game.genres.map((genre) => genre.name).join(", ")}
              </p>
            </div>
          </div>
        ))}
      </div>
      {selectedGame && (
        <div>
          <h3>{selectedGame.name}</h3>
          <p>{selectedGame.description_raw}</p>
          <button onClick={() => setSelectedGame(null)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default CardList;
