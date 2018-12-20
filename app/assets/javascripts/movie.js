$(function (){
  console.log('Congrats, youve successfully loaded the movie.js file');
  listenForMovieClick()

})

function listenForMovieClick() {
  $('td a').on('click', function (event) {

    event.preventDefault();

  })
}
