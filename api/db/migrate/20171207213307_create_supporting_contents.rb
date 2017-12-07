class CreateSupportingContents < ActiveRecord::Migration[5.1]
  def change
    create_table :supporting_contents do |t|
      t.references :message, foreign_key: true
      t.string :source
      t.string :content_type
      t.string :title
      t.text :description
      t.string :publisher
      t.string :image_url

      t.timestamps
    end
  end
end
