class CreateRooms < ActiveRecord::Migration[5.1]
  def change
    create_table :rooms do |t|
      t.string :name
      t.string :password_digest
      t.string :slug

      t.timestamps
    end
  end
end
