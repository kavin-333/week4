import { useState } from "react";
import { fetchMovies } from "../api/fetchMovies";
import ErrorAlert from "./ErrorAlert";
import MovieDetail from "./MovieDetail";

function MoviesPortal() {
  const [searchInputText, setSearchInputText] = useState("");
  const [enteredSearchText, setEnteredSearchText] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const onSearchTextEnter = (e) => {
    e.preventDefault();
    fetchMovies(searchInputText, setMovies, setError, () => setEnteredSearchText(searchInputText));
  };

  return (
    <div style={{ position: "relative", zIndex: 0, backgroundColor: "transparent" }}>
      <div className="row">
        <div className="col-md-12">
          <form onSubmit={onSearchTextEnter}>
            <input
              type="text"
              placeholder="Search Movie"
              className="form-control"
              value={searchInputText}
              onChange={(e) => setSearchInputText(e.target.value)}
              style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
            />
          </form>
        </div>
      </div>
      <br />
      {error && <ErrorAlert error={error} searchTerm={enteredSearchText} />}
      {movies.length > 0 && (
        <p className="text-light">
          Showing {movies.length} Movies for '{enteredSearchText}'
        </p>
      )}
      {movies.map((movie) => (
        <MovieDetail key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
}

export default MoviesPortal;
