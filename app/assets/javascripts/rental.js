class Rental {
  constructor(obj) {
    this.id = obj.id
    this.customerId = obj.customer_id
    this.movieId = obj.movie_id
    this.status = obj.status
    this.title = obj.movie_details.title
    this.rating = obj.movie_details.rating
    this.length = obj.movie_details.length
    this.leadActor = obj.movie_details.lead_actor
  }

  checkedOutTable() {
    return (`
          <tr>
            <td><a href="movies/${this.movieId}">${this.title}</a></td>
            <td>${this.rating}</td>
            <td>${this.length} minutes</td>
            <td>${this.leadActor}</td>
            <td><button class="return" data-rental_id="${this.id}">Return Now</button></td>
          </tr>
    `)
  }

  returnedTable() {
    return (`
          <tr>
            <td><a href="movies/${this.movieId}">${this.title}</a></td>
            <td>${this.rating}</td>
            <td>${this.length} minutes</td>
            <td>${this.leadActor}</td>
            <td><button class="add_quote" data-movie_id="${this.movieId}">Add a Famous Quote</button></td>
          </tr>
    `)
  }
} //closes Rental class


function listenForRentClick() {
  $('button.rent').on('click', function (event) {
    event.preventDefault()
    let this_movie_id = this.dataset.movie_id
    let currentCustomerId = document.getElementById('user-id').dataset.id

    $.ajax({
      type: 'GET',
      url: `/movies/${this_movie_id}`,
      dataType: 'json',
      success: function(response) {
        rentals = response.rentals

        var rental_id
        var already_rented = false;
        for(var i = 0; i < rentals.length; i++) {
            if (rentals[i].customerId == currentCustomerId && rentals[i].status == "returned") {
                already_rented = true;
                rental_id = rentals[i].id;
                break;
            }
        }

        if (already_rented) {
          type = 'GET'
          url = '/rentals/:id'
          data = {
              'customer_id' : currentCustomerId,
              'movie_id' : movieId,
              'rental_id' : rental_id,
              'status' : 'checked out'
          }
        } else {
          type = 'POST'
          url = '/rentals'
          data = {
              'customer_id' : currentCustomerId,
              'movie_id' : movieId,
          }
        }

        $.ajax({
          type: type,
          url: url,
          data: data,
          success: function (response) {
            rentalsNavClick()
          }
        }) //closes Second AJAX request
      } //closes first AJAX request Success Function
    }) //closes first AJAX request
  }) //closes button click event
} //closes entire function

function rentalsNavClick() {
  clearWhiteboard()
  currentCustomerId = document.getElementById('user-id').dataset.id


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
  $.ajax({
    url: `customers/${currentCustomerId}/rentals`,
    method: 'get',
    dataType: 'json',
    success: function (response) {
      let rentals = response["rentals"]

      rentals.forEach(function(element) {
        if (element.status == "checked out") {
          let newRental = new Rental(element)
          $('div.column.left tbody.checked_out').append(newRental.checkedOutTable())
        } else if (element.status == "returned") {
          let newRental = new Rental(element)
          $('div.column.left tbody.returned').append(newRental.returnedTable())
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

    let rental_id = event.delegateTarget.dataset["rental_id"]
    let url = `/rentals/${rental_id}`
    let data = {
      'rental_id' : rental_id,
      'status' : 'returned'
    }

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
    $('div.column.right').html('')
    let this_movie_id = event.delegateTarget.dataset.movie_id
    let url = `movies/${this_movie_id}`

    $.ajax({
      url: url,
      method: 'GET',
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
