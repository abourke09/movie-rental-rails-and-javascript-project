class CustomerSerializer < ActiveModel::Serializer
  attributes :id, :name, :age, :email, :password_digest

  has_many :rentals  
end
