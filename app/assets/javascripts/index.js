$(function (){
  listenForNavClick()
})

$.ajaxSetup({
  headers: {
    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
  }
})

function listenForNavClick() {
  $('a.navbar-brand').on('click', function (event) {
    event.preventDefault();
    $('div#homepage').html('')
    clearWhiteboard()
    let link = event.delegateTarget.outerText

    if (link == "Home") {
      homeNavClick()
    } else if (link == "All Movies") {
      moviesNavClick()
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

function homeNavClick() {
  listenForNavClick()
}

function clearWhiteboard() {
  $('div#whiteboard').html(`
  <div class="column left"></div>
  <div class="column right"></div>
  `)
}

function logOutNavClick() {
  $.ajax({
    type: 'GET',
    url: '/logout',
    success: function(response) {
      homeNavClick()
    }
  })
}

function signUpNavClick() {
  $('div#whiteboard').html(
    `<h1>Please Sign Up</h1>
    <form id="signup" action="/signup" method="POST">
      <br><strong>Name:</strong><br>
      <input type="text" id="name"></br>

      <br><strong>Age:</strong><br>
      <input type="number" id="age"></br>

      <br><strong>Email:</strong><br>
      <input type="email" id="email"></br>

      <br><strong>Password:</strong><br>
      <input type="password" id="password"></br>

      <br><input class="signup" type="submit" value="Create Customer">
    </form>
    `
  )
  listenForSignupClick()
}

function listenForSignupClick() {
$('form#signup').on('submit', function (event) {
    event.preventDefault()
    data = {'customer' : {
        'name' : $("#name").val(),
        'age' : $("#age").val(),
        'email' : $("#email").val(),
        'password' : $("#password").val()
      }
    }

    $.ajax({
      type: 'POST',
      url: '/signup',
      data: data,
      success: function(response) {
        homeNavClick()
      }
    })
  })

}

function logInNavClick() {
  $('div#whiteboard').html(
    `<div class="column left">
      <h1>Please Log In</h1>
      <form id="login" action="/login" method="POST">
        <input type="hidden" name="authenticity_token" value="token_value">

        <br><strong>Email:</strong><br>
        <input type="email" id="email"></br>

        <br><strong>Password:</strong><br>
        <input type="password" id="password"></br>

        <br><input class="login" type="submit" value="Log In">
      </form>
    </div>
    <div class="column right">
      <div id="userinfo">
        <h4>Demo Login Info:</h4>
        <p>Email: csand@gmail.com</p>
        <p>Password: password</p>
      </div>
    </div>
    `
  )
  listenForLoginClick()
}

function listenForLoginClick() {
  $('form#login').on('submit', function (event) {
    event.preventDefault()
    data = {'customer' : {
        'authenticity_token': $("input[name='authenticity_token']").val(),
        'email' : $("#email").val(),
        'password' : $("#password").val()
      }
    }

    $.ajax({
      type: 'POST',
      url: '/login',
      data: data,
      success: function(response) {
        homeNavClick()
      }
    })
  })
}
