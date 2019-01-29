class CustomerSerializer < ActiveModel::Serializer
  attributes :id, :name, :age, :email, :check_for_age

  has_many :rentals
  has_many :movies


end
