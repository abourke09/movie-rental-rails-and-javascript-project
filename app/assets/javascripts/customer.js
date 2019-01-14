class Customer {
  constructor(obj) {
    this.id = obj.id
    this.name = obj.name
    this.age = obj.age
    this.email = obj.email
  }
}

Customer.prototype.profileHTML = function () {

  let mpaa_statement = `According the the Motion Picture Association of America (MPAA),
  you are old enough to see movies with a rating of `
  let age = `${this.age}`
  let under_thirteen = `G.`
  let thirteen_to_seventeen = `G, PG, and PG-13.`
  let eighteen_and_over = `G, PG, PG-13, R, and NC-17.`

    if (age) {
      if (age < 13) {
      mpaa_statement += under_thirteen
      } else if (age <= 17) {
      mpaa_statement += thirteen_to_seventeen
      } else {
      mpaa_statement += eighteen_and_over
      }
    } else {
      mpaa_statement = `The Motion Picture Association of America (MPAA) rates each movie
      to recommend a certain age threshold for viewers. To learn more
      about which movies would suit you, be sure to include your age
      in your profile.`
    }

  return (`
    <h1>${this.name}'s Profile Page </h1>

    <p>Email: ${this.email}</p>
    <p>Age: ${this.age}</p>

    <div style="width:50%">
      ${mpaa_statement}
    </div>

    <h3><%= link_to "Edit your profile", edit_customer_path(@customer.id) %></h3>
    `)
}


function profileNavClick(event) {
  $.ajax({
    url: event.toElement.href,
    method: 'get',
    dataType: 'json',
    success: function (response) {
      let cust = new Customer(response)
      $('div#whiteboard').append(cust.profileHTML())
      }
    })
}
