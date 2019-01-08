$(function (){
  console.log('Yay! index.js loaded.');
  listenForNavClick()

})

function clearWelcomeMessage() {
  $('div#welcome-message').html('')
}

function clearWhiteboard() {
  $('div#whiteboard').html('')
}

function movieNavClick() {
  console.log("you clicked on the All Movies link!")
}

function profileNavClick() {
  console.log("you clicked on the My Profile link!")
}

function rentalsNavClick() {
  console.log("you clicked on the My Rentals link!")
}

function logOutNavClick() {
  console.log("you clicked on the Log Out link!")
}

function signUpNavClick() {
  console.log("you clicked on the Sign Up link!")
}

function logInNavClick() {
  console.log("you clicked on the Log In link!")
}

//I need to hijack the click event for each of my nav links
function listenForNavClick() {
  $('a.navbar-brand').on('click', function (event) {
    event.preventDefault();
  //  console.log("Navbar click event:", event);
    clearWhiteboard()
    let link = event.delegateTarget.outerText

    if (link == "All Movies") {
      movieNavClick()
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
  $('td a').on('click', function (event) {

    $.ajax({
      url: this.href,
      method: 'get',
      dataType: 'json',
      success: function (response) {

        let movie = new Movie(response);
      //  console.log("This is a movie: ", movie);

        let html = movie.movieHTML();
        $('div#movie-details').html(html)

        $('div#famous-quote-details').html(`<h2>Famous Quotes</h2>`)

        movie.famous_quotes.forEach(q => {
          let each_quote = `<p>"<em>${q.quote}</em>" - ${q.actor} </p> <br />`
          $('div#famous-quote-details').append(each_quote)
          })

        let button = `<p>ISABUTTON!</p>`;

        $('div#rent-movie-button').html(button)

      }
    })

    event.preventDefault();

  })
}
