$(function (){
  listenForNavClick()
})

function clearHomepage() {
  $('div#homepage').html('')
}

function clearWhiteboard() {
  $('div#whiteboard').html(`
  <div class="column left"></div>
  <div class="column right"></div>
  `)
}

function homeNavClick(event) {
  //only for users who are already logged in...
  $('div#whiteboard').html(`
    <h1>Movie Rental Homepage</h1>
    <p>Take a look at the available movies, check out your profile page, or view your rentals by selecting an option from the navigation bar above.</p>
    `)
}

function logOutNavClick() {
  $('div#whiteboard').append("This Nav click should always be a button that routes to sessions#destroy")
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
