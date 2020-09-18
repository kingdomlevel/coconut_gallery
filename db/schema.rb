# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_06_15_150253) do

  create_table "drawings", force: :cascade do |t|
    t.string "picture"
    t.integer "photo_id"
    t.boolean "flagged_innapropriate"
    t.boolean "moderated"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["photo_id"], name: "index_drawings_on_photo_id"
  end

  create_table "photos", force: :cascade do |t|
    t.boolean "flagged_innapropriate"
    t.string "picture"
    t.boolean "moderated"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
