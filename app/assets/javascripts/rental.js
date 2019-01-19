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

function rentalsNavClick() {
  clearWhiteboard()
  $('div.column.left').html(
  `
  <h1>My Rentals</h1>

  <h3>Currently Checked Out:</h3>
    <table class="table table-bordered">
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
  <table class="table table-bordered">
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
  `)

  customer_id = sessionStorage.get_current_user_id

  $.ajax({
    url: `customers/${customer_id}/rentals`,
    method: 'get',
    dataType: 'json',
    success: function (response) {
      let rentals = response["rentals"]

      rentals.forEach(function(element) {
        if (element.status == "checked out") {
          let newRental = new Rental(element)
          $('div.column.left tbody.checked_out').append(newRental.CheckedOutTable())
        } else if (element.status == "returned") {
          let newRental = new Rental(element)
          $('div.column.left tbody.returned').append(newRental.ReturnedTable())
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
    event.preventDefault()

    rental_id = event.delegateTarget.dataset["rental_id"]
    url = `/rentals/${rental_id}`
    data = {'rental_id': rental_id}

    $.ajax({
      type: 'GET',
      url: url,
      data: data,
      success: function(response) {
        rentalsNavClick()
      }
    })

  })
}

function listenForAddQuoteClick() {
  $('button.add_quote').on('click', function (event) {
    console.log("Event from Add Quote Button Click:", event)
    $('div.column.right').html('')
    let movie_id = event.delegateTarget.dataset.movie_id
    let url = `movies/${movie_id}`

    $.ajax({
      url: url,
      method: 'get',
      dataType: 'json',
      success: function (response) {
        let movie = new Movie(response)
        let html = movie.AddFamousQuote()
        $('div.column.right').html(html)

        listenForCreateQuoteClick()
        }
      })
  })
}

function listenForCreateQuoteClick() {
  $('form#createFQ').on('submit', function () {
    event.preventDefault();
    url = this.action

    data = {
    'famous_quote': {
      'quote' : $("#quote").val(),
      'actor' : $("#actor").val()
      }
    }
    $.ajax({
      type: 'POST',
      url: url,
      data: data,
      success: function(response) {
        new_url = new_url = url.replace("/famous_quotes", "")

        $.ajax({
          url: new_url,
          method: 'get',
          dataType: 'json',
          success: function (response) {
            let movie = new Movie(response);
            let html = movie.movieHTML();
            $('div.column.right').html(html)
            listenForRentClick()
          }
        })

      }
    })

  })
}
