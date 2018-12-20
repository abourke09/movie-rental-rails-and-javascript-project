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
  }
}

Movie.prototype.movieHTML = function () {
  return (`
    <p>Id: ${this.id}</p>
    <p>Title: ${this.title}</p>
    `)
}
