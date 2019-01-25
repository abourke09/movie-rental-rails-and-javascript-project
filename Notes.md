Notes.md

from application.js file: //= require jqueryauthenticity
[ ] Ask Brad if I really need a Facebook login and signup page (old project requirements) Also, validation requirements?
[ ] upon login, the currentUser() evaluated, but the current_user_id is still undefined.
[X] When Navbar is clicked after successful login, the listener doesn't work and it loads a new page
[ ] Figure out how to incorporate error and success messages/routing:
    - if rental is UNSUCCESSFUL (most important)- focus on Rent Button
    - for successful rental would be nice
    - for user profile changes?
    - for login & signup errors
[X] Check for age doesn't work anymore!!! :( :( :(
[X] Instead of loading the NavBar each time, let the application.html.erb landing page include the 'not logged in' version, and shovel in the html to replace it with the 'logged in version' when a user actually logs in. Then do the reverse when someone logs out.
[X] reroute login to root 3000
[X] Make Rent button disappear if the customer has already rented it
[X] Remove duplication of Rental objects if the movie is
    rented>returned>rented again
[X] Understand filter on All Movies list page
[ ] add PUT/PATCH ajax requests for:
  [X] Profile >Edit >listenForUpdateCustomerClick
  [X] Movie >Rent >listenForRentClick
  [X] My Rentals >Return Now >listenForReturnClick
  [X] My Rentals >Add Famous Quote >Create a Famous Quote >listenForCreateQuoteClick
  [X] Log Out  
  [X] Log In
  [ ] Sign Up


  <form id="login" action="/login" method="POST">


  <!--
          <a class="navbar-brand" href="/">Home</a>

          <% if current_user %>
            <a class="navbar-brand" href="/movies">All Movies</a>
            <a class="navbar-brand" href="/customers/<%=current_user.id%>">My Profile</a>
            <a class="navbar-brand" href="/customers/<%=current_user.id%>/rentals">My Rentals</a>
            <a class="navbar-brand" href="/logout">Log Out</a>
          <% else %>
            <a class="navbar-brand" href="/signup">Sign Up</a>
            <a class="navbar-brand" href="/login">Log In</a>
          <% end %>
  -->

  #  render json: {
  #    id: current_user.id
  #    name: current_user.name,
  #    age: current_user.age,
  #    email: current_user.email,
  #    check_for_age: current_user.check_for_age
  #  }

  <div class="navbar-header">

  <a class="navbar-brand" href="/">Home</a>
  <% if current_user %>
    <a class="navbar-brand" href="/movies">All Movies</a>
    <a class="navbar-brand" href="/customers/<%=current_user.id%>">My Profile</a>
    <a class="navbar-brand" href="/customers/<%=current_user.id%>/rentals">My Rentals</a>
    <a class="navbar-brand" href="/logout">Log Out</a>
  <% else %>
    <a class="navbar-brand" href="/signup">Sign Up</a>
    <a class="navbar-brand" href="/login">Log In</a>
  <% end %>
  </div>



${this.famous_quotes}.forEach(q => {
  let each_quote = `<p>"<em>${q.quote}</em>" - ${q.actor} </p> <br />`
  $('div#famous-quote-details').append(each_quote)
  })



//  const movieLinks = document.querySelectorAll('td a')
//	movieLinks.forEach(link => {
//		link.addEventListener('click', function (event) {
//    console.log("Event from addEventListener:", event);
//    event.preventDefault();
//    console.log("AB: we've reached the 2nd listener...")
//
//    $.ajax({
//      url: this.href,
//      method: 'get',
//      dataType: 'json',
//      success: function (response) {
//
//        let movie = new Movie(response);
//        let html = movie.movieHTML();
//        $('div#movie-details').html(html)
//
//        $('div#famous-quote-details').html(`<h2>Famous Quotes</h2>`)
//
//        movie.famous_quotes.forEach(q => {
//          let each_quote = `<p>"<em>${q.quote}</em>" - ${q.actor} </p> <br />`
//          $('div#famous-quote-details').append(each_quote)
//          })
//
//        let button = `<p>ISABUTTON!</p>`;
//
//        $('div#rent-movie-button').html(button)
//
//        }
//      })
//    })
//  })
//}

//Movie.prototype.rentButton = function () {
//  let movieId = this.id
//  debugger
//  return (`
//    <form method="post" action="/rentals">
//      <input type="submit" class="show_details" data-movie_id="${movieId}" value="Rent Movie">
//    </form>
//    `)
//}
//
//
//function add_food() {
//    $("#new_food").on("submit", function (e) {
//        url = this.action
//        data = {
//            'authenticity_token': //$("input[name='authenticity_token']").val(),
//            'food': {
//                'name': $("#food_name").val(),
//                'group_id': $("#food_group_id").val(),
//                'cals': $("#food_cals").val()
//            }
//        }
//
//        e.stopImmediatePropagation();
//        $.ajax({
//            type: 'POST',
//            url: url,
//            data: data,
//            success: function () {
//                $("#food_name").val('')
//                $("#food_cals").val('')
//                $("#food_group_id").val('No group chosen')
//                $("#food_list").append(data.food.name + //"<br>")
//            }
//        });
//        e.preventDefault();
//    });
//}
//
