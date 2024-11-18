import { useState } from "react";
import { useTheme } from "../context/MyThemeContext";
import { Icon } from "@iconify/react";

export function FilterList({ onFilterChange }) {
  const { theme } = useTheme();
  const [genre, setGenre] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [rating, setRating] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // updates the genre, release year and rating state based on click
  const handleGenreChange = (event) => {
    setGenre(event.target.value);
    onFilterChange(event.target.value, releaseYear, rating);
  };

  const handleReleaseYearChange = (event) => {
    setReleaseYear(event.target.value);
    onFilterChange(genre, event.target.value, rating);
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
    onFilterChange(genre, releaseYear, event.target.value);
  };

  return (
    <div>
      {/* hamburger button for smaller screen */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden bg-blue-500 text-white px-3 py-2 rounded-full"
        style={{
          backgroundColor: theme.foreground,
          color: theme.text,
        }}
      >
        <Icon icon="ci:hamburger-lg" style={{ fontSize: "24px" }} />
      </button>

      {/* filter dropdowns */}
      <div
        className={`${isOpen ? "block" : "hidden"} md:block mt-4 md:mt-0`}
        style={{ backgroundColor: theme.foreground, color: theme.text }}
      >
        <label>
          <select
            value={genre}
            onChange={handleGenreChange}
            style={{
              backgroundColor: theme.background,
              color: theme.text,
            }}
            className="cursor-pointer"
          >
            <option value="">All Genres</option>
            <option value="Action">Action</option>
            <option value="Adventure">Adventure</option>
            <option value="Indie">Indie</option>
            <option value="RPG">RPG</option>
            <option value="Shooter">Shooter</option>
          </select>
        </label>

        <label>
          <select
            value={releaseYear}
            onChange={handleReleaseYearChange}
            style={{
              backgroundColor: theme.background,
              color: theme.text,
            }}
            className="cursor-pointer"
          >
            <option value="">All Years</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
            <option value="2017">2017</option>
            <option value="2016">2016</option>
            <option value="2015">2015</option>
          </select>
        </label>

        <label>
          <select
            value={rating}
            onChange={handleRatingChange}
            style={{
              backgroundColor: theme.background,
              color: theme.text,
            }}
            className="cursor-pointer"
          >
            <option value="">All Ratings</option>
            <option value="90">90+</option>
            <option value="80">80+</option>
            <option value="70">70+</option>
          </select>
        </label>
      </div>
    </div>
  );
}

export default FilterList;
