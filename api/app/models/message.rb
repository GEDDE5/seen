class Message < ApplicationRecord
  belongs_to :user
  belongs_to :room
  has_one :supporting_content
end
