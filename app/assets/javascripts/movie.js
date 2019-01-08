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
    <h1>${this.title}</h1>
    <p><strong>MPAA Rating: </strong>${this.rating} </p>
    <p><strong>Length: </strong>${this.length} minutes</p>
    <p><strong>Lead Actor: </strong>${this.lead_actor} </p>

    <form method="post" action="/rentals">
      <input type="submit" id="${this.id}" value="Rent Movie">
    </form>
    `)
}
