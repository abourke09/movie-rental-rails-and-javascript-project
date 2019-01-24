class FamousQuoteSerializer < ActiveModel::Serializer
  attributes :id, :quote, :actor, :movie_id

  belongs_to :movie
end
