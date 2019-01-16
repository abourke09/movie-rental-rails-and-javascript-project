class Rental {
  constructor(obj) {
    this.id = obj.id
    this.customer_id = obj.customer_id
    this.movie_id = obj.movie_id
    this.status = obj.status
    this.title = obj.movie_details.title
    this.rating = obj.movie_details.rating
    this.length = obj.movie_details.length
    this.lead_actor = obj.movie_details.lead_actor
  }
}

Rental.prototype.CheckedOutTable = function () {
  return (`
        <tr>
          <td><a href="movies/${this.movie_id}">${this.title}</a></td>
          <td>${this.rating}</td>
          <td>${this.length} minutes</td>
          <td>${this.lead_actor}</td>
          <td><button class="return" data-rental_id="${this.id}">Return Now</button></td>
        </tr>
  `)
}

Rental.prototype.ReturnedTable = function () {
  return (`
        <tr>
          <td><a href="movies/${this.movie_id}">${this.title}</a></td>
          <td>${this.rating}</td>
          <td>${this.length} minutes</td>
          <td>${this.lead_actor}</td>
          <td><button class="add_quote" data-movie_id="${this.movie_id}">Add a Famous Quote</button></td>
        </tr>
  `)
}

function rentalsNavClick(event) {
  clearWhiteboard()
  $('div#whiteboard').html(
  `
  <h1>My Rentals</h1>

  <h3>Currently Checked Out:</h3>
    <table>
      <tbody class="checked_out">
        <tr>
          <th>Title</th>
          <th>MPAA Rating</th>
          <th>Length</th>
          <th>Lead Actor</th>
          <th>Return?</th>
        </tr>
      </tbody>
    </table>
  <br></br>

  <h3>Past Rentals:</h3>
  <table>
    <tbody class="returned">
      <tr>
        <th>Title</th>
        <th>MPAA Rating</th>
        <th>Length</th>
        <th>Lead Actor</th>
        <th>Add Quote?</th>
      </tr>
    </tbody>
  </table>

  <div id='movie-details'></div>

  `)

  $.ajax({
    url: event.delegateTarget.href,
    method: 'get',
    dataType: 'json',
    success: function (response) {
      let rentals = response["rentals"]

      rentals.forEach(function(element) {
        if (element.status == "checked out") {
          let newRental = new Rental(element)
          $('div#whiteboard tbody.checked_out').append(newRental.CheckedOutTable())
        } else if (element.status == "returned") {
          let newRental = new Rental(element)
          $('div#whiteboard tbody.returned').append(newRental.ReturnedTable())
        }
      })
      listenForMovieClick()
      listenForReturnClick()
      listenForAddQuoteClick()
    }
  })
}

function listenForReturnClick() {
  $('button.return').on('click', function (event) {
    console.log("Event from Return Now Button Click:", event)
  })
}

function listenForAddQuoteClick() {
  $('button.add_quote').on('click', function (event) {
    console.log("Event from Add Quote Button Click:", event)
    $('div#movie-details').html('')
    let movie_id = event.delegateTarget.dataset.movie_id
    let url = `movies/${movie_id}`

    $.ajax({
      url: url,
      method: 'get',
      dataType: 'json',
      success: function (response) {
        let movie = new Movie(response)
        let html = movie.AddFamousQuote()
        $('div#movie-details').html(html)

        listenForCreateQuoteClick()
        }
      })
  })
}

function listenForCreateQuoteClick() {
  $('input.create_quote').on('click', function (event) {
    event.preventDefault();
    console.log("Event from Create Quote Button Click:", event)
  })
}
