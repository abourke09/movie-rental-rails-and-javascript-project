$(function (){
  console.log('Yay! index.js loaded.');
  listenForNavClick()
//  listenForMovieClick()
})

function clearHomepage() {
  $('div#homepage').html('')
}

function clearWhiteboard() {
  $('div#whiteboard').html('')
}

function moviesNavClick(event) {
  $('div#whiteboard').html(`
    <h1>All Movies: (add filter later)</h1>
    <table>
      <tbody>
        <tr>
          <th>Title</th>
          <th>MPAA Rating</th>
          <th>Length</th>
          <th>Lead Actor</th>
        </tr>
      </tbody>
    </table>
    <div id='movie-details'></div>
    <div id='rent-movie-button'></div>
  `);

  $.ajax({
    url: event.delegateTarget.href,
    method: 'get',
    dataType: 'json',
    success: function (response) {
      response.forEach(item => {
        let newMovie = new Movie(item)
        $('div#whiteboard tbody').append(newMovie.movieList())
      })
      listenForMovieClick()
    }
  })
}

function profileNavClick() {
  $('div#whiteboard').append("you clicked on the My Profile link!")
}

function rentalsNavClick() {
  $('div#whiteboard').append("you clicked on the My Rentals link!")
}

function logOutNavClick() {
  $('div#whiteboard').append("you clicked on the Log Out link!")
}

function signUpNavClick() {
  $('div#whiteboard').append("you clicked on the Sign Up link!")
}

function logInNavClick() {
  $('div#whiteboard').append("you clicked on the Log In link!")
}

function listenForNavClick() {
  $('a.navbar-brand').on('click', function (event) {
    event.preventDefault();
  //  console.log("Navbar click event:", event);
    clearWhiteboard()
    let link = event.delegateTarget.outerText

    if (link == "All Movies") {
      moviesNavClick(event)
    } else if (link == "My Profile") {
      profileNavClick()
    } else if (link == "My Rentals") {
      rentalsNavClick()
    } else if (link == "Log Out") {
      logOutNavClick()
    } else if (link == "Sign Up") {
      signUpNavClick()
    } else if (link == "Log In") {
      logInNavClick()
    }

  })
}


function listenForMovieClick() {
  console.log("BAHAHAHA!")
  $('td a').on('click', function (event) {
    event.preventDefault();
    console.log("well this worked alright...")

  $.ajax({
    url: this.href,
    method: 'get',
    dataType: 'json',
    success: function (response) {
      let movie = new Movie(response);
      let html = movie.movieHTML();
      $('div#movie-details').html(html)

      movie.famous_quotes.forEach(q => {
        let each_quote = `<p>"<em>${q.quote}</em>" - ${q.actor} </p> <br />`
        $('div#movie-details').append(each_quote)
      })

      let button = movie.rentButton
      $('div#movie-details').append(button)
      }
    })

  })
}
