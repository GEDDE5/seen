class User < ApplicationRecord
  has_many :permissions
  has_many :rooms, through: :permissions
  has_many :messages

  def update_room_permissions!(room)
    self.permissions.first_or_create(room: room)
  end

  def generate_token
    Token.encode({ sub: self.id })
  end
end
