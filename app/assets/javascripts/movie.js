class Movie {
  constructor(obj) {

    this.id = obj.id
    this.title = obj.title
    this.lead_actor = obj.lead_actor
    this.length = obj.length
    this.rating = obj.rating
    this.famous_quotes = obj.famous_quotes
  }
}

Movie.prototype.movieHTML = function () {
  return (`
    <h2>${this.title}</h2>
    <p><strong>MPAA Rating: </strong>${this.rating} </p>
    <p><strong>Length: </strong>${this.length} minutes</p>
    <p><strong>Lead Actor: </strong>${this.lead_actor} </p>
    <p><strong>Famous Quotes</strong></p>
    `)
}

Movie.prototype.rentButton = function () {
  return (`
    <form method="post" action="/rentals">
      <input type="submit" id="${this.id}" value="Rent Movie">
    </form>
    `)
}

Movie.prototype.movieList = function () {
  return (`
        <tr>
          <td><a href="movies/${this.id}">${this.id}. ${this.title}</a></td>
          <td>${this.rating}</td>
          <td>${this.length} minutes</td>
          <td>${this.lead_actor}</td>
        </tr>
  `)
}

// <td><%= link_to movie.title, movie_path(movie.id) %></td>
