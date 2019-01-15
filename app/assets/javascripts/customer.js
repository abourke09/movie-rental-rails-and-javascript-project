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
    <form>
      <br><strong>Name:</strong><br>
      <input type="text" name="name" value="${this.name}"></br>

      <br><strong>Age:</strong><br>
      <input type="number" name="age" value="${this.age}"></br>

      <br><strong>Email:</strong><br>
      <input type="text" name="email" value="${this.email}"></br>

      <br><strong>Password:</strong><br>
      <input type="text" name="password"></br>

      <br><input class="update_customer" type="submit" value="Update Customer">
    </form>
    `)
}

function profileNavClick(event) {
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
  event.preventDefault()
  $('button.update_customer').on('click', function (event) {
    debugger
    console.log("Event from UpdateCustomerClick:", event)
  })
}
