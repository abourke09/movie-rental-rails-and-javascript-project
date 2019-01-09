Notes.md


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
