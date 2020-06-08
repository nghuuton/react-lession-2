import React, { Component } from "react";
import Like from "./common/like";

class MoviesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  raiseSort = (path) => {
    return () => {
      const sortCollumn = { ...this.props.sortCollumn };
      if (sortCollumn.path === path) {
        sortCollumn.order = sortCollumn.order === "asc" ? "desc" : "asc";
      } else {
        sortCollumn.path = path;
        sortCollumn.order = "asc";
      }
      this.props.onSort(sortCollumn);
    };
  };
  render() {
    const { movies, onDelete, onLike } = this.props;
    return (
      <table className="table">
        <thead>
          <tr>
            <th onClick={this.raiseSort("title")}>Title</th>
            <th onClick={this.raiseSort("genre.name")}>Genre</th>
            <th onClick={this.raiseSort("numberInStock")}>Stock</th>
            <th onClick={this.raiseSort("dailyRentalRate")}>Rate</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                <Like liked={movie.liked} onClick={() => onLike(movie)} />
              </td>
              <td>
                <button
                  onClick={() => onDelete(movie)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default MoviesTable;
