class User < ApplicationRecord
  has_many :permissions
  has_many :rooms, through: :permissions
  has_many :messages

  def update_room_permissions!(room)
    self.permissions.find_or_create_by(room: room)
  end

  def generate_token
    Token.encode({ sub: self.id })
  end
end
