class Customer {
  constructor(obj) {
    this.id = obj.id
    this.name = obj.name
    this.age = obj.age
    this.email = obj.email
    this.check_for_age = obj.check_for_age
  }
}

Customer.prototype.profileHTML = function () {

  return (`
    <h1>${this.name}'s Profile Page </h1>

    <p>Email: ${this.email}</p>
    <p>Age: ${this.age}</p>

    <div style="width:50%">
      ${this.check_for_age}
    </div>
    <br>
    <button class="edit_profile" data-customer_id="${this.id}" value="Edit Profile">Edit Profile</button>
    `)
}

Customer.prototype.editProfile = function () {
  return (`
    <h1>Edit Your Profile</h1>
    <form id="edit_profile" data-cust_id="${this.id}" action="/customers/${this.id}" method="PATCH">
      <input type="hidden" name="authenticity_token" value="token_value">

      <br><strong>Name:</strong><br>
      <input type="text" id="name" value="${this.name}"></br>

      <br><strong>Age:</strong><br>
      <input type="number" id="age" value="${this.age}"></br>

      <br><strong>Email:</strong><br>
      <input type="text" id="email" value="${this.email}"></br>

      <br><strong>Password:</strong><br>
      <input type="text" id="password"></br>

      <br><input class="update_customer" type="submit" value="Update Customer">
    </form>
    `)
}

function profileNavClick(event) {
  console.log("my event: ",event)
  debugger
  $.ajax({
    url: event.toElement.href,
    method: 'get',
    dataType: 'json',
    success: function (response) {

      let customer = new Customer(response)
      $('div#whiteboard').append(customer.profileHTML())

      listenForEditProfileClick(customer)
      }
    })
}

function listenForEditProfileClick(customer) {
  let cust = customer

  $('button.edit_profile').on('click', function (event) {
    clearWhiteboard()
    $('div#whiteboard').append(cust.editProfile())

    listenForUpdateCustomerClick()
  })
}

function listenForUpdateCustomerClick() {
  $('form#edit_profile').on('submit', function(){
    event.preventDefault()
    url= this.action
    id = this.dataset["cust_id"]

    data = {
      'customer': {
        'authenticity_token': $("input[name='authenticity_token']").val(),
      //  'id' : id,
        'name' : $("#name").val(),
        'age' : $("#age").val(),
        'email' : $("#email").val(),
        'password' : $("#password").val()
      }
    }
console.log(data)

    $.ajax({
      type: 'PATCH',
      url: url,
      data: data,
      success: function(response) {

      }
    })
    //i need to figure out how to render the profile page after the patch request goes through
  //profileNavClick(event)
  })

}
