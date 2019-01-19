class Movie {
  constructor(obj) {
    this.id = obj.id
    this.title = obj.title
    this.lead_actor = obj.lead_actor
    this.length = obj.length
    this.rating = " " + obj.rating + " "
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
    <div>${movieQuotes.join(' ')}</div>
    <button class="rent" data-movie_id="${this.id}" value="Rent Movie">Rent</button>
    `)
    //Would it be possible to add something on line 24 so that if the movie
    //is already rented by the user, the Rent Button does not show up? It would
    //help the Rentals Page make more sense when a movie is clicked
}

Movie.prototype.movieList = function () {
  return (`
        <tr class="content">
          <td><a href="movies/${this.id}">${this.id}. ${this.title}</a></td>
          <td>${this.rating}</td>
          <td>${this.length} minutes</td>
          <td>${this.lead_actor}</td>
        </tr>
  `)
}

function filterText() {
    $('div#movie-details').html('')
		var rex = new RegExp($('#filterText').val());
		if(rex =="/all/"){clearFilter()}else{
			$('.content').hide();
			$('.content').filter(function() {
			return rex.test($(this).text());
			}).show();
	  }
}

function clearFilter() {
		$('.filterText').val('');
		$('.content').show();
}

function moviesNavClick(event) {
  $('div.column.left').html(`
    <h1>All Movies:</h1>
    <table class="table table-bordered">
      <tbody>
        <tr>
          <th>Title</th>
          <th>MPAA Rating
            <select id='filterText' style='display:inline-block' onchange='filterText()'>
              <option disabled selected>Select</option>
              <option value=' G '>G</option>
              <option value='PG '>PG</option>
              <option value='PG-13 '>PG-13</option>
              <option value='R '>R</option>
              <option value='NC-17 '>NC-17</option>

              <option value='all'>All</option>
            </select>
          </th>
          <th>Length</th>
          <th>Lead Actor</th>
        </tr>
      </tbody>
    </table>
  `);

  $.ajax({
    url: event.delegateTarget.href,
    method: 'get',
    dataType: 'json',
    success: function (response) {
      response.forEach(item => {
        let newMovie = new Movie(item)
        $('div.column.left tbody').append(newMovie.movieList())
  //      $('div#whiteboard tbody').append(newMovie.movieList())
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
      $('div.column.right').html(html)
      listenForRentClick()
      }
    })

  })
}

function listenForRentClick() {
  $('button.rent').on('click', function (event) {
    event.preventDefault()

    data = {
        'customer_id' : sessionStorage.get_current_user_id,
        'movie_id' : this.dataset.movie_id
    }

    $.ajax({
      type: 'POST',
      url: '/rentals',
      data: data,
      success: function(response) {
        $('div.column.right').html(`<p>"Your movie had been rented. Please select the <em>My Rentals</em> page to view it."</p>`)
      }
    })
    //After movie is rented,  it should be added to the customer's rentals (in the database)
    //and the whiteboard should fill with the customer's Rentals info
  //  rentalsNavClick()
  })
}

Movie.prototype.AddFamousQuote = function () {
  return (`
    <h1>Add a Famous Quote from ${this.title}</h1>
    <form id="createFQ" data-movie_id="${this.id}" action="/movies/${this.id}/famous_quotes" method="POST">
      <br><strong>Quote:</strong><br>
      <textarea id="quote"></textarea></br>

      <br><strong>Actor:</strong><br>
      <textarea id="actor"></textarea></br>

      <br><input type="submit" value="Create Famous Quote">
    </form>
    `)
}
