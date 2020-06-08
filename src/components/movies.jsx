import React, { Component } from "react";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { getMovies } from "../services/fakeMovieService";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/fakeGenreService";
import _ from "lodash";
class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    sortCollumn: {
      path: "title",
      order: "asc",
    },
  };
  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({
      movies: getMovies(),
      genres: genres,
    });
  }
  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  changePage = (page) => {
    this.setState({
      currentPage: page,
    });
  };
  itemSelect = (genre) => {
    this.setState({
      selectedGenre: genre,
      currentPage: 1,
    });
  };
  handleSort = (sortCollumn) => {
    this.setState({ sortCollumn });
  };
  render() {
    const { length: count } = this.state.movies;
    if (count === 0) return <p>There are no movies in the database.</p>;
    const {
      currentPage,
      pageSize,
      selectedGenre,
      sortCollumn,
      movies: allMovies,
    } = this.state;
    const filterd =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;
    const sorted = _.orderBy(filterd, [sortCollumn.path], [sortCollumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-sm-2 xs-2">
              <ListGroup
                items={this.state.genres}
                selectedItem={this.state.selectedGenre}
                onItemSelect={this.itemSelect}
              />
            </div>
            <div className="col-sm-10 xs-10">
              <p>Showing {filterd.length} movies in the database.</p>
              <MoviesTable
                movies={movies}
                sortCollumn={sortCollumn}
                onDelete={this.handleDelete}
                onLike={this.handleLike}
                onSort={this.handleSort}
              />
              <Pagination
                itemCount={filterd.length}
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={this.changePage}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
