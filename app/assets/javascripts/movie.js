class Movie {
  constructor(obj) {
    this.id = obj.id
    this.title = obj.title
    this.leadActor = obj.lead_actor
    this.length = obj.length
    this.rating = " " + obj.rating + " "
    this.famousQuotes = obj.famous_quotes
  }

  movieHTML() {
    let movieQuotes = this.famousQuotes.map(q => {
      return `<p>"<em>${q.quote}</em>" - ${q.actor} </p> <br />`
    })

    return (`
      <h2>${this.title}</h2>
      <p><strong>MPAA Rating: </strong>${this.rating} </p>
      <p><strong>Length: </strong>${this.length} minutes</p>
      <p><strong>Lead Actor: </strong>${this.leadActor} </p>
      <p><strong>Famous Quotes</strong></p>
      <div>${movieQuotes.join(' ')}</div>
      <button class="rent" data-movie_id="${this.id}" value="Rent Movie">Rent</button>
      `)
  }

  movieList() {
    return (`
          <tr class="content">
            <td><a href="movies/${this.id}">${this.id}. ${this.title}</a></td>
            <td>${this.rating}</td>
            <td>${this.length} minutes</td>
            <td>${this.leadActor}</td>
          </tr>
    `)
  }

}//closes Movie class

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

function moviesNavClick() {
  $('div.column.left').html(`
    <h1>All Movies:</h1>
    <table class="table table-bordered">
      <tbody>
        <tr>
          <th onclick="newSort()">Title</th>
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
          <th onclick="sortByHeaders(2)">Length</th>
          <th onclick="sortByHeaders(3)">Lead Actor</th>
        </tr>
      </tbody>
    </table>
  `);

  $.ajax({
    url: '/movies',
    method: 'get',
    dataType: 'json',
    success: function (response) {
      response.forEach(item => {
        let newMovie = new Movie(item)
        $('div.column.left tbody').append(newMovie.movieList())
      })
      listenForMovieClick()
    }
  })
}

function newSort() {
  $.ajax({
    url: '/movies',
    method: 'get',
    dataType: 'json',
    success: function (response) {

      response.sort( (a, b) => {
        const ratingOne = a.rating.toUpperCase();
        const ratingTwo = b.rating.toUpperCase();

        if(ratingOne > ratingTwo) {
          return 1
        }

        if(ratingOne < ratingTwo) {
          return -1
        }

       const titleOne = a.title.toUpperCase();
       const titleTwo = b.title.toUpperCase();

       if(titleOne > titleTwo) {
         return 1
       }

       if(titleOne < titleTwo) {
         return -1
       }

        return 0
      })
      console.log(response)

      listenForMovieClick()
    }
  })
}

function sortByHeaders(n) {
  let rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  switching = true;
  dir = "asc";

  while (switching) {
    switching = false;
    rows = $('div.column.left tr.content');
    for (i = 0; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];

      if (n == 3) {
        thingOne = x.innerText
        thingTwo = y.innerText
      } else {
        thingOne = parseInt(x.innerText)
        thingTwo = parseInt(y.innerText)
      }

      if (dir == "asc") {
        if (thingOne > thingTwo) {
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (thingOne < thingTwo) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }

}

function listenForMovieClick() {
  $('td a').on('click', function (event) {
    event.preventDefault();
    currentCustomerId = document.getElementById('user-id').dataset.id

    $.ajax({
      url: this.href,
      method: 'get',
      dataType: 'json',
      success: function (response) {
        let movie = new Movie(response);
        let html = movie.movieHTML();
        $('div.column.right').html(html)
        rentals = response.rentals

        var displayRentButton = true;
        for(var i = 0; i < rentals.length; i++) {
            if (rentals[i].customer_id == currentCustomerId && rentals[i].status == "checked out") {
                displayRentButton = false;
                break;
            }
        }

        if (!displayRentButton){
         $ ('button.rent').remove()
        } else {
           listenForRentClick()
        }

      }
    })
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
