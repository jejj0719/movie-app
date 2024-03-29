import React from "react";
import { Component } from "react";
import Movie from "./Movie";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    this._getMovies();
  }

  _renderMovies = () => {
    const movies = this.state.movies.map(movie => {
      console.log(movie);
      return (
        <Movie
          title={movie.title_english}
          poster={movie.medium_cover_image}
          key={movie.id}
          genres={movie.genres}
          synopsis={movie.synopsis}
        />
      );
    });
    return movies;
  };

  _getMovies = async () => {
    const movies = await this._callApi();
    this.setState({
      movies: movies
    });
  };

  _callApi = () => {
    return fetch("https://yts.lt/api/v2/list_movies.json?sort_by=download_count")
      .then(potato => potato.json())
      .then(json => json.data.movies)
      .catch(err => console.log(err));
  };
  render() {
    const { movies } = this.state;
    return (
      <div className={movies ? "App" : "App-loading"}>
        {this.state.movies ? this._renderMovies() : "Loading"}
      </div>
    );
  }
}

export default App;
