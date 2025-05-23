import { useEffect, useState } from "react";
import FilterList from "./FilterList";
import GameDescriptionPopup from "./GameDescriptionPopup";
import { useTheme } from "../context/MyThemeContext";
import ToggleThemeButton from "./ToggleThemeButton";
import { Icon } from "@iconify/react";

function CardList() {
  const { theme } = useTheme();
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const apiKey = import.meta.env.VITE_SECRET_API_KEY;

  // fetching games from API
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

  // filtering games by genre, release year and metacritic score
  const handleFilterChange = (genre, releaseYear, rating) => {
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
      filtered = filtered.filter((game) => game.metacritic >= parseInt(rating));
    }

    // resets filtered array if no filter selected
    if (!genre && !releaseYear && !rating) {
      filtered = games;
    }

    setFilteredGames(filtered);
  };

  // handles card clicks, fetches specific game data by game id
  const handleClick = (gameId) => {
    fetch(`https://api.rawg.io/api/games/${gameId}?key=${apiKey}`)
      .then((response) => response.json())
      .then((data) => setSelectedGame(data));
  };

  // handles closing the pop up window and retsetting the state
  const HandleClosePopUp = () => {
    setSelectedGame(null);
  };

  return (
    // icon, page title, filter list and dark mode button
    <div
      style={{ backgroundColor: theme.background, color: theme.text }}
      className="min-h-screen"
    >
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center space-x-4">
          <img
            src="https://static-resource.np.community.playstation.net/avatar_xl/WWS_J/J2083_xl.png"
            alt="Astrobot Icon"
            width={60}
            height={60}
            className="rounded-full"
          ></img>
          <h1 className="text-left font-bold py-4">
            Playstation 5 Game Explorer
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <FilterList onFilterChange={handleFilterChange} />
          <ToggleThemeButton />
        </div>
      </div>

      {/* card list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 sm:px-6">
        {filteredGames.map((game) => (
          <div
            className="w-72 rounded-lg hover:shadow-custom-blue cursor-pointer transition-shadow max-w-xs mx-auto overflow-hidden box-border"
            style={{ backgroundColor: theme.foreground, color: theme.text }}
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
              <div className="flex items-center justify-between">
                <Icon
                  icon={
                    theme === theme.dark
                      ? "ri:playstation-fill"
                      : "ri:playstation-fill"
                  }
                  style={{
                    fontSize: "32px",
                    color: theme.text,
                  }}
                />
                <p className="text-blue-500 font-bold text-sm mr-2">
                  <span className="inline-block border border-blue-500 rounded px-2 py-1">
                    {game.metacritic}
                  </span>
                </p>
              </div>
              <h3 className="text-lg font-semibold mt-2 break-words w-full">
                {game.name}
              </h3>
              <p className="text-sm w-full break-words">
                {game.genres.map((genre) => genre.name).join(", ")}
              </p>
            </div>
          </div>
        ))}
      </div>

      <GameDescriptionPopup game={selectedGame} onClose={HandleClosePopUp} />
    </div>
  );
}

export default CardList;
