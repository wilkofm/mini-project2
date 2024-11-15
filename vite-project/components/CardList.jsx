import { useEffect, useState } from "react";

function CardList() {
  const [games, setGames] = useState([]);
  const apiKey = "eb4cf279648b43d68e623254fa692fe3";

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games?key=${apiKey}`
        );
        if (!response.ok) {
          throw new Error("Response did not work");
        }
        const data = await response.json();
        setGames(data.results);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
  }, []);

  return (
    <div>
      <h1>Playstation 5 Games</h1>
      <ul>
        {games.map((game) => (
          <li key={game.id}>{game.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default CardList;
