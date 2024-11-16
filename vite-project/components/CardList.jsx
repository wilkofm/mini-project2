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
          `https://api.rawg.io/api/games?key=${apiKey}&platforms=187&page_size=40`
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
    <div>
      <h1>Playstation 5 Games</h1>
      <FilterList onFilterChange={handleFilterChange} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredGames.map((game) => (
          <div
            className="border border-gray-500 rounded-lg hover:shadow-lg transition-shadow max-w-xs mx-auto"
            key={game.id}
            onClick={() => handleClick(game.id)}
          >
            <img
              src={game.background_image}
              alt={`${game.name} image`}
              className="w-full h-auto object-over rounded-t-lg"
            />
            <div className="text-left p-3">
              <h3 className="text-lg font-semibold mt-2">{game.name}</h3>
              <p className="text-sm">{game.metacritic}</p>
              <p className="text-sm">
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
