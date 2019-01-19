$(function (){
  currentUser()
  setNavbar()
  listenForNavClick()
})

function currentUser() {
  $.ajax({
    type: 'GET',
    url: '/get_current_user',
    success: function(response) {
      sessionStorage.setItem("get_current_user_id", response.id)
      }
    })
  sessionStorage.getItem("get_current_user_id")
}

function setNavbar() {
  current_user_id = sessionStorage.getItem("get_current_user_id")

  if (current_user_id != "undefined") {
    navbar_html = `
      <a class="navbar-brand" href="/">Home</a>,
      <a class="navbar-brand" href="/movies">All Movies</a>,
      <a class="navbar-brand" href="/customers/${current_user_id}">My Profile</a>,
      <a class="navbar-brand" href="/customers/${current_user_id}/rentals">My Rentals</a>,
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
  setNavbar()
  current_user_id = sessionStorage.getItem("get_current_user_id")

  if (current_user_id != "undefined") {
    welcome_message = `
    <h1>Movie Rental Homepage</h1>
    <p>Welcome! Take a look at the available movies, check out your profile page, or view your rentals by selecting an option from the navigation bar above.</p>`
  } else {
    welcome_message = `
    <h1>Movie Rental Homepage</h1>
    <p>Welcome! Please log in or sign up by selecting one of the options from the navigation bar above.</p>`
  }
  $('div#whiteboard').html(welcome_message)
}

function logOutNavClick(event) {
  $('div#whiteboard').append("This Nav click should always be a button that routes to sessions#destroy")

  $.ajax({
    type: 'GET',
    url: '/logout',
    success: function(response) {
      homeNavClick(event)
    }
  })
  sessionStorage.clear()
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
    <form id="login" action="/login" method="POST">
      <input type="hidden" name="authenticity_token" value="token_value">

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
    data = $(this).serialize()
    $.ajax({
      type: 'POST',
      url: '/login',
      data: data,
      success: function(response) {
        homeNavClick(event)
        }
      })
  })
  //I could just set the sessionStorage info here... probably should do that instead
  //of an ajax call, a get_current_user variable in the serializer, an entire route, controller stuff...
  currentUser()
}

function listenForNavClick() {
  $('a.navbar-brand').on('click', function (event) {
    event.preventDefault();
    $('div#homepage').html('')
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
