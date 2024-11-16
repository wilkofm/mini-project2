import { useState } from "react";

export function FilterList({ onFilterChange }) {
  const [genre, setGenre] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [rating, setRating] = useState("");

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
      <label>
        Genre:
        <select value={genre} onChange={handleGenreChange}>
          <option value="">All Genres</option>
          <option value="Action">Action</option>
          <option value="Adventure">Adventure</option>
          <option value="Indie">Indie</option>
          <option value="RPG">RPG</option>
          <option value="Shooter">Shooter</option>
        </select>
      </label>

      <label>
        Year:
        <select value={releaseYear} onChange={handleReleaseYearChange}>
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
        Rating:
        <select value={rating} onChange={handleRatingChange}>
          <option value="">All Ratings</option>
          <option value="90">90+</option>
          <option value="80">80+</option>
          <option value="70">70+</option>
        </select>
      </label>
    </div>
  );
}

export default FilterList;
