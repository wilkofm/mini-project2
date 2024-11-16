import { useEffect, useState } from "react";

function CardList() {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const apiKey = import.meta.env.VITE_SECRET_API_KEY;

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games?key=${apiKey}&platforms=187&page_size=20`
        );
        if (!response.ok) {
          throw new Error("Response did not work");
        }
        const data = await response.json();
        console.log(data);
        setGames(data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchGames();
  }, []);

  const handleClick = (gameId) => {
    fetch(`https://api.rawg.io/api/games/${gameId}?key=${apiKey}`)
      .then((response) => response.json())
      .then((data) => setSelectedGame(data));
  };

  return (
    <div>
      <h1>Playstation 5 Games</h1>
      <div>
        {games.map((game) => (
          <div key={game.id} onClick={() => handleClick(game.id)}>
            <img src={game.background_image} alt={`${game.name} image`} />
            <h3>{game.name}</h3>
            <p>{game.metacritic}</p>
            <p>{game.genres.map((genre) => genre.name).join(",")}</p>
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
