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
  let movieQuotes = this.famous_quotes.map(q => {
    return `<p>"<em>${q.quote}</em>" - ${q.actor} </p> <br />`
  })

  return (`
    <h2>${this.title}</h2>
    <p><strong>MPAA Rating: </strong>${this.rating} </p>
    <p><strong>Length: </strong>${this.length} minutes</p>
    <p><strong>Lead Actor: </strong>${this.lead_actor} </p>
    <p><strong>Famous Quotes</strong></p>
    <div>${movieQuotes}</div>
    <button class="show_details" data-movie_id="${this.id}" value="Rent Movie">Rent</button>
    `)
}

//Movie.prototype.rentButton = function () {
//  let movieId = this.id
//  debugger
//  return (`
//    <form method="post" action="/rentals">
//      <input type="submit" class="show_details" data-movie_id="${movieId}" value="Rent Movie">
//    </form>
//    `)
//}

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

function moviesNavClick(event) {
  $('div#whiteboard').html(`
    <h1>All Movies: (add filter later)</h1>
    <table>
      <tbody>
        <tr>
          <th>Title</th>
          <th>MPAA Rating</th>
          <th>Length</th>
          <th>Lead Actor</th>
        </tr>
      </tbody>
    </table>
    <div id='movie-details'></div>
  `);

  $.ajax({
    url: event.delegateTarget.href,
    method: 'get',
    dataType: 'json',
    success: function (response) {
      response.forEach(item => {
        let newMovie = new Movie(item)
        $('div#whiteboard tbody').append(newMovie.movieList())
      })
      listenForMovieClick()
    }
  })
}

function listenForMovieClick() {
  $('td a').on('click', function (event) {
    event.preventDefault();

  $.ajax({
    url: this.href,
    method: 'get',
    dataType: 'json',
    success: function (response) {
      let movie = new Movie(response);
      let html = movie.movieHTML();
      $('div#movie-details').html(html)

    //  movie.famous_quotes.forEach(q => {
    //    let each_quote = `<p>"<em>${q.quote}</em>" - ${q.actor} </p> <br />`
    //    $('div#movie-details').append(each_quote)
    //  })

    //  let button = movie.rentButton
    //  $('div#movie-details').append(button)
      listenForRentClick()
      }
    })

  })
}

function listenForRentClick() {
  $('button.show_details').on('click', function (event) {
    event.preventDefault()
    event.stopPropagation()

    let data = this.dataset.movie_id

/// Google: ajax post request data
    $.ajax({
      url: 'http://localhost:3000/customers/8/rentals',
      data: {movie_id: data},
      method: 'post',
    //  dataType: 'json',
      success: function (response) {
        debugger


      }
    })
    console.log("Rent button click event:", event);
    //After movie is rented,  it should be added to the customer's rentals (in the database)
    //and the whiteboard should fill with the customer's Rentals info
    rentalsNavClick()
  })
}
