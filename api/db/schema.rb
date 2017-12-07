# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20171207213556) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "messages", force: :cascade do |t|
    t.text "content"
    t.bigint "user_id"
    t.bigint "room_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["room_id"], name: "index_messages_on_room_id"
    t.index ["user_id"], name: "index_messages_on_user_id"
  end

  create_table "permissions", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "room_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["room_id"], name: "index_permissions_on_room_id"
    t.index ["user_id"], name: "index_permissions_on_user_id"
  end

  create_table "rooms", force: :cascade do |t|
    t.string "name"
    t.string "password_digest"
    t.string "slug"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "supporting_contents", force: :cascade do |t|
    t.bigint "message_id"
    t.string "source"
    t.string "content_type"
    t.string "title"
    t.text "description"
    t.string "publisher"
    t.string "image_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["message_id"], name: "index_supporting_contents_on_message_id"
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "messages", "rooms"
  add_foreign_key "messages", "users"
  add_foreign_key "permissions", "rooms"
  add_foreign_key "permissions", "users"
  add_foreign_key "supporting_contents", "messages"
end
