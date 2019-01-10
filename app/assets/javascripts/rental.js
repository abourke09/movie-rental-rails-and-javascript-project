function rentalsNavClick(event) {
  clearWhiteboard()
  $('div#whiteboard').html(
  `
  <h1>My Rentals</h1>

  <h3>Currently Checked Out:</h3>
    <table>
      <tr>
        <th>Title</th>
        <th>MPAA Rating</th>
        <th>Length</th>
        <th>Lead Actor</th>
        <th>Return?</th>
      </tr>
    </table>
  <br></br>

  <h3>Past Rentals:</h3>
  <table>
    <tr>
      <th>Title</th>
      <th>MPAA Rating</th>
      <th>Length</th>
      <th>Lead Actor</th>
      <th>Add Quote?</th>
    </tr>
  </table>

  <div id='movie-details'></div>

  `)


  $.ajax({
    url: event.delegateTarget.href,
    method: 'get',
    dataType: 'json',
    success: function (response) {
console.log("Rentals json hopefully:", response)

      let checked_out = response["all_rentals"]["checked_out"]
      let past_rentals = response["all_rentals"]["past_rentals"]

  //    response.forEach(item => {
  //      let newMovie = new Movie(item)
  //      $('div#whiteboard tbody').append(newMovie.movieList())
  //    })
  //    listenForMovieClick()
    }
  })
}
