class Customer < ApplicationRecord
  has_many :rentals
  has_many :movies, through: :rentals
  validates :name, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
  validates :age, presence: true, numericality: true
  has_secure_password

  def check_for_age
    mpaa_statement = "According the the Motion Picture Association of America (MPAA),
    you are old enough to see movies with a rating of "

    under_thirteen = "G."
    thirteen_to_seventeen = "G, PG, and PG-13."
    eighteen_and_over = "G, PG, PG-13, R, and NC-17."

     if self.age
       if self.age < 13
        mpaa_statement + under_thirteen
       elsif self.age <= 17
        mpaa_statement + thirteen_to_seventeen
       else
        mpaa_statement + eighteen_and_over
       end
     else
        "The Motion Picture Association of America (MPAA) rates each movie
        to recommend a certain age threshold for viewers. To learn more
        about which movies would suit you, be sure to include your age
        in your profile."
     end
   end
end
