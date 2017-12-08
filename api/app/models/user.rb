class User < ApplicationRecord
  has_many :permissions
  has_many :rooms, through: :permissions
  has_many :messages

  def generate_token
    rooms = self.rooms.pluck(:id)
    Token.encode({ sub: self.id, rooms: rooms })
  end
end
