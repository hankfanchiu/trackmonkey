class CreatePackages < ActiveRecord::Migration
  def change
    create_table :packages do |t|
      t.string :phone, null: false
      t.string :pin, null: false
      t.boolean :verified, null: false, default: false
      t.string :tracking_id, null: false
      t.boolean :alert_updates, null: false, default: true
      t.boolean :alert_final, null: false, default: true

      t.timestamps null: false
    end

    add_index :packages, [:phone, :tracking_id], unique: true
  end
end
