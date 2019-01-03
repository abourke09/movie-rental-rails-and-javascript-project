class CustomerSerializer < ActiveModel::Serializer
  attributes :id, :name, :age, :email

  has_many :rentals
  has_many :movies, through: :rentals
end
