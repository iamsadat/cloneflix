import React from "react";
import "./Row.css";
import axios from "./axios";

function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = React.useState([]);
  const [hoveredMovie, setHoveredMovie] = React.useState(null);

  const base_url = "https://image.tmdb.org/t/p/original/";

  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(fetchUrl);
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [fetchUrl]);

  console.log(movies);

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            className={`row__poster ${isLargeRow ? "row__posterLarge" : ""}`}
            key={movie.id}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
            onMouseOver={() => setHoveredMovie(movie)}
            onMouseOut={() => setHoveredMovie(null)}
          />
        ))}
      </div>
      <div className="row__details">
        {hoveredMovie && (
          <div className="movie__details">
            <h3>{hoveredMovie.title}</h3>
            <p>{hoveredMovie.overview}</p>
            <p>
              Release Date:{" "}
              {isLargeRow
                ? hoveredMovie.first_air_date
                : hoveredMovie.release_date}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Row;
