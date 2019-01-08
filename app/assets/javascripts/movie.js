$(function (){
  console.log('Yay! movie.js loaded.');
  listenForMovieClick()

})

function listenForMovieClick() {
  $('td a').on('click', function (event) {

    $.ajax({
      url: this.href,
      method: 'get',
      dataType: 'json',
      success: function (response) {

        let movie = new Movie(response);
      //  console.log("This is a movie: ", movie);

        let html = movie.movieHTML();
        $('div#movie-details').html(html)

        $('div#famous-quote-details').html(`<h2>Famous Quotes</h2>`)

        movie.famous_quotes.forEach(q => {
          let each_quote = `<p>"<em>${q.quote}</em>" - ${q.actor} </p> <br />`
          $('div#famous-quote-details').append(each_quote)
          })

        let button = `<p>ISABUTTON!</p>`;

        $('div#rent-movie-button').html(button)

      }
    })

    event.preventDefault();

  })
}

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
