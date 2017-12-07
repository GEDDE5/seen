class User < ApplicationRecord
  has_many :permissions
  has_many :rooms, through: :permissions
  has_many :messages
end
