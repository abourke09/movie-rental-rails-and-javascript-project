class Rental < ApplicationRecord
  belongs_to :movie
  belongs_to :customer

  def movie_details
    {title: self.movie.title, rating: self.movie.rating, length: self.movie.length, lead_actor: self.movie.lead_actor}
  end

  def rent_movie
    if self.customer != nil
      if !old_enough?
        "Sorry, you are not old enough to watch this movie."
      else
        self.update(:status => "checked out",)
        "Thanks for renting #{self.movie.title}!"
      end
    end
  end

  def old_enough?
    rental_rating = self.movie.rating

    case rental_rating
    when "NC-17"
      required_age = 18
    when "R"
      required_age = 17
    when "PG-13"
      required_age = 13
    when "PG"
      required_age = 13
    else
      required_age = 0
    end

    required_age < self.customer.age
  end

  def self.checked_out
     self.where("status = 'checked out'")
  end

  def self.past_rentals
    self.where("status = 'returned'")
  end

end
