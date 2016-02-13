# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20160213193533) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "packages", force: :cascade do |t|
    t.string   "phone",                         null: false
    t.string   "pin",                           null: false
    t.boolean  "verified",      default: false, null: false
    t.string   "tracking_id",                   null: false
    t.boolean  "alert_updates", default: true,  null: false
    t.boolean  "alert_final",   default: true,  null: false
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
  end

  add_index "packages", ["phone", "tracking_id"], name: "index_packages_on_phone_and_tracking_id", unique: true, using: :btree

end
