$(function (){
  console.log('Congrats, youve successfully loaded the movie.js file');
  listenForMovieClick()

})

function listenForMovieClick() {
  $('td a').on('click', function (event) {

    $.ajax({
      url: this.href,
      method: 'get',
      dataType: 'json',
      success: function (response) {
        console.log("response: ", response);

        let movie = new Movie(response.data);
        console.log("newMovieData: ", movie);

        let html = movie.movieHTML()
        $('div#movie-details').html(html)
      }
    })

    event.preventDefault();

  })
}

class Movie {
  constructor(obj) {
    this.id = obj.id
    this.title = obj.attributes.title
    this.lead_actor = obj.attributes["lead-actor"]
    this.length = obj.attributes.length
    this.rating = obj.attributes.rating
  }
}

Movie.prototype.movieHTML = function () {
  return (`
    <h1>${this.title}</h1>
    <p><strong>MPAA Rating: </strong>${this.rating} </p>
    <p><strong>Length: </strong>${this.length} minutes</p>
    <p><strong>Lead Actor: </strong>${this.lead_actor} </p>
    `)
}
