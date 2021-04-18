import React, { useEffect, useState } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import Pagination from "./common/Pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/ListGroup";
import MoviesTable from "./MoviesTable";
import { Link } from "react-router-dom";
import SearchBox from "./common/SearchBox";
import _ from "lodash";
import { toast } from "react-toastify";

const Movies = ({ user }) => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // eslint-disable-next-line
  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });
  const [selectedGenre, setSelectedGenre] = useState({});

  useEffect(() => {
    async function fetchGenres() {
      const { data } = await getGenres();
      const { data: movies } = await getMovies();
      const genres = [{ name: "all movies", _id: "" }, ...data];
      setGenres(genres);
      setMovies(movies);
    }
    fetchGenres();
  }, []);

  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
  };

  const handleGenreChange = (genre) => {
    setSearchTerm("");
    setCurrentPage(1);
    setSelectedGenre(genre);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = async (movie) => {
    const originalMovies = movies;
    const newMovies = originalMovies.filter((m) => m._id !== movie._id);
    setMovies(newMovies);

    try {
      await deleteMovie(movie._id);
    } catch (error) {
      if (error.response && error.response.status === 404)
        toast.error("This movie has already been deleted.");
      setMovies(originalMovies);
    }
  };

  const handleLike = (movie) => {
    const newMovies = [...movies];
    const index = newMovies.indexOf(movie);
    newMovies[index] = { ...newMovies[index], liked: !newMovies[index].liked };
    setMovies(newMovies);
  };

  let filtedredMovies = movies;
  if (searchTerm)
    filtedredMovies = movies.filter((m) =>
      m.title.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
  else if (selectedGenre._id)
    filtedredMovies = movies.filter((m) => m.genre._id === selectedGenre._id);

  const sortedMovies = _.orderBy(
    filtedredMovies,
    [sortColumn.path],
    [sortColumn.order]
  );

  const currentMovies = paginate(sortedMovies, currentPage, pageSize);

  const handleSearch = (query) => {
    setSelectedGenre({});
    setSearchTerm(query);
    setCurrentPage(1);
  };

  return (
    <div className="row">
      <div className="col-3">
        <ListGroup
          items={genres}
          selectedItem={selectedGenre}
          onItemChange={handleGenreChange}
        />
      </div>
      <div className="col">
        {user && (
          <Link
            to="/movies/new"
            className="btn btn-primary"
            style={{ marginBottom: "20px" }}
          >
            New Movie
          </Link>
        )}

        <SearchBox value={searchTerm} onChange={handleSearch} />

        {currentMovies.length === 0 ? (
          <p>There are no movies in the database that matches your search.</p>
        ) : (
          <>
            <p>Showing {filtedredMovies.length} movies in the database.</p>
            <MoviesTable
              movies={currentMovies}
              sortColumn={sortColumn}
              onDelete={handleDelete}
              onLike={handleLike}
              onSort={handleSort}
            />
            <Pagination
              items={filtedredMovies.length}
              pageSize={pageSize}
              currentPage={currentPage}
              handleOnClick={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Movies;
