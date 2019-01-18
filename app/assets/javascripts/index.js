$(function (){
  setNavbar(event)
  listenForNavClick()
})

function clearHomepage() {
  $('div#homepage').html('')
}

function setNavbar(event) {
  navbar_html = "placeholder"
  current_user = {
      id: 8,
      name: "Cole Sand",
      age: 13,
      email: "csand@gmail.com",
      check_for_age: "According the the Motion Picture Association of America (MPAA), you are old enough to see movies with a rating of G, PG, and PG-13."
    }
  console.log("setNavbar Event: ", event)

  if (current_user) {
    navbar_html = `
      <a class="navbar-brand" href="/">Home</a>,
      <a class="navbar-brand" href="/movies">All Movies</a>,
      <a class="navbar-brand" href="/customers/${current_user.id}">My Profile</a>,
      <a class="navbar-brand" href="/customers/${current_user.id}/rentals">My Rentals</a>,
      <a class="navbar-brand" href="/logout">Log Out</a>`
  } else {
    navbar_html = `
      <a class="navbar-brand" href="/">Home</a>,
      <a class="navbar-brand" href="/signup">Sign Up</a>,
      <a class="navbar-brand" href="/login">Log In</a>`
  }
  $('div.navbar-header').html(navbar_html)
}

function clearWhiteboard() {
  $('div#whiteboard').html(`
  <div class="column left"></div>
  <div class="column right"></div>
  `)
}

function homeNavClick(event) {
  setNavbar(event)
  welcome_message = "placeholder"
  current_user = {
    id: 8,
    name: "Cole Sand",
    age: 13,
    email: "csand@gmail.com",
    check_for_age: "According the the Motion Picture Association of America (MPAA), you are old enough to see movies with a rating of G, PG, and PG-13."
  }

  console.log("homeNavClick Event: ", event)
  if (current_user) {
    welcome_message = `
    <h1>Movie Rental Homepage</h1>
    <p>Take a look at the available movies, check out your profile page, or view your rentals by selecting an option from the navigation bar above.</p>`
  } else {
    welcome_message = `
    <h1>Movie Rental Homepage</h1>
    <p>Please log in or sign up by selecting one of the options from the navigation bar above.</p>`
  }
  $('div#whiteboard').html(welcome_message)
}

function logOutNavClick(event) {
  $('div#whiteboard').append("This Nav click should always be a button that routes to sessions#destroy")
  console.log("Logout: ", event)

  $.ajax({
    type: 'GET',
    url: '/logout',
    success: function(response) {
      console.log("inside ajax resp:", response)
    //  $('html').html(response)
    homeNavClick(event)

    }
  })
}

function signUpNavClick() {
  $('div#whiteboard').html(
    `<h1>Please Sign Up</h1>
    <form>
      <br><strong>Name:</strong><br>
      <input type="text" name="name"></br>

      <br><strong>Age:</strong><br>
      <input type="number" name="age"></br>

      <br><strong>Email:</strong><br>
      <input type="email" name="email"></br>

      <br><strong>Password:</strong><br>
      <input type="password" name="password"></br>

      <br><input class="signup" type="submit" value="Create Customer">
    </form>
    `
  )
  listenForSignupClick(event)
}

function listenForSignupClick(event) {
  event.preventDefault()
  $('input.signup').on('click', function (event) {
    console.log("Event from Create Customer button click:", event)
  })
}

function logInNavClick(event) {
  $('div#whiteboard').html(
    `<h1>Please Log In</h1>
    <form>
      <br><strong>Email:</strong><br>
      <input type="email" name="email"></br>

      <br><strong>Password:</strong><br>
      <input type="password" name="password"></br>

      <br><input class="login" type="submit" value="Log In">
    </form>

    <p>Alternatively, log in with Facebook (Insert actual link later).</p>
    `
  )
  listenForLoginClick()
}

function listenForLoginClick() {
  event.preventDefault()
  $('input.login').on('click', function (event) {
    console.log("Event from Login Button Click:", event)

    $.ajax({
      type: 'POST',
      url: '/login',
      success: function(response) {
        console.log("inside ajax resp:", response)
        homeNavClick(event)
        }
      })
  })
}

function listenForNavClick() {
  $('a.navbar-brand').on('click', function (event) {
    event.preventDefault();
    clearHomepage()
    clearWhiteboard()
    let link = event.delegateTarget.outerText

    if (link == "Home") {
      homeNavClick(event)
    } else if (link == "All Movies") {
      moviesNavClick(event)
    } else if (link == "My Profile") {
      profileNavClick(event)
    } else if (link == "My Rentals") {
      rentalsNavClick(event)
    } else if (link == "Log Out") {
      logOutNavClick(event)
    } else if (link == "Sign Up") {
      signUpNavClick(event)
    } else if (link == "Log In") {
      logInNavClick(event)
    }

  })
}
