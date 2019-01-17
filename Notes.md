Notes.md

from application.js file: //= require jqueryauthenticity


[ ] reroute login to root 3000
[X] Understand filter on All Movies list page
[ ] add PUT/PATCH ajax requests for:
  [X] Profile >Edit >listenForUpdateCustomerClick
  [ ] Movie >Rent >listenForRentClick
  [ ] My Rentals >Return Now >listenForReturnClick
  [ ] My Rentals >Add Famous Quote >Create a Famous Quote >listenForCreateQuoteClick
  [ ] Log Out / Log In / Sign Up



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
