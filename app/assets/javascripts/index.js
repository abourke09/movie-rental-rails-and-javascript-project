$(function (){
  listenForNavClick()
})

function clearHomepage() {
  $('div#homepage').html('')
}

function clearWhiteboard() {
  $('div#whiteboard').html('')
}

function homeNavClick(event) {
  //only for users who are already logged in...
  $('div#whiteboard').html(`
    <h1>Movie Rental Homepage</h1>
    <p>Take a look at the available movies, check out your profile page, or view your rentals by selecting an option from the navigation bar above.</p>
    `)
}

function logOutNavClick() {
  $('div#whiteboard').append("you clicked on the Log Out link!")
}

function signUpNavClick() {
  $('div#whiteboard').append("you clicked on the Sign Up link!")
}

function logInNavClick(event) {
  $('div#whiteboard').html(
    `<h1>Please Log In</h1>
    <form>
      <br><strong>Email:</strong><br>
      <input type="text" name="email"></br>

      <br><strong>Password:</strong><br>
      <input type="text" name="password"></br>

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
