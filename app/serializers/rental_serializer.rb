class RentalSerializer < ActiveModel::Serializer
  attributes :id, :customer_id, :movie_id, :status

  belongs_to :movie
  belongs_to :customer
  has_many :famous_quotes, through: :movie 
end
